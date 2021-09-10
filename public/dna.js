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

 //Constructor (makes a random DNA)
 class DNA {
     constructor(newgenes) {
         // DNA is random floating point values between 0 and 1 (!!)
         // The genetic sequence
         let len = 30; // Arbitrary length
         if (newgenes) {
             this.genes = newgenes;
         } else {
             this.genes = new Array(len);
             for (let i = 0; i < this.genes.length; i++) {
                 this.genes[i] = random(0, 1);
             }
         }
     }

     // Crossover
     // Creates new DNA sequence from two (this &
     crossover(partner) {
         let child = new Array(this.genes.length);
         let crossover = floor(random(this.genes.length));
         for (let i = 0; i < this.genes.length; i++) {
             if (i > crossover) child[i] = this.genes[i];
             else child[i] = partner.genes[i];
         }
         let newgenes = new DNA(child);
         return newgenes;
     }

     // Based on a mutation probability, picks a new random character in array spots
     mutate(m) {
         for (let i = 0; i < this.genes.length; i++) {
             if (random(1) < m) {
                 this.genes[i] = random(0, 1);
             }
         }
     }
 }