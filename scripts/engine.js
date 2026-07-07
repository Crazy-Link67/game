(function () {
  const data = window.GameData;
  const statNames = Object.keys(data.baseStats);

  function getHero(heroId) {
    return data.heroes.find((hero) => hero.id === heroId) || data.heroes[0];
  }

  function getBook(bookId) {
    return data.books.find((book) => book.id === Number(bookId)) || data.books[0];
  }

  function getSection(bookId, sectionNumber) {
    const book = getBook(bookId);
    return book && book.sections ? book.sections[sectionNumber] || null : null;
  }

  function buildHeroStats(hero) {
    const stats = { ...data.baseStats };
    Object.entries((hero || {}).statModifiers || {}).forEach(([stat, amount]) => {
      stats[stat] = (stats[stat] || 0) + amount;
    });
    return stats;
  }

  function normalizeStats(hero, savedStats) {
    const stats = buildHeroStats(hero);
    if (!savedStats || typeof savedStats !== "object") return stats;
    statNames.forEach((stat) => {
      const value = Number(savedStats[stat]);
      if (Number.isFinite(value)) stats[stat] = Math.max(0, Math.round(value));
    });
    return stats;
  }

  function applyItemStatModifiers(stats, inventory = []) {
    const result = { ...stats };
    inventory.forEach((item) => {
      const modifiers = data.itemStatModifiers && data.itemStatModifiers[item];
      if (!modifiers) return;
      Object.entries(modifiers).forEach(([stat, amount]) => {
        if (statNames.includes(stat)) result[stat] = (result[stat] || 0) + amount;
      });
    });
    return result;
  }

  function getEffectiveStats(save) {
    return applyItemStatModifiers((save && save.stats) || {}, (save && save.inventory) || []);
  }

  function checkRequirements(save, requirements = {}, boost = null) {
    if (!requirements) return { ok: true, reason: "" };
    const effectiveStats = getEffectiveStats(save);
    if (requirements.stats) {
      const statFailures = Object.entries(requirements.stats).filter(([stat, value]) => {
        const boostedValue = (effectiveStats[stat] || 0) + (boost && boost.stat === stat ? boost.amount : 0);
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
    if (requirements.mount && !hasMount(save)) {
      return { ok: false, reason: "Requires a mount to run from this battle." };
    }
    if (requirements.money && ((save && save.money) || 0) < requirements.money) {
      return { ok: false, reason: `Requires ${requirements.money} coins.` };
    }
    if (requirements.notItems) {
      const owned = requirements.notItems.find((entry) => ((save && save.inventory) || []).includes(entry));
      if (owned) return { ok: false, reason: `Already owns ${owned}.` };
    }
    for (const [key, label, source] of [
      ["items", "item", (save && save.inventory) || []],
      ["flags", "flag", (save && save.flags) || []],
      ["codewords", "codeword", (save && save.codewords) || []]
    ]) {
      if (requirements[key]) {
        const missing = requirements[key].find((entry) => !source.includes(entry));
        if (missing) return { ok: false, reason: `Requires ${label}: ${missing}.` };
      }
    }
    if (requirements.books) {
      const unlockedBooks = (save && save.unlockedBooks) || [];
      const missingBook = requirements.books.find((bookId) => !unlockedBooks.includes(bookId));
      if (missingBook) return { ok: false, reason: `Requires Book ${missingBook} unlocked.` };
    }
    return { ok: true, reason: "" };
  }

  function enterSection(save, bookId, sectionNumber) {
    const section = getSection(bookId, sectionNumber);
    if (!save || !section) return;
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
    if (!save) return;
    addUnique(save.inventory, effects.addItems);
    addUnique(save.flags, effects.addFlags);
    addUnique(save.codewords, effects.addCodewords);
    addUnique(save.unlockedBooks, effects.unlockBooks);
    if (effects.maxEverything) maxOutSave(save);
    if (effects.spendMoney) spendMoney(save, effects.spendMoney);
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

  function maxOutSave(save) {
    statNames.forEach((stat) => {
      save.stats[stat] = 99;
    });
    save.upgradePoints = 99;
    save.money = 999999;
    save.totalMoneyCollected = Math.max(save.totalMoneyCollected || 0, 999999);
    addUnique(save.unlockedBooks, data.books.map((book) => book.id));
    addUnique(save.inventory, data.weapons || []);
    addUnique(save.inventory, data.mounts || []);
    addUnique(save.inventory, data.legendaryItems || []);
    addUnique(save.inventory, collectEffectValues("addItems"));
    addUnique(save.flags, collectEffectValues("addFlags"));
    addUnique(save.visitedSections, data.books.flatMap((book) =>
      Object.keys(book.sections).map((sectionNumber) => sectionKey(book.id, sectionNumber))
    ));
  }

  function collectEffectValues(effectName) {
    const values = [];
    data.books.forEach((book) => {
      Object.values(book.sections).forEach((section) => {
        addUnique(values, section.effects && section.effects[effectName]);
        (section.choices || []).forEach((choice) => addUnique(values, choice.effects && choice.effects[effectName]));
      });
    });
    return values;
  }

  function hasMount(save) {
    const mounts = data.mounts || [];
    return ((save && save.inventory) || []).some((item) => mounts.includes(item));
  }

  function addMoney(save, amount) {
    save.money = (save.money || 0) + amount;
    if (amount > 0) save.totalMoneyCollected = (save.totalMoneyCollected || 0) + amount;
  }

  function spendMoney(save, amount) {
    save.money = Math.max(0, (save.money || 0) - amount);
  }

  function choiceTargetBook(save, choice) {
    return Number(choice && choice.target && choice.target.book) || save.currentBookId;
  }

  function sectionKey(bookId, sectionNumber) {
    return `${bookId}:${sectionNumber}`;
  }

  function addUnique(target, values = []) {
    (Array.isArray(values) ? values : [values]).forEach((value) => {
      if (value && !target.includes(value)) target.push(value);
    });
  }

  function unique(values) {
    return [...new Set(Array.isArray(values) ? values : [])];
  }

  window.GameEngine = {
    statNames,
    addMoney,
    addUnique,
    applyEffects,
    applyItemStatModifiers,
    buildHeroStats,
    checkRequirements,
    choiceTargetBook,
    collectEffectValues,
    enterSection,
    getBook,
    getEffectiveStats,
    getHero,
    getSection,
    hasMount,
    maxOutSave,
    normalizeStats,
    sectionKey,
    spendMoney,
    unique
  };
})();
