 class Particle {
  constructor(t, x, y, b=false, stats = {}) {
    this.type = t;
    this.x = x;
    this.y = y;
    this.rotation = Math.random() * 360;
    this.op = 255;
    this.dead = false;
    this.behind = b || false;
    this.stats = stats;
    this.colliders = [];
    this.time = 250;
    this.hitPlayer = false;
    this.canHit = true;

    if(this.type === "laser"){
      playSound("laser2.mp3", 0.1);
      shakeIntensity = 5;
      shakeTimer = 20;
    }
    if (this.type === "firebeam" || this.type === "laser") {
      for (let i = 0; i < 1500; i += 50) {
        this.colliders.push({
          x: Math.cos(this.stats.rotation) * i,
          y: Math.sin(this.stats.rotation) * i,
          r: 30
        })
      }
    }
    if (this.type === "blood") {
      this.anims = [
        ["blood0-0", "blood0-1", "blood0-2", "blood0-3", "blood0-4", "blood0-5", "blood0-6", "blood0-7", "blood0-8"],
        ["blood1-0", "blood1-1", "blood1-2", "blood1-3", "blood1-4", "blood1-5", "blood1-6", "blood1-7", "blood1-8", "blood1-9"],
        ["blood2-0", "blood2-1", "blood2-2", "blood2-3", "blood2-4", "blood2-5", "blood2-6", "blood2-7", "blood2-8", "blood2-9", "blood2-10", "blood2-11", "blood2-12", "blood2-13"],
        ["blood3-0", "blood3-1", "blood3-2", "blood3-3", "blood3-4", "blood3-5", "blood3-6"],
        ["blood4-0", "blood4-1", "blood4-2", "blood4-3", "blood4-4", "blood4-5", "blood4-6", "blood4-7", "blood4-8", "blood4-9"],
        ["blood5-0", "blood5-1", "blood5-2", "blood5-3", "blood5-4", "blood5-5", "blood5-6", "blood5-7", "blood5-8"]
      ];
      this.frame = 0;
      this.anim = this.anims[Math.floor(Math.random() * this.anims.length)]
    }
    if(this.type === "burp"){
      this.r = 100;
      this.op = 150;
    }
  }

  draw() {
    this.time--;
    if (this.type === "firebeam") {
      push();
      translate(this.x, this.y);
      rotate((this.stats.rotation || 0) - Math.PI / 2);
      let w1 = 50 * (this.op / 255);
      let w2 = 20 * (this.op / 255);
      fill(255, 175, 0, this.op);
      rect(- w1 / 2, 0, w1, 1500);
      fill(255, this.op);
      rect(- w2 / 2, 0, w2, 1500);
      pop();

      for (let c of this.colliders) {
        for (let e of bodies.filter(x => x.type === "enemy" && !x.isBoss)) {
          if (dist(c.x + this.x, c.y + this.y, e.body.position.x, e.body.position.y) < c.r) {
            e.health -= 0.75;
          }
        }
        for(let b of bodies.filter(x => x.isBoss)){
          if(dist(b.x, b.y, c.x + this.x, c.y + this.y) < (75 + c.r)){
            b.health -= 0.75;
          }
        }
      }

      this.op -= 7.5;
    }
    if (this.type === "blood") {
      image(sprites[this.anim[this.frame]], this.x - 50, this.y - 50, 100, 100);
      if(frameCount % 5 === 0){
        this.frame++;
        if(this.frame > this.anim.length-1) this.dead = true;
      }
    }
    if(this.type === "fireball"){
      this.x += cos(this.stats.rotation) * 6;
      this.y += sin(this.stats.rotation) * 6;
      push();
      translate(this.x, this.y);
      rotate(this.stats.rotation);
      image(sprites["fireball"], -40, -20, 80, 40);
      pop();
      if(dist(this.x, this.y, player.body.position.x, player.body.position.y) < (config.player.width + config.player.height)/2){
        player.emit("hurt", 5)
        player.health -= 3;
        this.dead = true;
      }
    }
    if (this.type === "laser") {
      push();
      translate(this.x, this.y);
      rotate((this.stats.rotation || 0) - Math.PI / 2);
      let w1 = 50 * (this.op / 255);
      let w2 = 20 * (this.op / 255);
      fill(0, 200, 255, this.op);
      rect(- w1 / 2, 0, w1, 1500);
      fill(255, this.op);
      rect(- w2 / 2, 0, w2, 1500);
      pop();

      if(this.colliders.some(c => dist(c.x + this.x, c.y + this.y, player.body.position.x, player.body.position.y) < c.r) && this.canHit && !this.hitPlayer){
        this.hitPlayer = true;
      }

      if(this.hitPlayer && this.canHit) {
        player.health -= 5;
        player.emit("hurt", 5)
        this.canHit = false;
      }

      this.op -= 10;
    }
    if(this.type === "spike") {
      push();
      translate(this.x, this.y);
      rotate(this.stats.rotation);
      fill(255);
      rect(-15, -1, 30, 2, 5);
      pop();
      let playerAng = atan2(player.body.position.y - this.y, player.body.position.x - this.x);
      if(this.stats.rotation < playerAng){
        this.stats.rotation += 0.005;
      }else{
        this.stats.rotation -= 0.005;
      }
      this.x += cos(this.stats.rotation) * 5;
      this.y += sin(this.stats.rotation) * 5
      if(dist(player.body.position.x, player.body.position.y, this.x, this.y) < (config.player.width + config.player.height)/3){
        player.health -= 0.75;
        player.emit("hurt", 0.75)
        this.dead = true;
      }
    }
    if(this.type === "snowball") {
      fill(255);
      ellipse(this.x, this.y, 20, 20);
      this.x += cos(this.stats.rotation) * 7.5;
      this.y += sin(this.stats.rotation) * 7.5;
      if(dist(this.x, this.y, player.body.position.x, player.body.position.y) < 10 + (config.player.width + config.player.height)/2) {
        player.health -= 1;
        player.emit("hurt", 1)
        this.dead = true;
      }
    }
    if(this.type === "icicle") {
      push();
      translate(this.x, this.y);
      rotate(this.stats.rotation);
      fill(172, 216, 232, 150);
      triangle(-30, 10, -30, -10, 50, 0);
      pop();
      this.x += cos(this.stats.rotation) * 20;
      this.y += sin(this.stats.rotation) * 20;
      if(dist(this.x, this.y, player.body.position.x, player.body.position.y) < 10 + (config.player.width + config.player.height)/2) {
        player.health -= 4;
        player.emit("hurt", 1)
        this.dead = true;
      }
    }
    if(this.type === "burp") {
      noFill();
      stroke(255, this.op);
      strokeWeight(20);
      ellipse(this.x, this.y, this.r, this.r);
      noStroke();
      this.r += 20;
      this.op -= 2;
    }
    
    if (this.op < 0 || this.time <= 0) {
      this.dead = true;
    }
  }
}