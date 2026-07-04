(function () {
  const app = document.querySelector("#app");
  const data = window.GameData;
  const savesKey = "jttw:saves";
  const settingsKey = "jttw:settings";
  const activeSaveKey = "jttw:activeSaveId";
  const onlineLocalKey = "jttw:onlineLocal";
  const defaultSettings = {
    theme: "light",
    fontSize: "16",
    reduceMotion: false,
    onlineMode: false,
    playerName: "Wandering Hero",
    onlineApiUrl: ""
  };
  const statNames = Object.keys(data.baseStats);
  let deferredInstallPrompt = null;
  let state = {
    view: "title",
    toast: "",
    installMessage: "",
    rollBoost: null,
    onlineData: null
  };

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    state.installMessage = "Install is available from this screen or your browser menu.";
    if (state.view === "settings") render();
  });

  app.addEventListener("click", onClick);
  app.addEventListener("submit", onSubmit);
  app.addEventListener("change", onChange);

  init();

  function init() {
    applySettings(loadSettings());
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {
        state.installMessage = "Offline cache could not start from this browser session.";
      });
    }
    render();
  }

  function render() {
    applySettings(loadSettings());
    const screens = {
      title: renderTitle,
      heroes: renderHeroSelect,
      game: renderGame,
      load: renderLoad,
      settings: renderSettings,
      codeword: renderCodeword,
      maps: renderMaps,
      online: renderOnline,
      exit: renderExit
    };
    app.innerHTML = (screens[state.view] || renderTitle)();
  }

  function renderTitle() {
    const saves = getSaves();
    const hasSave = saves.length > 0;
    const settings = loadSettings();
    return `
      <main class="screen title-screen">
        <section class="title-copy">
          <p class="eyebrow">Offline adventure PWA</p>
          <h1>Journey to the West</h1>
          <p class="subtitle">Choose a hero, unlock six books, use a one-action die roll when your stats fall short, and travel a mythic western road that keeps your progress on this device.</p>
          <div class="menu-grid" role="list">
            <button class="primary" data-action="new-game">New Game</button>
            ${hasSave ? '<button class="secondary" data-action="continue-game">Continue Game</button>' : ""}
            <button data-action="load-game">Load Game</button>
            <button data-action="codeword">Codeword Hack</button>
            <button data-action="maps">Maps</button>
            ${settings.onlineMode ? '<button data-action="online">Online</button>' : ""}
            <button data-action="settings">Settings</button>
            <button class="quiet" data-action="exit">Exit</button>
          </div>
          ${toastHtml()}
        </section>
        <section class="hero-art" aria-label="A compass over the western road"></section>
      </main>
    `;
  }

  function renderHeroSelect() {
    return `
      <main class="screen">
        ${topbar("Choose Your Hero", "Each hero starts from the same base stats, then gains a different bonus and penalty.")}
        <section class="hero-grid">
          ${data.heroes.map((hero) => heroCard(hero)).join("")}
        </section>
        ${toastHtml()}
      </main>
    `;
  }

  function heroCard(hero) {
    const stats = buildHeroStats(hero);
    return `
      <article class="hero-card">
        <header>
          <div>
            <h3>${escapeHtml(hero.name)}</h3>
            <p class="role">${escapeHtml(hero.role)}</p>
          </div>
          <span class="pill">${hero.startingItems.length} item</span>
        </header>
        <p>${escapeHtml(hero.description)}</p>
        ${statsList(stats)}
        <p class="meta">Starts with ${formatList(hero.startingItems)}.</p>
        <button class="primary" data-action="start-hero" data-hero-id="${hero.id}">Start as ${escapeHtml(hero.name)}</button>
      </article>
    `;
  }

  function renderGame() {
    const save = getActiveSave();
    if (!save) return missingSaveScreen("No active save", "Start a new game or load an existing save to continue.");
    const section = getSection(save.currentBookId, save.currentSectionNumber);
    if (!section) return missingSaveScreen("Section missing", "This book route exists, but that section could not be found.");
    const hero = getHero(save.heroId);
    return `
      <main class="screen game-layout">
        ${screenToolbar()}
        <aside class="sidebar">
          <section class="panel">
            <h2>${escapeHtml(hero.name)}</h2>
            <p class="role">${escapeHtml(hero.role)}</p>
            ${statsList(save.stats)}
            ${upgradePanel(save)}
          </section>
          <section class="panel">
            <h3>Inventory</h3>
            ${listPills(save.inventory, "No items yet.")}
            <h3>Money</h3>
            <p><strong>${save.money || 0}</strong> coins</p>
            <p class="meta">${save.totalMoneyCollected || 0} total collected.</p>
            <h3>Codewords</h3>
            ${listPills(save.codewords, "No codewords yet.")}
          </section>
          <section class="panel">
            <div class="actions">
              <button data-action="title">Title</button>
              <button data-action="maps">Maps</button>
              <button data-action="save-now">Save</button>
            </div>
          </section>
        </aside>
        <section class="panel">
          <header>
            <div>
              <p class="eyebrow">${escapeHtml(getBook(save.currentBookId).title)} / Section ${save.currentSectionNumber}</p>
              <h1>${escapeHtml(section.title)}</h1>
            </div>
          </header>
          <div class="story-scene" data-art="${escapeHtml(section.art || "Journey")}"></div>
          <p class="story-text">${escapeHtml(section.text)}</p>
          <div class="choices">
            ${section.choices.map((choice, index) => choiceButton(save, choice, index)).join("")}
          </div>
          ${toastHtml()}
        </section>
      </main>
    `;
  }

  function upgradePanel(save) {
    if (!save.upgradePoints) return '<p class="meta">No upgrade points available.</p>';
    return `
      <div class="stat-card">
        <h3>${save.upgradePoints} upgrade point${save.upgradePoints === 1 ? "" : "s"}</h3>
        <div class="actions">
          ${statNames.map((stat) => `<button data-action="upgrade-stat" data-stat="${stat}">+ ${stat}</button>`).join("")}
        </div>
      </div>
    `;
  }

  function choiceButton(save, choice, index) {
    const boost = getChoiceBoost(save, index);
    const check = checkRequirements(save, choice.requirements, boost);
    const lockedClass = check.ok ? "" : " locked";
    const disabled = check.ok ? "" : " disabled";
    const reason = check.ok && boost ? `Rolled +${boost.amount} ${boost.stat}. Use this action now.` : (check.ok ? (choice.hint || "Travel this route.") : check.reason);
    const rollButton = !check.ok && check.canRoll
      ? `<button class="secondary" data-action="roll-stat" data-choice-index="${index}">Roll d6 for ${escapeHtml(check.stat)}</button>`
      : "";
    return `
      <button class="choice-card${lockedClass}" data-action="choose" data-choice-index="${index}"${disabled}>
        <strong>${escapeHtml(choice.label)}</strong>
        <span>${escapeHtml(reason)}</span>
      </button>
      ${rollButton}
    `;
  }

  function renderLoad() {
    const saves = getSaves();
    return `
      <main class="screen">
        ${topbar("Load Game", "Choose a saved road. Saves are stored only in this browser.")}
        <section class="save-grid">
          ${saves.length ? saves.map(saveCard).join("") : '<article class="panel"><p>No saves yet.</p><button class="primary" data-action="new-game">Start New Game</button></article>'}
        </section>
        ${toastHtml()}
      </main>
    `;
  }

  function saveCard(save) {
    const hero = getHero(save.heroId);
    const book = getBook(save.currentBookId);
    return `
      <article class="save-card">
        <h3>${escapeHtml(hero.name)}</h3>
        <p>${escapeHtml(book.title)}, Section ${save.currentSectionNumber}</p>
        <p class="meta">Updated ${new Date(save.updatedAt).toLocaleString()}</p>
        <div class="actions">
          <button class="primary" data-action="load-save" data-save-id="${save.saveId}">Load</button>
          <button class="danger" data-action="delete-save" data-save-id="${save.saveId}">Delete</button>
        </div>
      </article>
    `;
  }

  function renderSettings() {
    const settings = loadSettings();
    const saveCount = getSaves().length;
    const offlineStatus = "serviceWorker" in navigator
      ? "Offline support is enabled when this app is served from localhost or HTTPS."
      : "This browser does not support service workers.";
    return `
      <main class="screen">
        ${topbar("Settings", "Tune the reading experience and manage local saves.")}
        <section class="panel">
          <div class="form-row">
            <label for="theme">Theme</label>
            <select id="theme" data-setting="theme">
              <option value="light"${settings.theme === "light" ? " selected" : ""}>Light parchment</option>
              <option value="dark"${settings.theme === "dark" ? " selected" : ""}>Night road</option>
            </select>
          </div>
          <div class="form-row">
            <label for="fontSize">Text size</label>
            <select id="fontSize" data-setting="fontSize">
              <option value="15"${settings.fontSize === "15" ? " selected" : ""}>Small</option>
              <option value="16"${settings.fontSize === "16" ? " selected" : ""}>Medium</option>
              <option value="18"${settings.fontSize === "18" ? " selected" : ""}>Large</option>
              <option value="20"${settings.fontSize === "20" ? " selected" : ""}>Extra large</option>
            </select>
          </div>
          <label class="form-row">
            <span>Reduce motion</span>
            <select data-setting="reduceMotion">
              <option value="false"${!settings.reduceMotion ? " selected" : ""}>Off</option>
              <option value="true"${settings.reduceMotion ? " selected" : ""}>On</option>
            </select>
          </label>
          <label class="form-row">
            <span>Online mode</span>
            <select data-setting="onlineMode">
              <option value="false"${!settings.onlineMode ? " selected" : ""}>Off</option>
              <option value="true"${settings.onlineMode ? " selected" : ""}>On</option>
            </select>
          </label>
          <div class="form-row">
            <label for="playerName">Player name</label>
            <input id="playerName" data-setting="playerName" value="${escapeHtml(settings.playerName)}" maxlength="24">
          </div>
          <div class="form-row">
            <label for="onlineApiUrl">Online API endpoint</label>
            <input id="onlineApiUrl" data-setting="onlineApiUrl" value="${escapeHtml(settings.onlineApiUrl)}" placeholder="Optional: https://example.com/journey-api">
            <p class="meta">Without an endpoint, online mode uses a local demo leaderboard and chat on this device.</p>
          </div>
          <p class="install-status">${offlineStatus} ${escapeHtml(state.installMessage || "Use your browser install button when available.")}</p>
          <div class="actions">
            <button class="secondary" data-action="install-app"${deferredInstallPrompt ? "" : " disabled"}>Install App</button>
            <button class="danger" data-action="reset-saves"${saveCount ? "" : " disabled"}>Reset ${saveCount} Save${saveCount === 1 ? "" : "s"}</button>
          </div>
          ${toastHtml()}
        </section>
      </main>
    `;
  }

  function renderCodeword() {
    const save = getActiveSave() || getNewestSave();
    if (save && !getActiveSave()) setActiveSaveId(save.saveId);
    return `
      <main class="screen">
        ${topbar("Codeword Hack", "Enter the one cheat code to max out the current hero and open every route.")}
        <section class="panel">
          ${save ? `<p class="meta">Active save: ${escapeHtml(getHero(save.heroId).name)}, ${escapeHtml(getBook(save.currentBookId).title)}.</p>` : '<p>Start or load a game before entering the cheat code.</p>'}
          <form data-form="codeword">
            <div class="form-row">
              <label for="codeword">Codeword</label>
              <input id="codeword" name="codeword" placeholder="bloodhound6721" autocomplete="off"${save ? "" : " disabled"}>
            </div>
            <button class="primary"${save ? "" : " disabled"}>Apply Codeword</button>
          </form>
          <h3>Valid codeword</h3>
          <ul class="code-list">
            ${Object.keys(data.codewords).map((code) => `<li class="pill">${escapeHtml(code.toLowerCase())}</li>`).join("")}
          </ul>
          ${toastHtml()}
        </section>
      </main>
    `;
  }

  function renderMaps() {
    const save = getActiveSave() || getNewestSave();
    if (save && !getActiveSave()) setActiveSaveId(save.saveId);
    return `
      <main class="screen">
        ${topbar("Maps", "Unlocked books and visited sections appear here. Each book is ready for 500 sections.")}
        ${save ? renderMapForSave(save) : '<section class="panel"><p>No save to map yet.</p><button class="primary" data-action="new-game">Start New Game</button></section>'}
        ${toastHtml()}
      </main>
    `;
  }

  function renderOnline() {
    const settings = loadSettings();
    if (!settings.onlineMode) {
      return `
        <main class="screen">
          ${topbar("Online Mode", "Turn on online mode in Settings to use the leaderboard and chat.")}
          <section class="panel">
            <button class="primary" data-action="settings">Open Settings</button>
            ${toastHtml()}
          </section>
        </main>
      `;
    }
    const save = getActiveSave() || getNewestSave();
    const onlineData = state.onlineData || getLocalOnlineData();
    return `
      <main class="screen">
        ${topbar("Online", "Leaderboard ranks players by total collected money.")}
        <section class="online-grid">
          <article class="panel">
            <h2>Worldwide Leaderboard</h2>
            <p class="meta">${settings.onlineApiUrl ? "Using configured online endpoint." : "Local demo mode. Add an API endpoint in Settings for a real worldwide board."}</p>
            ${save ? `<p>Your score: <strong>${save.totalMoneyCollected || 0}</strong> coins.</p>` : "<p>Start or load a game to submit a score.</p>"}
            <div class="actions">
              <button class="primary" data-action="submit-score"${save ? "" : " disabled"}>Submit Score</button>
              <button data-action="refresh-online">Refresh</button>
            </div>
            ${leaderboardHtml(onlineData.leaderboard)}
          </article>
          <article class="panel">
            <h2>Chat</h2>
            <div class="chat-log" aria-label="Online chat messages">
              ${chatHtml(onlineData.chat)}
            </div>
            <form data-form="chat">
              <div class="form-row">
                <label for="chatMessage">Message</label>
                <input id="chatMessage" name="chatMessage" maxlength="160" placeholder="Say something to other travelers"${save ? "" : " disabled"}>
              </div>
              <button class="secondary"${save ? "" : " disabled"}>Send</button>
            </form>
          </article>
        </section>
        ${toastHtml()}
      </main>
    `;
  }

  function renderMapForSave(save) {
    return `
      <section class="book-grid">
        ${data.books.map((book) => {
          const unlocked = save.unlockedBooks.includes(book.id);
          const visited = save.visitedSections
            .filter((entry) => entry.startsWith(`${book.id}:`))
            .map((entry) => Number(entry.split(":")[1]))
            .sort((a, b) => a - b);
          const sectionNumbers = Object.keys(book.sections).map(Number).sort((a, b) => a - b);
          return `
            <article class="book-card${unlocked ? "" : " locked"}">
              <h3>${escapeHtml(book.title)}</h3>
              <p>${unlocked ? "Unlocked" : escapeHtml(book.unlockText)}</p>
              <p class="meta">${visited.length} visited / ${book.sectionCount} planned sections.</p>
              <div class="section-grid">
                ${sectionNumbers.map((sectionNumber) => {
                  const seen = visited.includes(sectionNumber);
                  return `<button class="section-node${seen ? " visited" : ""}${unlocked ? "" : " locked"}" data-action="jump-section" data-book-id="${book.id}" data-section-number="${sectionNumber}"${unlocked && seen ? "" : " disabled"}>Section ${sectionNumber}</button>`;
                }).join("")}
              </div>
            </article>
          `;
        }).join("")}
      </section>
    `;
  }

  function renderExit() {
    return `
      <main class="screen title-screen">
        <section class="title-copy">
          <p class="eyebrow">Journey paused</p>
          <h1>Exit</h1>
          <p class="subtitle">Your browser controls whether a tab can close. Your save stays here, so you can close the tab or return to the title screen.</p>
          <div class="actions">
            <button class="primary" data-action="title">Return to Title</button>
          </div>
        </section>
        <section class="hero-art" aria-label="The road waits"></section>
      </main>
    `;
  }

  function missingSaveScreen(title, message) {
    return `
      <main class="screen">
        ${topbar(title, message)}
        <section class="panel">
          <div class="actions">
            <button class="primary" data-action="new-game">New Game</button>
            <button data-action="load-game">Load Game</button>
          </div>
        </section>
      </main>
    `;
  }

  function topbar(title, subtitle) {
    return `
      <header class="topbar">
        <div>
          <p class="eyebrow">Journey to the West</p>
          <h1>${escapeHtml(title)}</h1>
          <p class="subtitle">${escapeHtml(subtitle)}</p>
        </div>
        <div class="actions">
          ${undoButtonHtml()}
          <button data-action="title">Title</button>
        </div>
      </header>
    `;
  }

  function screenToolbar() {
    return `
      <nav class="screen-toolbar" aria-label="Game actions">
        ${undoButtonHtml()}
        <button data-action="title">Title</button>
        ${loadSettings().onlineMode ? '<button data-action="online">Online</button>' : ""}
      </nav>
    `;
  }

  function undoButtonHtml() {
    return `<button class="secondary" data-action="undo"${canUndo() ? "" : " disabled"}>Undo</button>`;
  }

  function onClick(event) {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "new-game") return setView("heroes");
    if (action === "title") return setView("title");
    if (action === "load-game") return setView("load");
    if (action === "settings") return setView("settings");
    if (action === "codeword") return setView("codeword");
    if (action === "maps") return setView("maps");
    if (action === "online") return openOnline();
    if (action === "exit") return setView("exit");
    if (action === "continue-game") return continueGame();
    if (action === "start-hero") return startHero(button.dataset.heroId);
    if (action === "choose") return choose(Number(button.dataset.choiceIndex));
    if (action === "save-now") return saveNow();
    if (action === "load-save") return loadSave(button.dataset.saveId);
    if (action === "delete-save") return deleteSave(button.dataset.saveId);
    if (action === "reset-saves") return resetSaves();
    if (action === "install-app") return installApp();
    if (action === "upgrade-stat") return upgradeStat(button.dataset.stat);
    if (action === "roll-stat") return rollForChoice(Number(button.dataset.choiceIndex));
    if (action === "undo") return undoLastAction();
    if (action === "jump-section") return jumpSection(Number(button.dataset.bookId), Number(button.dataset.sectionNumber));
    if (action === "submit-score") return submitScore();
    if (action === "refresh-online") return refreshOnline();
  }

  function onSubmit(event) {
    const form = event.target.closest("[data-form]");
    if (!form) return;
    event.preventDefault();
    if (form.dataset.form === "codeword") {
      const input = form.elements.codeword;
      applyCodeword(input.value);
      input.value = "";
    }
    if (form.dataset.form === "chat") {
      const input = form.elements.chatMessage;
      sendChat(input.value);
      input.value = "";
    }
  }

  function onChange(event) {
    const control = event.target.closest("[data-setting]");
    if (!control) return;
    const settings = loadSettings();
    const name = control.dataset.setting;
    settings[name] = ["reduceMotion", "onlineMode"].includes(name) ? control.value === "true" : control.value.trim();
    saveSettings(settings);
    applySettings(settings);
    state.toast = "Settings saved.";
    render();
  }

  function setView(view, toast = "") {
    state.view = view;
    state.toast = toast;
    render();
  }

  function startHero(heroId) {
    const hero = getHero(heroId);
    if (!hero) return setView("heroes", "That hero could not be found.");
    const save = {
      saveId: `save-${Date.now()}`,
      heroId,
      currentBookId: 1,
      currentSectionNumber: 1,
      stats: buildHeroStats(hero),
      inventory: unique(hero.startingItems),
      money: 0,
      totalMoneyCollected: 0,
      flags: [],
      codewords: [],
      unlockedBooks: [1],
      visitedSections: [],
      upgradePoints: 0,
      history: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    enterSection(save, 1, 1);
    upsertSave(save);
    setActiveSaveId(save.saveId);
    setView("game", "Your road begins.");
  }

  function continueGame() {
    const save = getNewestSave();
    if (!save) return setView("heroes", "Start a new game first.");
    setActiveSaveId(save.saveId);
    setView("game");
  }

  function loadSave(saveId) {
    const save = getSaves().find((entry) => entry.saveId === saveId);
    if (!save) return setView("load", "That save is missing.");
    setActiveSaveId(save.saveId);
    setView("game", "Save loaded.");
  }

  function deleteSave(saveId) {
    const saves = getSaves().filter((save) => save.saveId !== saveId);
    localStorage.setItem(savesKey, JSON.stringify(saves));
    if (localStorage.getItem(activeSaveKey) === saveId) localStorage.removeItem(activeSaveKey);
    setView("load", "Save deleted.");
  }

  function resetSaves() {
    localStorage.removeItem(savesKey);
    localStorage.removeItem(activeSaveKey);
    setView("settings", "All saves were reset. Settings were kept.");
  }

  function saveNow() {
    const save = getActiveSave();
    if (!save) return setView("title", "No active save to store.");
    save.updatedAt = new Date().toISOString();
    upsertSave(save);
    setView("game", "Saved.");
  }

  function choose(choiceIndex) {
    const save = getActiveSave();
    const section = save && getSection(save.currentBookId, save.currentSectionNumber);
    const choice = section && section.choices[choiceIndex];
    if (!save || !choice) return setView("game", "That path is not available.");
    const boost = getChoiceBoost(save, choiceIndex);
    const check = checkRequirements(save, choice.requirements, boost);
    if (!check.ok) return setView("game", check.reason);
    pushUndo(save);
    applyEffects(save, choice.effects);
    clearRollBoost();
    enterSection(save, choice.target.book, choice.target.section);
    upsertSave(save);
    setView("game");
  }

  function rollForChoice(choiceIndex) {
    const save = getActiveSave();
    const section = save && getSection(save.currentBookId, save.currentSectionNumber);
    const choice = section && section.choices[choiceIndex];
    if (!save || !choice) return setView("game", "That path is not available.");
    const check = checkRequirements(save, choice.requirements);
    if (!check.canRoll) return setView("game", "A die roll can only help when one stat is too low.");
    const amount = Math.floor(Math.random() * 6) + 1;
    state.rollBoost = {
      saveId: save.saveId,
      bookId: save.currentBookId,
      sectionNumber: save.currentSectionNumber,
      choiceIndex,
      stat: check.stat,
      amount
    };
    const boosted = checkRequirements(save, choice.requirements, state.rollBoost);
    const result = boosted.ok
      ? `You rolled ${amount}. ${check.stat} is high enough for this action.`
      : `You rolled ${amount}. ${check.stat} is still too low for this action.`;
    setView("game", result);
  }

  function jumpSection(bookId, sectionNumber) {
    const save = getActiveSave();
    if (!save) return setView("maps", "No active save.");
    const key = sectionKey(bookId, sectionNumber);
    if (!save.unlockedBooks.includes(bookId) || !save.visitedSections.includes(key)) {
      return setView("maps", "You can only jump to visited sections in unlocked books.");
    }
    pushUndo(save);
    enterSection(save, bookId, sectionNumber);
    upsertSave(save);
    setView("game", "Map route opened.");
  }

  function upgradeStat(stat) {
    const save = getActiveSave();
    if (!save || !statNames.includes(stat) || save.upgradePoints < 1) return setView("game", "No upgrade point available.");
    pushUndo(save);
    save.stats[stat] += stat === "Health" ? 2 : 1;
    save.upgradePoints -= 1;
    upsertSave(save);
    setView("game", `${stat} upgraded.`);
  }

  function applyCodeword(rawCode) {
    const save = getActiveSave() || getNewestSave();
    if (!save) return setView("codeword", "Start or load a game before entering a codeword.");
    const code = normalizeCodeword(rawCode);
    const entry = data.codewords[code];
    if (!entry) return setView("codeword", "Unknown codeword.");
    if (save.codewords.includes(code)) return setView("codeword", `${code} is already active on this save.`);
    pushUndo(save);
    applyEffects(save, entry.effects);
    upsertSave(save);
    setActiveSaveId(save.saveId);
    setView("codeword", `${code} applied. ${entry.description}`);
  }

  async function installApp() {
    if (!deferredInstallPrompt) return setView("settings", "Use the browser install menu if the install button is not available.");
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    setView("settings", "Install prompt closed.");
  }

  function openOnline() {
    state.view = "online";
    state.toast = "";
    render();
    refreshOnline();
  }

  async function refreshOnline() {
    const settings = loadSettings();
    state.onlineData = settings.onlineApiUrl ? await fetchOnlineData(settings) : getLocalOnlineData();
    setView("online", settings.onlineApiUrl ? "Online data refreshed." : "Local online demo refreshed.");
  }

  async function submitScore() {
    const save = getActiveSave() || getNewestSave();
    if (!save) return setView("online", "Start or load a game before submitting a score.");
    const settings = loadSettings();
    const score = {
      playerName: cleanPlayerName(settings.playerName),
      heroName: getHero(save.heroId).name,
      money: save.totalMoneyCollected || 0,
      updatedAt: new Date().toISOString()
    };
    if (settings.onlineApiUrl) {
      const ok = await postOnline(settings, "leaderboard", score);
      if (!ok) return setView("online", "Could not reach the leaderboard endpoint.");
      state.onlineData = await fetchOnlineData(settings);
      return setView("online", "Score submitted.");
    }
    const local = getLocalOnlineData();
    const existing = local.leaderboard.find((entry) => entry.playerName === score.playerName);
    if (existing) {
      existing.heroName = score.heroName;
      existing.money = Math.max(existing.money, score.money);
      existing.updatedAt = score.updatedAt;
    } else {
      local.leaderboard.push(score);
    }
    saveLocalOnlineData(local);
    state.onlineData = getLocalOnlineData();
    setView("online", "Score submitted to local demo leaderboard.");
  }

  async function sendChat(rawMessage) {
    const message = String(rawMessage || "").trim();
    const save = getActiveSave() || getNewestSave();
    if (!save) return setView("online", "Start or load a game before chatting.");
    if (!message) return setView("online", "Type a message first.");
    const settings = loadSettings();
    const chatMessage = {
      playerName: cleanPlayerName(settings.playerName),
      heroName: getHero(save.heroId).name,
      message: message.slice(0, 160),
      createdAt: new Date().toISOString()
    };
    if (settings.onlineApiUrl) {
      const ok = await postOnline(settings, "chat", chatMessage);
      if (!ok) return setView("online", "Could not reach the chat endpoint.");
      state.onlineData = await fetchOnlineData(settings);
      return setView("online", "Message sent.");
    }
    const local = getLocalOnlineData();
    local.chat.push(chatMessage);
    local.chat = local.chat.slice(-50);
    saveLocalOnlineData(local);
    state.onlineData = getLocalOnlineData();
    setView("online", "Message sent to local demo chat.");
  }

  function enterSection(save, bookId, sectionNumber) {
    const section = getSection(bookId, sectionNumber);
    if (!section) return;
    save.currentBookId = bookId;
    save.currentSectionNumber = sectionNumber;
    if (!save.unlockedBooks.includes(bookId)) save.unlockedBooks.push(bookId);
    const key = sectionKey(bookId, sectionNumber);
    if (!save.visitedSections.includes(key)) {
      applyEffects(save, section.effects);
      save.visitedSections.push(key);
    }
    save.updatedAt = new Date().toISOString();
  }

  function applyEffects(save, effects = {}) {
    addUnique(save.inventory, effects.addItems);
    addUnique(save.flags, effects.addFlags);
    addUnique(save.codewords, effects.addCodewords);
    addUnique(save.unlockedBooks, effects.unlockBooks);
    if (effects.maxEverything) maxOutSave(save);
    if (effects.money) addMoney(save, effects.money);
    if (effects.statChanges) {
      Object.entries(effects.statChanges).forEach(([stat, amount]) => {
        if (statNames.includes(stat)) save.stats[stat] += amount;
      });
    }
    if (effects.upgradePoints) save.upgradePoints += effects.upgradePoints;
    if (effects.removeItems) {
      save.inventory = save.inventory.filter((item) => !effects.removeItems.includes(item));
    }
  }

  function undoLastAction() {
    if (state.rollBoost) {
      clearRollBoost();
      return setView("game", "Dice roll undone.");
    }
    const save = getActiveSave();
    if (!save || !save.history || !save.history.length) return setView(state.view, "Nothing to undo.");
    const history = [...save.history];
    const snapshot = history.pop();
    const restored = { ...snapshot, history, updatedAt: new Date().toISOString() };
    upsertSave(restored);
    setActiveSaveId(restored.saveId);
    setView("game", "Undone.");
  }

  function pushUndo(save) {
    const snapshot = cloneForHistory(save);
    const history = Array.isArray(save.history) ? [...save.history] : [];
    history.push(snapshot);
    save.history = history.slice(-50);
  }

  function cloneForHistory(save) {
    const copy = JSON.parse(JSON.stringify(save));
    delete copy.history;
    return copy;
  }

  function canUndo() {
    if (state.rollBoost) return true;
    const save = getActiveSave();
    return Boolean(save && Array.isArray(save.history) && save.history.length);
  }

  function checkRequirements(save, requirements = {}, boost = null) {
    if (!requirements) return { ok: true, reason: "" };
    if (requirements.stats) {
      const statFailures = Object.entries(requirements.stats).filter(([stat, value]) => {
        const boostedValue = (save.stats[stat] || 0) + (boost && boost.stat === stat ? boost.amount : 0);
        return boostedValue < value;
      });
      if (statFailures.length) {
        const [stat, value] = statFailures[0];
        return {
          ok: false,
          reason: `Requires ${stat} ${value}.`,
          canRoll: statFailures.length === 1,
          stat,
          required: value
        };
      }
    }
    for (const [key, label, source] of [
      ["items", "item", save.inventory],
      ["flags", "flag", save.flags],
      ["codewords", "codeword", save.codewords]
    ]) {
      if (requirements[key]) {
        const missing = requirements[key].find((entry) => !source.includes(entry));
        if (missing) return { ok: false, reason: `Requires ${label}: ${missing}.` };
      }
    }
    if (requirements.books) {
      const missingBook = requirements.books.find((bookId) => !save.unlockedBooks.includes(bookId));
      if (missingBook) return { ok: false, reason: `Requires Book ${missingBook} unlocked.` };
    }
    return { ok: true, reason: "" };
  }

  function getSaves() {
    try {
      const saves = JSON.parse(localStorage.getItem(savesKey) || "[]");
      return Array.isArray(saves) ? saves : [];
    } catch {
      return [];
    }
  }

  function upsertSave(save) {
    const saves = getSaves();
    const index = saves.findIndex((entry) => entry.saveId === save.saveId);
    if (index >= 0) saves[index] = save;
    else saves.push(save);
    localStorage.setItem(savesKey, JSON.stringify(saves));
  }

  function getActiveSave() {
    const id = localStorage.getItem(activeSaveKey);
    if (!id) return null;
    return getSaves().find((save) => save.saveId === id) || null;
  }

  function getNewestSave() {
    return getSaves().sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0] || null;
  }

  function setActiveSaveId(saveId) {
    localStorage.setItem(activeSaveKey, saveId);
  }

  function loadSettings() {
    try {
      return { ...defaultSettings, ...JSON.parse(localStorage.getItem(settingsKey) || "{}") };
    } catch {
      return { ...defaultSettings };
    }
  }

  function saveSettings(settings) {
    localStorage.setItem(settingsKey, JSON.stringify(settings));
  }

  function applySettings(settings) {
    document.body.classList.toggle("dark", settings.theme === "dark");
    document.body.classList.toggle("reduce-motion", Boolean(settings.reduceMotion));
    document.documentElement.style.setProperty("--font-size", `${settings.fontSize || "16"}px`);
  }

  function getHero(heroId) {
    return data.heroes.find((hero) => hero.id === heroId) || data.heroes[0];
  }

  function getBook(bookId) {
    return data.books.find((book) => book.id === Number(bookId)) || data.books[0];
  }

  function getSection(bookId, sectionNumber) {
    const book = getBook(bookId);
    return book.sections[sectionNumber] || null;
  }

  function buildHeroStats(hero) {
    const stats = { ...data.baseStats };
    Object.entries(hero.statModifiers).forEach(([stat, amount]) => {
      stats[stat] = (stats[stat] || 0) + amount;
    });
    return stats;
  }

  function maxOutSave(save) {
    statNames.forEach((stat) => {
      save.stats[stat] = 99;
    });
    save.upgradePoints = 99;
    addMoney(save, 9999);
    addUnique(save.unlockedBooks, data.books.map((book) => book.id));
    addUnique(save.inventory, collectEffectValues("addItems"));
    addUnique(save.flags, collectEffectValues("addFlags"));
    addUnique(save.visitedSections, data.books.flatMap((book) =>
      Object.keys(book.sections).map((sectionNumber) => sectionKey(book.id, sectionNumber))
    ));
  }

  function addMoney(save, amount) {
    save.money = (save.money || 0) + amount;
    if (amount > 0) save.totalMoneyCollected = (save.totalMoneyCollected || 0) + amount;
  }

  async function fetchOnlineData(settings) {
    try {
      const [leaderboardResponse, chatResponse] = await Promise.all([
        fetch(`${apiBase(settings)}/leaderboard`),
        fetch(`${apiBase(settings)}/chat`)
      ]);
      if (!leaderboardResponse.ok || !chatResponse.ok) throw new Error("Online endpoint failed.");
      const leaderboard = await leaderboardResponse.json();
      const chat = await chatResponse.json();
      return normalizeOnlineData({ leaderboard, chat });
    } catch {
      return getLocalOnlineData();
    }
  }

  async function postOnline(settings, path, body) {
    try {
      const response = await fetch(`${apiBase(settings)}/${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      return response.ok;
    } catch {
      return false;
    }
  }

  function apiBase(settings) {
    return String(settings.onlineApiUrl || "").replace(/\/+$/, "");
  }

  function getLocalOnlineData() {
    try {
      return normalizeOnlineData(JSON.parse(localStorage.getItem(onlineLocalKey) || "{}"));
    } catch {
      return normalizeOnlineData({});
    }
  }

  function saveLocalOnlineData(data) {
    localStorage.setItem(onlineLocalKey, JSON.stringify(normalizeOnlineData(data)));
  }

  function normalizeOnlineData(data) {
    const leaderboard = Array.isArray(data.leaderboard) ? data.leaderboard : [];
    const chat = Array.isArray(data.chat) ? data.chat : [];
    return {
      leaderboard: leaderboard
        .map((entry) => ({
          playerName: cleanPlayerName(entry.playerName),
          heroName: String(entry.heroName || "Unknown Hero").slice(0, 40),
          money: Math.max(0, Number(entry.money) || 0),
          updatedAt: entry.updatedAt || new Date().toISOString()
        }))
        .sort((a, b) => b.money - a.money)
        .slice(0, 25),
      chat: chat
        .map((entry) => ({
          playerName: cleanPlayerName(entry.playerName),
          heroName: String(entry.heroName || "Unknown Hero").slice(0, 40),
          message: String(entry.message || "").slice(0, 160),
          createdAt: entry.createdAt || new Date().toISOString()
        }))
        .filter((entry) => entry.message)
        .slice(-50)
    };
  }

  function leaderboardHtml(leaderboard) {
    if (!leaderboard.length) return '<p class="meta">No scores submitted yet.</p>';
    return `
      <ol class="leaderboard-list">
        ${leaderboard.map((entry) => `
          <li>
            <strong>${escapeHtml(entry.playerName)}</strong>
            <span>${escapeHtml(entry.heroName)}</span>
            <b>${entry.money} coins</b>
          </li>
        `).join("")}
      </ol>
    `;
  }

  function chatHtml(chat) {
    if (!chat.length) return '<p class="meta">No chat messages yet.</p>';
    return chat.map((entry) => `
      <article class="chat-message">
        <strong>${escapeHtml(entry.playerName)}</strong>
        <span>${escapeHtml(entry.message)}</span>
      </article>
    `).join("");
  }

  function cleanPlayerName(name) {
    const cleaned = String(name || "").trim().slice(0, 24);
    return cleaned || "Wandering Hero";
  }

  function collectEffectValues(effectName) {
    const values = [];
    data.books.forEach((book) => {
      Object.values(book.sections).forEach((section) => {
        addUnique(values, section.effects && section.effects[effectName]);
        section.choices.forEach((choice) => addUnique(values, choice.effects && choice.effects[effectName]));
      });
    });
    return values;
  }

  function getChoiceBoost(save, choiceIndex) {
    const boost = state.rollBoost;
    if (!boost) return null;
    if (
      boost.saveId === save.saveId &&
      boost.bookId === save.currentBookId &&
      boost.sectionNumber === save.currentSectionNumber &&
      boost.choiceIndex === choiceIndex
    ) {
      return boost;
    }
    return null;
  }

  function clearRollBoost() {
    state.rollBoost = null;
  }

  function statsList(stats) {
    const max = Math.max(...Object.values(stats), 24);
    return `
      <dl class="stat-list">
        ${statNames.map((stat) => `
          <div class="stat-row">
            <dt>${stat}</dt>
            <dd class="bar" aria-label="${stat} ${stats[stat]}"><span style="--value: ${Math.min(100, Math.round((stats[stat] / max) * 100))}%"></span></dd>
            <dd>${stats[stat]}</dd>
          </div>
        `).join("")}
      </dl>
    `;
  }

  function listPills(items, emptyText) {
    if (!items.length) return `<p class="meta">${emptyText}</p>`;
    return `<ul class="inventory-list">${items.map((item) => `<li class="pill">${escapeHtml(item)}</li>`).join("")}</ul>`;
  }

  function toastHtml() {
    const message = state.toast;
    state.toast = "";
    return message ? `<p class="toast">${escapeHtml(message)}</p>` : "";
  }

  function addUnique(target, values = []) {
    values.forEach((value) => {
      if (!target.includes(value)) target.push(value);
    });
  }

  function unique(values) {
    return [...new Set(values)];
  }

  function formatList(values) {
    return values.map(escapeHtml).join(", ");
  }

  function normalizeCodeword(value) {
    return String(value || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "-");
  }

  function sectionKey(bookId, sectionNumber) {
    return `${bookId}:${sectionNumber}`;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
})();
