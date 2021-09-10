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
  constructor(m, num, PW, PH) {
    this.mutationRate = m; // Mutation rate
    this.population = []; // Array to hold the current population
    this.matingPool = [];
    this.generations = 0; // Number of generations
    this.maxFitness;
      
    // Define value for spacing
    this.spc = width/num; 
      
    // Variables that change depending on screen size
    this.ph = PW;
    this.pw = PH;
          
    this.tw = width / 3;
    this.th = height / 4.5;
    this.x1;
    this.y1;
    
    // Variable for fittest array
    this.fit;


    // Display creatures within a grid  
     for (let k = 0; k < num; k++) {
        this.x1 = this.tw / 2 + parseInt(k / this.ph) * this.tw;
        this.y1 = this.th / 2 + (k % this.ph) * this.th;
        this.population[k] = new Creature(new DNA(), this.x1, this.y1);

    }
        
  }

  // Display all of the creatures
  display() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].display();
    } 
      
  }
    
  returnFit(){
    // Function that returns fit array for sending to server
    return this.fit;
  }
    
  returnScore(){
    // Returns fitness score
    return this.maxFitness;
  }

  // Are we rolling over any of the creatures?
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
    this.maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the population (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitnessNormal = map(this.population[i].getFitness(), 0, this.maxFitness, 0, 1);
      let n = floor(fitnessNormal * 100); // Arbitrary multiplier

      for (let j = 0; j < n; j++) {
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Making the next generation
  reproduction() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
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
      let child = momgenes.crossover(dadgenes);
        
      //assign crossover genes to fit variable
      this.fit = momgenes.crossover(dadgenes);

      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new population with the new child
            
      this.x1 = this.tw / 2 + parseInt(i / this.ph) * this.tw;
      this.y1 = this.th / 2 + (i % this.ph) * this.th;
      this.population[i] = new Creature(child, this.x1, this.y1);
    }
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