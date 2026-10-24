# Website verification — 24 October 2026

## Delivered

- French presentation page and identity gallery, implemented in Next.js/TypeScript.
- Original Atlas-inspired generated image, exported as WebP (377,246 bytes); original preserved.
- Hero entrance, user-triggered contour reveal, scroll-linked method artwork, source-switching chart, visible data limits, explained source calculations, FAQ, sector-based checklist and downloads.
- SVG/PNG logo family with outlined wordmark, light/dark/black variants and ZIP.
- Static production export suitable for Vercel; no alternative hosting account registered.

## Checks actually run

- `npm run build`: passes, homepage and identity page statically rendered; no metadata warnings in final build.
- `npm run typecheck`: passed; final build also performs TypeScript checking.
- `npm audit --audit-level=moderate`: zero reported vulnerabilities. The local `serve` utility's compression dependency is overridden to patched 1.8.2, following [the package advisory](https://github.com/advisories/GHSA-vc2v-76pw-4v95).
- Both built HTML pages checked for French language, local asset paths and anchor destinations: 21 unique local references, no missing paths or fragments.
- Production preview HTTP checks: 22 routes/assets returned 200, including homepage, `/identite`, brand ZIP, scripts, stylesheet, font, logos and landscape.
- Demo reference arithmetic independently checked: 120,000 kWh; 16,000 litres; 60 t electricity + 40 t fuel = 100 t total. These are illustrative factors, not factors for Moroccan reporting.
- Brand assets visually inspected as a PNG sheet. Logo agent verified outlined SVGs, transparent PNGs and ZIP integrity.
- Fresh independent source review completed. Four findings fixed and re-reviewed: overview evidence must explain both sources; dialog step focus; mobile navigation focus order/restoration; static export-compatible start command.

## Browser verification limitation

Browser control for Chrome and IAB returned `Local browser use is disabled in Work settings`. The user indicated they would enable it; retries were still blocked at the time of this record. No Playwright/browser workaround was used.

Consequently rendered responsive layout, actual mouse/touch/keyboard interactions, focus containment and restoration, animations, and reduced-motion behavior have **not** been browser-verified. Source review and successful compilation do not establish visual QA. The production preview is available locally at http://127.0.0.1:3001 for review.

## Deployment and workspace

No authenticated Vercel CLI configuration or VERCEL_TOKEN was found in the checked standard locations. No Vercel deployment exists yet. README contains build and deployment instructions.

Automatic approval review blocked removal of task-created temporary font tooling (`docs/brand/.tools`) with the stated reason `blocked by policy`. It remains ignored and excluded from the website and brand ZIP; no user files were deleted.
