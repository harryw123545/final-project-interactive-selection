
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
    let a = floor(map(genes[1], 0, 1, 4, 25));
    let i = floor(map(genes[2], 0, 1, 5, 10));
    let j = floor(map(genes[3], 0, 1, 2, 5));
       
       
          // push and pop matrix so that we dont cumulatively translate 
          push();
      
          // move to the current location in the grid
          translate(width/1.262, height/1.95);

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
       
    for(let d = 0; d < genes.length; d++){
      // console.log(genes[i]);
      let size = 3;
      let c = floor(map(genes[d], 0, 1, 97, 122));
      let tw = width*0.08/ size;
      let th = height*0.08 / size;
      let y1 = (d % size) * th;
      let x1 = parseInt(d / size) * tw;

      push();
      translate(width/1.481, height/1.5);
      //console.log(c);
      textSize(15);
      text(String.fromCharCode(c), x1, y1);
      pop(); 
    }

       
    // itterate f so we have an animation
      this.f += 0.005;
 }
    
    
}

