# SPS-CARBON Website Implementation Plan

> Native implementation by the primary agent with bounded asset and review delegation, within the user's explicit request to build now.

**Goal:** A complete premium French presentation website and reusable monochrome logo kit.
**Architecture:** Next.js static export with client interaction components; fictional product data is local and clearly labeled. Separate logo assets, illustration, page sections, and styles.
**Tech Stack:** Next.js 16, React 19, TypeScript, GSAP, CSS.
**Spec:** docs/design/website-direction.md

## Global constraints
- French first; respect reduced motion and keyboard access.
- Product in development, no invented social proof, actual signup, verified results or certification.
- Vercel-ready static build, no extra paid hosting or services.
- Logo family includes symbol and wordmark for both light and dark backgrounds, SVG and PNG.

## Review focus
- Small screens: navigation, typography and demo do not overflow horizontally.
- Keyboard: modal focus trapping, Escape and restoration, all buttons operable.
- Motion preference: content visible and useful without GSAP or animation.
- Demo integrity: no unavailable-data-to-zero, no false Moroccan factors, labeled fictional.
- Assets: genuine downloads, no broken paths, font-independent logos.

## Deliverables
- [x] App shell in src/app/layout.tsx, page.tsx, globals.css; hero component and local typography.
- [x] Interactive evidence preview and guided modal in src/components, sample data in src/lib.
- [x] Original landscape and logo kit under public; brand gallery page.
- [x] Typecheck, production build, dependency audit, static paths and HTTP verification.
- [x] Final source review, fixes, README with run and Vercel deployment instructions.
- [ ] Rendered desktop/mobile QA, browser interactions and screenshots: blocked by Work browser settings; see docs/design/verification.md.

Presentation changes are checked visually and via interaction; no low-value implementation-mirroring unit tests. Meaningful reference calculation checked independently where used.
