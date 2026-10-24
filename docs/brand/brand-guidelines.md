# SPS-CARBON identity guidelines

The visual wordmark is **SPS CARBON**. Use **SPS-CARBON** in ordinary text, product names, URLs and filenames. **SAFEPERFORM SOLUTIONS** is the parent company; it does not appear inside the product logo.

## Construction and meaning

The original symbol is a single filled shape drawn on a 64 × 64 grid. Its six-sided perimeter references a carbon ring. Removing part of the right side turns that structure into the initial **C**. Two parallel cuts descend from left to right through the opening, suggesting a measured reduction trajectory. The result connects the name, the scientific subject and the intended direction of progress in one compact form.

The visible shape occupies x = 6–58 and y = 3–61. Its broad body, open centre and 8-unit diagonal gap retain the form at small sizes. It is an abstract identity symbol, not a chemical formula or a claim about a particular carbon molecule.

The wordmark uses **Manrope 600**, with adjusted tracking, converted entirely to vector paths. The horizontal lockup has a **314.873 × 64** viewBox. Every master is independent of installed fonts, with no strokes, masks, filters, bitmap images or external dependencies. The symbol is one closed path.

## Files and use

| File | Use |
| --- | --- |
| `logo-dark.svg` | Primary petrol logo on white or ice backgrounds |
| `logo-light.svg` | Ice logo on petrol or another dark, solid background |
| `logo-black.svg` | One-ink black printing |
| `logo-viridian.svg` | Viridian logo on petrol for controlled accent applications |
| `symbol-dark.svg` / `symbol-light.svg` | Avatars and small spaces where the product name is already clear |
| `symbol-black.svg` / `symbol-viridian.svg` | One-ink reproduction and brand accent applications |
| `wordmark-*.svg` | Text-only identity when the symbol is already present nearby |
| `favicon.svg` / `favicon.ico` | The carbon-ring symbol, with 16, 32 and 48 px embedded ICO sizes |
| `symbol-dark-16.png` through `symbol-dark-512.png` | Native-size application and browser icons |
| `logo-family.png` | Identity review sheet; its coloured background is part of the presentation |
| `brand-kit.zip` | Portable masters, PNGs, font licence, guidelines and reproducible source |

SVG is preferred for interfaces, browser use, layouts and print workflows that accept it. Transparent PNGs are provided for email, documents, slide decks and tools without SVG support. Horizontal and wordmark PNGs are 2400 px wide; symbol PNGs are 1024 × 1024 px. These high-resolution PNGs include 300 ppi metadata. Native-size symbol exports are supplied at 16, 24, 32, 48, 64, 180, 192 and 512 px.

## Palette

| Colour | Hex | RGB | Role |
| --- | --- | --- | --- |
| Petrol | `#071F27` | 7, 31, 39 | Primary logo ink and dark surfaces |
| Viridian | `#29C792` | 41, 199, 146 | Positive progress, selected actions and brand accents |
| Ice | `#F3F8F7` | 243, 248, 247 | Reversed logo and light surfaces |
| Amber | `#DFB77A` | 223, 183, 122 | Restrained secondary highlight |
| Black | `#000000` | 0, 0, 0 | Single-colour reproduction |

The logo itself is one solid colour. Amber is a supporting presentation colour and is not a logo variant. Viridian belongs on petrol when used as a logo. Use the petrol logo on a viridian surface. Do not place viridian or amber text on ice for small reading text. For process printing, ask the provider to convert under the actual output profile rather than assuming a universal CMYK value.

## Clear space and minimum sizes

Keep clear space of at least **16 grid units**, or one quarter of the 64-unit symbol canvas, beyond the visible artwork. Use more space for a cover, title slide or standalone presentation. The canvas padding is not the full clear-space allowance.

- **Symbol:** 24 × 24 px minimum for normal digital use; 32 px or larger preferred. The dedicated 16 px favicon is reserved for browser chrome. Print at least 8 mm tall.
- **Horizontal lockup:** 180 px wide minimum digitally; 40 mm minimum in print.
- **Wordmark:** 140 px wide minimum digitally; 30 mm minimum in print.

Preserve the supplied proportions and spacing. Do not stretch, rotate, outline, split into separate colours, add shadows or gradients, close the diagonal opening or move the wordmark relative to the symbol. Use a quiet background with strong contrast. SVG and logo PNG masters have transparent backgrounds.

## Typography and provenance

The exact Manrope variable font, its OFL licence and FONTLOG are included in `fonts/`. The font is credited to The Manrope Project Authors and distributed under the SIL Open Font License 1.1. Source: [Google Fonts / Manrope](https://github.com/google/fonts/tree/main/ofl/manrope). The logo is fixed artwork and should not be retyped.

Font SHA-256: `3ae11c49db0455a3cc33e37d380f20fdb8c7f8b41dc07625c177e3d87a9d6ae6`.

The symbol is original geometric artwork created for this project. Its filled path is preserved in the SVG masters and the generator at `docs/brand/source/build-logo.py`. The prior three-band S concept is preserved separately in `docs/archive/brand-v1`; it is not part of the current identity or download kit.

## Verification

The export script checks all 12 logo masters for standalone filled-path construction, renders 12 transparent high-resolution PNGs and verifies their size and 300 ppi metadata. At 16, 24 and 32 px, it checks that the ring remains a single connected shape and that its central counter connects through the diagonal opening to the exterior. The family sheet is also visually reviewed.
