# SPS-CARBON v9: "Planches" (23 Nov 2026)

The user shared a new reference set (`Pictures\designe-lot`, 23 images) and asked for a new way of
presenting the product: not a generic SaaS page, the product shown the way a desktop application is
shown, and each image placed only where its character fits.

## The method

A **plate** ("planche") is one atmosphere image that holds one real fragment of SPS-CARBON:

- the fragment sits under a **double-rim bezel**: a frosted 7 px outer rim around an opaque card
  with a hairline, corners concentric (`calc(var(--r-l) + var(--rim))`);
- **registration marks** sit outside the plate's four corners, like a print proof; the plate's
  number ("Planche 03") and the "Données d'exemple" chip sit on its top edge;
- the explanation is written **beside or under** the plate, never on the picture;
- film grain over every plate keeps enlarged blurs crisp and ties the plates together;
- plates are numbered across the home page (01 to 05 the modules, 06 the offers, 07 the mission).

Components: `plate.tsx` (Plate, Bezel), `plate-showcase.tsx`, `offer-plate.tsx`, `phase-plate.tsx`.
Content: `src/lib/plates.ts`. Styles: `src/app/styles/plates.css`.

## What changed on the home page

| Section | Before | Now |
| --- | --- | --- |
| Tout votre carbone, sur un seul écran | a bento grid of six tiles | a squared sheet with five keycaps (1 to 5, a real tablist) and a specimen label; one plate per module with its live fragment |
| Trois façons de commencer | three cards, one dark | three numbered specimen records on one plate; the featured one in the bezel, in the plate's light; sideways scroll on a phone |
| Comment se déroule une mission | a descending line of five steps | five stacked phase cards ("Étape 2 sur 5", the same five-point track with its own point lit, what you bring and receive, what comes next) |

The hero (glass dashboard) is kept on purpose: it was restored by the user on 18 Nov.

## Image map: where each image goes, and why

Rule: low-detail blurs can carry glass and cards; high-detail images only sit behind a small opaque
card, never under running text; dark images belong to night plates; grids are drawn, never shipped
as photos.

| Image (file in `designe-lot`) | Character | Name on the site | Where | Why there |
| --- | --- | --- | --- | --- |
| Leaf macro, sharp veins (`22.55.39` ×4, one kept) | high detail, structure | `nervure` | Planche 03 *Calculer* | veins = each tonne traced back to its invoice; only a small opaque card on it |
| Dark grass in motion (`download.jfif`) | dark, forward motion, low resolution | `elan` | Planche 04 *Piloter* (night plate) | motion toward 2030; used at plate size only, the grain hides the softness |
| Green and white bloom (`19.36.24 (2)`) | soft, a light at the centre | `eclaircie` | Planche 06, the offers | the light falls on the featured formula in the middle |
| Palest lime grain (`19.36.23`) | calmest, almost no detail | `clairiere` | Planche 07, the mission | the most text on any plate: it needs the quietest ground |
| Soft diagonal blur (`19.31.37`, already used) | soft stage | `voile` | hero, Planche 01 *Collecter* | white tiles and dashed lines read best on its mid green |
| Vertical light (`19.32.29`, already used) | soft stage | `lumiere` | Planche 02 *Contrôler*, footer | a calm stage for a list of checks |
| Lime waves (`19.30.41`, already used) | saturated, energetic | `vagues` | Planche 05 *Transmettre* (with the drawn grid), the tonne, closings | the closing step: the dossier sent |
| Soft leaf (`19.29.53`, already used) | medium detail | `feuille` | the invoice story (Le relevé) | unchanged |
| Field in motion (`19.31.25`, already used) | terrain, horizon | `champ` | one site and its three scopes, 404 | unchanged |
| Grid paper with crosses (`19.36.23 (1)`) | a texture, not a photo | drawn in CSS | the showcase sheet (millimetre grid, crosses every 48 px) | sharp at every size and in both themes; the JPEG is 640 px wide |
| Green blur with a grid (`19.36.23 (2)`) | a texture, not a photo | drawn in CSS | the grid over Planche 05 | same reason |

Not used, on purpose:

- **`IA.jpg`** (the IA mark on a leaf): the logo and "SAFEPERFORM SOLUTION" are baked into the
  photo, and on the platform SPS IA has one face only, the jade bead. Fit for a social post, not for
  the interface.
- **The interface captures** (meeting tool, question bank, AI agent, usage dashboard, phase cards,
  assignees, keycap tabs): method only. Their texts, people, avatars and brands are never copied.
- **The cloud sky**: warm beige and blue, outside the palette.
- **Duplicates**: `19.36.24 (1)` and `19.36.25 (1)` are the same file; the four `22.55.39` leaves are
  the same photograph with small edits (one kept).

## Encoding

`nervure`, `elan`, `eclaircie`, `clairiere`: AVIF and WebP at two widths per shape (`large` turned a
quarter where the source is portrait, `haut`), sharp from Next's own dependency, run outside the
project. Blurs weigh 3 to 21 KB; the leaf is softened by 0.8 px to stay near the weight of `feuille`
(76 KB AVIF at 1440 px).

## Platform

The sign-in card takes the same double rim (spread shadows on `.auth-card`, `src/styles/auth.css`
in the platform). Nothing else on the platform: its rule keeps photographs away from figures,
statuses, steppers and charts, and "the reading" style approved on 22 Nov stays as it is.
