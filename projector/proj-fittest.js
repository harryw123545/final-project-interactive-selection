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
      
//    extraCanvas = createGraphics(this.wh/8, this.wh);
//    extraCanvas.background(100);

    // We are using the face's DNA to pick properties for this face
    // such as: head size, color, eye position, etc.
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
    var m = map(genes[4], 0, 1, 5, 66);
    var mx = map(genes[10], 0, 1, 5, 46);
    var iter = map(genes[5], 0, 1, 0, 180);
    var a = 1;
    var b = 1;
    let add = map(genes[6], 0, 1, 0.0005, 0.004);
    var speed = map(genes[9], 0, 1, 0.001, 0.03);
      
    let offset = map(noise(0.3 + frameCount * speed), -1, 1, 0, 1);
     // let offset = 1;
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
        
      scale(radius);
//        
//        stroke(255);
//        strokeWeight(1);
//        noFill();
        
//      //level of detail in shapes    
      var total = 80;
      var increment = TWO_PI / total;
//        
//        angle_start = 0;
//
//        var angle_pre = TWO_PI - increment;
//        var angle_end = angle_start + increment;
//        var angle_post = angle_start + 2 * increment;
//
//        var rad_start = superShape(angle_start);
//        var rad_pre = superShape(angle_pre);
//        var rad_end = superShape(angle_end);
//        var rad_post = superShape(angle_post);
//
//        var x_pre = r * rad_pre * offset * cos(angle_pre);
//        var x_start = r * rad_start * offset * cos(angle_start);
//        var x_end = r * rad_end * offset * cos(angle_end);
//        var x_post = r * rad_post * offset * cos(angle_post);
//
//        var y_pre = r * rad_pre * offset * sin(angle_pre);
//        var y_start = r * rad_start * offset * sin(angle_start);
//        var y_end = r * rad_end * offset * sin(angle_end);
//        var y_post = r * rad_post * offset * sin(angle_post);
//        curve(x_pre, y_pre, x_start, y_start, x_end, y_end, x_post, y_post);
//
//
//
//        for(var angle_start = 0; angle_start < TWO_PI - 2 * increment; angle_start += increment){  
//
//        var angle_pre = angle_start - increment;
//        var angle_end = angle_start + increment;
//        var angle_post = angle_start + 2 * increment;
//
//        var rad_start = superShape(angle_start);
//        var rad_pre = superShape(angle_pre);
//        var rad_end = superShape(angle_end);
//        var rad_post = superShape(angle_post);
//
//        //let offset = map(noise(angle * 0.3 + frameCount * speed), -1, 1, 0, 1);
//        
//
//
//        var x_pre = r * rad_pre * offset * cos(angle_pre);
//        var x_start = r * rad_start * offset * cos(angle_start);
//        var x_end = r * rad_end * offset * cos(angle_end);
//        var x_post = r * rad_post * offset * cos(angle_post);
//
//        var y_pre = r * rad_pre * offset * sin(angle_pre);
//        var y_start = r * rad_start * offset * sin(angle_start);
//        var y_end = r * rad_end * offset * sin(angle_end);
//        var y_post = r * rad_post * offset * sin(angle_post);
//
//        curve(x_pre, y_pre, x_start, y_start, x_end, y_end, x_post, y_post);
//
//        }
//
//        angle_start = TWO_PI - 2 * increment;
//
//        var angle_pre = angle_start - increment;
//        var angle_end = angle_start + increment;
//        var angle_post = 0;
//
//        var rad_start = superShape(angle_start);
//        var rad_pre = superShape(angle_pre);
//        var rad_end = superShape(angle_end);
//        var rad_post = superShape(angle_post);
//
//        var x_pre = r * rad_pre * offset * cos(angle_pre);
//        var x_start = r * rad_start * offset * cos(angle_start);
//        var x_end = r * rad_end * offset * cos(angle_end);
//        var x_post = r * rad_post * offset * cos(angle_post);
//
//        var y_pre = r * rad_pre * offset * sin(angle_pre);
//        var y_start = r * rad_start * offset * sin(angle_start);
//        var y_end = r * rad_end * offset * sin(angle_end);
//        var y_post = r * rad_post * offset * sin(angle_post);
//        curve(x_pre, y_pre, x_start, y_start, x_end, y_end, x_post, y_post);
//
//
//
//
//        angle_start = TWO_PI - increment;
//
//        var angle_pre = angle_start - increment;
//        var angle_end = 0;
//        var angle_post = increment;
//
//        var rad_start = superShape(angle_start);
//        var rad_pre = superShape(angle_pre);
//        var rad_end = superShape(angle_end);
//        var rad_post = superShape(angle_post);
//
//        var x_pre = r * rad_pre * offset * cos(angle_pre);
//        var x_start = r * rad_start * offset * cos(angle_start);
//        var x_end = r * rad_end * offset * cos(angle_end);
//        var x_post = r * rad_post * offset * cos(increment);
//
//        var y_pre = r * rad_pre * offset * sin(angle_pre);
//        var y_start = r * rad_start * offset * sin(angle_start);
//        var y_end = r * rad_end * offset * sin(angle_end);
//        var y_post = r * rad_post * offset * sin(increment);
//        curve(x_pre, y_pre, x_start, y_start, x_end, y_end, x_post, y_post);

        
        
        
        
      beginShape();
        
        for(var angle = 0; angle <= TWO_PI; angle += increment){
            
            var rad = superShape(angle);
            
            let offset = map(noise(angle * 0.3 + frameCount * speed), -1, 1, 0, 1);
            //let offset = 1;
            noStroke();
            c = color(127 + 127 * sin(total*2 * iter1  + time), 127 + 127 * sin(total*2 * iter2 * radius + time), 127 + 127 * sin(total*2 * iter3*radius + time));
            fill(c);
            //stroke(255);
//            strokeWeight(0.4);
//            noFill();
            var x = r * rad * offset * cos(angle);
            var y = r * rad * offset * sin(angle);
//            var x = r  * cos(angle);
//            var y = r  * sin(angle);

            curveVertex(x, y);
        }
               
      endShape(CLOSE);

      //recursively draw shapes
      if(radius > 0.2) {
          drawShapes(radius/1.02);
      }
        
        pop();
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





