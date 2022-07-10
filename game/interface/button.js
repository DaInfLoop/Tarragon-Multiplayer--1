function Button(txt, x, y, radius = 0, cb) {
  fill(0,0,0,0);
  if (mouseX > x && mouseX < x + 100 && mouseY > y-30 && mouseY < y + 30) {
    if (clicked) {
      cb();
      clicked = false
    } else {
      fill(255, 50)
      cursor("pointer");
    }
  }
  rectMode(CORNER, CORNER);
  noStroke();
  rect(x, y - 30, 100, 60, radius);
  noFill();
  stroke(0, 50);
  strokeWeight(5);
  rect(x, y - 28, 100, 60, radius);
  stroke(255);
  rect(x, y - 30, 100, 60, radius);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(25);
  fill(0, 50);
  text(txt, x + 50, y);
  fill(255)
  text(txt, x + 50, y);
  rectMode(LEFT, TOP);
  
}