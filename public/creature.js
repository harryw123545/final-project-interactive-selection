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
class Creature {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false; // Are we rolling over this face?
    this.dna = dna_; // Face's DNA
    this.x = x_; // Position on screen
    this.y = y_;
      
    this.space = 8;

    this.wh = width/4; // Size of square enclosing face
    this.fitness = 1; // How good is this face?
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
    this.num = [random(65, 90), random(65, 90), random(65, 90), random(65, 90)];
    this.word = join(char(this.num), ''); // select random word
    this.osc = 0;
    this.angleShape = 0;
      
    // Values for fitness score
    this.col = [255, 0, 255];
    this.recCol = [255];
  }

    
  // Display the face
  display() {
    // We are using the creatures DNA to pick properties for this face
    // such as: size, color, rotation, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
    let genes = this.dna.genes;
      
    let sinCol = 0;
      
    // Map values from genes array to determine values of each creature  
    let r = map(genes[2], 0, 1, 80, 100);
    let c = color(genes[1], genes[2], genes[3]);
    
    let iter1 = map(genes[1], 0, 1, 0.01, 0.1);
    let iter2 = map(genes[2], 0, 1, 0.01, 0.12);
    let iter3 = map(genes[3], 0, 1, 0.01, 0.13);
    let size = 1;

    var n1 = map(genes[1], 0, 1, 0.1, 1.5);
    var n2 = map(genes[2], 0, 1, 0.1, 1.5);
    var n3 = map(genes[3], 0, 1, 0.1, 1.5);
    var m = map(genes[4], 0, 1, 5, 36);
    var iter = map(genes[5], 0, 1, 0, 180);
    var a = 1;
    var b = 1;
    let add = map(genes[8], 0, 1, 0.0001, 0.001);
    var speed = map(genes[9], 0, 1, 0.001, 0.03);
    var rotateSpeed = map(genes[10], 0, 1, 0.001, 0.006);   
      
    this.angleShape += rotateSpeed;
      
    // Define noise
    let noiseIter = map(genes[7], 0, 1, 0.1, 0.2);
    osc += add;


    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
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
      m = map(sin(osc), -1, 1, 0, 3) + iter;
      
      push();
        
      noStroke();    
      scale(radius);

      // Level of detail in shapes    
      var total = 80;
      var increment = TWO_PI / total;

      beginShape();
        for(var angle = 0; angle <= TWO_PI; angle += increment){
            fill(127 + 127 * sin(total*2 * iter1  + time), 127 + 127 * sin(total*2 * iter2 * radius + time), 127 + 127 * sin(total*2 * iter3*radius + time));
            var rad = superShape(angle);
            
            let offset = map(noise(angle * 0.3 + frameCount * speed), -1, 1, 0, 1);

            var x = r * rad * offset * cos(angle);
            var y = r * rad * offset * sin(angle);

            curveVertex(x, y);
        }
      endShape(CLOSE);

      // Recursively draw shapes
      if(radius > 0.3) {
          drawShapes(radius/1.8);
      }
        
        pop();
    }

      pop();

      
    // Draw the bounding box
    stroke(255, 100);
    if (this.rolloverOn) fill(255, 150);
    else noFill();
    rectMode(CENTER);
    rect(0, 0, this.wh, this.wh, 10);
    pop();

    // Display fitness value
      
    // Draw rectangle underneath 
    noStroke();  
    fill(this.recCol);  
    rect(this.x-this.wh/2, this.y+this.wh/1.3, this.wh, 15, 20);
    

    // Change colour when move rolls over
    if (this.rolloverOn) fill(this.col);
    else fill(155);
      
    // Fix bug that displays small rectangle before counter starts
    if(this.fitness <= 1){
        noStroke();
        noFill();
    }
      
    // Display fitness score as a rectangle
    rect(this.x-this.wh/2, this.y+this.wh/1.3, this.fitness % this.wh, 15, 20);
    
    if(this.fitness >= this.wh){
        this.recCol = [127 + 127 * sin(sinCol + frameCount*0.05), 0, 255];
        this.col = [255, 0, 255];
        fill(this.col);
        rect(this.x-this.wh/2, this.y+this.wh/1.3, this.fitness % this.wh, 15, 20);
    } else fill(100);
      
      sinCol += 0.01;
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  rollover(mx, my) {
    if (this.r.contains(mx, my) && mouseIsPressed) {
      this.rolloverOn = true;
      this.fitness += 0.4;
    } else {
      this.rolloverOn = false;
    }
  }
}





