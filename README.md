# The Andy Lab

Static website for The Andy Lab — strength training and nutrition coaching by Andy.

**Live:** [theandylab.com](https://theandylab.com)

## Pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `andy.html` | About Andy |
| `manifesto.html` | THE Manifesto — 7 principles |
| `lab.html` | THE Lab 1:1 — 13-week coaching program |
| `shop.html` | THE Method — guides & content |
| `proteina.html` | Guide 01 — Protein |
| `suplementos.html` | Guide 02 — Supplements |
| `viaje.html` | Guide 03 — Travel |
| `404.html` | Custom 404 page |

## Stack

Pure static HTML/CSS/JS — no build step, no dependencies.

- **Fonts:** Bebas Neue + Inter (Google Fonts)
- **CSS:** `assets/site.css` (shared design system) + page-specific `<style>` blocks
- **JS:** `assets/site.js` (nav, scroll reveals, ES/EN language toggle, progress bar)

## Brand

- **Burgundy base:** `#4a0101` → `#150101`
- **Accent red:** `#d40e26` (`--accent` CSS variable)
- **Type:** Bebas Neue (headings), Inter (body)
- **Bilingual:** ES/EN toggle persisted in `localStorage`

## Assets

```
assets/
  site.css        shared design system
  site.js         nav, reveals, language toggle, progress bar
  img/
    pepper.png    logo icon
    hero-sheep.png    OG/hero image
    andy-*.jpeg   Andy photos
    principle-*.png   manifesto principle images
    hero-viaje.jpg    travel guide hero
```

## Deployment

Static hosting (GitHub Pages, Netlify, Vercel, etc.). No build required — serve from root.

For GitHub Pages, enable Pages in repo settings and set source to the `main` branch root.

## SEO

- `sitemap.xml` — all 8 pages
- `robots.txt` — allows all crawlers, references sitemap
- Each page has `<title>`, `<meta description>`, Open Graph, and `<link rel="canonical">`
