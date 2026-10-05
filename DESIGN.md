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

Two systems do most of the work. **Clash Display** carries identity — large, tightly-tracked (down to `-0.05em`), often set at line-height below 1 so headline blocks read as solid slabs. **JetBrains Mono** carries instrumentation — every label, section number, date, credential ID, tag, and status chip is monospaced, small, and letterspaced, so metadata is visually separable from prose at a glance without needing a different container. Satoshi sits between them for everything readable.

Motion is quiet and one-directional: content rises into place on a single fast-out easing, cards lift a few pixels on hover, and the decorative layers (grid, gold orb, portrait plate) drift slowly on long alternate loops. A custom pointer, a scroll-linked grid parallax, and a film-grain noise overlay supply texture rather than interaction.

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
- **Hairline Strong** (`#cac8c2`): border on resting interactive controls (`.btn-outline`, `.cert-btn`, `.pg-chip`, `.stack-row` is `#dedad2`) and the scrollbar thumb.

### Tertiary (accent)

- **Gold** (`#b8924a`): the single accent. `.sec-label::before` rule, `.nav-logo em` period, `.honor-pill` tint, `.proj-metrics li::marker`, hover states on `.stack-row` / `.honor-item::after`, `.hero-proof-award` fill, and the global focus outline. **Structure only** — never body or label text (see `--gold-ink`).
- **Gold Ink** (`#8a6a24`): the text-safe step of the same hue, 5.04:1 on white. Used wherever gold *is* the text colour or sits behind white text: `.exp-company`, `.cert-issuer`, `.honor-org`, `.modal-sub`, `.about-em`, `.nav-logo em`, `.pg-disclaimer a`, `.hero-proof-award`, `.proj-card:hover .proj-cta`, and the `.pg-step-active .pg-step-ico` fill (white on `--gold` is 2.90:1). `--gold` on paper is 2.70:1 and on white 2.90:1, both failing WCAG 1.4.3. The Restrained Gold Rule is unchanged — one gold element per component — only the *step* is darker where it is set as type or used as a fill. What legitimately stays plain `--gold`: `.sec-label::before`, the `.nav-logo em` period's siblings, `.exp-list li::before` and `.proj-metrics li::marker` (list glyphs), `.honor-item::after`, `.stack-card`'s top rule, `.pg-step-active` borders, and the focus ring.
- **Gold Light** (`#d4aa6a`): footer logo accent, `.stack-row:hover` border, and the `.footer-glow` line gradient.
- **Verified Green** (`#22c55e`): `.cert-badge` dot, `.pg-step-done`, `.form-status.success` (`#166534` text on `#e9f8ed`), `.cert-status-verified`.
- **Error Red** (`#b91c1c`): `.f-err`, `.f-inp.invalid` / `.f-txt.invalid` border, `.form-status.error`.
- **Chip tints** — hand-picked pastel pairs, defined per variant, not as tokens. Examples: `.proj-tag-rag` `#fdf3e8` / `#825222`, `.skill-chip.skill-python` `#edf5ff` / `#1f4d9e`, `.skill-chip.skill-fastapi` `#ebfff9` / `#1b6f56`, `.cert-tag-sql` `#eef0ff` / `#344497`, `.honor-pill` `#fff2de` / `#7a5318`. Backgrounds are always very light; text always carries the contrast.

### Named Rules

**The Restrained Gold Rule.** Gold marks structure, never decoration. One gold element per component: a leading 28×1px rule, one hover border, one issuer line, one focus ring. If a new component would use gold for a second purpose inside the same block, it should use `--ink` instead.

**The Ink Hover Rule.** Hovering an interactive element swaps its border to `--ink` (and often its background to `--ink` with `#fff` text). Gold appears in hover only where the element has no border to recolor — `.proj-cta` text, the honor timeline dot.

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

**Display Font:** Clash Display, weights 500/600/700 (Fontshare)
**Body Font:** Satoshi, weights 400/500 (Fontshare)
**Label/Mono Font:** JetBrains Mono, weights 300/400/500 (Google Fonts)

