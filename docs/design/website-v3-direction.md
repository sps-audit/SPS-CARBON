# SPS-CARBON v3 — The ring and the trajectory

Request (24 October 2026): a distinctive, premium enterprise site, specific to SPS-CARBON rather than a SaaS template; an expressive animation on every page; simple, very professional layouts; remove generic visuals (globe, marquee, stock-style photography) in favour of elements made for the brand. French first. No invented clients, certifications, results or features.

## Visual language

Everything is drawn from the symbol: the hexagonal carbon ring, the open C and its two parallel descending cuts (slope 7/12).

- Palette (brand tokens): petrol `#071F27` / deep `#04151A`, ice `#F3F8F7`, viridian/mint `#29C792` for what moves or matters, amber `#DFB77A` only for "estimated / to define" states.
- Type: Manrope (brand font, self-hosted). Display at weight 300 with tight tracking; 600 for small headings; tabular figures for data. No all-caps labels, no eyebrow labels.
- Shape: buttons and panels carry the symbol's diagonal cut on their lower-right corner. Lists use small hexagon markers. Numbering only where the content is a sequence (story steps, methodology).
- Layout: 12-column asymmetric grid, left-aligned text, alternating petrol and ice chapters, generous spacing.

## Motion

One signature per page, all from the same geometry, all non-blocking, final state under `prefers-reduced-motion`.

| Page | Signature |
| --- | --- |
| Accueil | Canvas lattice: scattered data cells converge into the SPS ring, then the two cuts extend into a descending trajectory. Pointer softly lights the lattice; scrolling disperses the cells (depth). |
| Accueil, scopes | Three hexagonal perimeters draw in with scroll; tabs highlight each scope. |
| Accueil, story | Sticky "ledger": invoice line → factor → tCO₂e in Scope 2 → monthly trend with trajectory. Native scroll, no pinning. |
| Accueil, cabinet | Moroccan coastline (Natural Earth 1:110m, coastline only) draws with scroll to El Jadida. |
| Plateforme | Scattered unit cells settle into a register, one thread reads them to a traceable result. |
| Solutions | Nested perimeters (Scopes 1–2, Scope 3) and a separate product spur for MACF / CBAM. |
| Méthodologie | Six steps placed along the symbol's parallel cuts; a marker travels once. |
| Cabinet | Coastline drawing with the El Jadida pin. |
| Ressources | A checklist sheet whose items tick in sequence. |
| Contact | Your company and SAFEPERFORM connected; three messages travel, a "cadrage" comes back. |
| Identité | Symbol construction on the 64-unit grid: frame, perimeter, inner ring, cuts, fill, annotations. |
| Pages légales | A calm lattice where one column lights per section of the page. |

Rules: no scroll hijacking, no infinite loops (pulses run three times at most), interactions under 300 ms, delight orchestrations 1–4 s and never blocking input.

## Removed

Animated globe with world routes, marquee band, orbital tags, AI-generated landscape and port photography on pages (files kept in `public/images` for history and social preview), giant outlined footer wordmark. Previous components and styles archived in `docs/archive/website-v2/`.
