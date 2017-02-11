function setup(){
  createCanvas(windowWidth, windowHeight);
   c1 = color(255, 210, 128); //gradient color 1
   c2 = color(110, 113, 180); //gradient color 2
}

function draw(){
  santaMonica();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function santaMonica(){
  background(255);
  setGradient(0, 0, windowWidth, windowHeight, c2, c1);

  fill(c1);
  rect(350, 400, 1200, 700);

  fill(110, 112, 180);
  noStroke();
  rect(0, 400, 500, 700);


}

function setGradient(x, y, w, h, c1, c2) {
    for (var i = y; i <= y + h; i++) {
        var inter = map(i, y, y + h, 0, 1);
        var c = lerpColor(c1, c2, inter);
        stroke(c);
        line(x, i, x + w, i);
    }
}
