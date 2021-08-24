class clientShape {
  constructor() {
    this.centreX = width/5;
    this.centreY = height/2;
    this.x = random(this.centreX, this.centreX+random(0, 50));
    this.y = random(this.centreY, this.centreY+random(0, 50));
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
    this.d;
    this.c = [random(0, 255), random(0, 255), random(0, 255)];
    this.size = 10;
  }

  display() {
    push();  
        noStroke();
        fill(this.c);
        ellipse(this.x, this.y, this.size, this.size);
        this.d = dist(this.centreX, this.centreY, this.x, this.y);
    pop();
  }
    
  move(){
      if(this.d > 150 - this.size/2){
          this.speedX *= -1;
          this.speedY *= -1;
      }
      this.x += this.speedX;
      this.y += this.speedY;
  }
}