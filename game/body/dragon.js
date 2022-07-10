class Dragon {
  constructor(x = 0, y = 400) {
    this.x = x;
    this.y = y;
    this.dif = 1 // Ignore for now
    this.yDif = 1;
    this.duration = 8;
    this.speed = 4;
    this.fire = false // Is the dragon currently breathing fire?
    this.chilli_power = 5;
    this.canCont = true; // If the current animation can be completed
    this.aimRot = 0;
    this.blastTime = 0;
    this.curAnim = "fly"
    this.curFrame = 0
    this.firingGolden = false;
    this.playCharge = false;
    this.anims = {
      'fly': ["dfly0", "dfly1", "dfly2", "dfly3", "dfly4", "dfly5", "dfly6", "dfly7", "dfly8", "dfly9"],
      'eat': ["deat0", "deat1", "deat2", "deat3", "deat4", "deat5", "deat6", "deat7", "deat8", "deat9"],
      'fire': ["dfire0", "dfire1", "dfire2", "dfire3", "dfire4", "dfire5", "dfire5", "dfire5", "dfire5"]
    }
  }
  draw() {
    if (mouseIsPressed && this.chilli_power) {
      if(!this.playCharge){
        this.playCharge = true;
      }
      if (this.blastTime < 25) {
        this.blastTime++;
        stroke(150, 50, 0);
      } else {
        stroke(0, 200, 0);
      }
      strokeWeight(5);
      push();
      translate(this.x + (this.dif * 105), this.y + 50);
      rotate(Math.atan2((mouseY - (this.y + 50)) - cameraY, (mouseX - (this.x + (this.dif * 105))) - cameraX))
      line(0, 0, width * 2, 0)
      pop();
      noStroke();
    }
    if (mir && !this.fire && this.chilli_power && this.curAnim !== "fire") {
      if (this.blastTime === 25) {
        playSound("lazerCharging.mp3");
        this.aimRot = Math.atan2((mouseY - (this.y + 50)) - cameraY, (mouseX - (this.x + (this.dif * 105))) - cameraX);
        this.fire = true;
        this.chilli_power--;
        if (goldenPepperCount) {
          this.firingGolden = true
          goldenPepperCount--
        }
        this.changeAnim("fire");
        this.blastTime = 0;
      }
    }
    push();
    translate(this.x, this.y);
    scale(this.dif, 1);
    image(sprites[this.anims[this.curAnim][this.curFrame]], -128, -sin(frameCount / 7.5) * 5, 256, 128);
    pop();
    if (!this.fire) {
      if (player.body.position.x > this.x) this.dif = 1;
      else this.dif = -1;
      this.x += (player.body.position.x > this.x + 128 || player.body.position.x < this.x - 128) ? this.dif * this.speed : 0;
      this.y += ((player.body.position.y - 256) - this.y) / 20;
    }
    if (frameCount % this.duration === 0 && this.canCont) {
      if (this.curAnim === "fire") {
        if (this.curFrame === 6) {
          playSound('lazerShoot.mp3')
          if(this.firingGolden){
            particles.push(new Particle("firebeam", this.x + (this.dif * 105), this.y + 50, true, {
              rotation: this.aimRot
            }))
            particles.push(new Particle("firebeam", this.x + (this.dif * 105), this.y + 50, true, {
              rotation: this.aimRot - Math.PI/4
            }))
            particles.push(new Particle("firebeam", this.x + (this.dif * 105), this.y + 50, true, {
              rotation: this.aimRot + Math.PI/4
            }))
          }else{
            particles.push(new Particle("firebeam", this.x + (this.dif * 105), this.y + 50, true, {
              rotation: this.aimRot
            }))
          }
          shakeIntensity = 20;
          shakeTimer = 50;
          this.fire = false;
          this.aimRot = Math.PI / 2;
          this.firingGolden = false;
          this.playCharge = false;
          this.changeAnim("fly")
        }
      }

      if (this.curFrame == this.anims[this.curAnim].length - 1) {
        this.curFrame = 0;
        if(this.curAnim === "eat") this.changeAnim("fly")
      } else {
        this.curFrame += 1
      }
    }
  }
  changeAnim(anim = 'fly') {
    if (this.curAnim != anim) {
      this.curAnim = anim;
      this.curFrame = 0;
    }
  }
}