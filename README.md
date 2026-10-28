# SPS-CARBON

French presentation website for a carbon-accounting platform in development. Designed and built 24 October 2026.

## Run locally

Requires Node.js 20.9+ (validated with Node 24) and npm.

```sh
npm ci
npm run dev
```

Development preview: http://127.0.0.1:3000

```sh
npm run typecheck
npm run build
npm start
```

The production build is a static export in `out/`. `npm start` serves that export at http://127.0.0.1:3001. Rebuild after source changes. Do not use `next start` with this configuration.

## What is included

- French presentation site (v3) built on the symbol's own geometry: a canvas lattice hero where data cells converge into the SPS ring, scroll-drawn Scope 1/2/3 perimeters, a sticky invoice-to-decision story, offers, a sector source explorer, reasons to choose, a coastline map to El Jadida, resources and FAQ.
- A distinct signature animation on every page (see `docs/design/website-v3-direction.md`), all respecting reduced-motion preferences.
- Fourteen pages: home, platform, solutions, offers, free tools, methodology, carbon standards, company, resources, contact and four legal information pages.
- v6 visual direction "Instrument": glass surfaces, pill controls, floating header, a cockpit hero with a live 2030 reduction slider and a live bento of platform modules.
- v5 (benchmark against greenly.earth, see `docs/research/2026-10-28-greenly-benchmark.md`): one-platform panel on the home page, `/offres` with comparison table, options and an interactive scope builder, `/outils` with an express Scope 1 and 2 calculator (sourced, editable factors) and a MACF / CBAM checker, a three-step guided contact request, six-module tour on the platform page, deliverables on solutions, regulatory timeline on standards.
- Interactive illustrative carbon preview: source tabs, monthly bars, and explained calculations.
- Accessible native dialog with sector-based preparation checklist and a real local download.
- Responsive navigation, FAQ, reduced-motion support and an explicit globe pause control.
- Contact form prepares a local draft for review; the user opens their mail application and chooses whether to send to contact@sps-carbon.ma. Copy fallback is included.

The product is still in development. There are no real customer accounts, verified emissions, certifications, payment flow, lead-submission API, or backend. All preview figures and emission factors are fictional. Checklist entries stay in page memory and the downloaded text; nothing is sent to a server. No analytics or advertising scripts are included.

## Stack

Next.js 16 / React 19 / TypeScript / custom CSS (`src/app/sps.css`) / Canvas 2D / SVG. Manrope is self-hosted under its OFL licence. The coastline in `src/lib/coast.ts` is projected from public-domain Natural Earth data; see `public/data/SOURCES.md`. Page visuals are drawn in code from the brand symbol; the generated landscape and port images remain in `public/images` (the landscape is still used as the social preview image). GSAP stays installed but the v3 pages do not use it. No paid service or external database is required to run the presentation.

The legal pages describe the local preview and flag deployment-specific information still to finalize: actual hosting and mail providers, processing locations, retention and applicable CNDP formalities. They do not certify compliance. The underlying research and launch checklist are in `docs/research/2026-10-24-moroccan-website-legal.md`.

## Deploy to Vercel

Use this directory as the project root. Import the repository into an authorized Vercel account, select the Next.js framework preset, and use `npm run build`. The static export is configured in `next.config.ts`. No secrets are needed for the website itself.

For social sharing, Vercel's `VERCEL_PROJECT_PRODUCTION_URL` is used when available. Set `NEXT_PUBLIC_SITE_URL` to an actual canonical HTTPS domain when one is chosen, then rebuild. Local builds intentionally omit the social image URL instead of inventing a public domain.

No Vercel deployment has been created by this build: an authenticated Vercel account is not available in the current environment. The existing product decision to use Vercel is preserved; no alternative hosting account has been registered.

## Logo kit

`public/brand/brand-kit.zip` contains transparent SVG/PNG masters for dark, light and monochrome usage, symbol-only versions, outlined wordmarks, small exports, source and font licence. Main paths:

- `public/brand/logo-dark.svg` and `logo-light.svg`
- `public/brand/symbol-dark.svg` and `symbol-light.svg`
- `public/brand/logo-family.png`
- `docs/brand/brand-guidelines.md`

All master logos have outlined text and can be used without installing fonts. Consult the guide for clear space and sizes. Original symbol construction is saved under `docs/brand/source/`.

## Documentation and verification

Domain research lives in `docs/research/`. The current direction is `docs/design/website-v6-direction.md` (visual direction B, "Instrument"; content upgrades in v5; earlier: v4 and `docs/design/website-v3-direction.md`); current verification is `docs/design/verification-v3.md`. Earlier directions and verifications are kept for reference. v3 was checked visually in Chromium through a preview harness; run `npm run build` locally to confirm the static export.
