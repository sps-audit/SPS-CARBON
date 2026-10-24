# SPS-CARBON logo guidelines

The visual wordmark is **SPS CARBON**. Use **SPS-CARBON** in ordinary text, product names, URLs, and filenames.

## Construction

The custom symbol is drawn on a 64 × 64 unit grid. Three separate horizontal bands form a compact S silhouette. The top and bottom bands use open curved terminals; these suggest a carbon C and a continuous measurement process. Broad, level bands keep the mark precise and calm. The paired 4-unit openings preserve separation at small sizes. The visible symbol occupies 52 × 52 units, from x/y 6 to 58.

The wordmark uses Manrope at variable weight 650 with adjusted letter spacing and is converted entirely to vector paths. No font installation is required to display, place, or print the SVG masters. The lockup has a 316.55 × 64 viewBox.

## Files and use

| File | Use |
| --- | --- |
| `logo-dark.svg` | Primary horizontal logo on white, mineral, or sage |
| `logo-light.svg` | White horizontal logo on midnight or a similarly dark solid background |
| `symbol-dark.svg` / `symbol-light.svg` | Small spaces, avatars, and places where the product name is already clear |
| `logo-black.svg` / `symbol-black.svg` | Single-colour black printing |
| `wordmark-*.svg` | Text-only identity when the symbol is already present nearby |
| `logo-family.png` | Four-variant review sheet; this has a coloured background and is not a logo master |
| `brand-kit.zip` | Portable package containing the masters, PNGs, guide, font and its licence |

SVG is preferred for interfaces, browser use, layouts, and print workflows that accept it. Matching transparent PNG files are provided for email, documents, slide decks, and tools without SVG support. Horizontal and wordmark PNGs are 2400 px wide; symbol PNGs are 1024 × 1024 px. High-resolution PNGs include 300 ppi metadata. Small symbol exports are also supplied at 24, 32 and 48 px.

## Colour

| Colour | Hex | RGB | Role |
| --- | --- | --- | --- |
| Midnight | `#132D38` | 19, 45, 56 | Primary logo ink and dark surfaces |
| Mineral | `#F6F8F6` | 246, 248, 246 | Light surfaces |
| Sage | `#BDCCB5` | 189, 204, 181 | Supporting surface and quiet accents |
| White | `#FFFFFF` | 255, 255, 255 | Reversed logo |
| Black | `#000000` | 0, 0, 0 | Single-colour reproduction |

The logo itself is always a single solid colour. Use the black master for one-ink printing. For process printing, let the print provider convert colour under the actual output profile rather than assuming a universal CMYK value.

## Clear space and size

Keep clear space of at least **16 grid units**, or one quarter of the 64-unit symbol canvas, around the visible artwork. Increase this to half the canvas height for a cover, title slide, or stand-alone presentation. The built-in canvas padding is not the full clear-space allowance; add layout spacing around the asset.

- **Symbol:** 24 × 24 px canvas minimum digitally; use 32 px or larger when possible. Print at least 8 mm tall.
- **Horizontal lockup:** 180 px wide minimum digitally. Print at least 40 mm wide. Use the symbol alone below the lockup minimum.
- **Wordmark:** 140 px wide minimum digitally; print at least 30 mm wide.

Use the supplied proportions. Do not stretch, rotate, outline, recolour individual bands, add shadows or gradients, close the openings, or move the wordmark relative to the symbol. Place it on a quiet surface with enough contrast. SVG and logo PNG masters have transparent backgrounds.

## Typography and provenance

Wordmark: **Manrope**, variable weight **650**, drawn as outlines. Interface typography may use the same family independently; the logo is a fixed piece of artwork and should not be retyped.

The original variable font, OFL licence, and FONTLOG are included in `fonts/`. Manrope is credited to The Manrope Project Authors and distributed under the SIL Open Font License 1.1. Font source: [Google Fonts / Manrope](https://github.com/google/fonts/tree/main/ofl/manrope). The exact licence is included as `fonts/OFL.txt`.

Font binary SHA-256: `3ae11c49db0455a3cc33e37d380f20fdb8c7f8b41dc07625c177e3d87a9d6ae6`.

The symbol is original geometric artwork created for this project. Its three filled paths are preserved in the SVG masters and the source generator in `docs/brand/source/build-logo.py`.
