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
    this.mutationRate = m; // Mutation rate
    this.population = []; // array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    this.fittest = new Fittest(new DNA(), width/2, height/2);  
      
    //define value for spacing
    this.spc = width/num; 
      
    //variables that change depending on screen size
//    this.ph = PW;
//    this.pw = PH;
    
    //console.log("ph: ", this.ph, "pw: ", this.pw);
      
    this.tw = width / 3;
    this.th = height / 3;
    this.x1;
    this.y1;
    
    //variable for fittest array
    this.fit;
    this.playerFitness;
    this.receive;

//     this.socket = io.connect('http://localhost');
//      //get dna array from server
//    this.socket.on('fittest', fittestCreature);
//
//    function fittestCreature(data){
//        this.playerFitness = data;
//        console.log(this.playerFitness);
//        }

//     for (let k = 0; k < num; k++) {
//        this.x1 = this.tw / 2 + parseInt(k / 2) * this.tw;
//        this.y1 = this.th / 2 + (k % 2) * this.th;
//        this.population[k] = new Face(new DNA(), this.x1, this.y1);
//
//    }
      
    this.fittest = new Fittest(new DNA(), width/2, height/2);
  
  }
    
    

  // Display all faces
  display() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].display();
    }

  }
    
  displayFittest() {
      this.fittest.display();

  }
    
  receiveFit(data) {
      this.receive = data;
      this.fittest = new Fittest(this.receive, width/2, height/2);
  }

  // Are we rolling over any of the faces?
  rollover(mx, my) {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].rollover(mx, my);
    }
  }

  // Generate a mating pool
  selection() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole population
    let maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(this.population[i].getFitness(), 0, maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    //for (let i = 0; i < this.population.length; i++) {
      // Sping the wheel of fortune to pick two parents
      let m = floor(random(this.matingPool.length));
      let d = floor(random(this.matingPool.length));
      // Pick two parents
      let mom = this.matingPool[m];
      let dad = this.matingPool[d];
      // Get their genes
      let momgenes = mom.getDNA();
      let dadgenes = dad.getDNA();
        
      // Mate their genes
      //let child = momgenes.crossover(this.fit);
      //this.fit = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
      
       //console.log("received: ", this.receive);

      this.x1 = this.tw / 2 + parseInt(i / 2) * this.tw;
      this.y1 = this.th / 2 + (i % 2) * this.th;
      //this.population[i] = new Face(child, this.x1, this.y1);
        
      //call fittest class    
      //this.fittest = new Fittest(this.fit, width/2, height/2);

   // }
    this.generations++;

  }
    


  getGenerations() {
    return this.generations;
  }

  // Find highest fitness for the population
  getMaxFitness() {
    let record = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].getFitness() > record) {
        record = this.population[i].getFitness();
        
        }
    }
    return record;
  }
}