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

// Create the population
class Population {
  constructor(num) {
    
    this.receive;
    this.receiveArray;
    this.clientCount = num;    
    this.dataArray = [];
    this.population; // array to hold amount of clients
    this.glyph = new Glyphs(new DNA());
    this.genes = new DNA();
    this.fittest = new Fittest(new DNA(), width/2, height/2);
  }
    
    
  displayFittest() {
      this.fittest.display();
      this.glyph.display();
  }
    

  receiveFit(data) {
      
      // Assign variable to data array retrieved from server
      this.receive = data;
      
      // Create an array of arrays
      this.dataArray.push(this.receive);
       
      // Minus 2 from population to avoid websites recognising themselves as clients
      this.population = clientCount-2;     

      //If the array is larger than or equal to the amount of clients
      if(this.dataArray.length >= this.population){
          
          // If you want to mix them all 
          let i = 0;
          let start = new DNA(this.dataArray[0].genes);
          for (let dna of this.dataArray) {
              
            // If there is more than one client, apply crossover to all the arrays
            if (i!=0) {
                let current = new DNA(this.dataArray[i].genes);
                start = start.crossover(current);
            }
            
            i+=1;
          }
          
            this.fittest = new Fittest(start, width/2, height/2);
            this.glyph = new Glyphs(start);
          
            // Reset data array at the end of calculation
            this.dataArray = [];
        } 
  
  }


}