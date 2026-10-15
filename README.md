# Dovetail

Website for Dovetail, a digital design studio. Plain HTML, CSS and vanilla JavaScript, with no framework and no build step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page markup: header, hero, work, services, studio, process, contact, footer |
| `styles.css` | All styling, driven by CSS custom properties (design tokens) |
| `case-study-crewnox.html` | The real case study (Crewnox website redesign), with its screens hosted on Framer |
| `case-study-*.html` | Four concept case study pages (Fieldnote, Tidewell, Marrow & Co., Plotline), each with overview, process and the screens shipped |
| `script.js` | Mobile menu, concept brief toggles, services accordion, contact form validation |

## Case studies

Each card in Selected Work has a **View case study** link to its own page. The pages share `styles.css`, and the mock screens are built from HTML and CSS, so there are no image files. To swap in real screenshots, replace the contents of a `.shot-art` block with an `<img>`.

## Design tokens

Defined at the top of `styles.css`:

| Token | Value |
| --- | --- |
| `--ground` | `#F1EBE0` |
| `--paper` | `#F7F2E9` |
| `--ink` | `#1E1B18` |
| `--muted` | `#6B6256` |
| `--line` | `#CFC5B3` |
| `--sand` | `#D8CDB8` |
| `--accent` | `#A8401F` |

Fonts: Instrument Serif (headlines) and Manrope (body), loaded from Google Fonts.

## Contact form

The form validates name, email and message, then opens the visitor's email app with the message ready to send to dovetail.digital@gmail.com. To use a form service instead, replace the `mailto:` step in `script.js` with a request to its endpoint.

## Deploy

The site is static, so any static host works. For GitHub Pages: Settings → Pages → deploy from the `main` branch, root folder.

## Accessibility

- Menu, brief toggles and services accordion use `aria-expanded` / `aria-controls`
- Form errors use `aria-invalid`
- Scroll and entrance animations are disabled under `prefers-reduced-motion`
