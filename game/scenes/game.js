let trvs = {
  h1: 0,
  h2: 0,
  h3: 0
}
function game() {
  background(0);
  image(sprites["bg-Fire"], 0, 0, width, height);
  let playerPercentage = {
    x: (player.body.position.x / (levels[level].bitmap[0].length * config.world.blockSize)),
    y: (player.body.position.y / (levels[level].bitmap.length * config.world.blockSize))
  }
  image(sprites["bg-" + gameBg], -50 + ((playerPercentage.x - 0.5) * 100), -50 + ((playerPercentage.y - 0.5) * 100), width + 100, height + 100)
  bodies = bodies.filter(x => !x.dead);
  particles = particles.filter(x => !x.dead);
  peppers = peppers.filter(x => !x.collected);

  push();
  if (config.world.camera) {
    cameraX += ((width / 2 - player.body.position.x) - cameraX) / config.world.cameraFriction;
    cameraY += ((height / 2 - player.body.position.y) - cameraY) / config.world.cameraFriction
  }
  translate(cameraX, cameraY);
  particles.filter(x => x.behind).forEach(p => p.draw());

  bodies.filter(x => !x.isBoss).forEach(body => {
    body.run();
    body.draw();
  });

  peppers.forEach(pepper => {
    pepper.draw();
  });

  dragon.draw();
  bodies.filter(x => x.isBoss).forEach(body => {
    body.run();
    body.draw();
  });
  particles.filter(x => !x.behind).forEach(p => p.draw());

  pop();

  image(sprites[`${goldenPepperCount ? 'golden' : 'red'}-pepper`], 0, 8)
  textFont("Impact", 25);
  textAlign(CENTER, CENTER)
  fill(255)
  text(dragon.chilli_power, 32, 40);

  trvs.h1 += ((310 * (player.health / player.maxHealth)) - trvs.h1)/5
  trvs.h2 += ((310 * (player.health / player.maxHealth)) - trvs.h2)/25
  
  push();
  translate(width-325, -height + 40);
  fill(150, 0, 0);
  quad(10, height, 0, height-25, 310, height-25, 310, height);
  fill(255, 100);
  quad(10, height, 0, height-25, trvs.h2, height-25, trvs.h2, height);
  fill(0, 200, 75);
  quad(10, height, 0, height-25, trvs.h1, height-25, trvs.h1, height);
  pop();


  if (player.died) {
    configLevel();
    playSound('die.mp3')
    player.died = false;
    dragon.chilli_power = 5;
    goldenPepperCount = 0
    scene = "dead";
  }

  if (nextLevel) {
    if (levels[level + 1]) {
      level++;
      configLevel();
      nextLevel = false;
    } else {
      scene = "win"
    }
  }
}