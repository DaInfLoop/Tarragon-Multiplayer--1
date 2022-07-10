function dead() {
  background(0, 1)
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(0);
  text("You Died", width / 2 - 2, height / 2 - 2);
  text("You Died", width / 2 - 2, height / 2 + 2);
  text("You Died", width / 2 + 2, height / 2 - 2);
  text("You Died", width / 2 + 2, height / 2 + 2);
  fill(255);
  text("You Died", width / 2, height / 2);
  textSize(30);
  text("Click to try again", width / 2, height / 2 + 75);
  if (clicked) {
    scene = 'game';
    clicked = false;
  }
}