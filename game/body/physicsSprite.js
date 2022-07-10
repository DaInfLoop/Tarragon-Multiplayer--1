class MatterSprite extends Body {
  constructor(body, sprite, opts) {
    super(body, opts.type || 'body');
    this.sprite = sprite;
    this.opts = opts
  }
  draw() {
    // Draw the body by its vertices
    fill(this.opts.debug ? 150 : 100);
    let pos = this.body.position;
    let angle = this.body.angle;
    beginShape();
    for (var i = 0; i < this.body.vertices.length; i++) {
      vertex(this.body.vertices[i].x, this.body.vertices[i].y);
    }
    endShape();
    image(sprites[this.sprite], pos.x-37.5, pos.y-37.5, 75, 75)
  }
  run() { }
}