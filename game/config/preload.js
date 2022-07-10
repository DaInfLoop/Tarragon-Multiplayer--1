// All sprites
let sprites = {};

// Load a single sprite
function loadSprite(name, file) {
  sprites[name] = loadImage("assets/images/" + file);
}

// Load a spritesheet
function loadSpriteSheet(file, bitmap){
  loadImage("assets/images/" + file, img => {
    let w = img.width;
    let h = img.height;
    let sizeX = w / bitmap[0].length;
    let sizeY = h / bitmap.length;
    for(let y in bitmap){
      for(let x in bitmap[y]){
        sprites[bitmap[y][x]] = img.get(x * sizeX, y * sizeY, sizeX, sizeY);
      }
    }
  });
}

// Load all images in the preload function
function preload () {
  loadSpriteSheet("Player-walk.png", [
    ["pwalk0", "pwalk1", "pwalk2", "pwalk3", "pwalk4", "pwalk5"]
  ]);
  loadSpriteSheet("Player-jump.png", [
    ["pjump0", "pjump1", "pjump2", "pjump3", "pjump4"]
  ]);
  loadSpriteSheet("Player-walljump.png", [
    ["pwjump0", "pwjump1", "pwjump2", "pwjump3", "pwjump4", "pwjump5"]
  ]);
  
  loadSpriteSheet("Dragon-fire.png", [
    ["dfire0", "dfire1", "dfire2", "dfire3", "dfire4", "dfire5", "dfire6", "dfire7", "dfire8", "dfire9"]
  ]);
  loadSpriteSheet("Dragon-eat.png", [
    ["deat0", "deat1", "deat2", "deat3", "deat4", "deat5", "deat6", "deat7", "deat8", "deat9"]
  ]);
  loadSpriteSheet("Dragon-fly.png", [
    ["dfly0", "dfly1", "dfly2", "dfly3", "dfly4", "dfly5", "dfly6", "dfly7", "dfly8", "dfly9"]
  ]);
  
  loadSpriteSheet('peppers.png', [
    ['red-pepper', 'orange-pepper', 'green-pepper', "golden-pepper"]
  ]);

  loadSpriteSheet("landscape-fire.png", [
    ["Fire-0", "Fire-1", "Fire-2", "Fire-3", "Fire-4", "Fire->", "Fire-/", "Fire-<", "Fire-\\"]
  ])
  loadSpriteSheet("landscape-stone.png", [
    ["Stone-0", "Stone-1", "Stone-2", "Stone-3", "Stone-4", "Stone->", "Stone-/", "Stone-<", "Stone-\\"]
  ])
  loadSpriteSheet("landscape-forest.png", [
    ["Forest-0", "Forest-1", "Forest-2", "Forest-3", "Forest-4", "Forest->", "Forest-/", "Forest-<", "Forest-\\"]
  ])
  loadSpriteSheet("landscape-portal.png", [
    ["Portal-0", "Portal-1", "Portal-2", "Portal-3", "Portal-4", "Portal->", "Portal-/", "Portal-<", "Portal-\\"]
  ])
  loadSpriteSheet("landscape-ice.png", [
    ["Ice-0", "Ice-1", "Ice-2", "Ice-3", "Ice-4", "Ice->", "Ice-/", "Ice-<", "Ice-\\"]
  ])

  loadSprite("bg-Fire", "bgFire.png")
  loadSprite("bg-Forest", "bgForest.png")
  loadSprite("bg-Ice", "bgIce.png")
  loadSprite("bg-Stone", "bgMountains.png")
  loadSprite("bg-Portal", "bgPortal.png")

  loadSpriteSheet("fire-minion.png", [
    ["enemy-fire-minion-attack-0", "enemy-fire-minion-attack-1", "enemy-fire-minion-attack-2", "enemy-fire-minion-attack-3", "enemy-fire-minion-attack-4", "enemy-fire-minion-attack-5"],
    ["enemy-fire-minion-attack-6", "enemy-fire-minion-walk-0", "enemy-fire-minion-walk-1", "enemy-fire-minion-walk-2", "enemy-fire-minion-walk-3", "enemy-fire-minion-walk-4"]
  ])
  loadSpriteSheet("stone-minion.png", [
    ["enemy-stone-minion-attack-0", "enemy-stone-minion-attack-1", "enemy-stone-minion-attack-2", "enemy-stone-minion-attack-3", "enemy-stone-minion-attack-4", "enemy-stone-minion-attack-5"],
    ["enemy-stone-minion-attack-6", "enemy-stone-minion-walk-0", "enemy-stone-minion-walk-1", "enemy-stone-minion-walk-2", "enemy-stone-minion-walk-3", "enemy-stone-minion-walk-4"]
  ])
  loadSpriteSheet("ice-minion.png", [
    ["enemy-ice-minion-attack-0", "enemy-ice-minion-attack-1", "enemy-ice-minion-attack-2", "enemy-ice-minion-attack-3", "enemy-ice-minion-attack-4", "enemy-ice-minion-attack-5"],
    ["enemy-ice-minion-attack-6", "enemy-ice-minion-walk-0", "enemy-ice-minion-walk-1", "enemy-ice-minion-walk-2", "enemy-ice-minion-walk-3", "enemy-ice-minion-walk-4"]
  ])
  loadSpriteSheet("plant-minion.png", [
    ["enemy-plant-minion-attack-0", "enemy-plant-minion-attack-1", "enemy-plant-minion-attack-2", "enemy-plant-minion-attack-3", "enemy-plant-minion-attack-4", "enemy-plant-minion-attack-5"],
    ["enemy-plant-minion-attack-6", "enemy-plant-minion-walk-0", "enemy-plant-minion-walk-1", "enemy-plant-minion-walk-2", "enemy-plant-minion-walk-3", "enemy-plant-minion-walk-4"]
  ])
  loadSprite("fire-boss", "fire-boss.png");

  loadSpriteSheet("vfx-blood-1.png", [
    ["blood0-0", "blood0-1", "blood0-2", "blood0-3", "blood0-4", "blood0-5", "blood0-6", "blood0-7", "blood0-8"]
  ])

  loadSpriteSheet("vfx-blood-2.png", [
    ["blood1-0", "blood1-1", "blood1-2", "blood1-3", "blood1-4", "blood1-5", "blood1-6", "blood1-7", "blood1-8", "blood1-9"]
  ])

  loadSpriteSheet("vfx-blood-3.png", [
    ["blood2-0", "blood2-1", "blood2-2", "blood2-3", "blood2-4", "blood2-5", "blood2-6", "blood2-7", "blood2-8", "blood2-9", "blood2-10", "blood2-11", "blood2-12", "blood2-13"]
  ])

  loadSpriteSheet("vfx-blood-4.png", [
    ["blood3-0", "blood3-1", "blood3-2", "blood3-3", "blood3-4", "blood3-5", "blood3-6"]
  ])

  loadSpriteSheet("vfx-blood-5.png", [
    ["blood4-0", "blood4-1", "blood4-2", "blood4-3", "blood4-4", "blood4-5", "blood4-6", "blood4-7", "blood4-8", "blood4-9"]
  ])

  loadSpriteSheet("vfx-blood-6.png", [
    ["blood5-0", "blood5-1", "blood5-2", "blood5-3", "blood5-4", "blood5-5", "blood5-6", "blood5-7", "blood5-8"]
  ])

  loadSprite("fire-boss", "fire-boss.png")
  loadSprite("stone-boss", "stone-boss.png")
  loadSprite("plant-boss", "plant-boss.png")
  loadSprite("ice-boss", "ice-boss.png")
  loadSprite("fireball", "fireball.png")

  loadSpriteSheet("portal.png", [
    ["pr0", "pr1", "pr2", "pr3", "pr4", "pr5", "pr6", "pr7", "pr8"]
  ]);
}

