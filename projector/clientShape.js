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

class clientShape {
  constructor() {
    this.centreX = width/5; // Define centre point of bounding circle
    this.centreY = height/2;
    this.x = random(this.centreX, this.centreX+random(0, 50)); // Set random starting point
    this.y = random(this.centreY, this.centreY+random(0, 50));
    this.speedX = random(-2, 2); // Set speed to be random
    this.speedY = random(-2, 2);
    this.d;
    this.c = [random(0, 255), random(0, 255), random(0, 255)]; // Draw shape with random colour values
    this.size = 10;
  }

  display() {
    push();  
        noStroke();
        fill(this.c);
        ellipse(this.x, this.y, this.size, this.size);
        this.d = dist(this.centreX, this.centreY, this.x, this.y); // Calculate distance from centre to balls position
    pop();
  }
    
  move(){
      
      // If the distance exceeds the bounding box, reverse direction
      if(this.d > 150 - this.size/2){
          this.speedX *= -1;
          this.speedY *= -1;
      }
      this.x += this.speedX;
      this.y += this.speedY;
  }
}