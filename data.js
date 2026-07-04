window.GameData = {
  baseStats: {
    Health: 24,
    Strength: 10,
    Wisdom: 10,
    Agility: 10,
    Spirit: 10
  },
  heroes: [
    {
      id: "cloudbound-trickster",
      name: "Cloudbound Trickster",
      role: "Fast pathfinder",
      description: "A laughing wanderer who reads wind, rooftops, and trouble before anyone else sees them.",
      statModifiers: { Health: -2, Strength: 0, Wisdom: 0, Agility: 3, Spirit: 1 },
      startingItems: ["peach charm"]
    },
    {
      id: "lantern-pilgrim",
      name: "Lantern Pilgrim",
      role: "Wise guide",
      description: "A patient traveler carrying a lamp that never dims in honest darkness.",
      statModifiers: { Health: 0, Strength: -1, Wisdom: 3, Agility: 0, Spirit: 2 },
      startingItems: ["paper lantern"]
    },
    {
      id: "river-warden",
      name: "River Warden",
      role: "Balanced defender",
      description: "A calm guardian who knows ferry songs, old bridges, and the moods of deep water.",
      statModifiers: { Health: 2, Strength: 1, Wisdom: 0, Agility: -1, Spirit: 1 },
      startingItems: ["river token"]
    },
    {
      id: "iron-bell-guardian",
      name: "Iron-Bell Guardian",
      role: "Powerful protector",
      description: "A steady fighter whose bronze bell can wake courage in frightened hearts.",
      statModifiers: { Health: 4, Strength: 3, Wisdom: -1, Agility: -2, Spirit: 0 },
      startingItems: ["bronze bell"]
    },
    {
      id: "jade-physician",
      name: "Jade Physician",
      role: "Healer and scholar",
      description: "A careful healer who treats wounds, riddles, and bad decisions with equal seriousness.",
      statModifiers: { Health: 1, Strength: -2, Wisdom: 2, Agility: 0, Spirit: 3 },
      startingItems: ["jade salve"]
    },
    {
      id: "ember-fox-scout",
      name: "Ember Fox Scout",
      role: "Clever survivor",
      description: "A bright-eyed scout with a warm cloak, quick hands, and a talent for secret doors.",
      statModifiers: { Health: -1, Strength: 0, Wisdom: 1, Agility: 2, Spirit: 1 },
      startingItems: ["ember cloak"]
    }
  ],
  codewords: {
    "BLOODHOUND6721": {
      description: "Maxes out the current hero and opens every route.",
      effects: { addCodewords: ["BLOODHOUND6721"], maxEverything: true }
    }
  },
  books: [
    {
      id: 1,
      title: "Book 1: The Dawn Road",
      sectionCount: 500,
      unlockText: "Unlocked at the start.",
      sections: {
        1: {
          title: "The Milestone Beneath the Red Sun",
          art: "Dawn Road",
          text: "You wake beside a road marker carved with six faraway book titles. The western road glows like a ribbon of brass. A tea seller points to a broken bridge, a shrine hill, and a field of whispering reeds.",
          effects: { addFlags: ["road_marker_seen"] },
          choices: [
            {
              label: "Climb the shrine hill and read the old bells.",
              hint: "A Wisdom path.",
              target: { book: 1, section: 2 },
              requirements: { stats: { Wisdom: 10 } }
            },
            {
              label: "Cross the broken bridge by speed and nerve.",
              hint: "An Agility path.",
              target: { book: 1, section: 3 },
              requirements: { stats: { Agility: 11 } }
            },
            {
              label: "Walk into the reeds and listen for voices.",
              hint: "A Spirit path.",
              target: { book: 1, section: 4 },
              requirements: { stats: { Spirit: 10 } }
            }
          ]
        },
        2: {
          title: "Bells That Remember Names",
          art: "Shrine Hill",
          text: "The shrine bells sound without wind. Between their notes, you hear the name of an ancient ferry. The hill path rewards patience with a brass prayer strip and a new route.",
          effects: {
            addItems: ["brass prayer strip"],
            addFlags: ["shrine_bells_answered"],
            unlockBooks: [2],
            upgradePoints: 1,
            money: 12
          },
          choices: [
            {
              label: "Return to the milestone with the shrine's proof.",
              target: { book: 1, section: 6 }
            },
            {
              label: "Follow the shrine stairs down to the ferry road.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            }
          ]
        },
        3: {
          title: "The Bridge of Missing Planks",
          art: "Broken Bridge",
          text: "You race across beams slick with river mist. Halfway over, a plank falls away and reveals a sealed box caught in the bridge ribs.",
          effects: { addFlags: ["bridge_crossed"] },
          choices: [
            {
              label: "Pry open the sealed box.",
              hint: "Requires Strength 11.",
              target: { book: 1, section: 5 },
              requirements: { stats: { Strength: 11 } }
            },
            {
              label: "Leave the box and hurry to the far bank.",
              target: { book: 1, section: 6 }
            }
          ]
        },
        4: {
          title: "The Reeds Speak in Code",
          art: "Whispering Reeds",
          text: "The reeds bend toward you and whisper a bargain: carry their river token west, and the water will remember your footfalls. You find a smooth green token under the mud.",
          effects: {
            addItems: ["green river token"],
            addFlags: ["reeds_bargain_made"],
            upgradePoints: 1,
            money: 8
          },
          choices: [
            {
              label: "Take the token back to the milestone.",
              target: { book: 1, section: 6 }
            },
            {
              label: "Ask the reeds for a hidden crossing.",
              target: { book: 1, section: 7 },
              requirements: { items: ["green river token"] }
            }
          ]
        },
        5: {
          title: "The Sealed Box",
          art: "Bridge Secret",
          text: "The box snaps open. Inside rests a copper map nail and a scrap of blue paper showing a moonlit river road.",
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
          title: "The Road Marker Changes",
          art: "Living Map",
          text: "Back at the marker, the second book title glows when your map, proof, or token touches the stone. The road is beginning to understand you.",
          choices: [
            {
              label: "Enter Book 2: The Moonlit River.",
              target: { book: 2, section: 1 },
              requirements: { books: [2] }
            },
            {
              label: "Search for another sign beside the milestone.",
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
          title: "A Crossing Under the Reeds",
          art: "Hidden Ford",
          text: "A submerged stone path rises under your feet. The green token warms in your hand. By the far bank, a dragonfly points toward the moonlit ferry road.",
          effects: {
            addFlags: ["hidden_ford_found"],
            unlockBooks: [2]
          },
          choices: [
            {
              label: "Step onto the moonlit river road.",
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
              label: "Open Book 3: The High White Road.",
              target: { book: 3, section: 1 },
              requirements: { books: [3] }
            },
            {
              label: "Follow the faint road west.",
              target: { book: 1, section: 9 }
            },
            {
              label: "Return to the living marker.",
              target: { book: 1, section: 6 }
            }
          ]
        }
      }
    },
    {
      id: 2,
      title: "Book 2: The Moonlit River",
      sectionCount: 500,
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
              label: "Return to the Dawn Road.",
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
      title: "Book 3: The High White Road",
      sectionCount: 500,
      unlockText: "Unlock by finding the west wind knot.",
      sections: {
        1: {
          title: "The Road Above the Clouds",
          art: "High Road",
          text: "Clouds slide below the path like slow white rivers. This sample opens the book and marks the route for future sections.",
          effects: { addFlags: ["book_3_entered"], money: 20 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 3, section: 2 } },
            { label: "Return to the Dawn Road for now.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 4,
      title: "Book 4: The Hidden Jade Court",
      sectionCount: 500,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Jade Gate",
          art: "Jade Court",
          text: "A sealed court waits behind green stone doors. Future sections will decide who may enter.",
          effects: { addFlags: ["book_4_entered"], money: 25 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 4, section: 2 } },
            { label: "Return to the Dawn Road.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Book 5: The Iron Mountain Pass",
      sectionCount: 500,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Iron Gate",
          art: "Iron Pass",
          text: "An iron mountain waits for a stronger chapter. The route is defined for expansion.",
          effects: { addFlags: ["book_5_entered"], money: 30 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 5, section: 2 } },
            { label: "Return to the Dawn Road.", target: { book: 1, section: 6 } }
          ]
        }
      }
    },
    {
      id: 6,
      title: "Book 6: The Lotus Dawn",
      sectionCount: 500,
      unlockText: "Unlock later in the story or with bloodhound6721.",
      sections: {
        1: {
          title: "The Last First Step",
          art: "Lotus Dawn",
          text: "At the edge of the final book, the sunrise unfolds like a lotus. The ending road is ready for later writing.",
          effects: { addFlags: ["book_6_entered"], money: 40 },
          choices: [
            { label: "Continue to Section 2.", target: { book: 6, section: 2 } },
            { label: "Return to the Dawn Road.", target: { book: 1, section: 6 } }
          ]
        }
      }
    }
  ]
};

(function fillNumberedSections() {
  const names = {
    1: "The Dawn Road",
    2: "The Moonlit River",
    3: "The High White Road",
    4: "The Hidden Jade Court",
    5: "The Iron Mountain Pass",
    6: "The Lotus Dawn"
  };
  const arts = {
    1: "Dawn Road",
    2: "Moonlit River",
    3: "High Road",
    4: "Jade Court",
    5: "Iron Pass",
    6: "Lotus Dawn"
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
    book.sectionCount = 500;
    for (let sectionNumber = 1; sectionNumber <= 500; sectionNumber += 1) {
      if (!book.sections[sectionNumber]) {
        book.sections[sectionNumber] = makeGeneratedSection(book, sectionNumber);
      }
    }
  });

  function makeGeneratedSection(book, sectionNumber) {
    const unlock = nextBookUnlocks[book.id];
    const effects = {
      addFlags: [`book_${book.id}_section_${sectionNumber}_visited`],
      money: sectionNumber % 10 === 0 ? book.id * 5 + Math.floor(sectionNumber / 10) : 1
    };
    if (unlock && sectionNumber === unlock.at) {
      effects.unlockBooks = [unlock.book];
      effects.addFlags.push(unlock.flag);
      effects.money += 50;
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
    if (sectionNumber < 500) {
      choices.push({
        label: `Continue to Section ${sectionNumber + 1}.`,
        target: { book: book.id, section: sectionNumber + 1 }
      });
    }
    if (sectionNumber > 1) {
      choices.push({
        label: `Return to Section ${sectionNumber - 1}.`,
        target: { book: book.id, section: sectionNumber - 1 }
      });
    }
    if (sectionNumber % 25 === 0 && sectionNumber + 5 <= 500) {
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
    if (sectionNumber === 500 && book.id < 6) {
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
