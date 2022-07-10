let audioNum = 0;
const configLevel = () => {
  World.clear(engine.world);
  Engine.clear(engine);
  particles = [];
  bodies = [];
  peppers = [];
  if(document.querySelector("#music-element").paused){
    document.querySelector("#music-element").src = "assets/audio/track"+audioNum+".mp3";
    document.querySelector("#music-element").volume = 0.2;
    document.querySelector("#music-element").play();
  }
  for (let y in levels[level].bitmap) {
    let row = levels[level].bitmap[y];
    for (let x in row) {
      let char = row[x];
      if (char !== " ") {
        if (char === "@") {
          player = new Player(
            Bodies.fromVertices(x * config.world.blockSize, y * config.world.blockSize, [
              {x: 0, y: 2},
              {x: 0, y: config.player.height},
              {x: config.player.width, y: config.player.height},
              {x: config.player.width, y: 2},
              {x: config.player.width - 2, y: 0},
              {x: 2, y: 0}
            ])
          );
          configPlayerEvents();
          bodies.push(player);
        } else if (['G', 'O', 'R', ':'].includes(char)) {
          peppers.push(new Pepper({'G':'green','O':'orange','R':'red',':':'golden'}[char], x * config.world.blockSize, y * config.world.blockSize))
        } else if ("ƒßπî".includes(char)) {

          bodies.push(new Enemy(char, x * config.world.blockSize, y * config.world.blockSize));
          
        } else if("FISP".includes(char)){
          bodies.push(new Boss(char, x * config.world.blockSize, y * config.world.blockSize))
        } else {
          bodies.push(new Block(char, x * config.world.blockSize, y * config.world.blockSize));
        }
      }
    }
  }
  if(levels[level].theme) gameBg = levels[level].theme
  if(levels[level].message){ // make sure to check the player hasn't seen it before
    scene = "cutscene";
    textFinished = [];
    msgs = levels[level].message.map(x => [...x, 0]);
    csc = 0;
    csy = 0;
    cutDone = false;
  }
}



document.querySelector("#music-element").onended = () => {
  audioNum++;
  if(audioNum >= 4) audioNum = 0;
  document.querySelector("#music-element").src = "assets/audio/track"+audioNum+".mp3";
  document.querySelector("#music-element").volume = 0.2;
  document.querySelector("#music-element").play();
}

window.onerror = (error) => {
  scene = 'error'
}
    
function setup(){
  // createCanvas(1200, 600);
  createCanvas(windowWidth, windowHeight);
  angleMode(RADIANS); // set angle mode to radians
  frameRate(60); // set framerate
  noStroke(); // default remove stroke for shapes
  smooth(); // round shapes to make things more efficient
  pixelDensity(2); // increase canvas definition by 2 (higher = more lag)
  rectMode(LEFT, TOP);

  engine = Engine.create({
    gravity: {
      y: config.world.gravity 
    },
    enableSleeping: true
  });
  world = engine.world;
  Matter.Runner.run(engine);
}

// Camera Coordinates
let cameraX = 0, cameraY = 0;
let dragon = new Dragon();
let shakeTimer = 0;
let shakeIntensity = 0;
function draw() {
  cursor("default")
  push();
  if(shakeTimer > 0){
    translate(random(-shakeIntensity, shakeIntensity), random(-shakeIntensity, shakeIntensity));
    shakeIntensity -= shakeIntensity/shakeTimer;
    shakeTimer--;
  }
  switch(scene) {
    case "game": game();
      break;

    case "menu": menu();
      break;

    case "win": win();
      break;

    case "cutscene": cutscene();
      break;

    case "dead": dead();
      break;
  }
  pop();
  
  
  clicked = false;
  currentKeyReleased = false;
  mir = false;
}

function mouseClicked(){
  clicked = true;
}

function mouseReleased(){
  mir = true;
}

function keyPressed(){
  keys[key.length === 1 ? key.toLowerCase() : key] = true;
}

function keyReleased(){
  keys[key.length === 1 ? key.toLowerCase() : key] = false;
  currentKeyReleased = key;
}