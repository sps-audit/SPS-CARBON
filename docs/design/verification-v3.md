# Website v3 verification — 24 October 2026

The npm registry is not reachable from the build workspace, so `next build` could not run there. Verification used:

- A preview harness that transpiles the real `src/` with TypeScript and renders every route with React 19 in Chromium (Playwright), stubbing only `next/link`, `next/navigation` and `next/font/local`.
- Desktop (1440 × 900) and phone (390 × 844) screenshots of all 13 routes, plus intro frames of the hero and identity animation.
- 29 scripted interaction checks, all passing: scope, demo and sector tabs (arrow keys, Home/End, focus follows), demo calculation panel, bar readout, FAQ, checklist dialog (open, step 2, real download, Escape, focus return), mobile menu (open, Escape, focus return, background inert), contact draft flow (validation, review focus, mailto, edit).
- Reduced motion: final states render immediately (lattice, rings, motifs).
- Automated audit on all routes: one `h1` per page, no heading skips, landmarks present, every image has `alt`, every control has a name, text contrast ≥ 4.5:1 (≥ 3:1 large), targets ≥ 24 px. No console errors, no horizontal overflow at 390 px.
- Type-check run on the project folder with its installed TypeScript (see delivery notes).

Still to do on the user's machine: `npm run build`, then `npm start` and a quick look at http://127.0.0.1:3001 to confirm the static export.
