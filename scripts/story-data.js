(function applyWildWestTheme() {
  const bookMeta = [
    { id: 1, name: "The Dusty Dawn Trail", art: "Sunset Mesa", unlockText: "Unlocked at the start.", regions: ["Dry Creek", "Sheriff's Spur", "Cactus Flats", "Red Mesa"] },
    { id: 2, name: "The Moonlit Rio", art: "Moonlit Rio", unlockText: "Unlock by finding a ferry pass, a river token, or a marked trail.", regions: ["Late Ferry", "Lantern Bend", "Silver Sandbar", "Mist Ford"] },
    { id: 3, name: "The High White Pass", art: "High Pass", unlockText: "Unlock by finding the west wind trail marker.", regions: ["Cloud Gulch", "Wind Chapel", "Sky Market", "Crane Ridge"] },
    { id: 4, name: "The Jade Saloon Circuit", art: "Jade Saloon", unlockText: "Unlock later in the story or with bloodhound6721.", regions: ["Green Door", "Garden Tables", "Mirror Bar", "Backroom Archive"] },
    { id: 5, name: "The Iron Mountain Line", art: "Iron Rail", unlockText: "Unlock later in the story or with bloodhound6721.", regions: ["Iron Gate", "Ash Ravine", "Bell Foundry", "Storm Ridge"] },
    { id: 6, name: "The Lotus Dawn Range", art: "Lotus Range", unlockText: "Unlock later in the story or with bloodhound6721.", regions: ["First Petal Ranch", "Rose Lake", "Sun Bridge", "Final Dawn"] },
    { id: 7, name: "The Ghost Canyon Ledger", art: "Ghost Canyon", unlockText: "Unlock by finishing the Lotus Dawn Range or with bloodhound6721.", regions: ["Ghost Canyon", "Bone Orchard", "Ledger Rock", "Whisper Shaft"] },
    { id: 8, name: "The Black Hat Badlands", art: "Badlands", unlockText: "Unlock by crossing Ghost Canyon or with bloodhound6721.", regions: ["Black Hat Camp", "Rattler Wash", "Wanted Ridge", "Noon Gallows"] },
    { id: 9, name: "The Silver Spur Desert", art: "Silver Desert", unlockText: "Unlock by surviving the Badlands or with bloodhound6721.", regions: ["Silver Spur", "Mirage Well", "Quartz Dunes", "Star Camp"] },
    { id: 10, name: "The Thunder Rail Territory", art: "Thunder Rail", unlockText: "Unlock by finding the Silver Spur rail key or with bloodhound6721.", regions: ["Engine Yard", "Coal Switch", "Storm Trestle", "Last Depot"] },
    { id: 11, name: "The Sundown Justice Trail", art: "Sundown Justice", unlockText: "Unlock by riding the Thunder Rail or with bloodhound6721.", regions: ["Marshal's Rise", "Trial Butte", "Truth Chapel", "Sundown Gate"] }
  ];

  const bookById = Object.fromEntries(bookMeta.map((book) => [book.id, book]));
  const frontierWeapons = [
    "six-shooter revolver",
    "long-barrel rifle",
    "coach shotgun",
    "silver Bowie knife",
    "lasso",
    "buffalo rifle",
    "pepperbox pistol",
    "cattleman's saber"
  ];
  const frontierMounts = [
    "paint horse",
    "mustang",
    "mule",
    "black stallion",
    "iron rail steed",
    "palomino",
    "desert pony",
    "stagecoach team"
  ];
  const legendaryItems = [
    "sundown marshal badge",
    "gold compass",
    "diamond canteen",
    "ghost town map",
    "lucky silver saddle"
  ];
  const marketGoods = [
    { item: "trail provisions", price: 25 },
    { item: "six-shooter revolver", price: 45 },
    { item: "long-barrel rifle", price: 70 },
    { item: "coach shotgun", price: 85 },
    { item: "silver Bowie knife", price: 40 },
    { item: "lasso", price: 30 },
    { item: "buffalo rifle", price: 120 },
    { item: "pepperbox pistol", price: 95 },
    { item: "cattleman's saber", price: 110 },
    { item: "mustang", price: 120 },
    { item: "black stallion", price: 180 },
    { item: "palomino", price: 140 },
    { item: "stagecoach team", price: 220 }
  ];
  const itemStatModifiers = {
    "six-shooter revolver": { Strength: 1, Agility: 1 },
    "long-barrel rifle": { Strength: 2, Wisdom: 1 },
    "coach shotgun": { Strength: 3 },
    "silver Bowie knife": { Agility: 2 },
    "lasso": { Agility: 1, Spirit: 1 },
    "buffalo rifle": { Strength: 3, Wisdom: 1 },
    "pepperbox pistol": { Agility: 2, Spirit: 1 },
    "cattleman's saber": { Strength: 2, Spirit: 1 },
    "paint horse": { Agility: 1 },
    "mustang": { Agility: 2 },
    "mule": { Health: 2 },
    "black stallion": { Agility: 2, Spirit: 1 },
    "iron rail steed": { Health: 2, Strength: 1 },
    "palomino": { Agility: 1, Spirit: 1 },
    "desert pony": { Health: 1, Agility: 1 },
    "stagecoach team": { Health: 3 },
    "tin star badge": { Spirit: 1 },
    "marked ace": { Wisdom: 1 },
    "rail hammer": { Strength: 1 },
    "sage tonic": { Health: 2 },
    "weathered hymnal": { Spirit: 1 },
    "trail provisions": { Health: 3 },
    "brass rail token": { Wisdom: 1 },
    "marshal's spare revolver": { Strength: 1, Agility: 1 },
    "green river token": { Spirit: 1 },
    "copper map nail": { Wisdom: 1 },
    "ferry pass": { Agility: 1 },
    "sundown marshal badge": { Strength: 4, Spirit: 4 },
    "gold compass": { Wisdom: 5 },
    "diamond canteen": { Health: 8 },
    "ghost town map": { Wisdom: 3, Agility: 2 },
    "lucky silver saddle": { Agility: 5, Spirit: 2 }
  };

  window.GameData.weapons = frontierWeapons;
  window.GameData.mounts = frontierMounts;
  window.GameData.legendaryItems = legendaryItems;
  window.GameData.marketGoods = marketGoods;
  window.GameData.itemStatModifiers = itemStatModifiers;
  window.GameData.randomHeroNames = [
    "Annie Dust",
    "Buck Hollow",
    "Clara West",
    "Doc Marigold",
    "Elias Flint",
    "June Star",
    "Kit Redford",
    "Mabel Pike",
    "Nate Silver",
    "Pearl Sunday",
    "Rosa Sundown",
    "Silas Crowley"
  ];

  window.GameData.heroes = [
    {
      id: "dust-devil-scout",
      name: "Dust Devil Scout",
      role: "Fast trail rider",
      description: "A quick rider who can read hoofprints, storm clouds, and bad intentions before breakfast.",
      statModifiers: { Health: -2, Strength: 0, Wisdom: 1, Agility: 3, Spirit: 0 },
      startingItems: ["lucky spur", "six-shooter revolver", "paint horse"]
    },
    {
      id: "lantern-marshal",
      name: "Lantern Marshal",
      role: "Law and grit",
      description: "A steady marshal carrying a dented lantern and a badge that still means something.",
      statModifiers: { Health: 1, Strength: 1, Wisdom: 2, Agility: -1, Spirit: 2 },
      startingItems: ["tin star badge", "long-barrel rifle", "mustang"]
    },
    {
      id: "rio-gambler",
      name: "Rio Gambler",
      role: "Risk taker",
      description: "A cardsharp with a velvet grin, a sharp eye, and one last honest promise.",
      statModifiers: { Health: -1, Strength: -1, Wisdom: 2, Agility: 2, Spirit: 2 },
      startingItems: ["marked ace", "silver Bowie knife", "black stallion"]
    },
    {
      id: "iron-horse-guard",
      name: "Iron Horse Guard",
      role: "Rail protector",
      description: "A broad-shouldered rail guard who can hold a train door against a whole outlaw crew.",
      statModifiers: { Health: 4, Strength: 3, Wisdom: -1, Agility: -2, Spirit: 0 },
      startingItems: ["rail hammer", "coach shotgun", "iron rail steed"]
    },
    {
      id: "sagebrush-doctor",
      name: "Sagebrush Doctor",
      role: "Frontier healer",
      description: "A traveling doctor with saddlebag cures, clean bandages, and a suspiciously accurate memory.",
      statModifiers: { Health: 1, Strength: -2, Wisdom: 3, Agility: 0, Spirit: 2 },
      startingItems: ["sage tonic", "lasso", "mule"]
    },
    {
      id: "coyote-preacher",
      name: "Coyote Preacher",
      role: "Silver-tongued wanderer",
      description: "A dusty preacher whose sermons can calm a posse or start a stampede.",
      statModifiers: { Health: 0, Strength: -1, Wisdom: 1, Agility: 1, Spirit: 3 },
      startingItems: ["weathered hymnal", "six-shooter revolver", "mustang"]
    }
  ];

  window.GameData.codewords.BLOODHOUND6721.description = "Maxes out the current frontier hero, money, and gear.";

  bookMeta.forEach((meta) => {
    let book = window.GameData.books.find((entry) => entry.id === meta.id);
    if (!book) {
      book = { id: meta.id, sections: {} };
      window.GameData.books.push(book);
    }
    book.title = `Book ${meta.id}: ${meta.name}`;
    book.uniqueName = meta.name;
    book.sectionCount = 1000;
    book.unlockText = meta.unlockText;
    book.sections = makeWildWestSections(meta);
  });

  window.GameData.books.sort((a, b) => a.id - b.id);
  window.GameData.worldMaps = Object.fromEntries(bookMeta.map((meta) => [meta.id, makeWildWestMap(meta)]));

  function makeWildWestSections(meta) {
    const sections = {};
    for (let sectionNumber = 1; sectionNumber <= 1000; sectionNumber += 1) {
      sections[sectionNumber] = generatedFrontierSection(meta, sectionNumber);
    }
    if (meta.id === 1) addOpeningTrail(sections);
    return sections;
  }

  function addOpeningTrail(sections) {
    sections[1] = {
      number: 1,
      title: "The Red Mesa Signpost",
      art: "Red Mesa Picture",
      text: "A sunburned signpost leans beside a dry trail. One arrow points to the sheriff's office, one to a broken rail bridge, and one to a cactus flat where coyotes are already laughing.",
      effects: { addFlags: ["red_mesa_seen"], money: 3 },
      choices: [
        { label: "Ride to the sheriff's office and ask who pinned the wanted poster upside down.", target: { book: 1, section: 2 }, requirements: { stats: { Wisdom: 10 } } },
        { label: "Take the broken rail bridge and trust your horse's feet.", target: { book: 1, section: 3 }, requirements: { stats: { Agility: 11 } } },
        { label: "Cut through Cactus Flats and follow the coyote tracks.", target: { book: 1, section: 4 }, requirements: { stats: { Spirit: 10 } } }
      ]
    };
    sections[2] = {
      number: 2,
      title: "The Sheriff's Coffee",
      art: "Sheriff Office Picture",
      text: "The sheriff pours coffee black enough to float a horseshoe. He slides you a brass rail token and points toward the Moonlit Rio ferry.",
      effects: { addItems: ["brass rail token", "marshal's spare revolver"], addFlags: ["sheriff_trusts_you"], unlockBooks: [2], upgradePoints: 1, money: 12 },
      choices: [
        { label: "Pin the token to your map and return to the Red Mesa signpost.", target: { book: 1, section: 6 } },
        { label: "Ride straight for the Moonlit Rio ferry.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[3] = {
      number: 3,
      title: "The Broken Rail Bridge",
      art: "Rail Bridge Picture",
      text: "The bridge groans like a tired fiddle. Halfway across, you spot a lockbox wedged below the rails.",
      effects: { addFlags: ["rail_bridge_crossed"], money: 5 },
      choices: [
        { label: "Pry open the lockbox before the bridge gives out.", target: { book: 1, section: 5 }, requirements: { stats: { Strength: 11 } } },
        { label: "Leave the box and spur your horse to the far side.", target: { book: 1, section: 6 } }
      ]
    };
    sections[4] = {
      number: 4,
      title: "Cactus Flats",
      art: "Cactus Flat Picture",
      text: "The cactus field is full of pale blossoms and suspicious silence. Under a flat stone you find a green river token wrapped in rawhide.",
      effects: { addItems: ["green river token", "desert pony"], addFlags: ["cactus_flats_found"], upgradePoints: 1, money: 8 },
      choices: [
        { label: "Carry the token back to the signpost.", target: { book: 1, section: 6 } },
        { label: "Use the token to find a hidden ford.", target: { book: 1, section: 7 }, requirements: { items: ["green river token"] } }
      ]
    };
    sections[5] = {
      number: 5,
      title: "The Rail Lockbox",
      art: "Lockbox Picture",
      text: "Inside the lockbox sits a copper map nail and a folded wanted notice for a bandit called the Paper Saint.",
      effects: { addItems: ["copper map nail", "pepperbox pistol"], addFlags: ["paper_saint_notice"], unlockBooks: [2], money: 18 },
      choices: [
        { label: "Pin the notice to your paper map.", target: { book: 1, section: 6 } },
        { label: "Follow the notice toward the Moonlit Rio.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[6] = {
      number: 6,
      title: "The Paper Map Opens",
      art: "Paper Map Picture",
      text: "Your map crackles like dry leaves. Ink roads spread west, and the second book title glows beside a sketch of black water.",
      choices: [
        { label: "Enter Book 2 and ride for the Moonlit Rio.", target: { book: 2, section: 1 }, requirements: { books: [2] } },
        { label: "Search behind the signpost for a hidden spur trail.", target: { book: 1, section: 8 }, requirements: { stats: { Wisdom: 11 } } },
        { label: "Circle back to the Red Mesa signpost.", target: { book: 1, section: 1 } }
      ]
    };
    sections[7] = {
      number: 7,
      title: "The Hidden Ford",
      art: "Hidden Ford Picture",
      text: "Moonlight catches a shallow crossing nobody marked. The river token warms in your glove and the far bank opens.",
      effects: { addFlags: ["hidden_ford_found"], unlockBooks: [2], money: 10 },
      choices: [
        { label: "Cross into Book 2 by the hidden ford.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[8] = {
      number: 8,
      title: "The West Wind Spur",
      art: "West Wind Picture",
      text: "A red thread is tied to a horseshoe nail behind the signpost. It points toward a high white pass where the wind sounds like a train whistle.",
      effects: { addFlags: ["west_wind_spur_found"], unlockBooks: [3], money: 14 },
      choices: [
        { label: "Open Book 3 and follow the High White Pass.", target: { book: 3, section: 1 }, requirements: { books: [3] } },
        { label: "Keep riding west through the Dusty Dawn Trail.", target: { book: 1, section: 9 } },
        { label: "Return to the paper map.", target: { book: 1, section: 6 } }
      ]
    };
  }

  function generatedFrontierSection(meta, sectionNumber) {
    const nextUnlock = meta.id < 11 ? { at: Math.min(880, 80 + meta.id * 70), book: meta.id + 1 } : null;
    const scene = frontierScene(meta, sectionNumber);
    const effects = {
      addFlags: [`book_${meta.id}_section_${sectionNumber}_visited`, scene.flag]
    };
    if (scene.money) effects.money = scene.money;
    if (nextUnlock && sectionNumber === nextUnlock.at) {
      effects.unlockBooks = [nextUnlock.book];
      effects.addFlags.push(`book_${nextUnlock.book}_trail_opened`);
      effects.money = (effects.money || 0) + 75;
    }
    if (sectionNumber % 30 === 0) {
      effects.addItems = effects.addItems || [];
      effects.addItems.push(frontierWeapons[(meta.id + sectionNumber / 30) % frontierWeapons.length]);
    }
    if (sectionNumber % 45 === 0) {
      effects.addItems = effects.addItems || [];
      effects.addItems.push(frontierMounts[(meta.id + sectionNumber / 45) % frontierMounts.length]);
    }
    const isMarket = sectionNumber % 10 === 0;
    return {
      number: sectionNumber,
      generated: true,
      title: isMarket ? `${meta.name} Trail Market` : `${scene.name} on ${meta.name}`,
      art: scene.art,
      text: isMarket
        ? `The page shows ${meta.name} in sepia ink: hoofprints, dust, and a market wagon under a hard western sky. Traders lift canvas flaps over weapons, mounts, and useful trail goods.`
        : scene.text,
      effects,
      choices: generatedFrontierChoices(meta, sectionNumber, nextUnlock, scene)
    };
  }

  function generatedFrontierChoices(meta, sectionNumber, nextUnlock, scene) {
    const choices = [];
    if (sectionNumber < 1000) {
      choices.push({
        label: scene.action,
        target: { book: meta.id, section: sectionNumber + 1 },
        result: scene.result
      });
    }
    if (sectionNumber + 2 <= 1000) {
      choices.push({
        label: "Take the side trail marked with a bent horseshoe.",
        hint: "A steady alternate route.",
        target: { book: meta.id, section: sectionNumber + 2 },
        result: "The bent horseshoe trail avoids the obvious road and brings you to a different marker."
      });
    }
    if (sectionNumber + 4 <= 1000) {
      choices.push({
        label: "Ride toward the far landmark instead of the nearest trail mark.",
        hint: "A bolder forward route.",
        target: { book: meta.id, section: sectionNumber + 4 },
        result: "You aim for the far landmark and skip past a stretch of empty road."
      });
    }
    if (sectionNumber % 10 === 0 && sectionNumber < 1000) {
      const good = marketGoods[(meta.id + sectionNumber / 10) % marketGoods.length];
      choices.push({
        label: `Buy ${good.item} from the trail market for ${good.price} coins, then ride on.`,
        hint: `Market purchase: costs ${good.price} coins.`,
        target: { book: meta.id, section: sectionNumber + 1 },
        requirements: { money: good.price, notItems: [good.item] },
        effects: { spendMoney: good.price, addItems: [good.item], addFlags: [`bought_${good.item.replace(/[^a-z0-9]+/gi, "_").toLowerCase()}`] },
        result: `You buy ${good.item}, spend ${good.price} coins, and pack it for the trail.`
      });
    }
    if (sectionNumber % 12 === 0 && sectionNumber + 2 <= 1000) {
      choices.push({
        label: "Search the side trail before moving on.",
        hint: "A Wisdom path with a coin reward.",
        target: { book: meta.id, section: sectionNumber + 2 },
        requirements: { stats: { Wisdom: 10 + Math.min(meta.id, 6) } },
        effects: { money: 18 + meta.id * 4, addFlags: [`side_trail_${meta.id}_${sectionNumber}`] },
        result: "You read the ground correctly, find a hidden cash tin, and rejoin the trail ahead."
      });
    }
    if (sectionNumber % 14 === 0 && sectionNumber + 3 <= 1000) {
      choices.push({
        label: "Read the outlaw's coded trail sign carved into a fence rail.",
        hint: "Requires Wisdom and can reveal a safer route.",
        target: { book: meta.id, section: sectionNumber + 3 },
        requirements: { stats: { Wisdom: 12 + Math.min(meta.id, 7) } },
        effects: { money: 12 + meta.id * 3, addFlags: [`decoded_sign_${meta.id}_${sectionNumber}`] },
        result: "You crack the code, avoid an ambush marker, and pocket a small reward hidden under the rail."
      });
    }
    if (sectionNumber % 18 === 0 && sectionNumber + 2 <= 1000) {
      choices.push({
        label: "Help the wagon crew fix a broken axle.",
        hint: "A Strength path with pay.",
        target: { book: meta.id, section: sectionNumber + 2 },
        requirements: { stats: { Strength: 10 + Math.min(meta.id, 6) } },
        effects: { money: 22 + meta.id * 5, addFlags: [`wagon_job_${meta.id}_${sectionNumber}`] },
        result: "The wagon rolls again, and the crew pays you in dusty silver coins."
      });
    }
    if (sectionNumber % 20 === 0 && sectionNumber + 3 <= 1000) {
      choices.push({
        label: "Stand your ground when a bandit tests your nerve.",
        hint: "Requires Spirit and pays if you hold steady.",
        target: { book: meta.id, section: sectionNumber + 3 },
        requirements: { stats: { Spirit: 12 + Math.min(meta.id, 7) } },
        effects: { money: 16 + meta.id * 4, addFlags: [`stood_ground_${meta.id}_${sectionNumber}`] },
        result: "The bandit blinks first, tosses down hush money, and lets you pass."
      });
    }
    if (sectionNumber % 22 === 0 && sectionNumber + 4 <= 1000) {
      choices.push({
        label: "Climb the red rock wall to scout the country ahead.",
        hint: "Requires Health for a hard climb.",
        target: { book: meta.id, section: sectionNumber + 4 },
        requirements: { stats: { Health: 24 + meta.id } },
        effects: { addFlags: [`scouted_high_ground_${meta.id}_${sectionNumber}`] },
        result: "You climb until your lungs burn and spot a cleaner route from above."
      });
    }
    if (sectionNumber % 25 === 0 && sectionNumber + 5 <= 1000) {
      choices.push({
        label: "Try a risky shortcut through rough country.",
        target: { book: meta.id, section: sectionNumber + 5 },
        requirements: { stats: { Agility: 10 + Math.min(meta.id, 6) } },
        result: "You cut across rough country and come out several trail marks ahead."
      });
    }
    if (sectionNumber % 28 === 0 && sectionNumber + 4 <= 1000) {
      choices.push({
        label: "Force open a rusted strongbox beside the trail.",
        hint: "Requires Strength and can pay well.",
        target: { book: meta.id, section: sectionNumber + 4 },
        requirements: { stats: { Strength: 13 + Math.min(meta.id, 7) } },
        effects: { money: 28 + meta.id * 6, addFlags: [`opened_strongbox_${meta.id}_${sectionNumber}`] },
        result: "The strongbox gives way with a shriek of rust and spills out old payroll coins."
      });
    }
    if (sectionNumber % 40 === 0 && sectionNumber + 3 <= 1000) {
      choices.push({
        label: "A battle breaks out. Mount up and run before the dust closes in.",
        hint: "Requires any mount in your inventory.",
        target: { book: meta.id, section: sectionNumber + 3 },
        requirements: { mount: true },
        result: "Your mount surges through the dust and carries you clear of the fight."
      });
    }
    if (nextUnlock && sectionNumber === nextUnlock.at) {
      choices.push({
        label: `Unlock and ride into ${bookById[nextUnlock.book].name}.`,
        target: { book: nextUnlock.book, section: 1 },
        requirements: { books: [nextUnlock.book] },
        result: `A new trail opens into ${bookById[nextUnlock.book].name}.`
      });
    }
    if (sectionNumber === 1000 && meta.id < 11) {
      choices.push({
        label: `Finish this book and cross into ${bookById[meta.id + 1].name}.`,
        target: { book: meta.id + 1, section: 1 },
        requirements: { books: [meta.id + 1] },
        result: `You close this book and cross into ${bookById[meta.id + 1].name}.`
      });
    }
    return choices.length ? choices : [{ label: "Return to the first page of this book.", target: { book: meta.id, section: 1 } }];
  }

  function frontierScene(meta, sectionNumber) {
    const scenes = [
      {
        name: "Dust Camp",
        art: "Trail Camp Picture",
        text: `A low campfire burns beside ${meta.name}. A tired drover shares rumors about a dry gulch, a missing cash box, and a trail that vanishes at noon.`,
        action: "Break camp and follow the freshest hoofprints.",
        result: "You stamp out the fire, follow fresh tracks, and find the next marked section.",
        flag: `camp_${meta.id}_${sectionNumber}`
      },
      {
        name: "Wanted Post",
        art: "Wanted Poster Picture",
        text: `A wanted poster snaps against a fence post. The face is blurred by dust, but the reward seal is real and the tracks beside it are fresh.`,
        action: "Track the wanted rider to the next marker.",
        result: "The tracks lead you onward and the poster gives you a name to remember.",
        flag: `wanted_${meta.id}_${sectionNumber}`,
        money: sectionNumber % 24 === 0 ? 20 + meta.id * 3 : 0
      },
      {
        name: "Dry Well",
        art: "Dry Well Picture",
        text: `A stone well stands dry under the sun. Something glints at the bottom, but the wind makes the rope creak like it is warning you.`,
        action: "Lower a rope into the well and check the trail beyond it.",
        result: "You pull up a useful clue and move on before the heat gets worse.",
        flag: `well_${meta.id}_${sectionNumber}`,
        money: sectionNumber % 16 === 0 ? 12 + meta.id * 2 : 0
      },
      {
        name: "Canyon Echo",
        art: "Canyon Echo Picture",
        text: `The canyon repeats every hoofbeat twice. Somewhere ahead, a rider whistles a tune that does not belong to any honest camp.`,
        action: "Follow the echo until it reveals the next trail mark.",
        result: "The false echo fades, and the real trail appears between two red stones.",
        flag: `echo_${meta.id}_${sectionNumber}`
      },
      {
        name: "Rail Spur",
        art: "Rail Spur Picture",
        text: `A rusted rail spur cuts across the dirt. Fresh boot prints cross it, and one rail spike has been hammered into the shape of an arrow.`,
        action: "Follow the rail-spike arrow west.",
        result: "The rail spur points true and saves you from a dead-end wash.",
        flag: `rail_spur_${meta.id}_${sectionNumber}`
      },
      {
        name: "Storm Line",
        art: "Storm Line Picture",
        text: `A blue-black storm drags its shadow over ${meta.name}. The air smells like rain, iron, and trouble riding fast.`,
        action: "Beat the storm to the next trail shelter.",
        result: "You reach cover as the storm breaks behind you.",
        flag: `storm_${meta.id}_${sectionNumber}`
      }
    ];
    return scenes[sectionNumber % scenes.length];
  }

  function makeWildWestMap(meta) {
    return {
      name: meta.name,
      regions: meta.regions,
      landmarks: [
        { section: 1, label: meta.regions[0], x: 11, y: 62 },
        { section: 50, label: "Trail Camp", x: 25, y: 44 },
        { section: 120, label: meta.regions[1], x: 42, y: 68 },
        { section: 240, label: meta.regions[2], x: 61, y: 38 },
        { section: 360, label: meta.regions[3], x: 78, y: 58 },
        { section: 1000, label: "End Marker", x: 92, y: 30 }
      ]
    };
  }
})();

