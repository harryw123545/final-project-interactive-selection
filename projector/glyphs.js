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

class Glyphs {
  constructor(dna_) {
    this.dna = dna_;
    this.f = 0;
    this.spc;
    this.c;
}
    
   display() {
    let genes = this.dna.genes;
    let numIters = genes.length;
    this.spc = width/4; 
       
    // Map values from genes to determine noise shape
    let a = floor(map(genes[1], 0, 1, 4, 25));
    let i = floor(map(genes[2], 0, 1, 5, 10));
    let j = floor(map(genes[3], 0, 1, 2, 5));
       
       
      // Push and pop matrix so that we dont cumulatively translate 
      push();

      // Move to the current location in the grid
      translate(width/1.25, height/1.95);

          noFill()
          stroke(255);
          beginShape();
          for (let k = 0; k < a; k++) {
            strokeWeight(0.5);
            vertex(noise( k * j, i + this.f) * this.spc  - this.spc/2, noise( i, j * k + this.f ) * this.spc - this.spc/2);

            push();
            strokeWeight(5);
            point(noise( k * j, i + this.f) * this.spc  - this.spc/2, noise( i, j * k + this.f ) * this.spc - this.spc/2);
            pop();
          } 
          endShape(CLOSE);

      pop();
       
      // Itterate f so we have an animation
      this.f += 0.005;
       
    // Draw a letter for every value in gene array   
    for(let d = 0; d < genes.length; d++){
      let size = 3;
      let c = floor(map(genes[d], 0, 1, 97, 122));
      let tw = width * 0.08 / size;
      let th = height * 0.08 / size;
      let y1 = (d % size) * th;
      let x1 = parseInt(d / size) * tw;

      push();
      translate(width/2 + width/5.5, height/1.5);
      textSize(15);
      text(String.fromCharCode(c), x1, y1);
      pop(); 
    }

 }
    
    
}

