class Boss {
  constructor(type, x, y){
    this.type = type;
    this.x = x;
    this.y = y;
    this.health = 1500;
    this.maxHealth = 1500;
    this.isBoss = true;
    this.stage = 0;
    this.rotation = 0;
    if(this.type === "F"){
      this.sprite = "fire-boss";
      this.health = 1000;
      this.maxHealth = 1000;
      this.cache = {
        randAng: (Math.random() * Math.PI) + Math.PI,
        randDist: 100 + (Math.random() * 300),
        pxCoor: 0,
        pyCoor: 0,
        fireCount: 5,
        canFire: false,
      }
    }
    if(this.type === "S"){
      this.health = 1500;
      this.maxHealth = 1500;
      this.sprite = "stone-boss";
      this.cache = {
        px: 0,
        py: 0,
        canFire: false,
        fireCount: 8
      }
    }
    if(this.type === "P"){
      this.health = 2000;
      this.maxHealth = 2000;
      this.sprite = "plant-boss";
      this.cache = {
        px: 0,
        py: 0,
        canFire: false,
        fireCount: 8,
        angleFire: 0
      }
    }
    if(this.type === "I"){
      this.sprite = "ice-boss";
      this.health = 1500;
      this.maxHealth = 1500;
      this.cache = {
        px: 0,
        py: 0,
        fireCount: 3,
        fireAng: 0,
        hasFired: 0,
        canFire: false
      }
    }
  }
  draw() {
    push();
    translate(this.x, this.y);
    imageMode(CENTER);
    image(sprites[this.sprite], 0, 0, 150, 150);
    imageMode(CORNER);
    pop();
    fill(200, 0, 0);
    rect(this.x - 75, this.y - 90, 150, 10);
    fill(0, 200, 50);
    rect(this.x - 75, this.y - 90, 150 * (this.health / this.maxHealth), 10);
  }
  run(){
    if(this.type === "F"){
      if(this.health < 250) {
        this.stage = 3;
      } else if(this.health < 500){
        this.stage = 2;
      } else if(this.health < 750){
        this.stage = 1;
      }
      if(this.stage === 0){
        let px = player.body.position.x + cos(this.cache.randAng) * this.cache.randDist;
        let py = player.body.position.y + sin(this.cache.randAng) * this.cache.randDist;
        this.x += (px - this.x) / 25;
        this.y += (py - this.y) / 25;
        if(frameCount % 200 === 0) {
          particles.push(new Particle("fireball", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x)
          }))
          this.cache.randAng = (Math.random() * Math.PI) + Math.PI;
          this.cache.randDist = 100 + (Math.random() * 300)
        }
      }
      if(this.stage === 1){
        if(frameCount % 200 === 0){
          this.cache.pxCoor = player.body.position.x;
          this.cache.pyCoor = player.body.position.y - 100 - (Math.random() * 200);
          this.cache.fireCount = 5;
          this.cache.canFire = true;
        }
        if(this.cache.canFire && frameCount % 25 === 0){
          particles.push(new Particle("fireball", this.x, this.y, true, {
            rotation: Math.PI/2
          }));
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
        this.x += (this.cache.pxCoor - this.x)/40;
        this.y += (this.cache.pyCoor - this.y)/40;
      }
      if(this.stage === 2){
        if(frameCount % 150 === 0){
          this.cache.pxCoor = player.body.position.x + (-400 + Math.random()*800);
          this.cache.pyCoor = player.body.position.y;
          this.cache.fireCount = 5;
          this.cache.canFire = true;
        }
        if(this.cache.canFire && frameCount % 10 === 0){
          particles.push(new Particle("fireball", this.x, this.y, true, {
            rotation: (this.x > player.body.position.x ? Math.PI : 0)
          }));
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
        this.x += (this.cache.pxCoor - this.x)/40;
        this.y += (this.cache.pyCoor - this.y)/40;
      }
      if(this.stage === 3){
        if(frameCount % 200 === 0){
          this.cache.pxCoor = player.body.position.x;
          this.cache.pyCoor = player.body.position.y - 200;
          this.cache.fireCount = 10;
          this.cache.canFire = true;
        }
        if(this.cache.canFire && frameCount % 10 === 0){
          particles.push(new Particle("fireball", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x)
          }));
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
        this.x += (this.cache.pxCoor - this.x)/20;
        this.y += (this.cache.pyCoor - this.y)/20;
      }
    }

