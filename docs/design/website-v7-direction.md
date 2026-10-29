# SPS-CARBON v7 — "Instrument de précision"

Continues Direction B ("Instrument", chosen 28 October 2026) and rebuilds the whole site on one coherent system. Goal set on 29 October 2026: every page in the new design, a more professional presentation of the platform, a typeface that does not read as a default, and motion that belongs to the product.

## Audit of v6.1 (what was wrong)

- Old v3–v5 language still on most pages: hexagon diagrams (scopes, sectors, page heroes, footer rings, hexagon bullets, hexagon step markers), the same hexagon scope picture reused on two page heroes.
- One section template everywhere (title left, grey paragraph right, then a grid of identical cards). Pages read as a template, not as a product.
- Weak or negative signals: the "3 / 15 / 6 / 1" figures band ("1 interlocuteur"), the development status repeated in the hero, a section lead, the FAQ, the footer and the platform page body, and platform copy written as a project plan ("envisagé", "prévu", "le parcours cible").
- Small, low-contrast body text; Archivo wide headlines everywhere.
- Gradient washes and mint glows used as decoration.

## Typeface

Mona Sans (GitHub's superfamily, by Degarism Studio and Sebastian Carewe, SIL OFL 1.1), self-hosted from the official repository with `next/font/local`, subset to Latin and French, one variable file with three axes:

- `opsz` 0–100: the browser picks the display design for large sizes and the text design for reading sizes (`font-optical-sizing: auto`).
- `wdth` 75–125: normal width for headlines and text, a slightly condensed width for dense data, a wider width for instrument readouts.
- `wght` 200–900.

One family, used with intent; no monospace, no all-caps labels. The logo keeps its own Archivo artwork (it is fixed vector art).

## Colour

Brand palette from `public/brand/brand-guidelines.md`: Petrol `#071F27`, Viridian `#29C792`, Ice `#F3F8F7`, Amber `#DFB77A`.

- Light (default): ice paper, white instruments, petrol ink. Viridian marks verified data and selection, never small text on ice. Amber marks a point to check.
- Dark: petrol paper, smoked-glass instruments, ice ink, viridian signal.
- Night chapters (petrol) give the light site its rhythm: the platform story and the footer.
- No decorative gradients. Light comes from one direction, on glass only.

## Materials

- Instrument (glass): only for product screens, the header and floating cards. Lit top edge, hairline rim, long tinted shadow.
- Sheet: white or petrol panel with a hairline, for content that is not product UI.
- Rule: hairlines and space separate content; not everything is a card.

## Brand device

The logo's two parallel descending cuts ("a measured reduction trajectory") become the site's graphic device: two parallel lines that descend, used for the engagement path, the closing call and the page transition. The hexagon stays in the logo only.

## Motion language

One vocabulary, taken from measuring instruments:

1. Mise au point: headlines come into focus (blur to sharp, a hint of letter-spacing), line by line.
2. Balayage: an instrument panel is read by a scan line that passes once; the content resolves behind it.
3. Aiguille: key figures settle on their value with a damped spring instead of a linear count-up.
4. Le relevé (home): a pinned scroll story; an electricity invoice becomes a checked line, a calculation, a scope, a trajectory and a report.
5. Jauge: a graduated reading gauge replaces the "Dans cette page" card; the header carries the page progress.
6. Obturateur: page changes close and reopen like a shutter on the brand diagonal.

Everything is transform, opacity, clip or filter on small elements; nothing animates layout. Under reduced motion everything is shown at once, without movement.

## Information architecture

- Home: hero instrument, reference frameworks, why now, Le relevé, one-screen modules, who it is for, sectors, comparison, offers and free tools, engagement path, data principles, questions.
- Inner pages share one header (title, lead, a page-specific instrument), one reading layout with the gauge, and one closing call.
- Copy: present tense for the method the firm applies today; one honest status line ("en cours de déploiement") on the platform page and in the footer; demonstration screens keep their "données d'exemple" chip.

## Implementation notes

- Styles live in `src/app/styles/` as cascade layers (`tokens, base, layout, controls, chrome, sections, components, motion, utilities`), imported in that order by `layout.tsx`. Avoid `!important` outside `motion.css`: under `!important` an earlier layer wins, so it would defeat the reduced-motion rules.
- Scroll effects read the position once per frame through `scroll-store.ts` and only compare cached positions; geometry is re-measured on resize, on `fonts.ready` and when the body changes size. Scroll values are written on the one element that uses them.
- Reveals: until the visitor scrolls, everything already on screen comes in (no blank band at the fold); while scrolling, an element comes in when its top passes 92 % of the viewport.
- Floating cards inside the 3D hero deck use a near-opaque surface: a backdrop blur is not reliable inside a 3D context.
- Single-column grids use `minmax(0, 1fr)`, never `1fr`, so long unbreakable content cannot widen a phone layout.

## Checks run before delivery

- 14 routes × light and dark × 390 and 1440 px: no script errors, no content left hidden, no horizontal overflow.
- Menus, phone menu, page shutter, checklist dialog and the theme sweep exercised in a browser.
- 2560 px, 3840 px and 3× pixel density checked for proportion and sharpness.
- `tsc --noEmit` clean. A real `next build` is run on the publishing machine (`verifier-build.cmd`).
