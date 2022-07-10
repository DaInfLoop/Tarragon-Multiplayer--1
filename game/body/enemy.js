 class Enemy extends Body {
  constructor(type, x, y) {
    if (type === "ƒ") {
      super(Bodies.rectangle(x, y, 40, 80), "enemy");
      this.maxSpeed = 2;
      this.damage = 10;
      this.health = 15;
      this.maxHealth = 15;
      this.w = 40;
      this.h = 80;
      this.jf = 0.15;
      this.attackFrame = 3;
      this.anims = {
        'attack': ["enemy-fire-minion-attack-0", "enemy-fire-minion-attack-1", "enemy-fire-minion-attack-2", "enemy-fire-minion-attack-3", "enemy-fire-minion-attack-4", "enemy-fire-minion-attack-5", "enemy-fire-minion-attack-6"],
        walk: ["enemy-fire-minion-walk-0", "enemy-fire-minion-walk-1", "enemy-fire-minion-walk-2", "enemy-fire-minion-walk-3", "enemy-fire-minion-walk-4"],
        idle: ["enemy-fire-minion-walk-0", "enemy-fire-minion-walk-0"]
      }
      this.animDur = 12;
    }

    if(type === "ß"){
      super(Bodies.rectangle(x, y, 50, 100), "enemy");
      this.maxSpeed = 1.5;
      this.damage = 15;
      this.health = 30;
      this.maxHealth = 30;
      this.w = 50;
      this.h = 100;
      this.jf = 0.1;
      this.attackFrame = 3;
      this.anims = {
        attack: ["enemy-stone-minion-attack-0", "enemy-stone-minion-attack-1", "enemy-stone-minion-attack-2", "enemy-stone-minion-attack-3", "enemy-stone-minion-attack-4", "enemy-stone-minion-attack-5", "enemy-stone-minion-attack-6"],
        walk: ["enemy-stone-minion-walk-0", "enemy-stone-minion-walk-1", "enemy-stone-minion-walk-2", "enemy-stone-minion-walk-3", "enemy-stone-minion-walk-4"],
        idle: ["enemy-stone-minion-walk-0", "enemy-stone-minion-walk-0"]
      }
      this.animDur = 12;
    }

    if(type === "î"){
      super(Bodies.rectangle(x, y, 40, 80), "enemy");
      this.maxSpeed = 2;
      this.damage = 10;
      this.health = 25;
      this.maxHealth = 25;
      this.w = 40;
      this.h = 80;
      this.jf = 0.15;
      this.attackFrame = 3;
      this.anims = {
        attack: ["enemy-ice-minion-attack-0", "enemy-ice-minion-attack-1", "enemy-ice-minion-attack-2", "enemy-ice-minion-attack-3", "enemy-ice-minion-attack-4", "enemy-ice-minion-attack-5", "enemy-ice-minion-attack-6"],
        walk: ["enemy-ice-minion-walk-0", "enemy-ice-minion-walk-1", "enemy-ice-minion-walk-2", "enemy-ice-minion-walk-3", "enemy-ice-minion-walk-4"],
        idle: ["enemy-ice-minion-walk-0", "enemy-ice-minion-walk-0"]
      }
      this.animDur = 12;
    }

    if(type === "π"){
      super(Bodies.rectangle(x, y, 40, 80), "enemy");
      this.maxSpeed = 2;
      this.damage = 20;
      this.health = 20;
      this.maxHealth = 20;
      this.w = 50;
      this.h = 100;
      this.jf = 0;
      this.attackFrame = 3;
      this.anims = {
        attack: ["enemy-plant-minion-attack-0", "enemy-plant-minion-attack-1", "enemy-plant-minion-attack-2", "enemy-plant-minion-attack-3", "enemy-plant-minion-attack-4", "enemy-plant-minion-attack-5", "enemy-plant-minion-attack-6"],
        walk: ["enemy-plant-minion-walk-0", "enemy-plant-minion-walk-1", "enemy-plant-minion-walk-2", "enemy-plant-minion-walk-3", "enemy-plant-minion-walk-4"],
        idle: ["enemy-plant-minion-walk-0", "enemy-plant-minion-walk-0"]
      }
      this.animDur = 8;
    }
    this.speed = 0;
    this.angleCollisions = [];
    this.currentSprite = 0;
    this.facing = 1;
    this.curAnim = "idle";
    this.curFrame = 0
    this.dead = false;
    bd.setInertia(this.body, Infinity);
  }

  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    scale(this.facing, 1);
    try {
      image(sprites[this.anims[this.curAnim][this.curFrame]], -this.w / 2, -this.h / 2, this.h, this.h)
    } catch (e) { }
    fill(150, 0, 0);
    rect(-this.w/2, -this.h/2 - 10, this.w, 5);
    fill(0, 200, 50);
    rect(-this.w/2, -this.h/2 - 10, this.w * (this.health/this.maxHealth), 5);
    pop();
    if (frameCount % this.animDur === 0 && !this.complete) {
      if(this.curAnim === "attack"){
        if(this.curFrame === this.attackFrame && dist(this.body.position.x, this.body.position.y, player.body.position.x, player.body.position.y) < config.player.height){
          bd.applyForce(player.body, this.body.position, {
            x: this.facing * 0.3,
            y: -0.2
          });
          player.health -= this.damage;
          player.emit("hurt", this.damage)
        }
      }
      if (this.curFrame == this.anims[this.curAnim].length - 1) {
        this.curFrame = 0;
      } else {
        this.curFrame += 1
      }
    }


  }

  run() {
    let col = Collision.collides(this.body, player.body);
    if(col) {
      if(Math.abs(player.body.bounds.max.y - this.body.bounds.min.y) < 2){
        this.health -= 5;
        bd.translate(player.body, {
          x: 0,
          y: -5
        })
        bd.applyForce(player.body, player.body.position, {
          x: 0,
          y: -config.player.jumpForce
        })
      }
    }

    let angleCollisions = [...new Set(bodies.filter(x => x.type === "block").map(x => x.angleCollision).filter(x => x !== null).map(x => Number(x) + 90))];
    if (JSON.stringify(this.angleCollisions) !== JSON.stringify(angleCollisions)) {
      this.angleCollisions = angleCollisions;
    }
    
    
    if (dist(player.body.position.x, player.body.position.y, this.body.position.x, this.body.position.y) > 600) {
      this.speed = 0;
    } else {
      if (this.body.position.x < player.body.position.x - this.w - 10) {
        bd.applyForce(this.body, this.body.position, {
          x: 0.0001,
          y: 0
        })
        this.speed = this.maxSpeed;
        this.facing = 1;
        this.changeAnim("walk")
      } else if (this.body.position.x > player.body.position.x + config.player.width) {
        bd.applyForce(this.body, this.body.position, {
          x: -0.0001,
          y: 0
        })
        this.speed = -this.maxSpeed;
        this.facing = -1;
        this.changeAnim("walk")
      }else {
        this.speed = 0;
        this.changeAnim("attack");
      }

      if (player.body.position.y + config.player.height/2 < this.body.position.y && this.body.velocity.y === 0) {
        bd.translate(this.body, {
          x: 0,
          y: -5
        });
        bd.applyForce(this.body, {
          x: this.body.position.x,
          y: this.body.position.y + config.player.height / 2
        }, {
          x: 0,
          y: -this.jf
        });
      }
    }

    // Apply Velocity
    bd.setVelocity(this.body, {
      x: this.speed,
      y: constrain(this.body.velocity.y, -config.world.maxYVel, config.world.maxYVel)
    });


    // Dying
    if ((this.body.position.y > (levels[level].bitmap.length * config.world.blockSize) + 500) || this.health <= 0) {
      particles.push(new Particle("blood", this.body.position.x, this.body.position.y, false))
      World.remove(world, this.body)
      this.dead = true;
    }
  }
  changeAnim(anim) {
    if (this.curAnim != anim) {
      this.curFrame = 0;
      this.curAnim = anim;
    }
  }
}
