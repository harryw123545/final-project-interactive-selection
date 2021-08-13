// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// A class to describe a population of faces
// this hasn't changed very much from example to example

// Create the population
class Population {
  constructor(m, num) {

    this.fittest = new Fittest(new DNA(), width/2, height/2);  
      
    
    //variable for received fitness array
    this.receive;

      
    this.fittest = new Fittest(new DNA(), width/2, height/2);
  
  }
    
    
  displayFittest() {
      this.fittest.display();

  }
    
  receiveFit(data) {
      this.receive = data;
      this.fittest = new Fittest(this.receive, width/2, height/2);
  }


}