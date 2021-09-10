 /*
 Codex
 Final Project
 Harry Wakeling
 10/09/21
 */

 /*
 Inspiration:
 https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp09_ga/NOC_9_04_Faces_interactiveselection
 http://www.genarts.com/karl/papers/siggraph91.html
 http://paulbourke.net/geometry/supershape/#2d
 */

class scanLine{
  constructor() {
    this.numLines = 60; // Number of lines in pattern
    this.interval = width/this.numLines;
    this.time = frameCount;
}
    
   display() {
    push();
	for (let i = 0; i < this.numLines; i++) {
        let phi = i * this.interval;
        let x = ((frameCount + phi) % width*0.25);
        let sineWave = sin((map(x, 0, width, 0, 600)));

        // Map sin to determine width and height of rectangles
        let w = map(sineWave, 0, 1, 0.1, 2);
        let h = map(sineWave, 0, 1, 0, 50);
        
        // Use sin to interpolate between colour values
        let currentColor = color(127 + 127 * sin(i * 0.1 + this.time), 127 + 127 * sin(i * 0.05 + this.time), 127 + 127 * sin(i * 0.01 + this.time))
        fill(currentColor);
        rect(x + width/1.49, height/6.5, w, h);
	}
	pop();
 }
    
    
}

