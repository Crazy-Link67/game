# Journey to the West

A vanilla HTML/CSS/JavaScript choose-your-own-adventure PWA. It runs offline after the first load, stores saves in the browser, and generates six uniquely named 500-section books.

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

Opening `index.html` directly works for basic play, but install/offline PWA features require `localhost` or HTTPS.

## What is included

- Title menu with Settings, New Game, Load Game, Codeword Hack, Maps, Exit, and Continue Game after a save exists.
- Six original inspired heroes with Health, Strength, Wisdom, Agility, and Spirit.
- Six uniquely named books with 500 numbered sections each.
- A data-driven section engine with stat, item, flag, money, and book unlock requirements.
- A d6 roll option when a choice is blocked only because one stat is too low; the bonus lasts for that action only.
- A top-screen Undo button for travel choices, map jumps, stat upgrades, cheat-code use, and temporary dice rolls.
- Optional online mode with a leaderboard ranked by total collected money and chat; without a hosted endpoint it uses a local demo.
- Device-local saves, settings, inventory, money, codeword, map progress, and stat upgrades.
- Service worker and manifest for offline install support.

## Codeword

`bloodhound6721` maxes out the current hero, unlocks every book, reveals numbered map sections, and grants sample route rewards.
