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

// Create a new face
class Fittest {
    constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
    this.wh = width/4; // Size of square enclosing face
//    this.fitness = 1; // How good is this face?
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
    this.num = [random(65, 90), random(65, 90), random(65, 90), random(65, 90), random(65, 90), random(65, 90)];
    this.word = join(char(this.num), ''); // select random word
    this.n;
    this.angleShape = 0;
        
    osc = 0;
  }

    
  // Display the face
  display() {

    // We are using the creatures DNA to pick properties for this face
    // such as: size, color, rotation, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values

    let genes = this.dna.genes;
    let r = map(genes[2], 0, 1, 80, 100);
    let c;
    
    let iter1 = map(genes[1], 0, 1, 0.01, 0.1);
    let iter2 = map(genes[2], 0, 1, 0.01, 0.12);
    let iter3 = map(genes[3], 0, 1, 0.01, 0.13);
    let size = 1.2;

    var n1 = map(genes[1], 0, 1, 0.1, 1.5);
    var n2 = map(genes[2], 0, 1, 0.1, 1.5);
    var n3 = map(genes[3], 0, 1, 0.1, 1.5);
    var m = map(genes[4], 0, 1, 5, 36);
      
    var mx = map(genes[10], 0, 1, 5, 46);
    var iter = map(genes[5], 0, 1, 0, 180);
    var a = 1;
    var b = 1;
    let add = map(genes[6], 0, 1, 0.005, 0.04);
    var speed = map(genes[9], 0, 1, 0.01, 0.03);
    var rotateSpeed = map(genes[10], 0, 1, 0.001, 0.006);
      
    this.angleShape += rotateSpeed;
      
    osc += 0.01;

    // Once we calculate all the above properties, we use those variables to draw the superformula.
    push();
    translate(this.x, this.y);
      
    push();
    rotate(noise(this.angleShape));
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
        
      // Speed of animation    
      m = map(sin(osc), -1, 1, 0, 1) + iter;

      push();
      scale(radius);
        
      // Level of detail in shapes    
      var total = 80;
      var increment = TWO_PI / total;
      var radi = 0;

      beginShape();
        
        for(var angle = 0; angle < TWO_PI; angle += increment){
            
            noStroke();
            c = color(127 + 127 * sin(total*2 * iter1  + time), 127 + 127 * sin(total*2 * iter2 * radius + time), 127 + 127 * sin(total*2 * iter3*radius + time));
            fill(c);
            
            var rad = superShape(angle);
            
            let offset = map(noise(angle * 0.3 + frameCount * speed), -1, 1, 0, 1);

            var x = r * rad * offset * cos(angle);
            var y = r * rad * offset * sin(angle);

            curveVertex(x, y);
        }
               
      endShape(CLOSE);

      // Recursively draw shapes
      if(radius > 0.2) {
          drawShapes(radius/1.02);
      }
        
        pop();
    }
      pop();

    // Draw the bounding box
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(0, 0, this.wh, this.wh, 20);
      
    pop();

    // Apply noise to y value of line
    noiseIter += 0.01;
    let n = noise(noiseIter) * this.wh+this.y/2;
      
    // Draw scan line    
    strokeWeight(1);  
    stroke(c);
    line(this.x + this.wh / 2, n, this.x - this.wh/2, n); 
    
    // Draw rectangle for displaying colour value
    extraCanvas.fill(c);
    extraCanvas.noStroke();
    extraCanvas.rect(0, n-260, 10, 20);
    
    // Draw in a second canvas in order to leave a trail
    image(extraCanvas, this.x + this.wh/2+2, this.y - this.wh/2);
      
    // Draw alien description
    fill(255);
    textSize(40);  
    textAlign(CENTER);
    noStroke();
    text(this.word, width / 2, height/1.25); // Draw the word
  }


}





