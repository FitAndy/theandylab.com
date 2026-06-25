# The Andy Lab

Bilingual (ES/EN) static marketing site for **The Andy Lab** — strength training & nutrition coaching.
Plain HTML/CSS/JS, no build step, no dependencies. Deploys as-is to GitHub Pages.

## Pages
| File | Purpose |
|------|---------|
| `index.html` | Home — hero, the shift, Andy, manifesto teaser, THE Lab 1:1 offer, platform, CTA |
| `manifesto.html` | The 7 principles |
| `shop.html` | THE Shop — free guide + upcoming guides |
| `viaje.html` | Free guide: *Entrenar y comer cuando viajas* (light theme, long-read) |
| `404.html` | Branded not-found page |

## Shared assets
```
assets/
  site.css      design system — burgundy base, brand red #d40e26, nav, footer, buttons
  site.js       nav, scroll reveals, ES/EN language toggle (persists in localStorage), progress bar
  img/          logo (pepper), hero photo, manifesto posters
```

## Brand colors (strict)
- Burgundy base `#4a0101` (darkening toward `#150101` for depth)
- Accent: brand red `#d40e26` **only**
- White text on dark backgrounds
- **Never** pink, salmon, or any pastel/washed-out red.

## Deploy to GitHub Pages
1. Create a repo and push these files to the **root** (the `.gitignore` keeps `uploads/` and editor scratch files out).
2. Repo → **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main` / `/ (root)` → **Save**.
3. Your site goes live at `https://<user>.github.io/<repo>/` within a minute.

`.nojekyll` is included so GitHub serves every file as-is (no Jekyll processing).

## Custom domain (theandylab.com)
The canonical URLs, `sitemap.xml`, `robots.txt` and social-share tags point at `https://theandylab.com/`.
To use that domain:
1. Add a file named `CNAME` at the repo root containing one line: `theandylab.com`
2. In Settings → Pages → **Custom domain**, enter `theandylab.com` and enable **Enforce HTTPS**.
3. At your DNS provider, point the domain to GitHub Pages (A records to GitHub's IPs, or a `CNAME` record for `www`).

If you deploy to a different URL, update the absolute links in `sitemap.xml`, `robots.txt`, and the `og:`/`canonical` tags in each HTML `<head>`.

## Notes
- Fonts (Bebas Neue + Inter) load from Google Fonts CDN — the live site needs internet. Ask to self-host them in `assets/` for a fully offline build.
- Language preference is shared across pages via `localStorage` (`tal_lang`).
- External links are intentional and should stay: Waitlist (`tally.so/r/XxNP4Y`), Newsletter (`theandylab.substack.com`), Instagram (`instagram.com/the_andy_lab/`).
