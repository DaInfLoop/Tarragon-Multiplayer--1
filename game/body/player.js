class Player extends Body {
  constructor(body) {
    super(body, "player");
    this.speed = 0;
    this.supports = [];
    this.sensors = {};
    this.dashTimer = config.player.dashTime;
    this.canDash = false;
    this.angleCollisions = [];
    this.died = false;
    this.sprite = "pwalk0";
    this.currentSprite = 0;
    this.facing = 1;
    this.anim = false;
    this.repeat = false;
    this.complete = false;
    this.animDur = 5;
    this.spriteArr = ["pwalk0", "pwalk1", "pwalk2", "pwalk3", "pwalk4", "pwalk5"];

    this.health = 100;
    this.maxHealth = 100;
    this.regen = 0.01;
    bd.setInertia(this.body, Infinity);
  }

  // Draw the player on the canvas
  draw() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    scale(this.facing, 1);
    try {
      image(sprites[this.spriteArr[this.currentSprite]], - config.player.width / 2, - config.player.height / 2, config.player.width, config.player.height)
    } catch (e) { }
    pop();
    if (frameCount % this.animDur === 0 && !this.complete) {
      if (this.anim || !this.complete) this.currentSprite++;
      if (this.currentSprite >= this.spriteArr.length) {
        this.currentSprite = 0;
        this.complete = true;
        this.anim = false;
      }
    }
  }

  // Run the player and functionalize commands
  run() {
    if (this.health < this.maxHealth) this.health += this.regen;
    this.emit("update");
    // Blocks the player is touching
    const supports = bodies.filter(x => x.type === "block").map(x => {
      return x.supports.length > 0 ? x.supports : false
    }).filter(x => x).flat(2);

    // What angles touching blocks are touching the player at (tangents)
    let angleCollisions = [...new Set(bodies.filter(x => x.type === "block").map(x => x.angleCollision).filter(x => x !== null).map(x => Number(x) + 90))];
    if (JSON.stringify(this.angleCollisions) !== JSON.stringify(angleCollisions)) {
      this.angleCollisions = angleCollisions;
      this.emit("collide", angleCollisions);
    }


    // Set the player's inertia to infinity so that it stays upright and doesn't rotate to external forces


    // Sensors for touching blocks
    this.sensors = {
      // Whether the player is standing on something
      bottom: supports.some(s => Math.round(s.y) === Math.round(this.body.position.y + config.player.height / 2)),

      // Is the player touching a block on the left?
      left: supports.filter(s => Math.round(s.y) !== Math.round(this.body.position.y + config.player.height / 2)).some(s => Math.round(s.x) === Math.round(player.body.position.x - config.player.width / 2)),

      // Is the player touching a block on the right?
      right: supports.filter(s => Math.round(s.y) !== Math.round(this.body.position.y + config.player.height / 2)).some(s => Math.round(s.x) === Math.round(player.body.position.x + config.player.width / 2))
    }

    // Moving Right
    if (keys["ArrowRight"] || keys["d"]) {
      if (this.speed < config.player.speed) this.speed += config.player.acceleration;
      else this.speed += (config.player.speed - this.speed) / config.player.decceleration / 5
      this.emit("move.right");
    }

    // Moving Left
    if (keys["ArrowLeft"] || keys["a"]) {
      if (this.speed > -config.player.speed) this.speed -= config.player.acceleration;
      else this.speed += (-config.player.speed - this.speed) / config.player.decceleration / 5
      this.emit("move.left");
    }

    // If not moving right or left, slow down
    if (!keys["ArrowRight"] && !keys["ArrowLeft"] && !keys["a"] && !keys["d"]) {
      this.speed += -this.speed / config.player.decceleration;
    }

    // Apply Velocity
    bd.setVelocity(this.body, {
      x: this.speed,
      y: constrain(this.body.velocity.y, -config.world.maxYVel, config.world.maxYVel)
    });

    // Jumping and Wall-jumping
    if (keys["ArrowUp"] || keys["w"] || keys[" "]) {
      // If not touching left and right walls, wall-jump
      if (this.sensors.bottom && !this.sensors.left && !this.sensors.right) {
        bd.translate(this.body, {
          x: 0,
          y: -5
        });
        bd.applyForce(this.body, {
          x: this.body.position.x,
          y: this.body.position.y + config.player.height / 2
        }, {
          x: 0,
          y: -config.player.jumpForce
        });
        this.sensors.bottom = false;
        this.emit("jump.up");
        this.i
      } else {
        if (config.player.actions.includes("wall jump")) {
          // Jump off a wall depending on which side the player is touching
          if (this.sensors.left) {
            this.speed = config.player.speed;
            bd.setVelocity(this.body, {
              x: config.player.jumpForce * 2,
              y: -config.player.jumpForce
            })
            bd.translate(this.body, {
              x: 2,
              y: -2
            });
            bd.applyForce(this.body, {
              x: this.body.position.x,
              y: this.body.position.y
            }, {
              x: 0,
              y: -config.player.jumpForce
            });
            this.emit("jump.left");
            this.sensors.left = false;
          } else if (this.sensors.right) {
            this.speed = -config.player.speed;
            bd.setVelocity(this.body, {
              x: -config.player.jumpForce * 2,
              y: -config.player.jumpForce
            })
            bd.translate(this.body, {
              x: -2,
              y: -2
            });
            bd.applyForce(this.body, {
              x: this.body.position.x,
              y: this.body.position.y
            }, {
              x: 0,
              y: -config.player.jumpForce
            });
            this.emit("jump.right");
            this.sensors.right = false;
          }
        }
      }
    }

    // Dash
    if (config.player.actions.includes("dash")) {
      if (!this.canDash) this.canDash = this.sensors.bottom;
      if (this.dashTimer > 0) this.dashTimer--;
      if (keys["Shift"] && this.dashTimer <= 0 && this.canDash) {
        if ((keys["ArrowRight"] || keys["d"]) && (!keys["ArrowLeft"] && !keys["a"])) {
          this.speed = config.player.speed * 3;
          bd.setVelocity(this.body, {
            x: this.speed,
            y: -config.player.speed * 0.5
          });
        } else if ((keys["ArrowLeft"] || keys["a"]) && (!keys["ArrowRight"] && !keys["d"])) {
          this.speed = config.player.speed * -3;
          bd.setVelocity(this.body, {
            x: this.speed,
            y: -config.player.speed * 0.5
          });
        }
        this.emit("dash");
        this.canDash = false;
        this.dashTimer = config.player.dashTime;
      }
    }

    // Dying
    if ((this.body.position.y > (levels[level].bitmap.length * config.world.blockSize) + 500) || this.health < 0) {
      this.died = true;
    }
  }
}

