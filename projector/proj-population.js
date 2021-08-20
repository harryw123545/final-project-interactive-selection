// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

// A class to describe a population of faces
// this hasn't changed very much from example to example

// Create the population
class Population {
  constructor(num) {
    
    //variable for received fitness array
    this.receive;
    this.receiveArray;
    this.clientCount = num;    
    this.dataArray = [];
    this.population; // array to hold amount of clients

    this.glyph = new Glyphs(new DNA());
      
    this.fittest = new Fittest(new DNA(), width/2, height/2);
  
  }
    
    
  displayFittest() {
      this.fittest.display();
      this.glyph.display();

  }
    
  receiveFit(data) {
      this.receive = data;
      
      this.dataArray.push(this.receive);
      
      this.population = clientCount-1;
      
      if(this.dataArray.length >= this.population){
            console.log(this.dataArray);
            console.log(this.population);
          
            let crossover = floor(random(this.dataArray.length));
            this.fittest = new Fittest(this.dataArray[crossover], width/2, height/2);
            this.glyph = new Glyphs(this.dataArray[crossover]);
            
            this.dataArray = [];
        }
      
      

  }


}