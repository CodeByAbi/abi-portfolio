---
name: Abi Portfolio
description: Warm-paper editorial portfolio for an AI engineer — Clash Display headlines, Satoshi body, JetBrains Mono instrumentation, one restrained gold accent.
colors:
  paper: "#f8f7f4"
  card-white: "#ffffff"
  ink-dark: "#111110"
  ink-primary: "#1a1918"
  ink-secondary: "#3d3b38"
  ink-tertiary: "#7a7772"
  ink-quaternary: "#b0ada8"
  gold: "#b8924a"
  gold-light: "#d4aa6a"
  hairline: "#e5e3de"
  hairline-strong: "#cac8c2"
typography:
  display:
    fontFamily: "'Clash Display', sans-serif"
    fontSize: "clamp(48px, 7.2vw, 94px)"
    fontWeight: 700
    lineHeight: 0.88
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Clash Display', sans-serif"
    fontSize: "clamp(30px, 4.2vw, 58px)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  section-title:
    fontFamily: "'Clash Display', sans-serif"
    fontSize: "clamp(36px, 4.5vw, 58px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  title:
    fontFamily: "'Clash Display', sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "'Satoshi', sans-serif"
    fontSize: "16px"
    lineHeight: 1.82
  body-dense:
    fontFamily: "'Satoshi', sans-serif"
    fontSize: "13.5px"
    lineHeight: 1.72
  label:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: "11px"
    fontWeight: 400
    letterSpacing: "0.08em"
rounded:
  hairline: "2px"
  control: "4px"
  card: "8px"
  pill: "999px"
  portrait: "22px"
spacing:
  section: "112px 48px"
  section-tablet: "80px 24px"
  section-mobile: "68px 18px"
  gutter-wide: "80px"
  gutter-standard: "20px"
  gutter-tight: "8px"
components:
  button-primary:
    backgroundColor: "{colors.ink-primary}"
    textColor: "{colors.card-white}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "14px 30px"
  button-primary-hover:
    backgroundColor: "#000000"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink-primary}"
    borderColor: "{colors.hairline-strong}"
    borderWidth: "1.5px"
    rounded: "{rounded.hairline}"
    padding: "14px 30px"
  button-secondary-hover:
    borderColor: "{colors.ink-primary}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  chip-skill-python:
    backgroundColor: "#edf5ff"
    textColor: "#1f4d9e"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.card}"
    padding: "24px"
  input:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.control}"
    padding: "12px 16px"
---

# Design System: Abi Portfolio

Documentation of the design system **as implemented** in `css/style.css`, `index.html`, and `js/main.js`.

