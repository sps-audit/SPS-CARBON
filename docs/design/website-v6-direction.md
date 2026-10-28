# SPS-CARBON v6 — Direction B, "Instrument"

Chosen 28 October 2026 among three explored directions (A Atlas, B Instrument, C Preuve; canvas "SPS-CARBON — Directions visuelles").

- Idea: the product is the hero, shown as an object. Glass surfaces with a lit top edge and soft depth, pill controls, rounded panels, mint light behind deep sections. Brand kept: petrol, ice and mint, Archivo with its width axis; the hexagon stays in the logo, bullets, badges and data marks.
- Home hero (`hero-instrument.tsx`): centred headline "Votre bilan carbone, enfin pilotable.", a glass dashboard in perspective and three floating cards. The 2030 reduction goal is a real slider: projection, curve and example plan recalculate. The deck and cards drift with the pointer on fine pointers only; nothing moves under reduced motion. Tablets and phones get a flat stack with the slider first.
- Home platform section (`platform-bento.tsx`): "Tout votre carbone, sur un seul écran", six live modules (scenarios, collection ring, quality alerts that can be marked fixed, scopes, MACF sheet, traceability chain), each linking to the page that explains it.
- Global layer at the end of `sps.css` ("v6"): glass tokens per version and per surface (`--g-*`), pill buttons (`btn-glass` added), floating glass header with a pill highlight in the mega menu, round theme switch, glass cards, rounded panels, shared `.range` control. Dark version: smoked petrol glass; ink buttons on deep surfaces turn mint.
- Honesty unchanged: fictional company and figures are labelled; the example plan says its effects are quantified with the client.
- `hero-cockpit.tsx` and `platform-pillars.tsx` are no longer used (kept for rollback; safe to delete).

## v6.1 — Smoothness and every page

- Scrolling: the motion layer now reads every position first and writes only changed values (no forced layout per section); backdrop blur is kept only where content moves behind the glass (header, menus, floating hero cards).
- Home hero: the dashboard settles flat and the cards spread as the page scrolls; the curve glides to its new shape when the goal moves.
- Inner pages: the page motif sits in a floating glass instrument that tilts gently with the pointer (mouse only, static under reduced motion); the table of contents is a glass reading guide with the active section highlighted; the closing call in the footer is a lit glass panel; cards and modules carry a light that follows the cursor.
- Large screens: wider container from 1800 px, root type scales from 2300 px (2K) and 3000 px (4K); the hero instrument is sized in rem so it keeps its proportions. All graphics are vector or CSS, sharp at any pixel density.
- Checked: 14 pages, light and dark, 390 px and 1440 px, plus 2560 and 3840 px and 3x density; no script errors, no horizontal overflow, every reveal reached; keyboard path, menus, theme switch, slider and modules exercised.
