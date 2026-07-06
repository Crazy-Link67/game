window.GameData = {
  baseStats: {
    Health: 24,
    Strength: 10,
    Wisdom: 10,
    Agility: 10,
    Spirit: 10
  },
  weapons: [
    "six-shooter revolver",
    "long-barrel rifle",
    "coach shotgun",
    "silver Bowie knife",
    "lasso"
  ],
  mounts: [
    "paint horse",
    "mustang",
    "mule",
    "black stallion",
    "iron rail steed"
  ],
  legendaryItems: [
    "sundown marshal badge",
    "gold compass",
    "diamond canteen",
    "ghost town map",
    "lucky silver saddle"
  ],
  marketGoods: [
    { item: "trail provisions", price: 25 },
    { item: "six-shooter revolver", price: 45 },
    { item: "long-barrel rifle", price: 70 },
    { item: "coach shotgun", price: 85 },
    { item: "silver Bowie knife", price: 40 },
    { item: "lasso", price: 30 },
    { item: "mustang", price: 120 },
    { item: "black stallion", price: 180 }
  ],
  randomHeroNames: [
    "Annie Dust",
    "Buck Hollow",
    "Clara West",
    "Doc Marigold",
    "Elias Flint",
    "June Star",
    "Kit Redford",
    "Mabel Pike",
    "Nate Silver",
    "Pearl Sunday"
  ],
  itemStatModifiers: {
    "six-shooter revolver": { Strength: 1, Agility: 1 },
    "long-barrel rifle": { Strength: 2, Wisdom: 1 },
    "coach shotgun": { Strength: 3 },
    "silver Bowie knife": { Agility: 2 },
    "lasso": { Agility: 1, Spirit: 1 },
    "paint horse": { Agility: 1 },
    "mustang": { Agility: 2 },
    "mule": { Health: 2 },
    "black stallion": { Agility: 2, Spirit: 1 },
    "iron rail steed": { Health: 2, Strength: 1 },
    "tin star badge": { Spirit: 1 },
    "marked ace": { Wisdom: 1 },
    "rail hammer": { Strength: 1 },
    "sage tonic": { Health: 2 },
    "weathered hymnal": { Spirit: 1 },
    "trail provisions": { Health: 3 },
    "sundown marshal badge": { Strength: 4, Spirit: 4 },
    "gold compass": { Wisdom: 5 },
    "diamond canteen": { Health: 8 },
    "ghost town map": { Wisdom: 3, Agility: 2 },
    "lucky silver saddle": { Agility: 5, Spirit: 2 }
  },
  heroes: [
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
  ],
  codewords: {
    "BLOODHOUND6721": {
      description: "Maxes out the current frontier hero, money, and gear.",
      effects: { addCodewords: ["BLOODHOUND6721"], maxEverything: true }
    }
  },
  worldMaps: {
    1: {
      name: "Dusty Dawn Territory",
      regions: ["Red Mesa Signpost", "Sheriff's Spur", "Broken Rail Bridge", "Cactus Flats"],
      landmarks: [
        { section: 1, label: "Red Mesa", x: 14, y: 66 },
        { section: 2, label: "Sheriff's Spur", x: 28, y: 34 },
        { section: 3, label: "Rail Bridge", x: 46, y: 64 },
        { section: 4, label: "Cactus Flats", x: 62, y: 76 },
        { section: 8, label: "West Wind Spur", x: 82, y: 42 },
        { section: 120, label: "Rio Gate", x: 92, y: 58 }
      ]
    },
    2: {
      name: "Moonlit Rio",
      regions: ["Late Ferry", "Lantern Bend", "Silver Sandbar", "Mist Ford"],
      landmarks: [
        { section: 1, label: "Late Ferry", x: 12, y: 48 },
        { section: 2, label: "Lantern Bend", x: 28, y: 58 },
        { section: 3, label: "Open Rio", x: 42, y: 42 },
        { section: 80, label: "Silver Sandbar", x: 58, y: 65 },
        { section: 160, label: "Moon Ford", x: 74, y: 36 },
        { section: 1000, label: "Rio End", x: 91, y: 52 }
      ]
    },
    3: {
      name: "High White Pass",
      regions: ["Cloud Gulch", "Wind Chapel", "Sky Market", "Crane Ridge"],
      landmarks: [
        { section: 1, label: "Cloud Gulch", x: 10, y: 70 },
        { section: 50, label: "Wind Chapel", x: 26, y: 44 },
        { section: 100, label: "Sky Market", x: 46, y: 30 },
        { section: 200, label: "Saloon Descent", x: 67, y: 48 },
        { section: 350, label: "Crane Ridge", x: 79, y: 24 },
        { section: 1000, label: "White Summit", x: 92, y: 42 }
      ]
    },
    4: {
      name: "Jade Saloon Circuit",
      regions: ["Green Door", "Garden Tables", "Mirror Bar", "Backroom Archive"],
      landmarks: [
        { section: 1, label: "Green Door", x: 14, y: 58 },
        { section: 60, label: "Garden Tables", x: 30, y: 32 },
        { section: 140, label: "Mirror Bar", x: 48, y: 58 },
        { section: 240, label: "Iron Wager", x: 66, y: 38 },
        { section: 380, label: "Backroom Archive", x: 80, y: 65 },
        { section: 1000, label: "Saloon Roof", x: 92, y: 28 }
      ]
    },
    5: {
      name: "Iron Mountain Line",
      regions: ["Iron Gate", "Ash Ravine", "Bell Foundry", "Storm Ridge"],
      landmarks: [
        { section: 1, label: "Iron Gate", x: 10, y: 66 },
        { section: 75, label: "Ash Ravine", x: 25, y: 50 },
        { section: 150, label: "Bell Foundry", x: 44, y: 70 },
        { section: 280, label: "Rail Pass", x: 64, y: 40 },
        { section: 400, label: "Storm Ridge", x: 80, y: 52 },
        { section: 1000, label: "Black Peak", x: 92, y: 24 }
      ]
    },
    6: {
      name: "Lotus Dawn Range",
      regions: ["First Petal Ranch", "Rose Lake", "Sun Bridge", "Final Dawn"],
      landmarks: [
        { section: 1, label: "First Petal Ranch", x: 12, y: 60 },
        { section: 90, label: "Rose Lake", x: 30, y: 42 },
        { section: 180, label: "Sun Bridge", x: 47, y: 58 },
        { section: 300, label: "Dawn Field", x: 65, y: 36 },
        { section: 420, label: "Dawn Gate", x: 80, y: 55 },
        { section: 1000, label: "Final Dawn", x: 92, y: 30 }
      ]
    }
  },
  books: [
    {
      id: 1,
      title: "Book 1: The Dusty Dawn Trail",
      sectionCount: 1000,
      unlockText: "Unlocked at the start.",
      sections: {
        1: {
          title: "The Red Mesa Signpost",
          art: "Red Mesa Picture",
          text: "You wake beside a trail marker carved with eleven faraway book titles. The western road glows like a ribbon of brass. A coffee seller points to a broken rail bridge, the sheriff's spur, and a cactus flat full of tracks.",
          effects: { addFlags: ["red_mesa_seen"] },
          choices: [
            {
              label: "Ride to the sheriff's spur and read the wanted board.",
              hint: "A Wisdom path.",
              target: { book: 1, section: 2 },
              requirements: { stats: { Wisdom: 10 } }
            },
            {
              label: "Cross the broken rail bridge by speed and nerve.",
              hint: "An Agility path.",
              target: { book: 1, section: 3 },
              requirements: { stats: { Agility: 11 } }
            },
            {
              label: "Walk into Cactus Flats and listen for trail signs.",
              hint: "A Spirit path.",
              target: { book: 1, section: 4 },
              requirements: { stats: { Spirit: 10 } }
            }
          ]
        },
        2: {
          title: "The Sheriff's Coffee",
          art: "Sheriff Office Picture",
          text: "The sheriff pours coffee black enough to float a horseshoe. Between sips, he names a Moonlit Rio ferry and gives you a brass rail token.",
          effects: {
            addItems: ["brass rail token"],
            addFlags: ["sheriff_trusts_you"],
            unlockBooks: [2],
            upgradePoints: 1,
            money: 12
          },
          choices: [
            {
              label: "Return to the Red Mesa signpost with the sheriff's proof.",
              target: { book: 1, section: 6 }
            },
            {
              label: "Follow the sheriff's map down to the ferry road.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            }
          ]
        },
        3: {
          title: "The Broken Rail Bridge",
          art: "Rail Bridge Picture",
          text: "You race across beams slick with river mist. Halfway over, a plank falls away and reveals a lockbox caught in the bridge ribs.",
          effects: { addFlags: ["rail_bridge_crossed"] },
          choices: [
            {
              label: "Pry open the lockbox.",
              hint: "Requires Strength 11.",
              target: { book: 1, section: 5 },
              requirements: { stats: { Strength: 11 } }
            },
            {
              label: "Leave the box and spur your horse to the far bank.",
              target: { book: 1, section: 6 }
            }
          ]
        },
        4: {
          title: "Cactus Flats",
          art: "Cactus Flat Picture",
          text: "The cactus field bends in the wind and hides a bargain: carry its river token west, and the water will remember your footfalls. You find a smooth green token under a flat stone.",
          effects: {
            addItems: ["green river token"],
            addFlags: ["cactus_flats_found"],
            upgradePoints: 1,
            money: 8
          },
          choices: [
            {
              label: "Take the token back to the Red Mesa signpost.",
              target: { book: 1, section: 6 }
            },
            {
              label: "Use the token to find a hidden crossing.",
              target: { book: 1, section: 7 },
              requirements: { items: ["green river token"] }
            }
          ]
        },
        5: {
          title: "The Rail Lockbox",
          art: "Lockbox Picture",
          text: "The box snaps open. Inside rests a copper map nail and a scrap of blue paper showing the Moonlit Rio road.",
          effects: {
            addItems: ["copper map nail"],
            addFlags: ["map_nail_found"],
            unlockBooks: [2],
            money: 18
          },
          choices: [
            {
              label: "Pin the scrap to your map.",
              target: { book: 1, section: 6 }
            },
            {
              label: "Follow the blue paper straight to the river.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            }
          ]
        },
        6: {
          title: "The Paper Map Opens",
          art: "Paper Map Picture",
          text: "Back at the signpost, the second book title glows when your map, proof, or token touches the wood. The trail is beginning to understand you.",
          choices: [
            {
              label: "Enter Book 2: The Moonlit Rio.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            },
            {
              label: "Search for another sign beside the Red Mesa marker.",
              target: { book: 1, section: 8 },
              requirements: { stats: { Wisdom: 11 } }
            },
            {
              label: "Rest, study your gear, and return to the first choice.",
              target: { book: 1, section: 1 }
            }
          ]
        },
        7: {
          title: "The Hidden Ford",
          art: "Hidden Ford",
          text: "A submerged stone path rises under your feet. The green token warms in your hand. By the far bank, moonlight points toward the ferry road.",
          effects: {
            addFlags: ["hidden_ford_found"],
            unlockBooks: [2]
          },
          choices: [
            {
              label: "Step onto the Moonlit Rio road.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            }
          ]
        },
        8: {
          title: "The West Wind Knot",
          art: "Secret Sign",
          text: "Behind the milestone, you find a knot tied from red thread and horsehair. It hums with west wind, and the road beyond it is still faint.",
          effects: {
            addFlags: ["westwind_knot_found"],
            unlockBooks: [3]
          },
          choices: [
            {
              label: "Open Book 3: The High White Pass.",
              target: { book: 3, section: 1 },
              requirements: { books: [3] }
            },
            {
              label: "Follow the faint road west.",
              target: { book: 1, section: 9 }
            },
            {
              label: "Return to the paper map.",
              target: { book: 1, section: 6 }
            }
          ]
        }
      }
    },
    {
      id: 2,
      title: "Book 2: The Moonlit Rio",
      sectionCount: 1000,
      unlockText: "Unlock with a river token, shrine proof, or a map route.",
      sections: {
        1: {
          title: "The Ferry That Arrives Late",
          art: "Moonlit Ferry",
          text: "A black ferry drifts in long after its bell has rung. The ferryman asks for proof that the road sent you.",
          effects: { addFlags: ["book_2_entered"] },
          choices: [
            {
              label: "Show proof that the road sent you.",
              target: { book: 2, section: 2 },
              requirements: { books: [2] }
            },
            {
              label: "Offer a river token instead.",
              target: { book: 2, section: 2 },
              requirements: { items: ["river token"] }
            },
            {
              label: "Return to the Dusty Dawn Trail.",
              target: { book: 1, section: 6 }
            }
          ]
        },
        2: {
          title: "Lanterns Below the Water",
          art: "River Lanterns",
          text: "Lanterns glow beneath the current like patient stars. One rises, dripping silver light, and leaves a ferry pass in your palm.",
          effects: { addItems: ["ferry pass"], addFlags: ["ferry_pass_won"], upgradePoints: 1, money: 16 },
          choices: [
            {
              label: "Ride west along the river.",
              target: { book: 2, section: 3 }
            },
            {
              label: "Leave the river for the high road.",
              target: { book: 3, section: 1 },
              requirements: { books: [3] }
            }
          ]
        },
        3: {
          title: "End of the Sample Current",
          art: "Open Water",
          text: "The ferry glides toward hundreds of river choices. Each numbered bend carries another small risk, reward, or road sign.",
          effects: { addFlags: ["sample_end_reached"], money: 10 },
          choices: [
            {
              label: "Continue to Section 4.",
              target: { book: 2, section: 4 }
            }
          ]
        }
      }
    },
    {
      id: 3,
      title: "Book 3: The High White Pass",
      sectionCount: 1000,
      unlockText: "Unlock by finding the west wind knot.",
      sections: {
        1: {
          title: "The Road Above the Clouds",
          art: "High Road",
          text: "Clouds slide below the path like slow white rivers. This sample opens the book and marks the route for future sections.",
          effects: { addFlags: ["book_3_entered"], money: 20 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 3, section: 2 } },
            { label: "Return to the Dusty Dawn Trail for now.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 4,
      title: "Book 4: The Jade Saloon Circuit",
      sectionCount: 1000,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Green Saloon Door",
          art: "Jade Saloon",
          text: "A sealed saloon waits behind green swinging doors. Future sections will decide who may enter.",
          effects: { addFlags: ["book_4_entered"], money: 25 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 4, section: 2 } },
            { label: "Return to the Dusty Dawn Trail.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Book 5: The Iron Mountain Line",
      sectionCount: 1000,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Iron Gate",
          art: "Iron Pass",
          text: "An iron rail line waits for a stronger chapter. The route is defined for expansion.",
          effects: { addFlags: ["book_5_entered"], money: 30 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 5, section: 2 } },
            { label: "Return to the Dusty Dawn Trail.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 6,
      title: "Book 6: The Lotus Dawn Range",
      sectionCount: 1000,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Last First Step",
          art: "Lotus Range",
          text: "At the edge of this range, sunrise opens across the ranchland. The ending road is ready for later writing.",
          effects: { addFlags: ["book_6_entered"], money: 40 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 6, section: 2 } },
            { label: "Return to the Dusty Dawn Trail.", target: { book: 1, section: 6 } }
          ]
        }
      }
    }
  ]
};

(function fillNumberedSections() {
  const names = {
    1: "The Dusty Dawn Trail",
    2: "The Moonlit Rio",
    3: "The High White Pass",
    4: "The Jade Saloon Circuit",
    5: "The Iron Mountain Line",
    6: "The Lotus Dawn Range"
  };
  const arts = {
    1: "Sunset Mesa",
    2: "Moonlit Rio",
    3: "High Pass",
    4: "Jade Saloon",
    5: "Iron Rail",
    6: "Lotus Range"
  };
  const nextBookUnlocks = {
    1: { at: 120, book: 2, flag: "dawn_road_route_complete" },
    2: { at: 160, book: 3, flag: "moonlit_river_route_complete" },
    3: { at: 200, book: 4, flag: "high_road_route_complete" },
    4: { at: 240, book: 5, flag: "jade_court_route_complete" },
    5: { at: 280, book: 6, flag: "iron_pass_route_complete" }
  };

  window.GameData.books.forEach((book) => {
    book.uniqueName = names[book.id];
    book.sectionCount = 1000;
    for (let sectionNumber = 1; sectionNumber <= book.sectionCount; sectionNumber += 1) {
      if (!book.sections[sectionNumber]) {
        book.sections[sectionNumber] = makeGeneratedSection(book, sectionNumber);
      }
    }
  });

  function makeGeneratedSection(book, sectionNumber) {
    const unlock = nextBookUnlocks[book.id];
    const effects = {
      addFlags: [`book_${book.id}_section_${sectionNumber}_visited`]
    };
    if (sectionNumber % 10 === 0) effects.money = book.id * 5 + Math.floor(sectionNumber / 10);
    if (unlock && sectionNumber === unlock.at) {
      effects.unlockBooks = [unlock.book];
      effects.addFlags.push(unlock.flag);
      effects.money = (effects.money || 0) + 50;
    }

    return {
      title: `${names[book.id]} - Section ${sectionNumber}`,
      art: arts[book.id],
      text: `Section ${sectionNumber} of ${book.title}. The road continues through ${names[book.id]}, with coins, choices, and signs for later hand-written story events.`,
      effects,
      choices: generatedChoices(book, sectionNumber, unlock)
    };
  }

  function generatedChoices(book, sectionNumber, unlock) {
    const choices = [];
    if (sectionNumber < book.sectionCount) {
      choices.push({
        label: `Continue to Section ${sectionNumber + 1}.`,
        target: { book: book.id, section: sectionNumber + 1 }
      });
    }
    if (sectionNumber % 25 === 0 && sectionNumber + 5 <= book.sectionCount) {
      choices.push({
        label: `Take a risky shortcut to Section ${sectionNumber + 5}.`,
        hint: "A stat check path.",
        target: { book: book.id, section: sectionNumber + 5 },
        requirements: { stats: { Agility: 10 + book.id } }
      });
    }
    if (unlock && sectionNumber === unlock.at) {
      choices.push({
        label: `Open ${window.GameData.books.find((next) => next.id === unlock.book).title}.`,
        target: { book: unlock.book, section: 1 },
        requirements: { books: [unlock.book] }
      });
    }
    if (sectionNumber === book.sectionCount && book.id < 6) {
      choices.push({
        label: `Finish this book and enter Book ${book.id + 1}.`,
        target: { book: book.id + 1, section: 1 },
        requirements: { books: [book.id + 1] }
      });
    }
    if (!choices.length) {
      choices.push({ label: "Return to the first section.", target: { book: book.id, section: 1 } });
    }
    return choices;
  }
})();

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
      title: "Section 1: The Red Mesa Signpost",
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
      title: "Section 2: The Sheriff's Coffee",
      art: "Sheriff Office Picture",
      text: "The sheriff pours coffee black enough to float a horseshoe. He slides you a brass rail token and points toward the Moonlit Rio ferry.",
      effects: { addItems: ["brass rail token", "marshal's spare revolver"], addFlags: ["sheriff_trusts_you"], unlockBooks: [2], upgradePoints: 1, money: 12 },
      choices: [
        { label: "Pin the token to your map and return to the Red Mesa signpost.", target: { book: 1, section: 6 } },
        { label: "Ride straight for the Moonlit Rio ferry.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[3] = {
      title: "Section 3: The Broken Rail Bridge",
      art: "Rail Bridge Picture",
      text: "The bridge groans like a tired fiddle. Halfway across, you spot a lockbox wedged below the rails.",
      effects: { addFlags: ["rail_bridge_crossed"], money: 5 },
      choices: [
        { label: "Pry open the lockbox before the bridge gives out.", target: { book: 1, section: 5 }, requirements: { stats: { Strength: 11 } } },
        { label: "Leave the box and spur your horse to the far side.", target: { book: 1, section: 6 } }
      ]
    };
    sections[4] = {
      title: "Section 4: Cactus Flats",
      art: "Cactus Flat Picture",
      text: "The cactus field is full of pale blossoms and suspicious silence. Under a flat stone you find a green river token wrapped in rawhide.",
      effects: { addItems: ["green river token", "desert pony"], addFlags: ["cactus_flats_found"], upgradePoints: 1, money: 8 },
      choices: [
        { label: "Carry the token back to the signpost.", target: { book: 1, section: 6 } },
        { label: "Use the token to find a hidden ford.", target: { book: 1, section: 7 }, requirements: { items: ["green river token"] } }
      ]
    };
    sections[5] = {
      title: "Section 5: The Rail Lockbox",
      art: "Lockbox Picture",
      text: "Inside the lockbox sits a copper map nail and a folded wanted notice for a bandit called the Paper Saint.",
      effects: { addItems: ["copper map nail", "pepperbox pistol"], addFlags: ["paper_saint_notice"], unlockBooks: [2], money: 18 },
      choices: [
        { label: "Pin the notice to your paper map.", target: { book: 1, section: 6 } },
        { label: "Follow the notice toward the Moonlit Rio.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[6] = {
      title: "Section 6: The Paper Map Opens",
      art: "Paper Map Picture",
      text: "Your map crackles like dry leaves. Ink roads spread west, and the second book title glows beside a sketch of black water.",
      choices: [
        { label: "Enter Book 2 and ride for the Moonlit Rio.", target: { book: 2, section: 1 }, requirements: { books: [2] } },
        { label: "Search behind the signpost for a hidden spur trail.", target: { book: 1, section: 8 }, requirements: { stats: { Wisdom: 11 } } },
        { label: "Circle back to the Red Mesa signpost.", target: { book: 1, section: 1 } }
      ]
    };
    sections[7] = {
      title: "Section 7: The Hidden Ford",
      art: "Hidden Ford Picture",
      text: "Moonlight catches a shallow crossing nobody marked. The river token warms in your glove and the far bank opens.",
      effects: { addFlags: ["hidden_ford_found"], unlockBooks: [2], money: 10 },
      choices: [
        { label: "Cross into Book 2 by the hidden ford.", target: { book: 2, section: 1 }, requirements: { books: [2] } }
      ]
    };
    sections[8] = {
      title: "Section 8: The West Wind Spur",
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
      title: `Section ${sectionNumber}: ${meta.name}`,
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
    if (sectionNumber % 25 === 0 && sectionNumber + 5 <= 1000) {
      choices.push({
        label: "Try a risky shortcut through rough country.",
        target: { book: meta.id, section: sectionNumber + 5 },
        requirements: { stats: { Agility: 10 + Math.min(meta.id, 6) } },
        result: "You cut across rough country and come out several trail marks ahead."
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