const configPlayerEvents = () => {
  player.on("update", () => {
    if (player.sensors.bottom && player.angleCollisions.includes(90)) {
      if (keys["ArrowLeft"] || keys["ArrowRight"] || keys["a"] || keys["d"]) {
        player.spriteArr = ["pwalk0", "pwalk1", "pwalk2", "pwalk3", "pwalk4", "pwalk5"];
        player.anim = true;
        player.complete = false;
      } else {
        player.anim = false;
      }
    }

  })

  player.on("collide", (angles) => {
    player.on("jump.left", () => {
      player.spriteArr = ["pwjump0", "pwjump1", "pwjump2", "pwjump3", "pwjump4", "pwjump5"];
      player.anim = true;
      player.complete = false;
    });
    player.on("jump.right", () => {
      player.spriteArr = ["pwjump0", "pwjump1", "pwjump2", "pwjump3", "pwjump4", "pwjump5"];
      player.anim = true;
      player.complete = false;
    });
  });

  player.on("jump.up", () => {
    player.spriteArr = ["pjump0", "pjump1", "pjump2", "pjump3", "pjump4"];
    player.anim = true;
    player.complete = false;
  })

  player.on("dash", () => {
    playSound('dash.mp3')
  });

  player.on("move.left", () => {
    // for some unexplainable reason, the player gets stuck.  Adding a tiny force prevents this.
    bd.applyForce(player.body, player.body.position, {
      x: -0.0001,
      y: 0
    })
    player.facing = -1;
  })

  player.on("move.right", () => {
    // prevent player from getting stuck
    bd.applyForce(player.body, player.body.position, {
      x: 0.0001,
      y: 0
    })
    player.facing = 1;
  })

  player.on('hurt', () => {
    playSound('hurt.mp3', 0.5)
  })
}