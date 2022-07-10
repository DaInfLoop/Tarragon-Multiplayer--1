const rectCol = (x, y, w, h, x2, y2, w2, h2) => x + w > x2 && x < w2 + x2 && y + h > y2 && y < y2 + h2;

class Pepper {
  constructor(type='green', x = 0, y = 0) {
    this.type = type
    this.x = x
    this.y = y
    this.collected = false
  }
  draw() {
    let isColliding = rectCol(this.x, this.y, 64, 64, player.body.position.x - config.player.width/2, player.body.position.y - config.player.height/2, config.player.width, config.player.height)
    if (!isColliding && !this.collected) {
      image(sprites[`${this.type}-pepper`], this.x, this.y)
    } else if (isColliding && !this.collected) {
      dragon.chilli_power += {green:2,orange:3,red:4,golden:1}[this.type]
      playSound("pepper.mp3", 0.5, 1.5)
      if (this.type == "golden") goldenPepperCount += 1
      this.collected = true
    }
  }
}