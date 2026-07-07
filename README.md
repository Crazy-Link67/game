# Journey to the West: Frontier Trails

A vanilla HTML/CSS/JavaScript Wild West choose-your-own-adventure PWA. It runs offline after the first load, stores saves in the browser, and generates eleven uniquely named 1,000-section books on paper-style story pages.

## Run locally

From this folder, use Python if it is installed:

```powershell
python -m http.server 8080
```

If Python is unavailable, use the included PowerShell server:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open:

```text
http://127.0.0.1:8080
```

The full playable content reference is available at:

```text
http://127.0.0.1:8080/game-reference.html
```

Opening `index.html` directly works for basic play, but install/offline PWA features require `localhost` or HTTPS.

## What is included

- Title menu with Settings, New Game, Load Game, Codeword Hack, Maps, Exit, and Continue Game after a save exists.
- Export and import saves as JSON so progress can move to another device.
- Six Wild West hero classes with custom or random proper character names.
- Health, Strength, Wisdom, Agility, and Spirit, with weapons/items adding stat bonuses.
- Frontier weapons and mounts in hero starting gear and section rewards.
- Mounts unlock battle escape routes when a fight breaks out.
- Trail markets appear in numbered sections so coins can be spent on weapons, mounts, and useful gear.
- Eleven uniquely named frontier books with 1,000 numbered sections each.
- End-of-section route choices with a boxed destination number and a sentence describing what happens when it is clicked.
- A data-driven section engine with stat, item, flag, money, and book unlock requirements.
- World maps for every book, with book-specific terrain textures, region names, and visited travel markers.
- A compass-and-crossed-pistols SVG app logo used by the title screen and PWA icon.
- A realistic frontier picture atlas used by the reference page's hero, gear, map, and story panels.
- A d6 roll option when a choice is blocked only because one stat is too low; the bonus lasts for that action only.
- A top-screen Undo button for travel choices, map jumps, stat upgrades, cheat-code use, and temporary dice rolls.
- Optional online mode with a leaderboard ranked by total collected money and chat; without a hosted endpoint it uses a local demo.
- Device-local saves, settings, inventory, money, codeword, map progress, and stat upgrades.
- Service worker and manifest for offline install support.
- `game-reference.html` shows the logo, heroes, gear, maps, codeword, books, and all generated sections.
- `styles/pictures.css` stores the reusable picture-panel styles used by the reference file.
- `styles/styles.css` stores the main app layout, parchment, map, and story scene styles.
- `assets/frontier-picture-atlas.png` provides the realistic picture panels for the reference page.
- `scripts/data-core.js` stores the small shared data shell: base stats, codeword bootstrap, and empty collections.
- `scripts/story-data.js` owns the Wild West story pack, hero/gear lists, maps, book metadata, and generated sections.
- `scripts/engine.js` owns reusable game rules: stat math, item bonuses, requirements, section entry, effects, codeword max-out, and target resolution.
- `scripts/app.js` owns browser UI, rendering, storage, online demo mode, import/export, text to speech, and screen navigation.
- `scripts/version.js` stores the shared `yy.mm.dd.hh` version shown at the bottom of the game and reference pages.
- `data.js` is kept only as a compatibility breadcrumb; active runtime data is loaded from `scripts/data-core.js` and `scripts/story-data.js`.

## Codeword

`bloodhound6721` maxes out the current frontier hero, sets money to 999999 coins, unlocks every book, reveals numbered map sections, and grants all weapons, mounts, legendary gear, and sample route rewards.

## Architecture Notes

The app intentionally has no build step. Script order matters:

```html
scripts/version.js
scripts/data-core.js
scripts/story-data.js
scripts/engine.js
scripts/app.js
```

Keep story content and generated book routes in `scripts/story-data.js`. Keep reusable rules in `scripts/engine.js`. Keep rendering and browser APIs in `scripts/app.js`. Keep CSS in `styles/` and static media in `assets/`. This split keeps the engine testable, prevents the story data from making the UI file huge, and keeps offline/PWA caching simple.
