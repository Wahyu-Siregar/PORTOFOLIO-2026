# Neubrutalism Portfolio — Wahyu Muliadi Siregar

Personal portfolio for **Wahyu Muliadi Siregar** — Computer Science student at Universitas Islam Riau, focused on **Cybersecurity**, **Digital Forensics**, and **AI-driven analysis**.

Rebuilt in 2026 with a **Light Classic Neubrutalism** theme and a split CSS architecture for easier maintenance.

## Features

- **Neubrutalism design language** — thick black borders, hard offset shadows (no blur), high-saturation accents (yellow / pink / blue / green / lilac), chunky display type.
- **Bento hero** — asymmetric grid with photo, quick facts, "now working on", socials, and tagline in a single composition.
- **Modular CSS** — split into `base`, `layout`, and `components` files, all imported from a single entry (`main.css`).
- **Separated JS** — all logic lives in `js/main.js` (no inline scripts).
- **Accessible** — semantic landmarks, visible focus rings, `prefers-reduced-motion` support, WCAG-AA color contrast on accent backgrounds.
- **Responsive** — bento grid collapses gracefully across desktop, tablet, and mobile breakpoints.
- **No build step** — plain HTML, CSS (vanilla), and vanilla JS. Open `index.html` and go.

## Structure

```
.
├── index.html                  # Main portfolio page (12 sections)
├── css/
│   ├── main.css                # Entry: @imports base / layout / components
│   ├── base.css                # Tokens, reset, typography
│   ├── layout.css              # Header, bento hero, section grids, footer
│   └── components.css          # Buttons, cards, chips, modal, etc.
├── js/
│   └── main.js                 # Scroll progress, reveal, menu, modal, ticker
├── assets/                     # Photo & project cover images
├── certificates/               # Certificate PDFs and webp thumbnails
├── favicon.svg
├── CNAME
└── README.md
```

## Page Sections

1. Header (sticky) + mobile nav
2. System status strip (online indicator, focus ticker, location, year)
3. **Bento hero** — name, photo, tagline + CTA, "now working on", quick facts, socials
4. About narrative (paragraphs + principles aside)
5. Services (4 colored cards)
6. **Skills / Tech Stack** — grouped by Security, AI/ML, Embedded, Web & Data
7. Portfolio — featured SmartDiscover + 4 project cards
8. **Timeline / Journey** — 5 milestones (2023 → 2026), zig-zag on desktop
9. **Credentials** — certificate cards with PDF viewer modal
10. Stats (3 colored cards)
11. Contact — link cards + big CTA
12. Footer

## Design Tokens

All colors, shadows, spacing, and radius values live as CSS custom properties in `css/base.css` under `:root`. To retheme, edit that single block.

```css
--bg: #f5f1e8;         /* cream paper */
--ink: #0a0a0a;        /* pure black borders & text */
--accent-yellow: #ffe14d;
--accent-pink:   #ff6fb5;
--accent-blue:   #4d7cff;
--accent-green:  #7ee07e;
--accent-lilac:  #c9a7ff;
--accent-orange: #ff8a3d;
--shadow-md: 6px 6px 0 var(--ink);
```

## Technical Stack

- HTML5
- CSS3 (vanilla, split via `@import`)
- Vanilla JavaScript (no framework)
- Google Fonts: Archivo Black, Inter, Space Mono

## Local Development

No build step. Just open `index.html` in any modern browser:

```powershell
# From the project root
start index.html
```

Or serve it through any static server of your choice (e.g. `npx serve .`, `python -m http.server`, VS Code Live Server).

## Maintenance Tips

- Tweak a **color or shadow** → edit `css/base.css` (`:root`).
- Add / change a **section layout** → edit `css/layout.css`.
- Restyle a **button / card / chip / modal** → edit `css/components.css`.
- Add a **new skill / portfolio item / timeline entry** → edit `index.html` only.
- Add a **new certificate** → drop the PDF + webp thumbnail into `certificates/`, then add a `.credential-card` in the Credentials section.

## Contact

- **Email**: [wahyumuliadisiregar@gmail.com](mailto:wahyumuliadisiregar@gmail.com)
- **GitHub**: [Wahyusrg0819](https://github.com/Wahyusrg0819)
- **LinkedIn**: [wahyu-muliadi-siregar](https://www.linkedin.com/in/wahyu-muliadi-siregar-7971a139a)
- **Location**: Riau, Indonesia

## License

© 2026 Wahyu Muliadi Siregar. All rights reserved.
