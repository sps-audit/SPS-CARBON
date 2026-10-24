# Website redesign verification — 24 October 2026

- `npm run build` passed, including TypeScript and static page generation.
- Served export at http://127.0.0.1:3001 checked: all 12 intended pages return HTTP 200 and contain the main content target.
- Checked every local href/src and local anchor in the served pages against exported files and target IDs: no broken targets.
- Verified that the served home contains the new industrial image, rather than the earlier placeholder.
- Contact is a local draft/review/mailto flow, with clipboard failure handling and no false submission confirmation.
- All hero images, fonts and map geometry are served locally. No analytics or advertising code added.
- Reduced motion skips GSAP entrance/scroll animation and globe animation. Globe has an explicit pause button, viewport visibility and hidden-document checks. Scope scrolling falls back to manual tabs below 900px.
- New company content uses the supplied company identity and contact@sps-carbon.ma. No bank details, invented phone, clients, certification or production account claims published.
- Browser visual and interaction QA could not be performed: cua.getTab for the local preview still reports “Local browser use is disabled in Work settings.” Responsive behavior is implemented but has not been visually verified at device sizes.
- Legal pages explicitly identify local preview status; infrastructure details and actual CNDP formalities require completion before public launch.

This record distinguishes source/build/HTTP verification from visual acceptance. The redesigned preview is available for the user to inspect now.
