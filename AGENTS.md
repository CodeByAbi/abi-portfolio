# AGENTS.md — operating rules for this repo

Static site. No build step, no framework, no dependencies. Plain `index.html` + `css/style.css` + `js/main.js`,
served as-is by GitHub Pages. There is nothing to install and nothing to compile.

---

## ⛔ DO NOT TOUCH THE HERO SECTION

The hero is finished, tuned, and verified. It is the most-changed component in the repo and it is
**correct as it stands**.

**Do not change anything in the hero without the user's explicit permission first. Ask, and wait for a
yes, before you edit.** This covers the `#hero` markup in `index.html`, every `.hero-*` rule in
`css/style.css` (including the breakpoint blocks and the `--hero-media-*` tokens), and any hero
behaviour in `js/main.js`. It covers size, position, alignment, spacing, copy, colour, motion, and
the portrait. It does not matter how small, safe, or obviously better the change looks.

- A request about another part of the page is **not** permission to touch the hero, even if the hero
  is "nearby", shares a rule, or would look better with it. If a change elsewhere would spill into the
  hero (a shared rule, a later breakpoint block, a global token), stop and tell the user before
  proceeding.
- Never refactor, "clean up", restyle, or "fix" the hero on your own initiative, and never act on a
  hero problem you spotted yourself. Report it and let the user decide.
- Permission is per change. A yes for one hero edit does not carry over to the next one.
- Once the user does say yes, make only the change they approved, then re-run the verification below.

This is not a soft preference. The hero has been changed three times in one session by two
different agents, and each "improvement" made it worse before it made it better. Read this
section before touching anything near `#hero`.

### The invariant that must hold

**The photograph's top edge sits 0.4 x the nickname font-size (about 38px at the 94px ceiling) ABOVE
the cap-height of the first h1 line, "I build AI systems".** This is a tuned nudge, not a typographic
alignment: it started level with the "Abira Wisnunggal" cap-height, was moved down to level with the
h1 cap-height, then moved up slightly, all at the user's explicit request. Measured within 1px of the
formula at 800, 1024, 1078, 1280, 1512 and 1920px. The portrait is also larger than it was:
`width: min(38vw, 500px)` (was 420px) in a shell widened to 1240px with an `auto` portrait column.

The whole point of the current CSS is to produce that placement:

```css
.hero-profile {
  align-self: start;      /* pin cell to row top == .hero-copy top */
  margin-top: calc(1.64 * clamp(48px, 7.2vw, 94px) + 16px + 0.07 * clamp(30px, 4.2vw, 58px) - 12.22px);
}
```

`1.64 x nicknameFS` is two nickname lines (2 x 1.02) minus the 0.4 nudge; `16px` is the nickname's
margin-bottom; `0.07 x h1FS` is the h1's cap-height offset (Newsreader 500); `12.22px` is the gold
plate's constant frame inset. The long comment on `.hero-profile` in `style.css` has the arithmetic.
**It assumes "Abira Wisnunggal" wraps to two lines**, which holds at every desktop width measured;
if the wordmark ever fits on one line, or the display face or hero type scale changes, re-measure.

**Do not "correct" it back** to the old wordmark alignment (`0.0206 * font-size - 12.22px`) or to the
exact h1 cap-height (`2 * 1.02`, no nudge). Those were earlier states. And do not measure against the
`.hero-nickname` or `.hero-name` *box*: the box includes leading above the cap-height, so use a canvas
`measureText` cap-height at the live font-size.

**Why the portrait column is `auto` and the shell is 1240px:** a fixed 430px track left the 388px photo
floating in dead space. Do not widen the photo by growing a fixed track; it comes out of the copy
column, and "Wisnunggal" (~5.4em wide) clips once the copy column drops under it at ~1024px.

### The trap — read this before "fixing" the alignment

`align-self: center` looks like the obviously-correct thing to write. **It is wrong here.**
The copy column is visually top-heavy (a 94px wordmark over a 58px tagline), so centring the
portrait in that column drops it to sit beside the *tagline*, leaving the entire top-right
quadrant empty. It reads as broken even though it is mathematically centred.

If you change one thing here, you will break it. If you must touch it, re-run the verification
below and confirm the 0px delta still holds before you finish.

### The second trap — mobile

At `max-width: 767px` `.hero-shell` becomes a **flex column**, so `align-self` switches from
controlling the vertical axis to controlling the **horizontal** one. The base rule's
`align-self: start` would left-align the portrait. That breakpoint therefore **must** keep an
explicit `align-self: center`. Never hoist the base alignment rule into the mobile block, and
never "clean up" the mobile override as redundant — it is load-bearing.

### The two tokens — change both, or neither

`--hero-media-ar: 779 / 595` and `--hero-media-inset: 16px` (both near the top of `style.css`).

