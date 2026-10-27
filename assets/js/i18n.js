/* ═══════════════════════════════════════════════════
   i18n.js — alternância PT-BR / EN
   Elementos com data-i18n="chave" recebem o texto (HTML) da chave.
   data-i18n-attr="atributo:chave;atributo:chave" traduz atributos.
   O HTML já vem em português; o dicionário pt existe para voltar.
═══════════════════════════════════════════════════ */

const I18N = {
  pt: {
    'meta.title':       'Gilmar Filho · Automação & Sistemas',
    'meta.titleBs':     'Gilmar Filho · Automação & Sistemas (Bootstrap)',
    'meta.description': 'Gilmar Filho — automação de processos e sistemas inteligentes com Google Planilhas, Apps Script, Python e Telegram.',

    'ui.nav':   'Navegação principal',
    'ui.lang':  'Mudar idioma para inglês',
    'ui.theme': 'Alternar tema',
    'ui.menu':  'Menu de navegação',

    'nav.about':     'Sobre',
    'nav.freelance': 'Freelance',
    'nav.projects':  'Projetos',
    'nav.contact':   'Contato',

    'hero.kicker':    'Desenvolvedor · Lavras, MG',
    'hero.lede':      '<em>Automação de processos</em> e sistemas inteligentes.<br>Transformo tarefas manuais em fluxos automáticos integrados com ferramentas que as pessoas já usam.',
    'hero.available': 'Disponível para novos projetos',
    'hero.scroll':    'role para explorar',

    'win.t1': '✓ conectando à planilha...',
    'win.t2': '✓ importando 347 transações',
    'win.t3': '✓ projetando parcelas...',
    'win.t4': '✓ relatório gerado em 2.3s',
    'win.cap1': 'Automação financeira',
    'win.cap2': 'Controle de métricas',
    'win.cap3': 'Gestão de estoque',
    'win.cap4': 'Sistemas distribuídos',
    'win.dash1': 'Importações / mês',
    'win.dash1v': '347 registros',
    'win.dash2': 'Cartões monitorados',
    'win.dash2v': '6 cartões',
    'win.dash3': 'Alertas esta semana',
    'win.dash3v': '12 alertas',
    'win.colProduct': 'Produto',
    'win.colQty': 'Qtd',
    'win.cement': 'Cimento',
    'win.brick': 'Tijolo',
    'win.sand': 'Areia',
    'win.lime': 'Cal',
    'win.low': '⚠ Baixo',

    'about.kicker': 'Sobre mim',
    'about.title':  'Sistemas simples<br>que funcionam de verdade',
    'about.place':  'Lavras, MG',
    'about.study':  'UFLA · SI · 7º período',
    'about.free':   'Freelance disponível',
    'about.p1': 'Olá, sou <strong>Gilmar Filho</strong>, estudante de Sistemas de Informação na UFLA (7º período). Trabalho construindo automações para quem procura ganhar tempo delegando a um sistema suas tarefas repetitivas.',
    'about.p2': 'Minha especialidade é transformar processos manuais em fluxos automáticos — usando <strong>Google Planilhas</strong> com Apps Script, <strong>Python</strong> e integrações com ferramentas que as pessoas já usam no dia a dia, como o Telegram.',
    'about.p3': 'O que guia cada projeto é uma escolha deliberada: <strong>entregar o que resolve com qualidade, não o que impressiona com quantidade</strong>. Um sistema com 3 funcionalidades que o usuário usa todos os dias vale mais do que um sistema "completo" que no fim vira um peso.',

    'pill.sheets': 'Google Planilhas',

    'fl.kicker':     'Freelance',
    'fl.title':      'Automações feitas para clientes reais',
    'fl.label':      'projetos / cliente',
    'fl.tab0':       'Consultoria <br>Financeira',
    'fl.tab1':       'Follow-Up <br>Engenheiro Civil',
    'fl.tab2':       'Gestão de Estoque <br>via Telegram',
    'fl.inUse':      'em uso',
    'fl.validation': 'validação',

    'fl.p0.title': 'Consultoria e Automação Financeira',
    'fl.p0.stack': 'Google Planilhas · Apps Script',
    'fl.p0.badge': 'Concluído · Em uso',
    'fl.p0.desc':  'Empresa com alto volume de transações bancárias e múltiplos cartões, controlando tudo manualmente em planilha. Quatro automações entregues e em uso ativo.',
    'fl.p0.f1':    'Importação de Extratos',
    'fl.p0.f1d':   'Dados de <code>.csv</code>, <code>.ofx</code> e <code>.xlsx</code> em segundos.',
    'fl.p0.f2':    'Projeção de Parcelas',
    'fl.p0.f2d':   'Reconhece padrão de parcelamento e lança compromissos futuros automaticamente.',
    'fl.p0.f3':    'Resumo por Cartão',
    'fl.p0.f3d':   'Identifica em quais meses cada cartão foi utilizado.',
    'fl.p0.f4':    'Tradução do Template',
    'fl.p0.f4d':   'Template financeiro para inglês norte-americano para venda internacional.',

    'fl.p1.title': 'Sistema de Follow-Up para Engenheiro Civil',
    'fl.p1.stack': 'Google Planilhas · Telegram Bot API',
    'fl.p1.badge': 'Em uso · Evoluindo',
    'fl.p1.desc':  'Engenheiro com dificuldade em controlar prazos de serviços e lembretes para verificar processos no TRE — tarefa recorrente que ficava perdida na rotina.',
    'fl.p1.f1':    'Alertas de prazo',
    'fl.p1.f1d':   'Notificação automática quando um serviço está próximo da data de entrega.',
    'fl.p1.f2':    'Lembretes de revisão',
    'fl.p1.f2d':   'Aviso quando um processo no TRE não foi verificado há tempo demais.',

    'fl.p2.title':   'Gestão de Estoque via Telegram',
    'fl.p2.stack':   'Google Planilhas · Webhook · Telegram Bot',
    'fl.p2.badge':   'Aguardando validação',
    'fl.p2.desc':    'Loja de materiais de construção gerenciada "de cabeça". A gerente tem pouco tempo e baixa tolerância para sistemas com fluxos longos.',
    'fl.p2.callout': '<strong>Solução sem interface:</strong> Google Planilhas como base de dados invisível ao usuário — integrada a um bot no Telegram. Cadastro, entradas, saídas e alertas de reposição pelo app que a cliente já usa. Zero tela de sistema, zero treinamento. Tudo adaptado ao fluxo diário da cliente.',

    'proj.kicker': 'Projetos Técnicos',
    'proj.title':  'Capacidade técnica na prática',
    'proj.aside':  'Projetos acadêmicos que demonstram<br>o que está por baixo das soluções.',
    'proj.done':   'Concluído',
    'proj.repo':   'Repositório',
    'proj.play':   'Jogar',
    'proj.code':   'Código',

    'proj.niad.meta': 'Sistemas Distribuídos · UFLA',
    'proj.niad.desc': 'Áudios de reuniões via Telegram → Whisper (Docker) → sumarização com Gemini API via LangChain. API Gateway em Express.js orquestra microserviços isolados em containers.',
    'proj.ai.title':  'Algoritmos de IA',
    'proj.ai.meta':   'Inteligência Artificial · UFLA',
    'proj.ai.desc':   'KNN, K-Means e MLP implementados do zero e com Scikit-learn para comparação direta. Métricas: acurácia, precisão, revocação, silhouette score, matrizes de confusão.',
    'proj.db.title':  'Banco de Dados — RPG',
    'proj.db.meta':   'Sistemas de BD · UFLA',
    'proj.db.desc':   'BD relacional completo com herança, triggers, views e stored procedures. Interface em PHP. Consultas avançadas: JOINs, subqueries, UNION, EXISTS.',
    'proj.game.title': 'Jogo da Memória',
    'proj.game.meta':  'Programação Web · UFLA',
    'proj.game.desc':  '4×4 a 10×10, flip 3D em CSS puro, ranking persistente, responsivo. Zero dependências. Estado global, DOM cacheado, responsabilidade única.',

    'contact.kicker': 'Contato',
    'contact.title':  'Vamos<br><span class="title-accent">conversar!</span>',
    'contact.lede':   'Sem compromisso. Me conta o que está travando no seu trabalho e vejo se consigo ajudar.',
    'contact.email':  'E-mail',
    'contact.toBs':   'Versão acadêmica (Bootstrap) →',
    'contact.toTw':   '← Versão principal (Tailwind)',
    'footer':         '&copy; 2026 Gilmar Filho. Todos os direitos reservados.',
  },

  en: {
    'meta.title':       'Gilmar Filho · Automation & Systems',
    'meta.titleBs':     'Gilmar Filho · Automation & Systems (Bootstrap)',
    'meta.description': 'Gilmar Filho — process automation and intelligent systems with Google Sheets, Apps Script, Python and Telegram.',

    'ui.nav':   'Main navigation',
    'ui.lang':  'Switch language to Portuguese',
    'ui.theme': 'Toggle theme',
    'ui.menu':  'Navigation menu',

    'nav.about':     'About',
    'nav.freelance': 'Freelance',
    'nav.projects':  'Projects',
    'nav.contact':   'Contact',

    'hero.kicker':    'Developer · Lavras, Brazil',
    'hero.lede':      '<em>Process automation</em> and intelligent systems.<br>I turn manual tasks into automated workflows built on the tools people already use.',
    'hero.available': 'Available for new projects',
    'hero.scroll':    'scroll to explore',

    'win.t1': '✓ connecting to spreadsheet...',
    'win.t2': '✓ importing 347 transactions',
    'win.t3': '✓ projecting installments...',
    'win.t4': '✓ report generated in 2.3s',
    'win.cap1': 'Financial automation',
    'win.cap2': 'Metrics tracking',
    'win.cap3': 'Inventory management',
    'win.cap4': 'Distributed systems',
    'win.dash1': 'Imports / month',
    'win.dash1v': '347 records',
    'win.dash2': 'Cards monitored',
    'win.dash2v': '6 cards',
    'win.dash3': 'Alerts this week',
    'win.dash3v': '12 alerts',
    'win.colProduct': 'Product',
    'win.colQty': 'Qty',
    'win.cement': 'Cement',
    'win.brick': 'Brick',
    'win.sand': 'Sand',
    'win.lime': 'Lime',
    'win.low': '⚠ Low',

    'about.kicker': 'About me',
    'about.title':  'Simple systems<br>that actually work',
    'about.place':  'Lavras, MG, Brazil',
    'about.study':  'UFLA · Information Systems · 6th semester',
    'about.free':   'Open to freelance work',
    'about.p1': 'Hi, I\'m <strong>Gilmar Filho</strong>, an Information Systems student at UFLA (Federal University of Lavras), now in my 6th semester. I build automations for people who want their time back by handing repetitive tasks over to a system.',
    'about.p2': 'My specialty is turning manual processes into automated workflows — using <strong>Google Sheets</strong> with Apps Script, <strong>Python</strong>, and integrations with tools people already use every day, like Telegram.',
    'about.p3': 'Every project follows a deliberate choice: <strong>deliver what solves the problem well, not what impresses through volume</strong>. A system with 3 features the user relies on every day is worth more than a "complete" system that ends up as dead weight.',

    'pill.sheets': 'Google Sheets',

    'fl.kicker':     'Freelance',
    'fl.title':      'Automations built for real clients',
    'fl.label':      'client projects',
    'fl.tab0':       'Financial <br>Consulting',
    'fl.tab1':       'Civil Engineer <br>Follow-Up',
    'fl.tab2':       'Inventory Management <br>via Telegram',
    'fl.inUse':      'in use',
    'fl.validation': 'in review',

    'fl.p0.title': 'Financial Consulting & Automation',
    'fl.p0.stack': 'Google Sheets · Apps Script',
    'fl.p0.badge': 'Completed · In use',
    'fl.p0.desc':  'A company with a high volume of bank transactions and multiple credit cards, tracking everything by hand in a spreadsheet. Four automations delivered and in active use.',
    'fl.p0.f1':    'Statement Import',
    'fl.p0.f1d':   'Data from <code>.csv</code>, <code>.ofx</code> and <code>.xlsx</code> files in seconds.',
    'fl.p0.f2':    'Installment Projection',
    'fl.p0.f2d':   'Detects installment patterns and books future payments automatically.',
    'fl.p0.f3':    'Per-Card Summary',
    'fl.p0.f3d':   'Shows which months each card was used in.',
    'fl.p0.f4':    'Template Translation',
    'fl.p0.f4d':   'Financial template translated into US English for international sale.',

    'fl.p1.title': 'Follow-Up System for a Civil Engineer',
    'fl.p1.stack': 'Google Sheets · Telegram Bot API',
    'fl.p1.badge': 'In use · Evolving',
    'fl.p1.desc':  'An engineer struggling to keep track of service deadlines and reminders to check cases at the TRE (Regional Electoral Court) — a recurring task that kept getting lost in the routine.',
    'fl.p1.f1':    'Deadline alerts',
    'fl.p1.f1d':   'Automatic notification when a service is close to its due date.',
    'fl.p1.f2':    'Review reminders',
    'fl.p1.f2d':   'A heads-up when a TRE case hasn\'t been checked in too long.',

    'fl.p2.title':   'Inventory Management via Telegram',
    'fl.p2.stack':   'Google Sheets · Webhook · Telegram Bot',
    'fl.p2.badge':   'Awaiting validation',
    'fl.p2.desc':    'A building supply store managed "from memory". The manager has little time and little patience for systems with long workflows.',
    'fl.p2.callout': '<strong>A solution with no interface:</strong> Google Sheets as a database the user never sees, connected to a Telegram bot. Product registration, stock in, stock out and restock alerts all happen in the app the client already uses. No system screens, no training. Everything fits the client\'s daily routine.',

    'proj.kicker': 'Technical Projects',
    'proj.title':  'Technical skills in practice',
    'proj.aside':  'Academic projects that show<br>what\'s under the hood of the solutions.',
    'proj.done':   'Completed',
    'proj.repo':   'Repository',
    'proj.play':   'Play',
    'proj.code':   'Code',

    'proj.niad.meta': 'Distributed Systems · UFLA',
    'proj.niad.desc': 'Meeting audio via Telegram → Whisper (Docker) → summarization with the Gemini API via LangChain. An Express.js API Gateway orchestrates microservices isolated in containers.',
    'proj.ai.title':  'AI Algorithms',
    'proj.ai.meta':   'Artificial Intelligence · UFLA',
    'proj.ai.desc':   'KNN, K-Means and MLP implemented from scratch and with Scikit-learn for a direct comparison. Metrics: accuracy, precision, recall, silhouette score, confusion matrices.',
    'proj.db.title':  'Database — RPG',
    'proj.db.meta':   'Database Systems · UFLA',
    'proj.db.desc':   'A complete relational database with inheritance, triggers, views and stored procedures. PHP interface. Advanced queries: JOINs, subqueries, UNION, EXISTS.',
    'proj.game.title': 'Memory Game',
    'proj.game.meta':  'Web Programming · UFLA',
    'proj.game.desc':  '4×4 to 10×10 boards, 3D flip in pure CSS, persistent leaderboard, responsive. Zero dependencies. Global state, cached DOM, single responsibility.',

    'contact.kicker': 'Contact',
    'contact.title':  'Let\'s<br><span class="title-accent">talk!</span>',
    'contact.lede':   'No strings attached. Tell me what\'s holding up your work and I\'ll see if I can help.',
    'contact.email':  'Email',
    'contact.toBs':   'Academic version (Bootstrap) →',
    'contact.toTw':   '← Main version (Tailwind)',
    'footer':         '&copy; 2026 Gilmar Filho. All rights reserved.',
  },
};

(() => {
  const html = document.documentElement;
  const KEY  = 'lang';

  function apply(lang) {
    const dict = I18N[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.innerHTML = dict[el.dataset.i18n];
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      el.dataset.i18nAttr.split(';').forEach(pair => {
        const [attr, key] = pair.split(':');
        el.setAttribute(attr, dict[key]);
      });
    });

    html.lang = lang === 'pt' ? 'pt-BR' : 'en';
    html.dataset.lang = lang;
  }

  const preferred = localStorage.getItem(KEY)
    || (navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en');

  if (preferred !== 'pt') apply(preferred);

  document.querySelector('.lang-switch')?.addEventListener('click', () => {
    const next = html.dataset.lang === 'pt' ? 'en' : 'pt';
    apply(next);
    localStorage.setItem(KEY, next);
  });
})();
