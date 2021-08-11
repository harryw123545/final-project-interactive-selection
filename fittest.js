//class for the fittest creature, for display on projector

// Create a new face
class Fittest {
    constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = width/4; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    // Using java.awt.Rectangle (see: http://java.sun.com/j2se/1.4.2/docs/api/java/awt/Rectangle.html)
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
    this.num = [random(65, 90), random(65, 90), random(65, 90), random(65, 90), random(65, 90), random(65, 90)];
    this.word = join(char(this.num), ''); // select random word
    this.n;
    osc = 0;
        
    y = y_;
  }

    
  // Display the face
  display() {
    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
    let r = map(genes[2], 0, 1, 80, 100);
    let c = color(genes[1], genes[2], genes[3]);
    
    let iter1 = map(genes[1], 0, 1, 0.01, 0.1);
    let iter2 = map(genes[2], 0, 1, 0.01, 0.12);
    let iter3 = map(genes[3], 0, 1, 0.01, 0.13);
    let size = 1.2;


    var n1 = map(genes[1], 0, 1, 0.3, 1);
    var n2 = map(genes[2], 0, 1, 0.3, 1);
    var n3 = map(genes[3], 0, 1, 0.3, 1);
    var m = map(genes[4], 0, 1, 1, 6);
    var iter = map(genes[5], 0, 1, 0, 180);
    var a = 1;
    var b = 1;
    let add = map(genes[6], 0, 1, 0.0005, 0.004);

    //define noise
    let noiseIter = map(genes[7], 0, 1, 0.05, 0.4);
    osc += add;

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
    push();
    translate(this.x, this.y);
    drawShapes(size);  

    function drawShapes(radius){
        function superShape(theta) {    
            var part1 = (1 / a) * cos(theta * m/4);
            part1 = abs(part1);
            part1 = pow(part1, n2);

            var part2 = (1 / b) * sin(theta * m/4);
            part2 = abs(part2);
            part2 = pow(part2, n3);

            var part3 = pow(part1 + part2, 1/n1);

            if (part3 === 0){
                return 0;
            }
            return (1 / part3);
        }
        
      //speed of animation    
      m = map(sin(osc), -1, 1, 0, 3) + iter;
      
      push();
        
      noStroke();    
      scale(radius);

      //level of detail in shapes    
      var total = 80;
      var increment = TWO_PI / total;
        
      beginShape();
        for(var angle = 0; angle < TWO_PI; angle += increment){
            fill(127 + 127 * sin(total * iter1 + time), 127 + 127 * sin(total * iter2*radius + time), 127 + 127 * sin(total * iter3*radius + time));
            var rad = superShape(angle);
            
            let offset = map(noise(angle * 0.3 + frameCount * 0.025), -1, 1, 0, 1);

            var x = r * rad * offset * cos(angle);
            var y = r * rad * offset * sin(angle);

            curveVertex(x, y);
        }
      endShape(CLOSE);

      //recursively draw shapes
      if(radius > 0.2) {
          drawShapes(radius/1.025);
      }
        
        pop();
    }

    // Draw the bounding box
    stroke(255, 100);
    if (this.rolloverOn) fill(100, 20);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh);
    pop();

    //apply noise to y value of line
    y = y + 0.015;
    let n = noise(y) * this.wh+this.y/2;
      

    //draw scan line
    push();
    strokeWeight(2);  
    stroke(255, 0, 255);
    line(this.x + this.wh / 2, n, this.x - this.wh/2, n); 
    console.log("n:", n);
    
      
    //draw alien description
    fill(255);
    textSize(40);  
    noStroke();
    text(this.word, width / 2, height/1.25); // draw the word
    pop();
    
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

}





