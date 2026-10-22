# codebyabi.github.io

Portfolio of Abira Wisnunggal (Abi), AI engineer. Live at https://codebyabi.github.io/

A static site with no build step and no dependencies, served as-is by GitHub Pages.

```
index.html                 the portfolio
case-study-smartfaq.html   DemoLabs AI Chatbot case study (filename is historical)
css/style.css              all styles
js/main.js                 nav, accordion, project modal, contact form, demo walkthrough
assets/img/                photos, logos, project images
assets/pdf/                CV (abi-wisnunggal-cv.pdf)
assets/vid/                local copy of the demo video (Git LFS, not served; the site links YouTube)
site.webmanifest           name, theme colour and icon
PRODUCT.md                 who the site is for and what it must never fake
DESIGN.md                  the design system
AGENTS.md                  rules for anyone (or any agent) editing the repo
.impeccable/               design-tool config and saved critiques
```

## Preview

Open `index.html`, or serve the folder with any static server (for example
`python -m http.server 8765`, then visit http://127.0.0.1:8765/).

## How it behaves

- **Contact form** posts to Formspree. If the request fails it falls back to opening the
  visitor's email app, and says so.
- **RAG demo** is a scripted walkthrough of the pipeline stages. No model is called, and the
  section says so before anything runs.
- **Motion** is limited to a few places (the demo stages, the experience accordion, the project
  figures and the project modal) and all of it respects `prefers-reduced-motion`.
- **Phones and touch**: every control has at least a 44px tap area, and the layout was checked
  at 320px, 390px, an 820px tablet and phone landscape.

## Before you change things

- Read [AGENTS.md](AGENTS.md) before touching anything near the hero. Its alignment rule is
  easy to break and is verified by measurement, not by eye.
- Every number and credential on the page must trace to something stated elsewhere in the repo.
  [PRODUCT.md](PRODUCT.md) explains why: no "Verified" badges, no placeholder demo links, no
  invented images.
- The design system is documented in [DESIGN.md](DESIGN.md). Its front matter still lists an older
  display font; the CSS is the source of truth.
- Do not commit throwaway test files such as `_shot.html` or `_measure.html`.