- `--hero-media-ar` is the **intrinsic** ratio of the source photograph, referenced at three use
  sites: `.hero-profile`, `.hero-profile-frame`, `.hero-profile-frame img`.
- `--hero-media-inset` is the offset distance of the gold plate, referenced in `.hero-profile-frame`.

If the photo is ever swapped, change `--hero-media-ar` and nothing else. If you hardcode a ratio
in a component instead of using the token, the photo can no longer be swapped safely.

### Why the portrait is a rounded rectangle, not a circle

The source photo is **779×595 (1.309:1 landscape)**. A `1:1` circle with `object-fit: cover` shows
only **76.4% of the photo's width** — about 24% is cropped — and because he stands at the far
left of the frame, a centred crop cuts the "BRIN" wordmark down to a single "B". **Enlarging a
circle does not fix this**: the visible *fraction* is fixed by the aspect-ratio mismatch, so a
bigger circle just scales the same crop to more pixels. Matching the container ratio to the photo
ratio is what produces zero crop.

Do not "restore the circle." It cannot show this photograph.

### The gold band — how it works

`.hero-profile-ring` is `position: absolute; inset: 0`, filling the grid cell exactly.
`.hero-profile-frame` is `calc(100% - (2 * var(--hero-media-inset)))` — **smaller** than the cell
and centred in both axes. The visible gold band is produced by **shrinking the frame**, never by
growing or translating the ring. Because cell and frame share an aspect ratio, a 16px horizontal
inset yields only ~12px of vertical band. Do not replace this with a `top`/`left` offset on the
ring — that breaks the symmetry.

---

## How to verify a change (do this, don't eyeball it)

The hero uses scroll-triggered reveal animations, so a naive screenshot catches elements
mid-fade and tells you nothing about final geometry. Chrome is installed at
`C:\Program Files\Google\Chrome\Application\chrome.exe`.

Write a throwaway copy of `index.html` with the animations forced to their end state:

```powershell
$raw = Get-Content "index.html" -Raw
$style = '<style>*,*::before,*::after{animation-duration:.001s!important;animation-delay:0s!important;transition-duration:.001s!important}[data-reveal]{opacity:1!important;transform:none!important}.hero-name .word span{opacity:1!important;transform:none!important}</style></head>'
Set-Content "_shot.html" -Value ($raw -replace '</head>',$style) -Encoding UTF8 -NoNewline
& "C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-sandbox `
  --user-data-dir="$env:TEMP\cprof" --hide-scrollbars --virtual-time-budget=6000 `
  --window-size=1512,900 --screenshot="$env:TEMP\shot.png" `
  "file:///D:/users/abira/Downloads/abi-portfolio/_shot.html"
Remove-Item "_shot.html" -Force
```

Two caveats learned the hard way:

- **`--headless=new` silently fails here**; plain `--headless` works.
- **`--window-size` is not a device viewport.** Requesting `390,844` renders at `508` wide and
  writes a 390px PNG, so the right side looks clipped. That is a harness artifact, *not* a layout
  bug. For real geometry, inject a probe that writes `getBoundingClientRect()` values into the DOM
  and read them back with `--dump-dom` — assert `document.documentElement.scrollWidth ===
  clientWidth` to rule out horizontal overflow, and compare `.hero-profile` against
  `.hero-nickname` for the alignment delta.

Never commit a `_shot.html` / `_measure.html` harness file. Delete it when done.

---

## Other traps in this repo

- **Asset filenames use hyphens, not spaces** — `assets/img/abi-brin.jpeg`. Keep it that way; a
  space forces `%20` URL-encoding in every reference.
- **`assets/pdf/Abira Wisnunggal CV.pdf` is live.** It is linked from two "Resume" buttons
  (`index.html:70` and `:88`). Its filename contains real spaces and must be URL-encoded in
  markup. This file was deleted from the working tree at one point, silently breaking both
  buttons — if a Resume link 404s, check this file exists before anything else.
- **`og:image` / `twitter:image` are only 779×595**, below Twitter's preferred ~1200×630 for
  `summary_large_image`. Known limitation, not an oversight. Fixing it means generating a real
  1200×630 social card, not pointing at the existing photo.
- **`.gitattributes` LFS-tracks `assets/vid/*.mp4` only.** Images commit as ordinary files. There
  is a 374MB video in `assets/vid/` — do not try to inline or re-encode it casually.
- **`css/style.css` is ~1700 lines of accumulated overrides**, and later breakpoint blocks win by
  source order, not specificity. `max-width: 600px` deliberately overrides the `767px` values.
  Before changing a responsive value, check whether a later block re-overrides it.

## Branches

- `main` — deployed via GitHub Pages.
- `feat/enhance-ui` — current work. The landscape hero portrait and this rule live here.
- `develop` — currently still at the old `76a03e3` and does **not** contain the hero work.

Do not assume `develop` is the integration branch; confirm with `git log --oneline --all` first.
