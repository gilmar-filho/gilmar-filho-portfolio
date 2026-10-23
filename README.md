# Gilmar Filho | Portfólio Profissional

Portfólio pessoal desenvolvido para apresentar minhas habilidades em Engenharia de Software, Automação e Sistemas Distribuídos. O projeto foi construído com foco em responsividade, UI/UX moderno e boas práticas de desenvolvimento web.

## 🏗️ Arquitetura do Projeto

Este repositório atende a um requisito acadêmico (disciplina de Programação Web - UFLA) de demonstrar proficiência em diferentes ecossistemas CSS. Por isso, o projeto é dividido em duas versões espelhadas, visualmente idênticas:

* **Versão Principal (Raiz):** layout e tipografia com utilitários do **Tailwind CSS v3**.
* **Versão Acadêmica (`/bootstrap-version/`):** layout com o sistema de grid e os utilitários do **Bootstrap 5.3**.

As duas versões compartilham a identidade visual e o comportamento: tokens de cor, escala tipográfica, componentes e efeitos ficam em `assets/css/portfolio.css`, e os scripts em `assets/js/` são carregados pelas duas páginas. Os breakpoints do Tailwind foram configurados iguais aos do Bootstrap para que as duas quebrem nos mesmos pontos.

```
├── index.html                  # versão Tailwind
├── bootstrap-version/
│   └── index.html              # versão Bootstrap
├── assets/
│   ├── css/
│   │   ├── global.css          # entrada do Tailwind
│   │   ├── tailwind-out.css    # CSS compilado (gerado)
│   │   ├── portfolio.css       # tokens, tipografia e componentes compartilhados
│   │   └── bootstrap-style.css # ponte entre o Bootstrap e a identidade
│   ├── js/
│   │   ├── theme.js            # tema claro/escuro
│   │   ├── i18n.js             # tradução PT-BR / EN
│   │   ├── hero.js             # rede animada, cursor, abas
│   │   ├── scroll.js           # cabeçalho e link ativo
│   │   └── reveal.js           # esmaecimento ligado à rolagem
│   └── img/
└── tailwind.config.js
```

## 🛠️ Tecnologias Utilizadas

* **Linguagens:** HTML5, CSS3, JavaScript
* **Frameworks/Bibliotecas CSS:** Tailwind CSS v3, Bootstrap 5.3
* **Ícones e Tipografia:** Phosphor Icons, Google Fonts (DM Sans, JetBrains Mono)

## ✨ Funcionalidades

* **Alternância PT-BR / EN:** switch no cabeçalho. Na primeira visita usa o idioma do navegador; a escolha fica salva no `localStorage`. Os textos ficam em `assets/js/i18n.js` e são aplicados nos elementos com `data-i18n`.
* **Tema claro/escuro:** respeita a preferência do sistema e guarda a escolha no `localStorage`.
* **Rolagem nativa com esmaecimento:** a opacidade acompanha a posição na tela. O conteúdo surge esmaecido pela borda inferior e esmaece de novo ao se aproximar do topo, nos dois sentidos da rolagem. O cabeçalho destaca a seção atual.
* **Efeitos visuais:** janelas em cascata no hero, rede animada em canvas, cursor personalizado e brilho que segue o mouse nos cards.
* **Acessibilidade:** foco visível no teclado e animações desativadas para quem usa `prefers-reduced-motion`.

## 🚀 Rodando localmente

O site é estático, sem etapa de build para visualizar. Sirva a pasta com qualquer servidor HTTP, por exemplo:

```bash
python3 -m http.server 8000
```

* Versão Tailwind: http://localhost:8000/
* Versão Bootstrap: http://localhost:8000/bootstrap-version/

Depois de alterar classes no `index.html`, recompile o CSS do Tailwind:

```bash
npm install
npx tailwindcss -i assets/css/global.css -o assets/css/tailwind-out.css --watch
```

## 💼 Projetos Destacados no Portfólio

O portfólio documenta meus principais trabalhos e experimentos:

1.  **Freelance:** consultoria e automação financeira, sistema de follow-up para engenheiro civil e gestão de estoque via Telegram (Google Sheets, Apps Script, Telegram Bot API).
2.  **NiadAgent:** automação de transcrição e sumarização de reuniões (Docker, Whisper, Telegram API, Gemini API, LangChain).
3.  **Algoritmos de IA:** KNN, K-Means e MLP implementados do zero e comparados com Scikit-learn.
4.  **Banco de Dados — RPG:** BD relacional com herança, triggers, views e stored procedures, com interface em PHP.
5.  **Jogo da Memória:** estudo prático de manipulação de DOM e estado em JavaScript puro.