**Character:** Clash Display is a geometric grotesque with tight apertures — it can hold `-0.05em` tracking and sub-1.0 line-height without falling apart, which is what lets a 94px name sit above a 58px tagline without shouting twice. Satoshi is a warm neo-grotesque that reads soft against the paper ground. JetBrains Mono is the system voice for anything that is a *fact* rather than a *sentence*: section numbers, dates, credential IDs, tech tags, statuses.

### Hierarchy

Implemented values are the **effective** ones after the cascade. Several hero sizes are declared in the base hero block and then re-declared in the later override block, both at single-class specificity, so the later value wins. Document the later one.

- **Display** — `.hero-nickname`: Clash Display 700, `clamp(48px, 7.2vw, 94px)`, line-height `0.88`, tracking `-0.02em`, `--ink`. The person's name. Base block had `clamp(36px, 6.2vw, 72px)`; the override raised the ceiling.
- **Headline (h1)** — `.hero-name`: Clash Display 600, `clamp(30px, 4.2vw, 58px)`, line-height `0.96`, tracking `-0.03em`, `--ink-2`. This carries the *promise*, not the name. Note the deliberate inversion: the `h1` is smaller and lighter than the `<p>` above it.
- **Section title** — `.about-title` / `.about-text h2`: Clash Display 700, `clamp(36px, 4.5vw, 58px)`, line-height `1.05`, tracking `-0.035em`, `--ink`. `.contact-heading` runs larger at `clamp(38px, 5vw, 68px)` / `0.95` / `-0.04em`. `.pg-title` is the small variant at `clamp(26px, 3.5vw, 44px)`.
- **Card title** — `.proj-title` Clash Display 600 `19px`/`1.2`; `.cert-name` `15px`/`1.3`; `.honor-title` `18px`/`1.25`; `.exp-role` `16px`; `.stack-domain` `16px`/`1.1`; `.modal-title` fixed `34px`/`-0.03em`; case-study `.case-title` `clamp(36px, 6.8vw, 72px)`.
- **Body** — `#about p` and `.about-text p`: Satoshi `16px` (base) / line-height `1.82`, `--ink-2`. Longer measures are capped by container width, not by a `ch` value: `.hero-desc` `700px`, `.section-intro` `760px`, `.pg-sub` `680px`, `.hero-copy` `720px`, `.contact-sub` unconstrained inside a 1fr grid column.
- **Dense body** — `.proj-desc` and `.honor-desc` `13.5px`/`1.7`; `.exp-preview` and `.exp-list li` `13px`/`1.65`–`1.7`; `.cert-desc` `12px`/`1.55`; `.modal-p` `14.5px`/`1.8` (→ `15px` at ≤600px); `.proj-metrics` `14px`/`1.55`.
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

**Page furniture.** Fixed 60px nav (`padding: 0 48px`) that gains `border-bottom-color: var(--line)` + `--sh-sm` past 24px of scroll. Two full-viewport fixed overlays sit at `z-index: 0` — `.noise` (inline SVG `feTurbulence` fractal noise, `opacity: .025`, 200px tile) and `.grid-bg` (two 1px linear gradients at `rgba(26,25,24,.04)`, `background-size: 64px 64px`, `transform` parallaxed ±10px by mouse). All content sits at `z-index: 1`; `body { overflow-x: hidden }` contains the parallax overscroll.

**Breakpoints actually present in `css/style.css`:**

