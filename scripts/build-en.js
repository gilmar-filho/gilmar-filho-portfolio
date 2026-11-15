const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const i18nSrc = fs.readFileSync(path.join(root, 'assets/js/i18n.js'), 'utf8');
const dict = new Function(`${i18nSrc.slice(0, i18nSrc.indexOf('(() => {'))}; return I18N;`)().en;

let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const t = key => {
  if (!(key in dict)) throw new Error(`chave sem tradução em inglês: ${key}`);
  return dict[key];
};

function replaceInner(src) {
  const open = /<([a-zA-Z][\w-]*)\b[^>]*\sdata-i18n="([^"]+)"[^>]*>/g;
  let out = '';
  let last = 0;
  let m;
  while ((m = open.exec(src))) {
    const [tagOpen, tag, key] = m;
    const start = m.index + tagOpen.length;
    const token = new RegExp(`<${tag}\\b|</${tag}>`, 'g');
    token.lastIndex = start;
    let depth = 1;
    let tm;
    while (depth && (tm = token.exec(src))) depth += tm[0].startsWith('</') ? -1 : 1;
    if (depth) throw new Error(`<${tag} data-i18n="${key}"> sem fechamento`);
    out += src.slice(last, start) + t(key);
    last = tm.index;
    open.lastIndex = tm.index;
  }
  return out + src.slice(last);
}

html = replaceInner(html);

html = html.replace(/<[^>]*\sdata-i18n-attr="([^"]+)"[^>]*>/g, (tag, pairs) =>
  pairs.split(';').reduce((acc, pair) => {
    const [attr, key] = pair.split(':');
    const value = t(key).replace(/"/g, '&quot;');
    return acc.replace(new RegExp(`(\\s${attr}=")[^"]*(")`), `$1${value}$2`);
  }, tag));

const swaps = [
  ['<html lang="pt-BR"', '<html lang="en"'],
  ['data-lang="pt">', 'data-lang="en">'],
  ['<link rel="canonical" href="https://gilmarfilho.com/">', '<link rel="canonical" href="https://gilmarfilho.com/en/">'],
  ['<meta property="og:url" content="https://gilmarfilho.com/">', '<meta property="og:url" content="https://gilmarfilho.com/en/">'],
  ['<meta property="og:locale" content="pt_BR">', '<meta property="og:locale" content="en_US">'],
  ['<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="pt_BR">'],
];
for (const [from, to] of swaps) {
  if (!html.includes(from)) throw new Error(`trecho não encontrado: ${from}`);
  html = html.replace(from, to);
}

html = html.replace(/(\s(?:href|src)=")\.\//g, '$1../');

fs.mkdirSync(path.join(root, 'en'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'en/index.html'),
  html.replace(/^(<!DOCTYPE html>\n)/i, '$1<!-- Gerado por scripts/build-en.js a partir de index.html. Não edite à mão. -->\n'),
);
console.log('en/index.html gerado');
