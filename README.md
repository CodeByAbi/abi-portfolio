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

## Go Live (VS Code)

1. Install the **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Done!

## Update contact links

In `index.html`, search for:
- `abirawisnunggal@email.com` → replace with your real email
- `linkedin.com/in/abirawisnunggal` → replace with your real LinkedIn URL
- `github.com/abirawisnunggal` → replace with your real GitHub URL