| Query | Scope | What changes |
|---|---|---|
| `min-width: 768px and max-width: 1023px` | `#hero` only | Two-column shell `1fr / minmax(260px,350px)`, `gap: 24px`, portrait `min(40vw, 330px)`, `min-height: auto`, scroll cue and stats hidden |
| `max-width: 960px` | site-wide (two blocks, `:804` and `:1394`) | `:804` — `section` → `80px 24px`, nav → `24px` padding, `.about-grid` / `.exp-grid` / `.proj-grid` / `.contact-grid` / `.footer-top` → 1 column, `.cert-grid` → 2 columns, `.hero-stats` / `.hero-scroll` hidden, honor timeline rail `120px` → `80px` (both the `::before` rule and the `::after` dot's `calc()`). `:1394` — hero `.hero-shell` → 1 column, `gap: 26px`, portrait `min(72vw, 330px)`, `.hero-section` → `24px` padding, `.about-kpi-grid` → 1 column, `.about-grid` → `gap: 34px`, `.nav-actions` hidden and `.nav-toggle` shown, `.hero-sub-ctas` gap `14px` |
| `max-width: 767px` | `#hero` only | `.hero-shell` → flex column, `align-items: center`, `gap: 22px`; hero copy centers; `.hero-name` → `clamp(26px, 8.2vw, 44px)`, `.hero-nickname` → `clamp(40px, 12vw, 64px)`, `.hero-desc` centered; portrait `min(82vw, 320px)`, `max-width: 320px` |
| `max-width: 600px` | site-wide (three blocks, `:819`, `:1425`, `:1702`/`:1705`) | `:819` — `.cert-grid` → 1 column, hero type → `clamp(32px, 13vw, 64px)` / `clamp(30px, 10vw, 54px)` / `clamp(17px, 6vw, 24px)`, `.footer-big-text` → `60px`. `:1425` — `section` → `68px 18px`, `#hero` → `92px / 52px`, CTAs full-width and centered, `.hero-status-badge` → `9px / .06em`, portrait → `min(86vw, 300px)` (this **overrides** the 767px value, since 600 comes later in source order), card/modal body padding → `18px`, `.exp-logo-slot` → `48px`, `.section-intro` → `13px`. `:1702`/`:1705` — `.pg-shell` → `16px`, metadata labels and chips → `12px` |
| `min-width: 1024px` | `#hero` only | Restores `min-height: 100vh`, `justify-content: center`, `padding: 104px / 72px`, two-column shell, portrait `min(34vw, 420px)` |
| `min-width: 1024px` and `max-height: 939px` | `.hero-proof` only | Hides the proof strip — see [Hero Proof Strip](#hero-proof-strip-heroproof) |
| `pointer: coarse` | global | Custom cursor and trail `display: none !important` |
| `prefers-reduced-motion: reduce` | global | See [Motion](#motion-and-the-reduced-motion-contract) |

There is **no 1200px breakpoint and no 480px breakpoint** in this stylesheet. 1160px is a `max-width`, not a breakpoint. Note that `max-width: 960px` and `max-width: 767px` overlap confusingly — 767px only affects the hero, so the effective phone layout is assembled from 960 + 767 + 600 in that order.

> **Headless verification gotcha, cost an hour.** `--window-size` is *not* a device viewport, and `--dump-dom` emits nothing in this Chrome build. A request for `1280,420` rendered at `1258 × 266` — a viewport height that made `min-height: 100vh` meaningless and produced a false "hero overflows" reading. Measure inside a sized `<iframe>` instead (`--allow-file-access-from-files`), and **freeze the entrance animations first** — `[data-reveal]`, `.hero-name .word span`, and the `fadeSlide` elements all begin at `translateY(16px)`, so a probe that catches them mid-flight reports a 6–10px alignment error that does not exist. `--headless=new` fails silently; plain `--headless` works.

## Elevation & Depth

Shadows are present but rationed: four distinct treatments, all neutral black at low alpha, all used as a *response to state or elevation*, never at rest.

- **Ghost** (`--sh-sm`: `0 2px 8px rgba(0,0,0,.06)`) — the resting elevation of nested surfaces: `.stack-card` (`:329`), `.pg-shell` (`:1630`), `.about-kpi` (`:923`), `.exp-logo-slot` (`:1234`), the scrolled nav (`:105`), and hover lift on `.nav-links a` (`:134`), `.btn-outline`, `.c-link`.
- **Lift** (`--sh-md`: `0 6px 24px rgba(0,0,0,.09)`) — hover on `.exp-card` and `.cert-card`, and the `.exp-card.open` state.
- **Float** (`--sh-lg`: `0 16px 56px rgba(0,0,0,.12)`) — hover on `.proj-card` (which also rises `-6px`) and the resting `.modal-box` (`:453`).
- **Ad-hoc** — `.btn-solid:hover` `0 8px 24px rgba(0,0,0,.18)`, `.f-submit:hover` `0 8px 24px rgba(0,0,0,.2)`, `.hero-profile-ring` `0 24px 46px rgba(26,25,24,.16)`. These are hand-written, not tokens.

Depth is otherwise conveyed by **tonal layering rather than shadow**: `--bg` for the page, `#fff` for cards, `--bg` again for inset sub-panels (`.pg-pipeline`, `.flow-wrap`, `.pg-answer-box`, `.stack-row`, `.proj-tag`), so a panel nested in a card recedes without a border weight change. Two glass surfaces — the nav (`rgba(248,247,244,.85)` + `blur(20px)`) and `.modal-bar` (`rgba(255,255,255,.95)` + `blur(12px)`) — carry their own translucency. `.stack-card` adds a 2px `linear-gradient(90deg, var(--ink), var(--gold))` top rule.

### Named Rules

**The Flat-At-Rest Rule.** No card has a shadow until hovered or opened. If you add a shadow to a resting surface, you are adding elevation the layout hasn't earned.

## Shapes

Corners are quiet and never fully rounded except on chips.

- **2px** (`--r2`) — the sharpest step, used only for rectangular action controls: `.btn-solid`, `.btn-outline`, `.nav-btn`, `.nav-link-ghost`, `.f-submit`, `.skip-link`.
- **4px** (`--r4`) — inputs and small controls: `.f-inp` / `.f-txt`, `.pg-input`, `.pg-submit`, `.c-link`, `.stack-row`, `.exp-toggle`, `.modal-close`, `.nav-toggle`, `.nav-drawer-close`, `.nav-drawer-links a`, `.proj-open-btn`.
- **8px** (`--r8`) — every full card: `.stack-card`, `.exp-card`, `.proj-card`, `.cert-card`, `.pg-shell`, `.flow-wrap`, `.pg-pipeline`, `.pg-answer-box`, `.modal-box`, `.about-kpi`.
- **999px** — every chip, tag, pill, and status badge: `.skill-chip`, `.proj-tag`, `.cert-tag`, `.pg-chip`, `.cert-btn`, `.honor-actions a`, `.proj-proof a`, `.honor-pill`, `.cert-status`, `.hero-status-badge`, `.stack-level`.
- **22px** — hero portrait only (`.hero-profile-ring`, `.hero-profile-frame`).
- **50%** — circular geometry: `.pg-step-ico`, `.c-icon`, `.exp-logo-slot`, `.hero-circle`, and the cursor pair (10px dot, 36px trail at `border: 1.5px solid rgba(26,25,24,.35)`).

One 10px outlier exists (`.stack-row`, from the override block). Borders are `1px` for pure hairlines (`--line`), `1.5px` for anything interactive or card-like, `2px` for the `.stack-card` top rule and `.hero-status-badge`, `3px` for the gold focus outline and the `.exp-card` gold rail, `4px` for the white photo frame and the `.stack-row-*` category stripes. The honors timeline is a 1px vertical rule at `left: 120px` with an 8px dot at `calc(120px - 4px)` — the dot straddles the rule.

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
- **Tinted** (`.skill-chip.skill-*`, `.proj-tag-*`, `.cert-tag-*`): a paired light background + mid-tone border + dark text. There are ~30 of these and each is a literal hex triple — no token, no generator.
- **Status** (`.cert-status`): pill with `#f6f4ef` fill and `#d4d0ca` border; `.cert-status-verified` → `#e9f8ed` / `#86d39b` / `#166534`. This is the only place green appears as text.
- **`.skill-chip:hover`** inverts fully: `--ink` background, `#fff` text, `translateY(-2px)`.

### Cards / Containers

- **Corner style:** 8px (`--r8`).
- **Background:** `#ffffff` (`--bg-card`). Nested panels inside a card use `--bg`.
- **Shadow strategy:** see [Elevation](#elevation--depth). Resting cards are flat; hover adds `--sh-md` (`.exp-card`, `.cert-card`) or `--sh-lg` + `translateY(-6px)` (`.proj-card`).
- **Border:** `1.5px solid var(--line)` at rest → `var(--line-2)` on hover. `.exp-card.open` escalates to `var(--ink)`.
- **Internal padding:** `.proj-body` `24px`, `.cert-body` `20px`, `.exp-head` `26px 26px 20px`, `.pg-shell` `32px` (→ `20px` → `16px` on tablet/phone).
- **Signature detail — `.exp-card::before`:** a 3px gold rail on the left edge, `transform: scaleY(0)` with `transform-origin: top`, expanding to `scaleY(1)` on hover or open over `.35s var(--ease-s)`. This is the one place gold acts as a state indicator rather than a label.
- **Media slots:** `.proj-img-slot` is a fixed `200px` band and `.cert-img-slot` `160px`, both `--bg` fill with a `1px` bottom border, `object-fit: cover`, and a `scale(1.04)` / `scale(1.05)` image zoom on card hover.

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
- **Accessibility:** `html` carries `scroll-padding-top: 76px` so anchor jumps and keyboard focus clear the 60px fixed nav (WCAG 2.2 Focus Not Obscured). A `.skip-link` is fixed at `top: -56px` and slides to `top: 16px` on `:focus-visible`. The custom cursor is gated on `pointer: fine` **and** not reduced-motion **and** no `keyboard-nav` class (added on Tab, removed on `pointerdown`), so the native cursor is restored the moment someone uses the keyboard.

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

**Easings.** `--ease-s: cubic-bezier(.16,1,.3,1)` is the workhorse: 40 `var(--ease-s)` references across reveals, hovers, the accordion, the drawer, and every `*In` keyframe. `--ease: cubic-bezier(.22,.68,0,1.2)` (note the overshoot past 1) and `--ease-i: cubic-bezier(.4,0,.2,1)` are **declared but never referenced** — zero `var()` uses anywhere in the CSS, HTML, or JS, and no `cubic-bezier()` is ever written inline outside the token declarations. Every animation and transition timing is either `var(--ease-s)` or the `ease-in-out` keyword: `.hero-circle` (`8s`), `.scroll-track::after` (`2s`), `.flow-arrow-svg svg` (`2s`), and `profileOrbit` (`6.5s`). Don't assume the presence of a token means it's live.

**Keyframes.**

| Name | What it does | Where |
|---|---|---|
| `wordUp` | `translateY(105%)` → `0` with opacity, on a clipped `.word` wrapper | `.hero-name` — the masked per-word rise |
| `fadeSlide` | `opacity 0→1`, `translateY(16px) → 0` | Every hero `<p>` and CTA row |
| `floatCircle` | `translate(0,0) scale(1)` → `translate(-30px, 20px) scale(1.05)` | `.hero-circle`, the gold radial glow |
| `scanLine` | `left: -100%` → `100%` | `.scroll-track::after`, the gold sweep in the scroll cue |
| `profileOrbit` | `translateY(∓6px) scale(1 → 1.015)` | `.hero-profile-ring` |
| `stackRise` | `translateY(12px) → 0` with opacity | `.stack-card.in .stack-row` |
| `nodeIn` | `translateX(-10px) → 0` with opacity | Modal `.flow-node` and `.flow-arrow-svg` |
| `nudge` | `translateX(0 → 4px → 0)` on the SVG arrow only | `.flow-arrow-svg svg` |

**Timings and the stagger convention.** Durations are hand-picked per interaction: `.15s` grid parallax, `.2s` border/background, `.25s`/`.28s`/`.3s` mid transitions, `.35s` the modal scrim and card rail, `.4s`/`.5s` the modal box and accordion, `.7s` the hero `fadeSlide`, `.8s` the reveal, `1s` the `wordUp`. Decorative loops run 2s–8s `ease-in-out infinite alternate`.

Reveal is declarative, not scripted: `[data-reveal]` starts at `opacity: 0; transform: translateY(40px)` and transitions to rest over `.8s var(--ease-s)` when `.in` is added. Direction is a value on the same attribute — `[data-reveal="left"]` (`translateX(-40px)`), `"right"` (`translateX(40px)`), `"scale"` (`scale(.94)`); bare `[data-reveal]` rises. `js/main.js` adds `.in` from an `IntersectionObserver` at `threshold: 0.1, rootMargin: 0px 0px -48px 0px` and then unobserves, so each element reveals exactly once. Under reduced motion the observer is skipped entirely and every target gets `.in` up front.

**The stagger convention.** `[data-delay="1"]` through `[data-delay="6"]` map to `transition-delay: .1s` … `.6s` in fixed 100ms steps — six slots, no more. Grid children claim the slots in DOM order: the six `.exp-card`s are `data-delay="1"`–`"6"`, the six `.proj-card`s likewise, the three `.cert-card`s `1`–`3`, `.stack-card` rows use their own `:nth-child` ladder at 80ms. Chip grids reuse the slots cyclically rather than continuing the count (the ten `.skill-chip`s run 1, 2, 3, 4, 2, 3, 4, 2, 3, 4). The hero instead hard-codes per-element `animation-delay` on `fadeSlide`: `.55s`, `.7s`, `.85s`, `.92s`, `1s`, `1.1s`, `1.3s`; the `h1` words use `.05s` / `.18s` / `.31s` on a 130ms ladder.

### The Reduced-Motion Contract

`@media (prefers-reduced-motion: reduce)` collapses every `animation-duration` and `transition-duration` to `.01ms` and `animation-iteration-count` to `1`, disables `scroll-behavior: smooth`, and then explicitly nulls `transform` and `animation` on `.grid-bg`, `.hero-circle`, `.proj-card`, and `.flow-arrow-svg svg` — the four elements whose resting state depends on an animation's end frame. The custom cursor and trail are removed entirely. `js/main.js` reads the same media query to skip the reveal observer, the counter tweens, and the custom cursor. **Any new looping or end-state-dependent animation must be added to that explicit override list**, or it will visibly survive reduced motion.

## Conventions for Future Contributors

### Adding a section

1. Add `<section id="…">` inside `<main id="main-content">` in `index.html`. It inherits `padding: 112px 48px`, `max-width: 1160px`, `z-index: 1`, and `border-top: 1px solid var(--line)` if you add that yourself — the rule lives per-section, not on `section`.
2. Start with `<h2 class="sr-only">` for the real heading, then a `<div class="sec-label">NN &nbsp; Name</div>`. The `NN` is a hard-coded ordinal — `01` About, `02` Experience, `03` Projects, `04` Certificates, `05` Honors, `06` Live Demo, `07` Contact. Incrementing one means editing every later label; there is no generator.
3. Give the section's visible heading the class for its size band (`.about-title`, `.contact-heading`, `.pg-title`) rather than writing a new `font-family: var(--fd)` rule.
4. Add its link to **both** `.nav-links` and `.nav-drawer-links` in `index.html` — they are separate lists and the drawer is not generated.
5. Attach `data-reveal` to the section's top-level children and `data-delay="1"…"6"` for anything that should stagger. Use the value form (`="left"`, `="right"`, `="scale"`) for left/right column pairs; About and Contact both use `left` on the text column and `right` on the visual.
6. Write the responsive rules into an existing `max-width: 960px` or `max-width: 600px` block. Do not create a new breakpoint if 960/600 covers it.

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