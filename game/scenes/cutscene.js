let camSc = 0;
function cutscene(){
  background(0);
  textFont("Impact", 20);
  textAlign(CENTER, CENTER);
  let cm = msgs[csc];
  let [clr, txt, ind] = cm;
  let cPos = height/2 - csc * 75;
  camSc += (cPos - camSc)/15;
  push();
  translate(0, camSc)
  textFinished.forEach((t, i) => {
    fill(t[0]);
    text(t[1].slice(0,t[2]), width/2, i*75);
  })
  pop();
  if(frameCount % 3 === 0 && csc < msgs.length){
    msgs[csc][2] += 1;
    if(msgs[csc][2] > txt.length){
      if(csc < msgs.length-1){
        csc++;
      }else{
        cutDone = true;
      }
    }
    textFinished[csc] = msgs[csc];
  }
  
  Button(cutDone ? "Continue" : "Skip", width/2-50, height - 50, 5, () => {
    scene = "game"
  })
}