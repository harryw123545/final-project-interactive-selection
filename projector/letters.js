


// Constructor (makes a random DNA)
class Letters {
  constructor(dna_) {
    this.dna = dna_;
    //console.log(this.dna);
}
    
   display() {
    let genes = this.dna.genes;
       
    //console.log(genes);
       
    for(let i = 0; i < genes.length; i++){
       // console.log(genes[i]);
      let c = floor(map(genes[i], 0, 1, 97, 122));
      //if (c === 64) c = 32;

      //console.log(c);
      textSize(20);
      text(String.fromCharCode(c), 80 + 20 * i, 140);
      //text("", 90 + 20 * i, 140);

    }

 }
    
    
}