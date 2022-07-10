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
    ["@", "Œ", "œ", "∑", "„", "∆"]
  ]);
  
  loadSpriteSheet('peppers.png', [
    ['R', 'O', 'G', ":"]
  ]);

  loadSpriteSheet("landscape-forest.png", [
    ["0", "1", "2", "3", "4", ">", "/", "<", "\\"]
  ])

  loadSpriteSheet("fire-minion.png", [
    ["ƒ", "enemy-fire-minion-attack-1", "enemy-fire-minion-attack-2", "enemy-fire-minion-attack-3", "enemy-fire-minion-attack-4", "enemy-fire-minion-attack-5"],
    ["enemy-fire-minion-attack-6", "enemy-fire-minion-walk-0", "enemy-fire-minion-walk-1", "enemy-fire-minion-walk-2", "enemy-fire-minion-walk-3", "enemy-fire-minion-walk-4"]
  ])
  loadSpriteSheet("stone-minion.png", [
    ["ß", "enemy-stone-minion-attack-1", "enemy-stone-minion-attack-2", "enemy-stone-minion-attack-3", "enemy-stone-minion-attack-4", "enemy-stone-minion-attack-5"],
    ["enemy-stone-minion-attack-6", "enemy-stone-minion-walk-0", "enemy-stone-minion-walk-1", "enemy-stone-minion-walk-2", "enemy-stone-minion-walk-3", "enemy-stone-minion-walk-4"]
  ])
  loadSpriteSheet("ice-minion.png", [
    ["î", "enemy-ice-minion-attack-1", "enemy-ice-minion-attack-2", "enemy-ice-minion-attack-3", "enemy-ice-minion-attack-4", "enemy-ice-minion-attack-5"],
    ["enemy-ice-minion-attack-6", "enemy-ice-minion-walk-0", "enemy-ice-minion-walk-1", "enemy-ice-minion-walk-2", "enemy-ice-minion-walk-3", "enemy-ice-minion-walk-4"]
  ])
  loadSpriteSheet("plant-minion.png", [
    ["π", "enemy-plant-minion-attack-1", "enemy-plant-minion-attack-2", "enemy-plant-minion-attack-3", "enemy-plant-minion-attack-4", "enemy-plant-minion-attack-5"],
    ["enemy-plant-minion-attack-6", "enemy-plant-minion-walk-0", "enemy-plant-minion-walk-1", "enemy-plant-minion-walk-2", "enemy-plant-minion-walk-3", "enemy-plant-minion-walk-4"]
  ])

  loadSprite("F", "fire-boss.png")
  loadSprite("S", "stone-boss.png")
  loadSprite("P", "plant-boss.png")
  loadSprite("I", "ice-boss.png")

  loadSpriteSheet("portal.png", [
    ["+", "¡", "™", "£", "¢", "∞", "§", "¶", "•"]
  ]);
}

let blockTypes = "@ROG:01234>/<\\ƒßîπ+";
let out = [];
let cells = [];
let blocks = [];
let size = 30;
let cellWidth = Number(prompt("Enter level width (cells)"));
let cellHeight = Number(prompt("Enter level height (cells)"));
let currentCode = "+";
let camX = 0, camY = 0;

class Sl {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.code = " ";
  }  

  run(){
      stroke(0);
      fill(255)
      rect(this.x * size, this.y * size, size, size);
    if(this.code !== " "){
      image(sprites[this.code], this.x * size, this.y * size, size, size);
    
    }
      noStroke();
    if((mouseX-camX) > this.x*size && (mouseX-camX) < this.x*size + size && (mouseY-camY) > this.y*size && (mouseY-camY) < this.y*size + size){
      cursor("pointer");
      fill(0, 30)
      rect(this.x * size, this.y * size, size, size);
      if(mouseIsPressed){
        this.code = currentCode;
        out[this.y][this.x] = this.code;
        console.clear()
        console.log("Paste level bitmap:")
        console.log(JSON.stringify(out.map(x => x.join``).join`\n`))
      }
      if(keyIsPressed && key === "z") {
        this.code = " ";
        out[this.y][this.x] = this.code;
        console.clear()
        console.log("Paste level bitmap:")
        console.log(JSON.stringify(out.map(x => x.join``).join`\n`))
      }
      
    }
  }
}

for(let y = 0; y < cellHeight; y++){
  let u = []
  for(let x = 0; x < cellWidth; x++) {
    cells.push(new Sl(x, y));
    u.push(" ")
  }
  out.push(u)
}

class B {
  constructor(code, x, y){
    this.x = x;
    this.y = y;
    this.code = code;
  }
  run(){
      stroke(0);
      fill(200, 225, 255)
      rect(this.x, this.y, size, size);
    if(this.code !== " "){
      image(sprites[this.code], this.x, this.y, size, size);
    
    }
      noStroke();
    if(mouseX > this.x && mouseX < this.x + size && mouseY > this.y && mouseY < this.y + size){
      cursor("pointer");
      fill(0, 30)
      rect(this.x, this.y, size, size);
      if(mouseIsPressed){
        currentCode = this.code
      }
      
    }
  }
}

for(let b in blockTypes) {
  blocks.push(new B(blockTypes[b], b*size, window.innerHeight-size));
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw(){
  cursor("default");
  background(200);
  
  push();
  translate(camX, camY);
  cells.forEach(x => x.run());
  pop();

  if(keyIsPressed){
    if(key === "ArrowLeft") camX -= 10;
    if(key === "ArrowRight") camX += 10;
    if(key === "ArrowUp") camY -= 10;
    if(key === "ArrowDown") camY += 10;
  }

  blocks.forEach(b => b.run())
}