<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# SPS-CARBON website: engineering rules

Read this before changing any code. The site is a static export (`output: "export"`)
hosted on Vercel: no server code, no secrets, no runtime API of our own.

## Check before every commit

- `npm run typecheck` must pass. Also keep the stricter pass clean:
  `npx tsc --noEmit --noUnusedLocals --noUnusedParameters --noImplicitReturns --noFallthroughCasesInSwitch`.
- `npm run build` (or `verifier-build.cmd`) must end with `BUILD_EXIT=0`, then `npm start`
  and open the pages you changed, on desktop and phone widths, light and dark: the
  browser console stays empty.

## Structure

- Pages in `src/app`, components in `src/components`, content and data in `src/lib`
  (texts in `editorial.ts`, legal texts in `legal.ts`, company facts in `company.ts`).
  Content changes go to `src/lib`, not into components.
- Styles are split by layer in `src/app/styles/*.css` with CSS cascade layers and the
  brand tokens. No new colour, radius or font outside the tokens.
- Scroll effects read from the one shared reader (`src/components/scroll-store.ts`);
  never add another scroll listener that forces layout.

## Effects, motion and performance

- Every `useEffect` that adds a listener, observer, timer or animation frame returns a
  cleanup that removes it. Scroll and touch listeners are `{ passive: true }`.
- Animations stop when off screen or when the tab is hidden, and respect
  `prefers-reduced-motion`. No continuous `requestAnimationFrame` loop without a stop.
- Images: AVIF/WebP with explicit width and height; nothing heavier than needed above the fold.

## Browsers

- Supported: Chrome/Edge 111+, Safari 16.4+, Firefox 113+, desktop and mobile.
  `backdrop-filter` always with its `-webkit-` twin; newer APIs (view transitions,
  clipboard) only behind a feature check with a working fallback.

## Security

- `vercel.json` sends the Content-Security-Policy and security headers. A new external
  service (form delivery, booking, analytics) must be added to `connect-src` /
  `form-action` there, and to the legal pages.
- No secret in the code: only public keys (`NEXT_PUBLIC_*`) may reach the browser.

## Git

- Commits under the `sps-audit` account, message in French, one logical change per commit.
- Pushing `main` deploys to Vercel: build locally first.
