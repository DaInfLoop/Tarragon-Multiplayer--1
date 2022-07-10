const bgs = ['bg-Fire', 'bg-Forest', 'bg-Ice', 'bg-Stone', 'bg-Portal'];
function menu() {
  background(200);
  fill(0);
  for(let i = 0; i < bgs.length; i++){
    image(
      sprites[bgs[i]].get(
        i*(sprites[bgs[i]].width/5),
        0,
        sprites[bgs[i]].width/5,
        sprites[bgs[i]].height
      ),
      i*(width/5),0,width/5,height)
  }
  textFont("Impact", 25);
  textAlign(CENTER, CENTER);
  push()
    textFont("Impact", 85);
    fill(0)
    text(`TARRAGON`, width / 2 + 2, height / 2 + 2);
    fill(255)
    text(`TARRAGON`, width / 2, height / 2);
  pop()
  Button("Start", width/2-50, height - 50, 5, () => {
    configLevel();
  })
}