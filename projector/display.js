// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

//let population;
//let info;
var osc;
let time;
let spc;
//let font;
let words = [];
var canvas;
let num = 65;
var img; 
let y;

let counter = 0;

const socket = io.connect('http://localhost');
//
//
////variable for data taken from server
//let fit;
////get dna array from server
//socket.on('fittest', fittestCreature);
//
//function fittestCreature(data){
//        fit = data;
//    }

function preload() {
  font = loadFont('Codex-Regular.otf');
  img = loadImage('background-terminal.png');

}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent('canvas-container');
 
  
    
    
  let popmax = 6;
  let mutationRate = 0.05 // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);

  textFont(font);    
    
}


function draw() {
  background(10);
  // Display the faces
  //population.display();
  population.displayFittest();

  imageMode(CORNER);
  image(img, 20, 20, width-50, height-90);
    
//  population.rollover(mouseX, mouseY);
  fill(255);
  textAlign(CENTER);
  textSize(55);
    
  counter = frameCount % 240;

  //send counter to server
  socket.emit('timer', counter);    
    
    
  let word = char(num); // select random word
  text("Generation: " + word, 260, 100);
  

  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/3.5, height/1.08, 500, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/3.5, height/1.08, map(counter, 0, 240, 0, 500), 20, 20, 20);
    
    
  time = frameCount*0.015;
    
  //call next gen when counter resets
  if(counter == 240){
      
      //send fittest array to nextGen
      nextGen(fit);
  }
    
}

function keyPressed() {
    let fs = fullscreen();
    if (keyCode === ENTER) {
        fullscreen(!fs);
    }
  }

// If the timer resets, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
  console.log("new population");
  num++;
  num%90;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}