> **No `PRODUCT.md` exists in this repository.** Every statement below was inferred from the shipped code, not from a stated product brief. Where intent is not recoverable from code, it is marked as an open gap rather than filled in. See [Open gaps](#open-gaps).

## Overview

**Creative North Star: "The Dossier"**

A single-page portfolio presented as a warm, paper-toned engineering dossier. The visual argument is that the work speaks for itself: a near-monochrome ink-on-paper base carries almost the entire page, hairline rules and a faint 64px grid establish structure, and a single muted gold (`#b8924a`) is spent on exactly one job per component — a leading rule, a hover accent, an issuer name, a focus ring. Nothing glows for decoration. The one moment of real depth is the hero portrait, where a translucent gold-tinted plate floats behind an inset white-framed photograph.

Two systems do most of the work. **Newsreader** carries identity — an editorial serif, tightly-tracked (`-0.025em`), holding the display tier (hero name, hero headline, and every section title) as solid slabs. **JetBrains Mono** carries instrumentation — every label, section number, date, credential ID, tag, and status chip is monospaced, small, and letterspaced, so metadata is visually separable from prose at a glance without needing a different container. Satoshi sits between them for everything readable. **Clash Display** is retained for the card tier (`.proj-title`, `.cert-name`, `.honor-title`, `.exp-role`) and the logo, where a geometric grotesque is doing a different job from the serif's display role — so the page runs serif-for-statement, geometric-for-objects, mono-for-facts.

Motion is quiet and one-directional: content rises into place on a single fast-out easing, cards acknowledge hover with a border and shadow change rather than moving, buttons press with a `scale(.98)`, and the decorative loops are the portrait plate's drift and the ambient blob's 26s parallax-free drift.

> **De-slop pass (2026-10), and its partial reversal.** An earlier iteration layered eight decorative systems: `.cursor` + `.cursor-trail`, `.noise`, `.grid-bg` (with scroll/mouse parallax), `.aurora` (a 200vh gradient substrate), `.hero-circle`, `.footer-glow`, and a `.scroll-track` scan line — driven by four JavaScript loops. Stacked together they read as generated rather than art-directed, and they cost real work: every `backdrop-filter` surface was forced to re-composite against a moving gradient.
>
> **Three of the eight are now back, deliberately and in a different shape.** A protocol adoption pass reintroduced section depth (a 64px hairline grid, warm grain, and one slow radial blob) and muted pastel chips. Both reversals are documented in full in [Protocol adoption](#protocol-adoption-and-the-three-reversals) — including why the reintroduced versions are *not* the ones that were removed. The remaining five (`.cursor`/`.cursor-trail`, `.aurora`, `.hero-circle`, `.footer-glow`, `.scroll-track`) stay gone. **Do not reintroduce those five without a specific reason.**

**Key Characteristics:**
- Warm off-white paper (`#f8f7f4`) base; dark ink is the only contrast, gold is the only accent.
- Every piece of metadata is monospaced and letterspaced — a hard typographic split between "what I said" and "about the thing."
- Borders are 1.5px `--line` on cards and controls; hover swaps them to `--ink`, never to gold.
- Generous vertical rhythm (112px section padding) with no spacing scale — raw px everywhere.
- Decorative motion runs on 2s–8s alternate loops; content motion is 0.15s–1s and fires once.

## Colors

A near-monochrome warm-neutral palette. One accent hue (gold) plus a functional green for verified states, one red for errors, and a set of pastel chip tints used only to color-code skills, tags, and certificate subjects.

### Primary

- **Ink Primary** (`#1a1918`): body text, button fills, solid icon buttons, the logo. The system's anchor — every solid surface is this color.
- **Ink Dark** (`#111110`): the footer and modal overlay scrim (`rgba(17,17,16,.6)`). A separate darker step so full-bleed dark surfaces don't flatten into the nav.

### Neutral

- **Paper** (`#f8f7f4`): the page background, and the fill for nested surfaces inside cards (chips, pipeline, answer box) so they read as inset without a shadow.
- **Card White** (`#ffffff`): every raised surface — `.stack-card`, `.exp-card`, `.proj-card`, `.cert-card`, `.pg-shell`, `.modal-box`, inputs.
- **Ink Secondary** (`#3d3b38`): hero display-adjacent text (`--hero-role`, `--hero-name`) and long-form body copy in About and modals.
- **Ink Tertiary** (`#7a7772`): secondary descriptions — `.hero-desc`, `.proj-desc`, `.exp-preview`, `.cert-desc`.
- **Ink Quaternary** (`#b0ada8`): hairline metadata — section labels, dates, index numbers, arrow glyphs, scroll cue. **Rarely used for text at rest**; see the contrast rule below.
- **Hairline** (`#e5e3de`): the default 1px border and grid line color.
- **Hairline Strong** (`#cac8c2`): border on resting interactive controls (`.btn-outline`, `.cert-btn`, `.pg-chip`) and the scrollbar thumb.

### Tertiary (accent)

- **Gold** (`#b8924a`): the single accent. `.sec-label::before` rule, `.nav-logo em` period, `.honor-pill` tint, `.proj-metrics li::marker`, hover states on `.stack-row` / `.honor-item::after`, `.hero-proof-award` fill, and the global focus outline. **Structure only** — never body or label text (see `--gold-ink`).
- **Gold Ink** (`#8a6a24`): the text-safe step of the same hue, 5.04:1 on white. Used wherever gold *is* the text colour or sits behind white text: `.exp-company`, `.cert-issuer`, `.honor-org`, `.modal-sub`, `.about-em`, `.nav-logo em`, `.pg-disclaimer a`, `.hero-proof-award`, `.proj-card:hover .proj-cta`, and the `.pg-step-active .pg-step-ico` fill (white on `--gold` is 2.90:1). `--gold` on paper is 2.70:1 and on white 2.90:1, both failing WCAG 1.4.3. The Restrained Gold Rule is unchanged — one gold element per component — only the *step* is darker where it is set as type or used as a fill. What legitimately stays plain `--gold`: `.sec-label::before`, the `.nav-logo em` period's siblings, `.exp-list li::before` and `.proj-metrics li::marker` (list glyphs), `.honor-item::after`, `.stack-card`'s top rule, `.pg-step-active` borders, and the focus ring.
- **Gold Light** (`#d4aa6a`): footer logo accent and the `.hero-status-badge` tint. The `.stack-row:hover` border and the `.footer-glow` line gradient that also used it are gone.
- **Verified Green** (`#22c55e`): `.cert-badge` dot, `.pg-step-done`, `.form-status.success` (`#166534` text on `#e9f8ed`), `.cert-status-verified`.
- **Error Red** (`#b91c1c`): `.f-err`, `.f-inp.invalid` / `.f-txt.invalid` border, `.form-status.error`.
- **Chips carry a domain, not a hue.** Every chip has a `data-d` key (`ai` / `llm` / `data` / `infra`) and one of four muted pastels. The four colours map onto the domains the `.stack-card` definition list already establishes, so the hue repeats information the reader gets elsewhere. Measured contrast 4.62:1 – 6.26:1, all AA at 11px. The base chip treatment is unchanged: `999px` radius, `1px` border, 10–11px JetBrains Mono. **A chip added without a `data-d` renders as plain neutral and silently breaks the encoding** — full rationale in [Protocol adoption](#protocol-adoption-and-the-three-reversals).

### Named Rules

**The Restrained Gold Rule.** Gold marks structure, never decoration. One gold element per component: a leading 28×1px rule, one hover border, one issuer line, one focus ring. If a new component would use gold for a second purpose inside the same block, it should use `--ink` instead.

**The Ink Hover Rule.** Hovering an interactive element swaps its border to `--ink` (and often its background to `--ink` with `#fff` text). Gold appears in hover only where the element has no border to recolour — `.proj-cta` text.

**Cards do not move on hover.** `.proj-card`, `.cert-card`, `.exp-card`, and `.btn-*` previously translated upward (`-6px`, `-5px`, `-3px`). Card lifts are now removed: a full-width card that translates also drags the click target out from under the pointer mid-click, and six cards lifting in unison read as a template. Cards now respond with `border-color: var(--ink)` + `--sh-md`. Buttons keep a small `-2px`/`-3px` lift — they are small enough that the pointer stays inside them, and the movement gives real press feedback.

**The Contrast Floor Rule.** Three tiers now, and the split is deliberate:

- `--ink-3` is **`#6f6b66`, not `#7a7772`**. The old value was 4.16:1 on paper and failed WCAG 1.4.3, yet it carried real reading copy (`.hero-desc`, `.proj-desc`, `.cert-desc`, `.exp-preview`, `.pg-step-val`, and every neutral `.proj-tag`). Darkening the *token* fixed all of them at once instead of repainting a dozen selectors. 4.93:1 on paper, 5.29:1 on white.
- `--ink-4` (`#b0ada8`) is **decoration-only** — 2.09:1 on paper, 2.24:1 on white. It may not carry text. The override block at `:1375` repaints every metadata label that used it to `#6f6b66`. What legitimately stays `--ink-4`: `.scroll-track` (a 1px rule), `.pg-arrow` (an `aria-hidden` glyph), `.proj-img-placeholder .ph-ico` (an icon).
- `--gold-ink` replaces `--gold` wherever gold is set as type.

A late override block in `style.css` ("Increase micro typography readability and contrast") raises the metadata selectors to `11px / 0.08em` and then repaints them to `#6f6b66`. Its repaint list now also covers `.exp-body-label`, `.proj-cta`, `.cert-date`, `.stack-title`, `.honor-year`, `.honor-meta`, `.proj-img-placeholder`, and `.cert-img-placeholder`.

Three traps in that block, all of which have already bitten once:

- **Don't add `.proj-tag` to it.** The tinted `.proj-tag-*` variants sit later in source order at equal specificity, so a repaint rule there flattens all thirteen chip tints to grey. The neutral `.proj-tag` was fixed at its base declaration instead.
- **The playground cannot be fixed from there at all.** The `.pg-*` block sits *below* the override block, so `.pg-step-label`, `.pg-answer-label`, and `.pg-disclaimer` lose on source order at equal specificity. They are fixed at their own declarations. Anything added after `:1497` needs the same treatment.
- **The footer is a different surface.** `footer` is `--bg-dark` (`#111110`), so the light-surface repaint is wrong there. `.footer-copy` and `.footer-col-label` had been folded into that block and inherited `#6f6b66` — **3.57:1 on the dark ground**, a failure. Their original `rgba(255,255,255,.3/.4)` was worse at 2.68:1. They now carry `rgba(255,255,255,.5)` (→ ~`#888888`, 5.33:1) and `.footer-back` `rgba(255,255,255,.65)` (→ ~`#acacac`, 8.29:1, matching `.footer-link`). Keep any new footer metadata on a translucent white, never on the `--ink-*` ramp.

`.footer-big-text` is `rgba(255,255,255,.04)` at up to 180px and measures 1.09:1. That is intentional and **exempt** — it is a decorative watermark, not content, and the real name sits in `.footer-brand`. Do not "fix" it.

## Typography

**Display Font:** Newsreader, variable 200–800 with optical sizing (Google Fonts); Instrument Serif as fallback. Carries the display tier — hero name, hero headline, section titles. See [Protocol adoption](#protocol-adoption-and-the-three-reversals).
**Card Font:** Clash Display, weights 500/600/700 (Fontshare) — card titles and the logo.
**Body Font:** Satoshi, weights 400/500 (Fontshare)
**Label/Mono Font:** JetBrains Mono, weights 300/400/500 (Google Fonts)

**Character:** Clash Display is a geometric grotesque with tight apertures — it can hold `-0.05em` tracking and sub-1.0 line-height without falling apart, which is what lets a 94px name sit above a 58px tagline without shouting twice. Satoshi is a warm neo-grotesque that reads soft against the paper ground. JetBrains Mono is the system voice for anything that is a *fact* rather than a *sentence*: section numbers, dates, credential IDs, tech tags, statuses.

### Hierarchy

Implemented values are the **effective** ones after the cascade. Several hero sizes are declared in the base hero block and then re-declared in the later override block, both at single-class specificity, so the later value wins. Document the later one.

- **Display** — `.hero-nickname`: Clash Display 700, `clamp(48px, 7.2vw, 94px)`, line-height `0.88`, tracking `-0.02em`, `--ink`. The person's name. Base block had `clamp(36px, 6.2vw, 72px)`; the override raised the ceiling.
- **Headline (h1)** — `.hero-name`: Clash Display 600, `clamp(30px, 4.2vw, 58px)`, line-height `0.96`, tracking `-0.03em`, `--ink-2`. This carries the *promise*, not the name. Note the deliberate inversion: the `h1` is smaller and lighter than the `<p>` above it.
- **Section title** — `.about-title` / `.about-text h2`: Clash Display 700, `clamp(36px, 4.5vw, 58px)`, line-height `1.05`, tracking `-0.035em`, `--ink`. `.pg-title` is the small variant at `clamp(26px, 3.5vw, 44px)`. `.contact-heading` is `clamp(36px, 4.3vw, 58px)` / `0.95` / `-0.04em` with `text-wrap: balance`. **It is sized by its column, not by ambition.** Its markup carries a `<br>` after "Got a project", so the second line is the fixed string `or opportunity?`. At the previous `clamp(38px, 5vw, 68px)` that line measured wider than the ~492px `.contact-grid` track and wrapped *again*, stranding `or` alone on a third line. The ceiling is now 58px — which also ties `.contact-heading` to `.about-title` instead of out-shouting it. Measured 2 lines at both 1490px (58px in a 492px column, longest line 435.8px) and 1002px (43.1px in a 413px column, longest line 323.7px). **If the contact grid columns change, re-measure the line count before assuming two lines.**
- **Card title** — `.proj-title` Clash Display 600 `19px`/`1.2`; `.cert-name` `15px`/`1.3`; `.honor-title` `18px`/`1.25`; `.exp-role` `16px`; `.stack-domain` `16px`/`1.1`; `.modal-title` fixed `34px`/`-0.03em`; case-study `.case-title` `clamp(36px, 6.8vw, 72px)`.
- **Body** — `#about p` and `.about-text p`: Satoshi `16px` (base) / line-height `1.82`, `--ink-2`. Longer measures are capped by container width, not by a `ch` value: `.hero-desc` `700px`, `.section-intro` `760px`, `.pg-sub` `680px`, `.hero-copy` `720px`, `.honor-desc` `720px`, `.contact-sub` unconstrained inside a 1fr grid column.
- **Dense body** — `.proj-desc` and `.honor-desc` `13.5px`/`1.7`; `.exp-preview` and `.exp-list li` `13px`/`1.65`–`1.7`; `.cert-desc` `12px`/`1.55`; `.modal-p` `14.5px`/`1.8` (→ `15px` at ≤600px); `.proj-metrics` `14px`/`1.55`. `.honor-desc` carries an explicit `720px` max-width because `.honor-item` spans the full 1064px content column; uncapped it ran to ~1100px, the longest measure anywhere on the page. Every other prose block was already held to 680–760px — honors was the one that slipped through.
- **Label** — JetBrains Mono `400`, `11px`, `0.08em`, uppercase: `.sec-label`, `.nav-links a`, `.nav-btn`, `.h-stat .l`, `.exp-company`, `.exp-meta`, `.exp-body-label`, `.proj-num`, `.proj-tag`, `.proj-cta`, `.modal-bar-label`, `.modal-sub`, `.modal-sh`, `.flow-label`, `.cert-issuer`, `.cert-date`, `.honor-org`, `.c-label`, `.f-lbl`, `.footer-col-label`, `.footer-copy`, `.footer-back`.
- **Micro label (not caught by the override)** — `.pg-step-label` `9px`/`0.1em`, `.pg-answer-label` `9px`/`0.14em`, `.pg-disclaimer` `10px`/`0.04em`, `.cert-id` `10px`/`0.05em`, `.honor-meta` `10px`/`0.05em`, `.footer-col-label` letter-spacing `0.16em`. These are the smallest type on the site and step up to `12px` at ≤600px. All of them now sit on `#6f6b66`, **not** `--ink-4` — at 9–10px they have no size headroom left, so colour is the only remaining lever.

### Named Rules

**The Metadata Is Mono Rule.** If it can be dated, counted, named, or labelled, it is JetBrains Mono, uppercase, letterspaced. Never set a fact in Clash Display at body size.

**The Reversed Hero Rule.** The name renders first and largest; the `h1` beneath it is the smaller, lighter, lower-contrast statement. Do not "fix" this hierarchy by promoting the `h1` above `.hero-nickname` — the current order is the design.

## Layout

Desktop-first declarations with `max-width` overrides doing the responsive work. There is no spacing scale.

**Container.** `section { padding: 112px 48px; max-width: 1160px; margin: 0 auto; }`. Because the box-sizing reset is `border-box`, the 1160px includes the 48px gutters — content column is 1064px. `#hero` opts out with `.hero-section { max-width: none }` and centers an inner `.hero-shell { max-width: 1160px; margin: 0 auto }` instead. Footer and modal follow the same 1160px rule (`.footer-top`, `.footer-bottom`).

**Grids.** Two-column by default with `align-items: start`: `.exp-grid` and `.proj-grid` (`gap` 16px and 20px), `.contact-grid` and `.footer-top` (`gap: 80px`), `.cert-grid` (`repeat(3,1fr)`, `gap: 16px`), `.about-grid` (`minmax(0,1fr) minmax(350px,460px)`, `gap: 64px`, `align-items: stretch` — the base 80px/`1fr 440px` was replaced), `.about-kpi-grid` (`repeat(3,minmax(0,1fr))`, `gap: 10px`). The hero is `minmax(0, 1.05fr) minmax(360px, 430px)` at ≥1024px with `gap: clamp(36px, 5vw, 78px)`.

**Spacing — there is no scale.** No `--space-*` token exists. Only `--hero-media-inset: 16px` is tokenized. Everything else is a literal px value clustered around `8 / 10 / 12 / 14 / 16 / 18 / 20 / 24 / 26 / 32 / 40 / 44 / 48`. Rhythm comes from three repeating moves: section padding `112px 48px` → `80px 24px` → `68px 18px`; grid gaps at three tiers (`64–80px` between major halves, `16–20px` between cards, `6–12px` between inline elements); and card-internal padding at `20 / 24 / 26 / 32px`. Section separation is a `1px solid var(--line)` top border on `#about`, `#experience`, `#projects`, `#certificates`, `#honors`, `#playground`, `#contact` — not a color change.

**Page furniture.** Fixed 60px nav (`padding: 0 48px`) that gains `border-bottom-color: var(--line)` + `--sh-sm` past 24px of scroll. The nav is **opaque** (`background: var(--bg)`), not translucent. It was previously `rgba(248,247,244,.85)` + `blur(20px)`, which only made sense while a `.aurora` gradient layer sat behind it to refract — that layer is gone, so the blur was fog over flat paper and it made nav text contrast depend on whatever was scrolling underneath.

**Ambient background layers exist again, in a reduced form.** `body::before` carries a 64px hairline grid (`.028`) plus warm grain (`.022`), both static; `body::after` carries one warm radial blob at `.03` drifting on `transform` over `26s`. Both are `position: fixed`, `pointer-events: none`, `z-index: 0`, and the blob is killed in the reduced-motion block. There is still **no** `.aurora`, no `.cursor`/`.cursor-trail`, no `.hero-circle`, and no `.footer-glow` — and crucially no scroll or mouse parallax, which was the expensive part. See [Protocol adoption](#protocol-adoption-and-the-three-reversals). Content sits at `z-index: 1` on the `--bg` ground; opaque cards and the opaque footer hide the layer entirely. `body { overflow-x: hidden }` remains as a guard only.

**Breakpoints actually present in `css/style.css`:**

| Query | Scope | What changes |
|---|---|---|
| `min-width: 768px and max-width: 1023px` | `#hero` only | Two-column shell `1fr / minmax(260px,350px)`, `gap: 24px`, portrait `min(40vw, 330px)`, `min-height: auto`, scroll cue and stats hidden |
| `max-width: 960px` | site-wide (two blocks, `:804` and `:1394`) | `:804` — `section` → `80px 24px`, nav → `24px` padding, `.about-grid` / `.exp-grid` / `.proj-grid` / `.contact-grid` / `.footer-top` → 1 column, `.cert-grid` → 2 columns, `.hero-stats` / `.hero-scroll` hidden, honor timeline rail `120px` → `80px` (both the `::before` rule and the `::after` dot's `calc()`). `:1394` — hero `.hero-shell` → 1 column, `gap: 26px`, portrait `min(72vw, 330px)`, `.hero-section` → `24px` padding, `.about-kpi-grid` → 1 column, `.about-grid` → `gap: 34px`, `.nav-actions` hidden and `.nav-toggle` shown, `.hero-sub-ctas` gap `14px` |
| `max-width: 767px` | `#hero` only | `.hero-shell` → flex column, `align-items: center`, `gap: 22px`; hero copy centers; `.hero-name` → `clamp(26px, 8.2vw, 44px)`, `.hero-nickname` → `clamp(40px, 12vw, 64px)`, `.hero-desc` centered; portrait `min(82vw, 320px)`, `max-width: 320px` |
| `max-width: 600px` | site-wide (three blocks, `:819`, `:1425`, `:1702`/`:1705`) | `:819` — `.cert-grid` → 1 column, hero type → `clamp(32px, 13vw, 64px)` / `clamp(30px, 10vw, 54px)` / `clamp(17px, 6vw, 24px)`, `.footer-big-text` → `60px`. `:1425` — `section` → `68px 18px`, `#hero` → `92px / 52px`, CTAs full-width and centered, `.hero-status-badge` → `9px / .06em`, portrait → `min(86vw, 300px)` (this **overrides** the 767px value, since 600 comes later in source order), card/modal body padding → `18px`, `.exp-logo-slot` → `48px`, `.section-intro` → `13px`. `:1702`/`:1705` — `.pg-shell` → `16px`, metadata labels and chips → `12px` |
| `min-width: 1024px` | `#hero` only | Restores `min-height: 100vh`, `justify-content: center`, `padding: 104px / 72px`, two-column shell, portrait `min(34vw, 420px)` |
| `min-width: 1024px` and `max-height: 939px` | `.hero-proof` only | Hides the proof strip — see [Hero Proof Strip](#hero-proof-strip-heroproof) |
| `pointer: coarse` | global | *(the custom-cursor rule that lived here was removed — there is no custom cursor any more)* |
| `prefers-reduced-motion: reduce` | global | See [Motion](#motion-and-the-reduced-motion-contract) |

There is **no 1200px breakpoint and no 480px breakpoint** in this stylesheet. 1160px is a `max-width`, not a breakpoint. Note that `max-width: 960px` and `max-width: 767px` overlap confusingly — 767px only affects the hero, so the effective phone layout is assembled from 960 + 767 + 600 in that order.

> **Headless verification gotcha, cost an hour.** `--window-size` is *not* a device viewport, and `--dump-dom` emits nothing in this Chrome build. A request for `1280,420` rendered at `1258 × 266` — a viewport height that made `min-height: 100vh` meaningless and produced a false "hero overflows" reading. Measure inside a sized `<iframe>` instead (`--allow-file-access-from-files`), and **freeze the entrance animations first** — `[data-reveal]`, `.hero-name .word span`, and the `fadeSlide` elements all begin at `translateY(16px)`, so a probe that catches them mid-flight reports a 6–10px alignment error that does not exist. `--headless=new` fails silently; plain `--headless` works.

## Elevation & Depth

Shadows are present but rationed: four distinct treatments, all neutral black at low alpha, all used as a *response to state or elevation*, never at rest.

- **Ghost** (`--sh-sm`: `0 2px 8px rgba(0,0,0,.06)`) — the resting elevation of nested surfaces: `.stack-card` (`:329`), `.pg-shell` (`:1630`), `.about-kpi` (`:923`), `.exp-logo-slot` (`:1234`), the scrolled nav (`:105`), and hover lift on `.nav-links a` (`:134`), `.btn-outline`, `.c-link`.
- **Lift** (`--sh-md`: `0 6px 24px rgba(0,0,0,.09)`) — hover on `.exp-card` and `.cert-card`, and the `.exp-card.open` state.
- **Float** (`--sh-lg`: `0 16px 56px rgba(0,0,0,.12)`) — hover on `.proj-card` (which also rises `-6px`) and the resting `.modal-box` (`:453`).
- **Ad-hoc** — `.btn-solid:hover` `0 8px 24px rgba(0,0,0,.18)`, `.f-submit:hover` `0 8px 24px rgba(0,0,0,.2)`, `.hero-profile-ring` `0 24px 46px rgba(26,25,24,.16)`. These are hand-written, not tokens.

Depth is otherwise conveyed by **tonal layering rather than shadow**: `--bg` for the page, `#fff` for cards, `--bg` again for inset sub-panels (`.pg-pipeline`, `.flow-wrap`, `.pg-answer-box`, `.proj-tag`), so a panel nested in a card recedes without a border weight change.

**There are no translucent surfaces.** The nav, `.modal-bar`, `.modal-box`, `.nav-drawer`, and `.proj-card` were all glass (`backdrop-filter: blur() saturate()` over the aurora substrate). That whole system was removed: with no coloured layer behind it, blur over flat paper is fog, it costs a re-composite on every scroll frame, and it made text contrast depend on scroll position. All five surfaces are now opaque fills with a hairline border. The 2px `linear-gradient(90deg, var(--ink), var(--gold))` top rule on `.stack-card` is also gone — the stack card is now a hairline definition list (see [Tech Stack](#the-current-tech-stack-card)).

### Named Rules

**The Flat-At-Rest Rule.** No card has a shadow until hovered or opened. If you add a shadow to a resting surface, you are adding elevation the layout hasn't earned.

## Shapes

Corners are quiet and never fully rounded except on chips.

- **2px** (`--r2`) — the sharpest step, used only for rectangular action controls: `.btn-solid`, `.btn-outline`, `.nav-btn`, `.nav-link-ghost`, `.f-submit`, `.skip-link`.
- **4px** (`--r4`) — inputs and small controls: `.f-inp` / `.f-txt`, `.pg-input`, `.pg-submit`, `.c-link`, `.stack-row`, `.exp-toggle`, `.modal-close`, `.nav-toggle`, `.nav-drawer-close`, `.nav-drawer-links a`, `.proj-open-btn`.
- **8px** (`--r8`) — every full card: `.stack-card`, `.exp-card`, `.proj-card`, `.cert-card`, `.pg-shell`, `.flow-wrap`, `.pg-pipeline`, `.pg-answer-box`, `.modal-box`, `.about-kpi`.
- **999px** — every chip, tag, pill, and status badge: `.skill-chip`, `.proj-tag`, `.cert-tag`, `.pg-chip`, `.cert-btn`, `.honor-actions a`, `.proj-proof a`, `.honor-pill`, `.cert-status`, `.hero-status-badge`, `.stack-level`.
- **22px** — hero portrait only (`.hero-profile-ring`, `.hero-profile-frame`).
- **50%** — circular geometry: `.pg-step-ico`, `.c-icon`, and `.exp-logo-slot`.

The cursor pair (10px dot + 36px trail) and the `.hero-circle` orb were both removed in the de-slop pass, so 50% circular geometry is now the actual proportion rather than a target that included decoration.

Borders are `1px` for pure hairlines (`--line`), `1.5px` for anything interactive or card-like, `2px` for `.hero-status-badge`, `3px` for the gold focus outline and the `.exp-card` gold rail, `4px` for the white photo frame. The `4px` `.stack-row-*` category stripes are gone along with the coloured rails. The honors timeline is a 1px vertical rule at `left: 120px` (80px on mobile); the 8px dot that straddled that rule has been removed — a dot whose only job was to fill a hairline carried no information.

## Components

### Buttons

- **Shape:** 2px radius (`--r2`), no gradient, no icon dependency.
- **Primary** (`.btn-solid`): `--ink` background, `#fff` text, JetBrains Mono `11px` / `0.1em` uppercase, `padding: 14px 30px`, `transition: transform .2s var(--ease-s), box-shadow .2s, background .2s`.
- **Primary hover:** background `#000`, `translateY(-3px)`, `box-shadow: 0 8px 24px rgba(0,0,0,.18)`.
- **Secondary** (`.btn-outline`): transparent background, `--ink` text, `1.5px solid var(--line-2)`, same padding and type. Hover → `border-color: var(--ink)`, `translateY(-3px)`, `--sh-sm`. At rest it reads as secondary because of the pale border, not because of a lighter fill.
- **Submit** (`.f-submit`): primary treatment with `padding: 14px 32px`, `border: none`, `cursor: pointer`; hover `#000` + `0 8px 24px rgba(0,0,0,.2)`.
- **Pill actions** (`.cert-btn`, `.proj-proof a`, `.honor-actions a`, `.pg-chip`): 999px radius, `1px solid var(--line-2)`, `#fff` or `--bg` fill, hover → `border-color` and `color` both to `--ink`. `.cert-btn-primary` inverts to `--ink` fill / `#fff` text and hovers to `#000`.
- **Text CTA** (`.text-cta`, `.proj-cta`, `.footer-link`): no chrome at all. `.proj-cta` shifts its arrow by growing `gap` 8px → 14px and turning `--ink-4` → `--gold` on card hover.

### Chips / Tags

- **Neutral** (`.proj-tag`, `.cert-tag`, `.pg-chip`): `--bg` or `#faf9f6` / `#fff` fill, `1px solid var(--line)` or `--line-2`, `--ink-3` text, JetBrains Mono `9–11px`, `999px` radius, `padding: 4px 9px` to `6px 12px`.
- **Tinted** — the four `[data-d]` domain pastels (`.ai` yellow, `.llm` blue, `.data` green, `.infra` red), each a background + hue-tinted border + dark text triple. These are **the only tinted chips on the page**; there are no per-item or per-technology variants. The old `.skill-chip.skill-*` / `.proj-tag-*` / `.cert-tag-*` triples are gone.
- **Card status** (`.cert-status`): pill with `#f6f4ef` fill and `#d4d0ca` border; `.cert-status-verified` → `#e9f8ed` / `#86d39b` / `#166534`. This is the only place green appears as text.
- **Press feedback**: buttons and pill actions carry `:active { transform: scale(.98) }`. Hover already uses `translate` and press uses `scale`, so the two compose instead of fighting mid-gesture.
- **`.skill-chip:hover`** inverts fully: `--ink` background, `#fff` text, `translateY(-2px)`.

### Cards / Containers

- **Corner style:** 8px (`--r8`).
- **Background:** `#ffffff` (`--bg-card`). Nested panels inside a card use `--bg`.
- **Shadow strategy:** see [Elevation](#elevation--depth). Resting cards are flat; hover adds `--sh-md` (`.exp-card`, `.cert-card`) or `--sh-lg` + `translateY(-6px)` (`.proj-card`).
- **Border:** `1.5px solid var(--line)` at rest → `var(--line-2)` on hover. `.exp-card.open` escalates to `var(--ink)`.
- **Internal padding:** `.proj-body` `24px`, `.cert-body` `20px`, `.exp-head` `26px 26px 20px`, `.pg-shell` `32px` (→ `20px` → `16px` on tablet/phone).
- **Signature detail — `.exp-card::before`:** a 3px gold rail on the left edge, `transform: scaleY(0)` with `transform-origin: top`, expanding to `scaleY(1)` on hover or open over `.35s var(--ease-s)`. This is the one place gold acts as a state indicator rather than a label.
- **Media slots:** `.proj-img-slot` is a fixed `200px` band and `.cert-img-slot` `160px`, both `--bg` fill with a `1px` bottom border, `object-fit: cover`, and a `scale(1.04)` / `scale(1.05)` image zoom on card hover. `.proj-img-slot` carries `flex-shrink: 0` because `.proj-card` is a flex column.
- **`.proj-card` / `.proj-body` — the CTA-pinning pair, and a trap that already cost the primary project action.** `.proj-card` is `display: flex; flex-direction: column`; `.proj-body` is `flex: 1 1 auto; min-height: 0` with `margin-top: auto` on `.proj-open-btn`, so the "View Technical Details" button lands on the card's bottom edge and lines up across a grid row. **`.proj-body` must not carry `height: 100%`.** A percentage height resolves against the card's *full* content box, which already contains the 200px `.proj-img-slot` — so the body became as tall as the card instead of filling the space *beneath* the image, spilled ~200px past the card, and `.proj-card`'s `overflow: hidden` clipped the button out of existence. Since `[data-project-open]` is the **only** handler that opens the project modal (`js/main.js`) and `.proj-card` is `cursor: default` with no click handler, that silently made the flagship case study unreachable. Diagnose it with `card.scrollHeight > card.clientHeight + 1`, not by eye — the symptom is dead whitespace where the button should be.

### Inputs / Fields

- **Style:** `.f-inp`, `.f-txt`, `.pg-input` — `#ffffff` background, `1.5px solid var(--line)`, 4px radius, `padding: 12px 16px`, Satoshi `14px`, `outline: none`.
- **Focus:** `border-color: var(--ink)` plus `box-shadow: 0 0 0 3px rgba(26,25,24,.07)`. Globally, `a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible, .exp-trigger, .proj-open-btn, .nav-toggle, .nav-drawer-close` all get `outline: 3px solid var(--gold); outline-offset: 3px`.
- **Error:** `.f-inp.invalid` / `.f-txt.invalid` → `border-color: #b91c1c` + `0 0 0 3px rgba(185,28,28,.08)`, with a sibling `.f-err` message at `12px` / `#b91c1c`. Each `.f-grp` reserves `min-height: 16px` on the error node so validation doesn't shift the layout. Each control carries `aria-describedby` pointing at its own `.f-err`, and `aria-invalid` is toggled per field. `.form-status` is `min-height: 22px` with `role="status"` and `aria-live="polite"`.
- **Error summary:** `.f-summary` is a `role="alert" tabindex="-1"` block above the fields, `hidden` until a submit fails. On failure `validateContactForm()` populates it with one `<a href="#fieldId">` per invalid field, reusing each `.f-err`'s text as the item label so the two can never disagree, unhides it, and **moves focus to the summary rather than to the first input** — a screen reader then reads the problem and the whole failure list before the user starts fixing fields. Clicking a summary item focuses that field. Inline errors are retained, never replaced. Cleared by `clearAllErrors()` at the top of every validation pass.

### Navigation

- **Bar:** fixed, 60px tall, `rgba(248,247,244,.85)` + `blur(20px)`, transparent border until `scrollY > 24`, then `--line` + `--sh-sm`.
- **Logo:** Clash Display 700 `18px`, `-0.02em`, `AW` with the period in gold.
- **Links:** JetBrains Mono `11px` / `0.1em` uppercase, `--ink-3`. Hover, `.active` (set by an `IntersectionObserver` at `threshold: 0.35` over `section[id]`), and `:focus-visible` all go to `--ink` **and** grow a 1px gold `::after` rule from `width: 0` to `100%` over `.3s var(--ease-s)`.
- **Actions:** `.nav-link-ghost` (outlined, "Resume") and `.nav-btn` (solid ink, "Hire Me →").
- **Mobile:** below 960px the link list and action row are `display: none` and `.nav-toggle` (40px, two 18×1.5px ink bars) appears, opening `.nav-drawer` — a `min(340px, 90vw)` right-side panel at `rgba(255,255,255,.97)` + `blur(12px)`, sliding in from `translateX(102%)` over `.28s var(--ease-s)`. Toggling sets `body { overflow: hidden }`, flips `aria-expanded` on the trigger and `aria-hidden` on the drawer. **Focus:** opening moves focus to `.nav-drawer-close`; `Tab` is trapped inside the panel (`trapDrawerFocus`); `Escape` closes. Focus is returned to `.nav-toggle` on Escape and on the close button, but **not** when a nav link closes the drawer — the user is scrolling to that section, and yanking focus to the toggle would scroll them back up to the navbar. This is the `restoreFocus` argument to `toggleDrawer(forceOpen, restoreFocus)`; passing it for the link case is a bug.
- **Accessibility:** `html` carries `scroll-padding-top: 76px` so anchor jumps and keyboard focus clear the 60px fixed nav (WCAG 2.2 Focus Not Obscured). A `.skip-link` is fixed at `top: -56px` and slides to `top: 16px` on `:focus-visible`. The custom cursor that used to live here is gone; the native cursor is now always in charge, which also removes a class of bug where the custom dot obscured small hit targets.

- **No-JS safety:** `<html>` ships with `class="no-js"`, and an inline `<script>` in `<head>` rewrites it to `class="js"` before first paint. Every scroll-reveal style is scoped `.js [data-reveal]`. If JS is disabled, blocked, or the script throws, the hidden state never applies and the entire page renders visible. **Never un-scope that selector** — it is the only thing standing between a script error and a blank page.

### The Current Tech Stack card

`.stack-card` is a semantic `<dl>`, not a stack of nested boxes. Each `.stack-row` is a `<div>` wrapping a `<dt class="stack-domain">` and a `<dd class="stack-tools">`, separated by 1px hairlines inside one surface with `align-items: baseline`. `.stack-domain` holds a `152px` min-width so the tool names align into a readable column.

**What was removed, and why:**

- **`.stack-level`** — self-assessed `GROWING` / `STRONG` / `MEDIUM` proficiency pills. A recruiter cannot verify these, they are uncalibrated against anyone else's scale, and asserting them is a credibility risk in exactly the section where credibility matters most. The tools themselves are the honest signal.
- **`.stack-ico`** (`AI` / `LLM` / `DATA` / `DB` / `OPS`) — one-letter labels that restated the domain name next to it.
- **`.stack-row-*` 4px colour rails** — five unrelated hues (blue, green, teal, violet, amber) implying a taxonomy that did not exist.
- **Per-row cards** — five bordered boxes nested inside a bordered card. Now hairlines in a single surface, so the block reads as one spec sheet.
- **The 2px ink→gold gradient top rule** and the `stackRise` stagger.

### The Hero Portrait (`.hero-profile`)

The signature component, and the most recently refactored one. Three nested elements over two tokens:

- **`.hero-profile`** — the grid cell. `width: min(34vw, 420px)` (≥1024px), `aspect-ratio: var(--hero-media-ar)`, `position: relative`, `display: grid; place-items: center`, `justify-self: end`, `align-self: start` + `margin-top: 16px`. Owns the layout only; no visible surface. The cell is **top-aligned to the copy column, not centred in it** — `align-self: start` pins it to the row top (which is `.hero-copy`'s top), and the `16px` margin cancels the 16px of leading that sits above `.hero-nickname`, so the photograph's top edge lands exactly level with the cap-height of the "Abira Wisnunggal" wordmark at every viewport. Centring the cell instead pushes the portrait down beside the tagline, which reads as misaligned because the name is visually top-heavy. At `max-width: 767px` the shell is a flex column, where `align-self` switches to controlling the *horizontal* axis, so it is reset to `center` there to keep the portrait centred.
- **`.hero-profile-ring`** — the decorative plate behind the photo. `position: absolute; inset: 0`, `border-radius: 22px`, `1px solid rgba(184,146,74,.45)`, filled with a `radial-gradient(circle at 25% 20%, rgba(255,255,255,.7), transparent 45%)` over a `conic-gradient(from 220deg, rgba(184,146,74,.2), rgba(26,25,24,.05), rgba(184,146,74,.35))`, `box-shadow: 0 24px 46px rgba(26,25,24,.16)`, and `animation: profileOrbit 6.5s ease-in-out infinite alternate` (a `translateY(-6px) scale(1)` → `translateY(6px) scale(1.015)` drift).
- **`.hero-profile-frame`** — the photograph. `position: relative` in normal flow, `width: calc(100% - (2 * var(--hero-media-inset)))`, `aspect-ratio: var(--hero-media-ar)`, `overflow: hidden`, `border-radius: 22px`, `4px solid rgba(255,255,255,.95)`, `background: radial-gradient(circle at 30% 25%, #f4efe5 0%, #ddd8cf 100%)`, `box-shadow: inset 0 0 0 1px rgba(26,25,24,.08)`.
- **`.hero-profile-frame img`** — `width: 100%; height: 100%; aspect-ratio: var(--hero-media-ar); object-fit: cover; object-position: center`. The redundant `aspect-ratio` on the image is deliberate belt-and-braces: it prevents layout shift before the file decodes. The `<img>` carries `width="779" height="595"`, `loading="eager"`, `fetchpriority="high"`, and an inline `onerror` that hides itself and reveals `.hero-profile-placeholder` (mono `12px` uppercase on a warm gradient).

**The two tokens.** `--hero-media-ar: 779 / 595` is the *intrinsic* ratio of the source photograph. It is referenced at three use sites — `.hero-profile`, `.hero-profile-frame`, and `.hero-profile-frame img`. `--hero-media-inset: 16px` is the *offset distance* of the gold plate behind the portrait, referenced once, in `.hero-profile-frame`. If you swap the photo for a different aspect ratio, change `--hero-media-ar` and nothing else.

**The offset rule that makes this safe.** The ring is `inset: 0` — it occupies exactly the grid cell and cannot extend past it. The cell is a `grid` with `place-items: center`, and the frame is `calc(100% - (2 * var(--hero-media-inset)))`, so it is *smaller* than the cell and **centered in both axes**. The visible gold band is therefore produced by **shrinking the frame**, never by growing or translating the ring, and it comes out symmetric on all four sides (16px left/right, ~12px top/bottom — the vertical figure is smaller because the cell and frame share an aspect ratio, so a 16px horizontal inset is only ~12px of height). Three rules must hold together:

1. `.hero-profile` keeps `display: grid; place-items: center`. Drop it and the frame falls back to normal-flow top-left anchoring, which shifts the photo up and left inside the plate by half the inset.
2. The frame's inset is `2 * var(--hero-media-inset)`, not `1 *`. A single-factor inset leaves the frame flush to the top-left of the cell and the photo visibly off-center — this was the actual bug when the landscape ratio was first introduced.
3. The ring stays `inset: 0` with no negative inset or offset transform. Either would overflow the grid cell and collide with the hero copy at narrow widths. Keep the ring pinned to the cell and the inset on the frame.

### Hero Proof Strip (`.hero-proof`)

A single row of social proof inside `.hero-copy`, immediately after `.hero-ctas`, so the credibility signal lands before the scroll rather than five screens down in Honors.

- **Placement is load-bearing.** It lives *inside* `.hero-copy`, not as a sibling of `.hero-shell`. `.hero-profile` is pinned to the row top by `align-self: start`, and the row top is `.hero-copy`'s top — so growing the copy column downward moves nothing in the portrait. Verified: with and without the strip, `profTop − nickTop` is **16px** and `.hero-profile` is `420 × 320.78` at 1280px, `.hero-profile-frame` `388 × 296.34`. Byte-identical.
- **Geometry:** `display: flex; align-items: baseline; flex-wrap: wrap; gap: 6px 16px`, `margin-top: 24px`, `padding-top: 16px`, `1px solid var(--line)` top rule, `max-width: 640px`. The label is **inline** with the pill list on desktop — stacking it costs ~31px of hero height, which matters, see below.
- **Pills** (`.hero-proof-item`) are `.proj-tag` geometry: 999px radius, `1px solid var(--line-2)`, `--bg` fill, JetBrains Mono `11px` / `.06em` uppercase. Hover swaps border and colour to `--ink` per the Ink Hover Rule.
- **The award pill** (`.hero-proof-award`) is the component's one gold element — `#fffaf0` fill, `#e2ca95` border, `--gold-ink` text.
- **Content is quoted, not invented:** the four employers and the medal all appear verbatim in Experience and Honors. No testimonials, no unverified counts.
- **Responsive:** at `max-width: 960px` the strip becomes a centred column (`flex-direction: column; align-items: center; gap: 12px`) with the label centred above the pills. At `max-width: 600px` the label and pills drop to `10px` and the pill padding tightens to `5px 10px`.
- **The height gate — `@media (min-width: 1024px) and (max-height: 939px) { .hero-proof { display: none } }`.** At `≥1024px` `#hero` is an exact-fit `min-height: 100vh` composition. Measured at 1280px wide, the copy column *with* this strip is **917px** tall, so on any viewport under ~940px the strip pushed the CTAs below the fold and dropped the absolutely-positioned `.hero-scroll` cue and `.hero-stats` out of view. Rather than retune the hero's type scale or spacing, the strip yields: with it hidden, `#hero` returns to exactly `100vh` at 1280×800 (measured 800px, `overflowsVh: false`). The strip is supplementary — the same facts are in Experience and Honors — so it is the correct element to drop. **Re-measure this threshold if the strip's content or the hero copy changes.**

### Icons

Icon glyphs are **inline SVG**, never text abbreviations and never emoji. Two families, split by purpose:

- **Brand marks are official and filled** — `.c-icon svg` holds the LinkedIn and GitHub marks (`fill="currentColor"`, 24 viewBox), inside the existing 30px hairline circle. Recolouring or redrawing a brand logo is not allowed; supply the real asset.
- **Non-brand glyphs are outline**, `stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"` on a 24 viewBox — the envelope in `.c-icon`, `.proj-img-placeholder .ph-ico` (image frame), `.cert-img-placeholder .ph-ico` (seal). 1.5px matches the card border weight, so stroke and border read as one system.

Sizing is owned by the container, never the markup: `.c-icon svg { width: 15px; height: 15px }`, `.proj-img-placeholder .ph-ico svg { 28px }`, `.cert-img-placeholder .ph-ico svg { 24px }`. Every one of these is `aria-hidden="true"` because adjacent text already carries the meaning; an icon-only control instead needs an accessible name (`.nav-drawer-close` and `.modal-close` already have `aria-label`).

### Modal (`.modal-overlay` / `.modal-box`)

Full-viewport scrim at `rgba(17,17,16,.6)` + `blur(10px)`, `padding: 24px`, fading in over `.35s var(--ease-s)`. The box is `max-width: 880px`, `max-height: 90vh`, 8px radius, `--sh-lg`, and rises from `translateY(32px) scale(.96)` over `.4s var(--ease-s)`. A sticky `.modal-bar` (18px 32px, `rgba(255,255,255,.95)` + `blur(12px)`) holds the `PROJECT DETAIL` label and a 32px close button; content is injected by `js/main.js` from a project data map as a fixed sequence of `.modal-sh` headings + `.modal-p` paragraphs, plus `.modal-lessons` and a `.flow-wrap` pipeline of `.flow-node` chips separated by inline SVG arrows. `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modalTitle"`, with a focus trap on Tab and `Escape` to close.

## Motion

Eight named `@keyframes`. All are opacity/transform (or `left`) only — nothing animates a layout property except the `.exp-body` `max-height` accordion.

**Easings.** `--ease-s: cubic-bezier(.16,1,.3,1)` is the workhorse: every reveal, hover, the accordion, the drawer, and the remaining `*In` keyframes. `--ease: cubic-bezier(.22,.68,0,1.2)` (note the overshoot past 1) and `--ease-i: cubic-bezier(.4,0,.2,1)` are **declared but never referenced** — zero `var()` uses anywhere in the CSS, HTML, or JS. Every animation and transition timing is either `var(--ease-s)` or the `ease-in-out` keyword. Don't assume the presence of a token means it's live.

**Only two infinite animations remain**, both long and slow: `profileOrbit` on `.hero-profile-ring` (`6.5s`, the single deliberate decorative motion on the page) and `nudge` on `.flow-arrow-svg svg` (`2s`, scoped inside the project modal). Everything else fires once and settles.

**Keyframes.**

| Name | What it does | Where |
|---|---|---|
| `wordUp` | `translateY(105%)` → `0` with opacity, on a clipped `.word` wrapper | `.hero-name` — the masked per-word rise |
| `fadeSlide` | `opacity 0→1`, `translateY(16px) → 0` | Every hero `<p>` and CTA row |
| `profileOrbit` | `translateY(∓6px) scale(1 → 1.015)` | `.hero-profile-ring` — one of only two surviving loops |
| `nodeIn` | `translateX(-10px) → 0` with opacity | Modal `.flow-node` and `.flow-arrow-svg` |
| `nudge` | `translateX(0 → 4px → 0)` on the SVG arrow only | `.flow-arrow-svg svg` — the other surviving loop |

**Removed keyframes:** `floatCircle` (`.hero-circle` orb), `scanLine` (`.scroll-track` sweep), and `stackRise` (per-row stagger inside `.stack-card`). All three animated elements that existed only to be animated.

**Timings and the stagger convention.** Durations are hand-picked per interaction: `.2s` border/background, `.25s`/`.28s`/`.3s` mid transitions, `.35s` the modal scrim and card rail, `.4s`/`.5s` the modal box and accordion, `.55s` the reveal, `.7s` the hero `fadeSlide`, `1s` the `wordUp`. The two remaining loops run `2s` and `6.5s` `ease-in-out infinite alternate`.

**Reveal travel was cut from 40px to 18px, and the duration from .8s to .55s.** With ~30 elements carrying `[data-reveal]`, the original distance made the whole page read as one long generic fade-up. Direction variants are now `left -24px` / `right 24px` / `scale .97`, and the `[data-delay="1".."6"]` ladder is 60ms steps rather than 100ms.

Reveal is declarative, not scripted: `[data-reveal]` starts at `opacity: 0; transform: translateY(40px)` and transitions to rest over `.8s var(--ease-s)` when `.in` is added. Direction is a value on the same attribute — `[data-reveal="left"]` (`translateX(-40px)`), `"right"` (`translateX(40px)`), `"scale"` (`scale(.94)`); bare `[data-reveal]` rises. `js/main.js` adds `.in` from an `IntersectionObserver` at `threshold: 0.1, rootMargin: 0px 0px -48px 0px` and then unobserves, so each element reveals exactly once. Under reduced motion the observer is skipped entirely and every target gets `.in` up front.

**The stagger convention.** `[data-delay="1"]` through `[data-delay="6"]` map to `transition-delay: .1s` … `.6s` in fixed 100ms steps — six slots, no more. Grid children claim the slots in DOM order: the six `.exp-card`s are `data-delay="1"`–`"6"`, the six `.proj-card`s likewise, the three `.cert-card`s `1`–`3`, `.stack-card` rows use their own `:nth-child` ladder at 80ms. Chip grids reuse the slots cyclically rather than continuing the count (the ten `.skill-chip`s run 1, 2, 3, 4, 2, 3, 4, 2, 3, 4). The hero instead hard-codes per-element `animation-delay` on `fadeSlide`: `.55s`, `.7s`, `.85s`, `.92s`, `1s`, `1.1s`, `1.3s`; the `h1` words use `.05s` / `.18s` / `.31s` on a 130ms ladder.

### The Reduced-Motion Contract

`@media (prefers-reduced-motion: reduce)` collapses every `animation-duration` and `transition-duration` to `.01ms` and `animation-iteration-count` to `1`, disables `scroll-behavior: smooth`, and then explicitly nulls `transform` and `animation` on `.proj-card` and `.flow-arrow-svg svg` — the elements whose resting state depends on an animation's end frame. It also force-sets `[data-reveal] { opacity: 1 !important; transform: none !important }` and drops the image-scaling transition inside project and certificate cards.

`js/main.js` reads the same media query (`prefersReducedMotion`) to skip the reveal observer entirely and to run the RAG playground steps with zero delay. **Any new looping or end-state-dependent animation must be added to that explicit override list**, or it will visibly survive reduced motion.

## Conventions for Future Contributors

### Protocol adoption and the three reversals

A "Premium Utilitarian Minimalism" style protocol was applied to this site. It is worth recording that **the site already satisfied most of it** — the warm bone canvas, off-black ink, `#1px` hairlines, 8px cards, pill tags, mono metadata, and IntersectionObserver reveals were all already in place. Four clauses were genuinely new and three of those **reversed a documented decision**. All three reversals are called out here so the next contributor is not reading a doc that lies.

#### 1. Editorial serif display tier — `--fserif`

`Newsreader` (variable 200–800, optical sizing) carries the display tier; `Instrument Serif` is the fallback. Newsreader rather than Instrument Serif because Instrument ships regular + italic only, and the hero needs 600/700.

Applied to `.hero-nickname`, `.hero-name`, `.about-title`, `.contact-heading`, `.pg-title`. **Not** applied to the card tier or `.hero-role` — the role line deliberately stays Clash Display so it reads as a geometric caption under a serif statement.

| | Clash Display (before) | Newsreader (after) |
|---|---|---|
| `.hero-nickname` | `700`, `lh .88`, `-0.02em` | `600`, `lh 1.02`, `-0.025em` |
| `.hero-name` | `600`, `lh .96`, `-0.03em` | `500`, `lh 1.08`, `-0.02em` |

**Line-heights had to rise.** A geometric grotesque with tall caps absorbs sub-1.0 leading; a serif with long ascenders collides below ~1.0, and "Abira Wisnunggal" wraps to two lines at most desktop widths. The weights preserve the [Reversed Hero Rule](#typography): name largest and heaviest, `h1` smaller and lighter.

#### 2. The hero cap-height invariant inverted — `margin-top: -10.28px`

This is the one to read carefully. The invariant is unchanged: **the photograph's top edge sits level with the cap-height of the wordmark.** What changed is the sign of the offset needed to hold it.

Two offsets stack between the wordmark's cap and the photo's top edge:

- **cap-height offset** = `(lineHeight − fontBBox) / 2 + fontBBoxAscent − capHeight`. Measured in Newsreader 600 at 94px: fontBBox `69 / 25`, capHeight `68`, `lineHeight 1.02` ⇒ the cap sits **0.02 × fontSize** below the element's top edge ⇒ `1.94px` at the 94px ceiling.
- **frame inset** = `--hero-media-inset × aspectRatio / 2` = a **constant `12.22px`** at every viewport, because `.hero-profile` and `.hero-profile-frame` share `--hero-media-ar`, so the band's vertical size does not depend on how wide the portrait is.

Under Clash Display the cap sat far below the element top, so `+16px` was correct. Under Newsreader the cap sits only `1.94px` down, which is *less* than the `12.22px` inset — so the margin must be **negative**.

It is written as the formula, not the solved constant:

```css
margin-top: calc(0.0206 * clamp(48px, 7.2vw, 94px) - 12.22px);
```

because the cap offset scales with font-size while the frame inset does not. A single tuned constant (`-10.28px`, correct at the 94px ceiling) drifts in between — measured **+0.37px at 1078px**, where `7.2vw` yields 77.6px rather than 94px. The `calc()` holds it across the range. Measured after adoption: `0.01` at 1490px, `0.03` at 1078px, `-0.41` at 778px — all sub-pixel.

**Where the offset is reset, and why it is not 960px.** Below `767px` the shell becomes a flex column with the portrait *under* the copy, so there is no cap-height to align to and the `calc()` would just nudge the photo up; both the margin and `align-self` are overridden there. It is tempting to reset at `960px` instead, and that is wrong: the `min-width: 768px and max-width: 1023px` block restores a **two-column** shell at 768–960px and wins on source order over the 960px block. That range is still the side-by-side hero and still needs the offset. Getting this wrong measured `10.65px` of drift at 778px.

#### 3. Ambient background layer — reversed, but not the version that was deleted

Protocol §6/§7 asked for section depth via low-opacity imagery, line patterns, and one slow radial blob. Those are `.aurora`, `.grid-bg`, and `.noise` — three of the eight systems the de-slop pass removed. They came back as **two fixed layers on `body` pseudo-elements**, not three JS-driven divs:

- `body::before` — 64px hairline grid at `rgba(26,25,24,.028)` plus warm grain at `.022`. **Fully static.**
- `body::after` — one warm radial blob at `opacity: .03`, drifting on `transform` over `26s alternate`.

Every opacity sits at or under the protocol's 0.03 ceiling. The differences that keep this from reproducing the original regression:

- **no scroll or mouse parallax** — the old `.grid-bg` transitioned `transform` on scroll, which was the actual cost
- `position: fixed`, so it costs nothing to scroll and is never a scrolling container
- `pointer-events: none`, `z-index: 0`; opaque cards and the opaque footer hide it entirely, so it only shows on the paper ground between sections
- the blob is explicitly named in the reduced-motion block rather than relying on the generic duration collapse

> **Gotcha, already hit once.** The grain is an SVG `<rect>` inside a data-URI, and it initially rendered at **full strength** — no opacity had been applied — which read as dirt rather than texture. Background layers cannot carry individual opacity, so the `.022` lives on the `<rect opacity='.022'>` *inside* the SVG. Do not "clean that up" into a `filter:` or a `mix-blend-mode`; verify it by screenshot at full strength first.

#### 4. Domain-coded pastel chips — reversed, and the reason they were deleted did not apply

The de-slop pass deleted 34 per-item pastel tints because *"with ten technologies in ten hues the About section read as confetti, the hues encoded nothing the label didn't already say."* That diagnosis was right about the **original** tints and wrong about tints as such. The hue was assigned **per item**, so it was decoration.

The reintroduced chips carry a `data-d` domain key, and the four pastels map onto the five domains the `.stack-card` definition list already establishes (Storage folds into Infra as "plumbing"):

| `data-d` | Domain | Pastel | Text | Measured ratio |
|---|---|---|---|---|
| `ai` | AI / ML | `#FBF3DB` | `#956400` | **4.62:1** |
| `llm` | LLM Systems | `#E1F3FE` | `#1F6C9F` | **4.98:1** |
| `data` | Data & analytics | `#EDF3EC` | `#346538` | **6.08:1** |
| `infra` | Infra & retrieval | `#FDEBEC` | `#9F2F2D` | **6.26:1** |

All four clear WCAG AA at the 11px these chips render at. The colour now repeats information the reader already gets from the chip's place in the tech stack — read a project row and the hue tells you which parts of the stack it leans on. That is the difference between encoding and confetti.

All 44 chips are tagged. **A new chip without a `data-d` silently renders as the old neutral style** — if you add one, pick the domain or the encoding breaks.

#### 5. Bento project grid

`.proj-grid` becomes `repeat(6, minmax(0,1fr))` at `min-width: 961px`: flagship `span 6`, two `span 3`, three `span 2` — matching the editorial ranking already in the markup (`001 FLAGSHIP`, `002 FEATURE KEY`, then supporting work).

**Column spans only, never `grid-row` spans.** Row spans on an auto-height grid resolve circularly, since the spanning card is what would size the rows it spans, and this repo has already shipped one clipping bug from an over-clever height relationship.

Two traps, both live:

- The whole block **must stay inside `min-width: 961px`**. Below 960px `.proj-grid` is one column, and a bare `grid-column: span 6` against a 1-column track generates six **implicit** columns and destroys the mobile layout.
- The flagship gets `object-fit: contain`, because its asset (`demolablogo.jpg`) is **200×200** and `cover` at full width would upscale it ~5.3× into mush. Scoped to the flagship because its source is a *logo*; the other cards hold real screenshots that want `cover`. **If the flagship asset is ever replaced with a real screenshot, drop that rule.**

### Adding a section

1. Add `<section id="…">` inside `<main id="main-content">` in `index.html`. It inherits `padding: 112px 48px`, `max-width: 1160px`, `z-index: 1`, and `border-top: 1px solid var(--line)` if you add that yourself — the rule lives per-section, not on `section`.
2. Start with `<h2 class="sr-only">` for the real heading, then a `<div class="sec-label">NN &nbsp; Name</div>`. The `NN` is a hard-coded ordinal — `01` About, `02` Experience, `03` Projects, `04` Certificates, `05` Honors, `06` Live Demo, `07` Contact. Incrementing one means editing every later label; there is no generator.
3. Give the section's visible heading the class for its size band (`.about-title`, `.contact-heading`, `.pg-title`) rather than writing a new `font-family: var(--fd)` rule.
4. **Does the section need a `.section-intro`?** The four sections that are a bare list of items — Experience, Projects, Certificates, Honors — each carry one framing sentence directly under the `.sec-label`, at `max-width: 760px`. The three that open with prose instead do not: About (its prose *is* the intro), Live Demo (`.pg-sub`), Contact (`.contact-sub`). A new list-style section should follow the first group; a new narrative section the second. This split was previously inconsistent — Experience and Projects had no intro while Certificates and Honors did — and is now uniform.
5. Add its link to **both** `.nav-links` and `.nav-drawer-links` in `index.html` — they are separate lists and the drawer is not generated.
6. Attach `data-reveal` to the section's top-level children and `data-delay="1"…"6"` for anything that should stagger. Use the value form (`="left"`, `="right"`, `="scale"`) for left/right column pairs; About and Contact both use `left` on the text column and `right` on the visual.
7. Write the responsive rules into an existing `max-width: 960px` or `max-width: 600px` block. Do not create a new breakpoint if 960/600 covers it.

### Adding a breakpoint

The file is **desktop-first with `max-width` overrides**, plus exactly **two `min-width` blocks and both are hero-only**: `min-width: 1024px` and `min-width: 768px and max-width: 1023px`. The two-file structure is deliberate: the hero needed explicit two-column geometry restored above 1024px and a distinct tablet treatment, and the general site collapses at 960px instead.

So:

- **General page layout change** → add to the existing `@media (max-width: 960px)` or `@media (max-width: 600px)` block, both near `style.css:804` / `:819` and repeated for the playground at `:1695` / `:1702`. Note there are **two separate 960px blocks (`:804`, `:1394`) and four separate 600px blocks (`:819`, `:1425`, `:1702`, `:1705`)**, plus a `pointer: coarse` and a `prefers-reduced-motion` block. Keep additions in the block nearest the selector.
- **Hero layout change** → use `@media (min-width: 1024px)` (`:1498`) for desktop hero, `(min-width: 768px) and (max-width: 1023px)` (`:1524`) for tablet hero, or `max-width: 767px` (`:1555`) for phone hero. Be aware the hero's effective phone layout is assembled from 960 → 767 → 600 in source order, so the 600px portrait width (`:1447`, `min(86vw, 300px)`) wins over the 767px one (`:1597`, `min(82vw, 320px)`) — the later block always wins at equal specificity.
- **Motion or pointer capability** → `@media (pointer: coarse)` (`:1470`) and `@media (prefers-reduced-motion: reduce)` (`:1477`).

When you do add a genuine new breakpoint: prefer `max-width` and descending order; if you need `min-width`, keep the hero's paired-block idiom; and update the table in [Layout](#layout).

### The no-build constraint

This is a **static site with no build step, no bundler, no preprocessor, no CSS variables file, no framework.** `index.html` links `css/style.css` directly; `case-study-smartfaq.html` links the same file plus a single inline `<style>` block for page-specific layout. Assets are referenced by relative path. Practical consequences:

- Everything must work in **plain CSS**. No Sass, no PostCSS, no Tailwind, no CSS Modules, no JS-injected styles.
- Fonts load from two external CDNs via `@import` at the top of `style.css` (Fontshare for Clash Display + Satoshi, Google Fonts for JetBrains Mono). A `@import` must stay at the top of the file or the whole sheet is dropped.
- Images are declared with explicit `width`/`height` attributes plus an inline `onerror` that reveals a styled placeholder. **Any new image should follow that pattern** so a missing asset degrades to a labeled placeholder instead of a broken icon.
- Interactive behavior lives in one hand-written `js/main.js` (700 lines, no modules). New behavior goes there; there is no framework to hook into.
- Reuse an existing class before adding a new one. The stylesheet already contains override blocks that re-declare earlier selectors to tune them — a new rule that duplicates a `.skill-chip` or `.hero-name` declaration will win or lose on source order alone, which is why the effective values documented above are sometimes surprising.

### Two Known Rough Edges

Documented rather than fixed, since this pass changed no code:

- `.hero-stats-shell` is `position: absolute` (`right: 48px; bottom: 48px`) against `#hero`, and `.hero-scroll` is `position: absolute` (`left: 48px; bottom: 32px`) — both positioned against the section rather than the `.hero-shell` grid, and both hidden at `max-width: 960px`, so desktop-only absolute placement is the live case. The 48px page gutter is written literally in 9 places (`.nav` padding, `section` padding, `.hero-scroll` left, `.hero-stats` right/bottom, `.hero-section` padding, `.hero-shell` gap, `.hero-stats-shell` right/bottom) rather than derived from one token, so changing the gutter means finding all 9.
- `--ease` and `--ease-i` are declared in `:root` and never used. Either wire them up or delete them.

## Do's and Don'ts

### Do:

- **Do** spend gold on one thing per component — a leading rule, a hover border, an issuer line, a focus ring — and reach for `--ink` for anything structural.
- **Do** set every fact (dates, counts, IDs, tags, statuses, section ordinals) in JetBrains Mono, uppercase, `11px` / `0.08em` or darker.
- **Do** keep cards flat at rest (`1.5px solid var(--line)`, no shadow) and add `--sh-md` or `--sh-lg` only on hover or open.
- **Do** animate only `opacity` and `transform`, with `.2s`–`.8s` and `var(--ease-s)`; use `.in`-class triggers for scroll reveals.
- **Do** reuse the `data-delay="1"`–`"6"` ladder (100ms steps) for grid staggers and claim slots in DOM order.
- **Do** use the ratio token — set `--hero-media-ar` and let `aspect-ratio` derive the layout — rather than hard-coding a height.
- **Do** give new images explicit `width`/`height` and an `onerror` placeholder fallback.
- **Do** test at 1023px and 1024px. That pair is where the hero switches between two distinct layouts.

### Don't:

- **Don't** give the `.hero-profile-ring` an offset transform or negative inset. It must stay `inset: 0`; the `--hero-media-inset` gap comes from shrinking `.hero-profile-frame` to `calc(100% - (2 * var(--hero-media-inset)))`. Any other approach overflows the grid cell.
- **Don't** drop `display: grid; place-items: center` from `.hero-profile`, and don't drop the `2 *` factor from the frame inset. Either one de-centers the photo inside the gold plate.
- **Don't** add a new loop or end-state-dependent animation without listing it in the `prefers-reduced-motion` override block.
- **Don't** set small text in `--ink-4` (`#b0ada8`) — it is 2.1:1 on paper and is decoration-only. Use `--ink-3` (`#6f6b66`).
- **Don't** set text in `--gold`. It is 2.7–2.9:1 and fails WCAG 1.4.3. Use `--gold-ink` for type, `--gold` for rules, rails, dots, fills, and the focus ring.
- **Don't** add `.proj-tag` (or any other selector that has same-specificity tinted siblings after it) to the late contrast-override block — it would flatten the chip tints to grey. Fix the base declaration instead.
- **Don't** add a `:focus-visible` ring to `.proj-card` or `.cert-card`. They are plain `<article>` elements with no `tabindex` and no click handler; their affordances are the `.proj-open-btn` and `.cert-btn` descendants, which already carry the ring. Styling the article would advertise a focus stop that does nothing.
- **Don't** add a spacing scale, a Tailwind config, a preprocessor, or a build step. Raw px in `style.css` is the convention; section padding plus grid gaps is the rhythm.
- **Don't** promote the `h1` above `.hero-nickname` or enlarge it — the name-first hierarchy is deliberate.
- **Don't** use a rounded pill shape for rectangular action buttons (2px) or a sharp corner for chips (999px). The two-step radius split is load-bearing.
- **Don't** invent a new gold hue. Extend the tinted-chip pattern with explicit hex triples if a new category needs color; for gold *text*, use `--gold-ink`.
- **Don't** use a text abbreviation (`EM`, `LI`, `GH`, `AI`, `CERT`) as an icon. Icons are inline SVG — official filled marks for brands, 1.5px outline for everything else.
- **Don't** assume a declared `--ease*` token is used; verify with `var(--ease)` / `var(--ease-i)` before building on it.

## Open Gaps

- **No `PRODUCT.md` exists.** Every rule here is reverse-engineered from the shipped CSS, HTML, and JS. The *what* is well-evidenced; the *why* is not recoverable. A future contributor should run `/impeccable init` to capture the product brief before making strategic design calls.
- **The creative north star ("The Dossier") is my inference**, not a stated brand commitment. It describes what the code does; it was not chosen by the author.
- **Approximately 30 tinted chip colors are literals**, not tokens, with no documented rationale for the specific hue assignments. Whether they are meaningful (a deliberate category taxonomy) or decorative is unknown from the code.
- **The `@keyframes nudge` / `nodeIn` pair lives inside the modal block**, and `.exp-body`'s `max-height: 800px` accordion cap is an unstated magic number that could clip very long role descriptions.
- **The `#hero` id selector and the `.hero-section` class coexist**, and the hero has three separate layout blocks (960 / 767 / 1024+). This works but is the least predictable area of the stylesheet — treat it as read-mostly.
- **The `.hero-proof` height gate is a measured constant, not a preference.** `max-height: 939px` was derived from the 917px copy-column height at 1280px wide. Widening `.hero-copy`, adding a line to `.hero-desc`, or changing the strip's contents will make it stale and the CTAs will drop below the fold again. Re-measure rather than guess.
- **The proof strip is duplicated content by design.** Its employers and medal are also in Experience and Honors. That redundancy is intentional — it is the point of a proof strip — but it means edits to company names or dates must be made in both places.
- **No dark mode exists.** Every contrast figure quoted here is light-mode only. If a dark theme is ever added, none of these ratios carry over and both `--ink-*` ramps plus `--gold-ink` need re-deriving against the dark surfaces.
- **Form validation is hand-rolled** against `novalidate`, with the browser's own constraint validation suppressed. Server-side errors from Formspree are not surfaced in the summary — only client-side ones are.