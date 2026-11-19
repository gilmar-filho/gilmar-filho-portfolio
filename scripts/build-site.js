// Monta a pasta _site para o deploy no GitHub Pages:
// 1. gera en/index.html (build-en.js)
// 2. copia os arquivos públicos para _site
// 3. troca o ?v= de cada JS/CSS local pelo hash do conteúdo do arquivo
// 4. preenche o <lastmod> do sitemap com a data do último commit que mexeu na página
// 5. com BEFORE_SHA definido, grava em .indexnow-urls.json as páginas alteradas desde esse commit
//
// Uso: node scripts/build-site.js   (o workflow .github/workflows/deploy.yml roda isso a cada push)

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const root = path.join(__dirname, '..');
const out = path.join(root, '_site');

// Página do sitemap → arquivos cuja alteração muda o conteúdo dela
const PAGES = {
  'https://gilmarfilho.com/': ['index.html'],
  'https://gilmarfilho.com/en/': ['index.html', 'assets/js/i18n.js', 'scripts/build-en.js'],
};

// O que não vai para o site publicado
const EXCLUDE = new Set([
  '.git', '.github', '.gitignore', '_site', 'node_modules', 'scripts',
  'package.json', 'package-lock.json', 'tailwind.config.js', 'README.md', 'LICENSE',
  '.indexnow-urls.json',
]);

const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();

// 1. versão em inglês
require('./build-en.js');

// 2. cópia
fs.rmSync(out, { recursive: true, force: true });
for (const entry of fs.readdirSync(root)) {
  if (EXCLUDE.has(entry)) continue;
  fs.cpSync(path.join(root, entry), path.join(out, entry), { recursive: true });
}

// 3. ?v= pelo hash do arquivo
const hashes = new Map();
const hashOf = file => {
  if (!hashes.has(file)) {
    hashes.set(file, crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex').slice(0, 10));
  }
  return hashes.get(file);
};

const htmlFiles = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
})(out);

const assetRef = /(\s(?:href|src)=")((?!https?:|\/\/)[^"?#]+\.(?:css|js))(?:\?v=[^"]*)?"/g;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8').replace(assetRef, (match, attr, ref) => {
    const target = ref.startsWith('/') ? path.join(out, ref) : path.resolve(path.dirname(file), ref);
    if (!fs.existsSync(target)) return match;
    return `${attr}${ref}?v=${hashOf(target)}"`;
  });
  fs.writeFileSync(file, html);
}

// 4. lastmod
const lastChange = files => git('log', '-1', '--format=%cs', '--', ...files);
const sitemapPath = path.join(out, 'sitemap.xml');
const sitemap = fs.readFileSync(sitemapPath, 'utf8').replace(
  /(<loc>([^<]+)<\/loc>\s*<lastmod>)[^<]*(<\/lastmod>)/g,
  (match, start, loc, end) => {
    if (!PAGES[loc]) throw new Error(`página do sitemap sem fontes em PAGES: ${loc}`);
    return `${start}${lastChange(PAGES[loc])}${end}`;
  },
);
fs.writeFileSync(sitemapPath, sitemap);

// 5. páginas alteradas, para o IndexNow
const before = process.env.BEFORE_SHA;
if (before) {
  let changed;
  try {
    if (/^0+$/.test(before)) throw new Error('primeiro push');
    const files = new Set(git('diff', '--name-only', before, 'HEAD').split('\n').filter(Boolean));
    changed = Object.keys(PAGES).filter(url => PAGES[url].some(f => files.has(f)));
  } catch {
    changed = Object.keys(PAGES); // commit anterior desconhecido: avisa todas
  }
  fs.writeFileSync(path.join(root, '.indexnow-urls.json'), JSON.stringify(changed));
  console.log('páginas alteradas:', changed.length ? changed.join(', ') : 'nenhuma');
}

console.log(`_site pronto (${htmlFiles.length} páginas HTML, ${hashes.size} assets versionados)`);
