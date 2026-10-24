# Rebuilding the SPS CARBON identity

The generator produces filled-path SVGs for the carbon-ring symbol, outlined wordmark, horizontal lockup and review sheet. The export script renders transparent PNGs and multi-resolution favicons. It checks standalone paths, transparency, dimensions, 300 ppi metadata and the open, connected geometry at small sizes.

Requirements: Python 3 with `fonttools`, and Node.js with `sharp`. Run from the project root:

```sh
python docs/brand/source/build-logo.py
node docs/brand/source/export-and-verify.cjs
python docs/brand/source/build-kit.py
```

In this workspace, the generator also finds the existing fontTools installation at `docs/brand/.tools`. The bundled Python runtime can be used when `python` is unavailable on PATH. No build dependency is included inside the public download kit.

The exact source font is `public/brand/fonts/Archivo-Variable.ttf`, instantiated at width 125: weight 780 for SPS and 470 for CARBON. Its licence and provenance are included in the same folder. The output masters contain no live text and require no font installation.

The mark is the single `MARK` polygon in `build-logo.py`: a carbon-ring C with two parallel diagonal terminals. Keep that geometry identical in every variant and favicon. The colour palette and grid specifications are recorded in `public/brand/brand-manifest.json`.

`build-kit.py` copies the current usage guide into the public asset folder, packages the current files and source, then verifies the archive. The former S identity is preserved in `docs/archive/brand-v1` and the Manrope wordmark in `docs/archive/brand-v2`; both are intentionally absent from the current kit.

Where `sharp` is not installed, the PNGs can be rendered with Playwright instead: same 2400 px width, transparent background and 300 ppi.
