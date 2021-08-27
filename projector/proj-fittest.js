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
  }

    
  // Display the face
  display() {

    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
    // Now, since every gene is a floating point between 0 and 1, we map the values
      let genes = this.dna.genes;
//    let r = map(genes[2], 0, 1, 80, 100);
//    let c = 255;
//    
//    let iter1 = map(genes[1], 0, 1, 0.01, 0.1);
//    let iter2 = map(genes[2], 0, 1, 0.01, 0.12);
//    let iter3 = map(genes[3], 0, 1, 0.01, 0.13);
//    let size = 1.2;
//
//    var n1 = map(genes[1], 0, 1, 0.1, 1.5);
//    var n2 = map(genes[2], 0, 1, 0.1, 1.5);
//    var n3 = map(genes[3], 0, 1, 0.1, 1.5);
//    var m = map(genes[4], 0, 1, 5, 66);
//    var mx = map(genes[10], 0, 1, 5, 46);
//    var iter = map(genes[5], 0, 1, 0, 180);
//    var a = 1;
//    var b = 1;
//    let add = map(genes[6], 0, 1, 0.0005, 0.004);
//    var speed = map(genes[9], 0, 1, 0.001, 0.03);
//      
//    let offset = map(noise(0.3 + frameCount * speed), -1, 1, 0, 1);
//     // let offset = 1;
//    osc += add;

    // Once we calculate all the above properties, we use those variables to draw rects, ellipses, etc.
//    push();
//    translate(this.x, this.y);
//    drawShapes(size);  

//    function drawShapes(radius){
//        function superShape(theta) {    
//            var part1 = (1 / a) * cos(theta * m/4);
//            part1 = abs(part1);
//            part1 = pow(part1, n2);
//
//            var part2 = (1 / b) * sin(theta * m/4);
//            part2 = abs(part2);
//            part2 = pow(part2, n3);
//
//            var part3 = pow(part1 + part2, 1/n1);
//
//            if (part3 === 0){
//                return 0;
//            }
//            return (1 / part3);
//        }
//        
//      //speed of animation    
//      m = map(sin(osc), -1, 1, 0, 3) + iter;
//      
//      push();
//        
//      scale(radius);
//        
//      //level of detail in shapes    
//      var total = 80;
//      var increment = TWO_PI / total;
//
//        
//      beginShape();
//        
//        for(var angle = 0; angle <= TWO_PI; angle += increment){
//            
//            var rad = superShape(angle);
//            
//            let offset = map(noise(angle * 0.3 + frameCount * speed), -1, 1, 0, 1);
//            //let offset = 1;
//            noStroke();
//            c = color(127 + 127 * sin(total*2 * iter1  + time), 127 + 127 * sin(total*2 * iter2 * radius + time), 127 + 127 * sin(total*2 * iter3*radius + time));
//            fill(c);
//            var x = r * rad * offset * cos(angle);
//            var y = r * rad * offset * sin(angle);
//
//            curveVertex(x, y);
//        }
//               
//      endShape(CLOSE);
//
//      //recursively draw shapes
//      if(radius > 0.2) {
//          drawShapes(radius/1.02);
//      }
//        
//        pop();
//    }
//
//      
    
initializeFields(genes);
      
var scaler;
      

var n1;
var n2;
var n3;
var m;
      
let size = 1.2;
      
let c = 255;

var newscaler = scaler;
      
 push();
    translate(this.x, this.y);
    noFill();
    stroke(255);
    strokeWeight(1);
      
    for (var s = 1; s > 0; s--) {
    beginShape();
    var mm = m + s;
    var nn1 = n1 + s;
    var nn2 = n2 + s;
    var nn3 = n3 + s;
    newscaler = newscaler * 0.98;
    var sscaler = newscaler;
    var points = superformula(mm, nn1, nn2, nn3);
    curveVertex(points[points.length - 1].x * sscaler, points[points.length - 1].y * sscaler);
    for (var i = 0; i < points.length; i++) {
        curveVertex(points[i].x * sscaler, points[i].y * sscaler);
    }
    curveVertex(points[0].x * sscaler, points[0].y * sscaler);
    endShape();
}


function superformula(m, n1, n2, n3) {
    var numPoints = 60;
    var phi = TWO_PI / numPoints;
    var points = new Array(numPoints + 1);
    for (var i = 0; i <= numPoints; i++) {
        points[i] = superformulaPoint(m, n1, n2, n3, phi * i);
    }
    return points;
}

function superformulaPoint(m, n1, n2, n3, phi) {
    var r;
    var t1, t2;
    var a = 1, b = 1;
    var x = 0;
    var y = 0;
    t1 = cos(m * phi / 4) / a;
    t1 = abs(t1);
    t1 = pow(t1, n2);
    t2 = sin(m * phi / 4) / b;
    t2 = abs(t2);
    t2 = pow(t2, n3);
    r = pow(t1 + t2, 1 / n1);
    if (abs(r) == 0) {
        x = 0;
        y = 0;
    } else {
        r = 1 / r;
        x = r * cos(phi);
        y = r * sin(phi);
    }
    return new p5.Vector(x, y);
}

function initializeFields(genes) {
    scaler = map(genes[2], 0, 1, 20, 80);
    m = floor(map(genes[4], 0, 1, 5, 36));
    n1 = map(genes[1], 0, 1, 0.1, 5);

    n2 = map(genes[2], 0, 1, 0.1, 5);
    n3 = map(genes[3], 0, 1, 0.1, 5);
    

    osc+=0.01;
}


      

    // Draw the bounding box
        stroke(255);
        strokeWeight(1);
        noFill();
        rectMode(CENTER);
        rect(0, 0, this.wh, this.wh, 20);
      
    pop();

    //apply noise to y value of line
    noiseIter += 0.015;
    let n = noise(noiseIter) * this.wh+this.y/2;
      
    //draw scan line
    //push();
    
    strokeWeight(1);  
    stroke(c);
    line(this.x + this.wh / 2, n, this.x - this.wh/2, n); 
    
    //draw rectangle for displaying colour value
    extraCanvas.fill(c);
    extraCanvas.noStroke();
    extraCanvas.rect(0, n-310, 10, 20);
    
    //pop();
    image(extraCanvas, this.x + this.wh/2+2, this.y - this.wh/2);

      
    //draw alien description
    fill(255);
    textSize(50);  
    textAlign(CENTER);
    noStroke();
    text(this.word, width / 2, height/1.25); // draw the word
    
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

}