    if(this.type === "S") {
      if(this.health < 250) {
        this.stage = 4;
      } else if(this.health < 500){
        this.stage = 3;
      } else if(this.health < 750){
        this.stage = 2;
      }else if(this.health < 1000){
        this.stage = 1;
      }
      if(this.stage === 0){
        this.cache.px = player.body.position.x;
        this.cache.py = player.body.position.y - 200;
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(frameCount % 100 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: Math.PI / 2
          }))
        }
      } 
      else if(this.stage === 1){
        if(frameCount % 100 === 0){
          this.cache.px = player.body.position.x;
          this.cache.py = player.body.position.y - 200;
          this.cache.canFire = true;
          this.cache.fireCount = 8;
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(this.cache.canFire && frameCount % 5 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: (Math.PI/4) * this.cache.fireCount
          }))
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
      } else if(this.stage === 2){
        if(frameCount % 75 === 0){
          this.cache.px = player.body.position.x;
          this.cache.py = player.body.position.y - 200;
          this.cache.pr = atan2(player.body.position.y - this.y, player.body.position.x - this.x);
          this.cache.canFire = true;
          this.cache.fireCount = 2;
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(this.cache.canFire && frameCount % 10 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: this.cache.pr
          }))
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
      }
      else if(this.stage === 3){
        if(frameCount % 200 === 0){
          this.cache.px = player.body.position.x + (-500 + (100 + (Math.random() * (800))));
          this.cache.py = player.body.position.y;
          this.cache.pr = atan2(player.body.position.y - this.y, player.body.position.x - this.x);
          this.cache.canFire = true;
          this.cache.fsr = player.body.position.x > this.x ? 0 : Math.PI;
          this.cache.fireCount = 4;
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(this.cache.canFire && frameCount % 25 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: this.cache.fst
          }))
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
      }
      else if(this.stage === 4){
        if(frameCount % 100 === 0){
          this.cache.px = player.body.position.x;
          this.cache.py = player.body.position.y - 200;
          for(var i = 0; i < 16; i++){
            particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: i * (Math.PI/8)
          }))
          }
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        
      }



      
    }

    if(this.type === "P") {
      if(this.health < 500) {
        this.stage = 3;
      } else if(this.health < 1000){
        this.stage = 2;
      } else if(this.health < 1500){
        this.stage = 1;
      }
      if(this.stage === 0){
        this.cache.px = player.body.position.x;
        this.cache.py = player.body.position.y - 200;
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(frameCount % 20 === 0){
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: Math.random() * Math.PI * 2
          }))
          this.cache.pr = atan2(player.body.position.y - this.y, player.body.position.x - this.x);
        }
        if(frameCount % 150 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
              rotation: this.cache.pr
            }))
        }
      }
      if(this.stage === 1){
        if(frameCount % 25 === 0){
          this.cache.px = player.body.position.x;
          this.cache.py = player.body.position.y - 200;
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(frameCount % 20 === 0){
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x) + (-Math.PI/2 + Math.random() * Math.PI)
          }))
        }
      }
      if(this.stage === 2) {
        if(frameCount % 160 === 0){
          this.cache.px = player.body.position.x + (-400 + (Math.random() * 800));
          this.cache.py = player.body.position.y + (-200 + (Math.random() * 400));
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(frameCount % 40 === 0){
          for(var i = 0; i < 8; i++){
            particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: (i * Math.PI/4)
          }))
          
          }
        }
      }
      if(this.stage === 3) {
        this.cache.px = player.body.position.x;
        this.cache.py = player.body.position.y - 200;
        this.x += (this.cache.px - this.x)/50;
        this.y += (this.cache.py - this.y)/50;
        if(frameCount % 10 === 0){
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: this.cache.angleFire * (Math.PI/16)
          }))
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: this.cache.angleFire * (Math.PI/16) + (Math.PI/2)
          }))
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: this.cache.angleFire * (Math.PI/16) + (Math.PI/2) + (Math.PI/2)
          }))
          particles.push(new Particle("spike", this.x, this.y, true, {
            rotation: this.cache.angleFire * (Math.PI/16) + (Math.PI/2) + (Math.PI/2) + (Math.PI/2)
          }))
          this.cache.angleFire++;
        }
      }
    }

    if(this.type === "I") {
      if(this.health < 250) {
        this.stage = 5;
      } else if(this.health < 500){
        this.stage = 4;
      } else if(this.health < 750){
        this.stage = 3;
      }else if(this.health < 1000){
        this.stage = 2;
      }else if(this.health < 1250){
        this.stage = 1;
      }

      if(this.stage === 0) {
        this.cache.px = player.body.position.x;
        this.cache.py = player.body.position.y - 150;
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;  
        if(frameCount % 25 === 0){
          particles.push(new Particle("snowball", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x)
          }))
        }
      }
      if(this.stage === 1) {
        this.cache.px = player.body.position.x + (cos(frameCount/90) * 300);
        this.cache.py = player.body.position.y + (sin(frameCount/90) * 300);
        this.x += (this.cache.px - this.x)/50;
        this.y += (this.cache.py - this.y)/50;
        if(frameCount % 200 === 0){
          this.cache.fireCount = 3;
        }
        if(frameCount % 25 === 0 && this.cache.fireCount) {
          particles.push(new Particle("icicle", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x) + (-Math.PI/4 + Math.random() * Math.PI/2)
          }))
        }
      }
      if(this.stage === 2) {
        this.cache.px = player.body.position.x
        this.cache.py = player.body.position.y - 300;
        this.x += (this.cache.px - this.x)/80;
        this.y += (this.cache.py - this.y)/80;
        if(frameCount % 100 === 0){
          for(var i = 0; i < 2; i++){
            particles.push(new Particle("laser", this.x + (i*50), this.y, true, {
            rotation: Math.PI / 2
          }))
            particles.push(new Particle("laser", this.x + (i*-50), this.y, true, {
            rotation: Math.PI / 2
          }))
          }
        }
      }
      if(this.stage === 3) {
        if(frameCount % 100 === 0){
          for(var i = 0; i < 2; i++){
           particles.push(new Particle("laser", this.x + (i * 50), this.y, {
              rotation: Math.PI/2
            }))
            particles.push(new Particle("laser", this.x + (i * -50), this.y, {
              rotation: Math.PI/2
            }))
          }
          this.cache.px = player.body.position.x
          this.cache.py = player.body.position.y - 250;
        }
        this.x += (this.cache.px - this.x)/10;
        this.y += (this.cache.py - this.y)/10;
      }
      if(this.stage === 4) {
        if(!this.cache.hasFired){
          this.cache.fireAng+=Math.PI/16;
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: this.cache.fireAng
          }))
          if(this.cache.fireAng >= Math.PI * 2){
            this.cache.hasFired = true;
          }
        }else{
          if(frameCount % 15 === 0){
          particles.push(new Particle("snowball", this.x, this.y, true, {
            rotation: atan2(player.body.position.y - this.y, player.body.position.x - this.x)
          }))
        }
        }
        
      }
      if(this.stage === 5) {
        if(frameCount % 200 === 0){
          this.cache.px = player.body.position.x + (-500 + (100 + (Math.random() * (800))));
          this.cache.py = player.body.position.y;
          this.cache.pr = atan2(player.body.position.y - this.y, player.body.position.x - this.x);
          this.cache.canFire = true;
          this.cache.fireCount = 8;
        }
        this.x += (this.cache.px - this.x)/20;
        this.y += (this.cache.py - this.y)/20;
        if(this.cache.canFire && frameCount % 25 === 0){
          particles.push(new Particle("laser", this.x, this.y, true, {
            rotation: player.body.position.x > this.x ? 0 : Math.PI
          }))
          this.cache.fireCount--;
          if(this.cache.fireCount <= 0) this.cache.canFire = false;
        }
      }
    }
                                      
    if(this.health <= 0) {
      playSound("bossdie.mp3")
      particles.push(new Particle("burp", this.x + random(-50, 50), this.y + random(-50, 50), false))
      particles.push(new Particle("burp", this.x + random(-50, 50), this.y + random(-50, 50), false))
      particles.push(new Particle("burp", this.x + random(-50, 50), this.y + random(-50, 50), false))
      particles.push(new Particle("burp", this.x + random(-50, 50), this.y + random(-50, 50), false))
      this.dead = true;
    }
  }
}