# Athidhi — website draft

Plain static site: HTML + CSS + vanilla JS. No build step. GitHub Pages ready.
German is the default language; EN toggle in the header. `?lang=en` / `?lang=de` also force a language.

## File structure
- index.html — home (promo banner, nav with dropdowns, hero, about, menu teaser, services, branches, reserve)
- branches/wiesloch.html, heidelberg.html, karlsruhe.html, stuttgart.html — per-branch pages
- css/styles.css
- js/main.js — language toggle, mobile nav, dropdowns, promo carousel, flipbook menu
- assets/branches/*.jpg — real interior photos per branch
- assets/menu/de/1..26.jpg — German menu pages (flipbook)
- assets/menu/en/1..26.jpg — English menu pages (flipbook)
- assets/logo-gold.png, logo-green.png, mandala.svg

## Menu flipbook
Each branch page shows the menu as a page-turning flipbook, built from your menu PDFs
(DE + EN). To update: replace the images in assets/menu/de/ and assets/menu/en/ (same
filenames, same order), or edit the page list in the small <script> block near the top of
each branch page (window.ATHIDHI_MENU_PAGES).

Wiesloch omits the South Indian pages (source pages 4 and 5) per your note; the other three
branches show all 26 pages. If you want South Indian back on Wiesloch (or removed from another
branch), change that page list.

## Reservations (allO) — you fill in
"Tisch reservieren" buttons point to placeholder hooks: #ALLO_BOOKING_URL_WIESLOCH etc.
Replace each with the real allO booking link for that branch, OR paste an allO embed/iframe
into #allo-widget (home) / the info card (branch pages). Look for the "allO booking hook" comments.

## Online ordering
"Online bestellen" links currently point to your existing athidhi-bestellen.de pages.
Change these if you move ordering to allO.

## Opening hours
Hours were pulled from athidhi.de per branch. Please confirm they are current before publishing.

## Host on GitHub Pages
1. Create a repo (e.g. athidhi-web), upload these files at the repo root (keep the folder structure).
2. Settings -> Pages -> Source: main branch, / (root). Site goes live at the Pages URL.
3. Point athidhi.de at it later via a CNAME if desired.


<!-- preview publish pipeline check 2026-07-22 -->
