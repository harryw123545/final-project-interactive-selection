
class scanLine{
  constructor() {
    this.numLines = 60;
    this.interval = width/this.numLines;
    this.time = frameCount;
}
    
   display() {
    push();
	for (let i = 0; i < this.numLines; i++) {
        let phi = i * this.interval;
        let x = ((frameCount + phi) % width*0.25);
        let sineWave = sin((map(x, 0, width, 0, 600)));

        let w = map(sineWave, 0, 1, 0.1, 2);
        let h = map(sineWave, 0, 1, 0, 60);
        let currentColor = color(127 + 127 * sin(i * 0.1 + this.time), 127 + 127 * sin(i * 0.05 + this.time), 127 + 127 * sin(i * 0.01 + this.time))
        fill(currentColor);
        rect(x + width/1.47, height/6, w, h);
	}
	pop();
 }
    
    
}

