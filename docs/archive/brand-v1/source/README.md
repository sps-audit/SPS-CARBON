# Rebuilding the logo assets

The source generator produces filled-path SVGs for the symbol, wordmark, horizontal lockup, and review sheet. The export script renders the PNGs and checks path-only masters, transparency, dimensions, resolution metadata, and 24 px openings.

Requirements: Python 3 with `fonttools`, and Node.js with `sharp`. Run these commands from the project root:

```sh
python docs/brand/source/build-logo.py
node docs/brand/source/export-and-verify.cjs
```

`public/brand/fonts/Manrope-Variable.ttf` is the exact source font. Its licence and provenance are in the same folder. All output logo SVGs are font-independent. Keep `docs/brand/brand-guidelines.md` and the public copy of the guide in sync after changes.
