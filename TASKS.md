# Tasks

## Current Architecture

- [x] Split runtime data into `scripts/data-core.js` and `scripts/story-data.js`.
- [x] Extract reusable game rules into `scripts/engine.js`.
- [x] Keep `scripts/app.js` focused on UI, browser storage, online demo mode, import/export, and navigation.
- [x] Reorganize runtime JavaScript into `scripts/` and CSS into `styles/`.
- [x] Update service worker cache after file split.
- [x] Update README with script order and file responsibilities.

## Next Improvements

- [ ] Add a lightweight automated browser smoke test when a JS runtime/browser runner is available.
- [ ] Consider splitting `scripts/story-data.js` into `story-books.js`, `story-gear.js`, and `story-maps.js` if hand-written story content grows.
- [ ] Add validation helpers for story data: missing targets, duplicate section numbers, unreachable unlocks, and impossible requirements.
- [ ] Consider lazy-rendering the reference page sections in smaller chunks for very large searches.
- [ ] Add a tiny migration note if older saves ever need format upgrades beyond normalization.
