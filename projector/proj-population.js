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
      
    //variable for selection bool
//    this.selectionBool;
      
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
      this.receive = data;
//      this.selectionBool = bool;
      
      this.dataArray.push(this.receive);
      
      this.population = clientCount-2;
      console.log("population: ", this.population);
//      console.log("dataArray: ", this.dataArray.length);
//      
//      if(this.dataArray.length == 1){
//          this.fittest = new Fittest(this.receive, width/2, height/2);
//          this.glyph = new Glyphs(this.receive);
//          this.dataArray = [];
//      }
      if(this.dataArray.length >= this.population){
          
//          let child = new DNA();
//          let d = this.dataArray[floor(random(0, this.dataArray.length))];
//          let m = this.dataArray[floor(random(0, this.dataArray.length))];
//          
//          console.log('Checking main');
//          console.log(d);
//          console.log(m);
//          
//          
//          // this might work
//          let nd = new DNA(d.genes);
//          let nm = new DNA(m.genes);
//          let combined = nd.crossover(nm); // this is your combined dna
//          console.log(combined);
//          console.log('Finished');
          
          //console.log(selectionBool);

          console.log("received");
          console.log(this.dataArray);
          // if you want to mix them all 
          
          let i = 0;
          let start = new DNA(this.dataArray[0].genes);
          for (let dna of this.dataArray) {
            if (i!=0) {
                let current = new DNA(this.dataArray[i].genes);
                start = start.crossover(current);
            }
            
            i+=1;
          }
          
          // in theory start now is an amalgamation of all of them
          

            this.fittest = new Fittest(start, width/2, height/2);
            this.glyph = new Glyphs(start);
            
            this.dataArray = [];
        } 
    
  }


}