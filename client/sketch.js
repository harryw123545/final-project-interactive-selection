// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;
var osc = 0;
let time;
var counter = 0;
let spc;
let font;
let words = [];
var canvas;
let num = 65;
let y;
let iter = 2;
let pw = 2;
let ph = 3;


function preload() {
  font = loadFont('Codex-Regular.otf')
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent('canvas-container');
    
    //change variables if screen is resized

    if(width < height){
        pw = 3;
        ph = 2;
        //console.log("pw: ", pw, "ph: ", ph);
    }
    
  let popmax = 6;
  let mutationRate = 0.05 // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax, pw, ph);

  textFont(font);
    
}



function draw() {
  background(10);
  // Display the faces
  population.display();
  population.displayFittest();
  population.rollover(mouseX, mouseY);
  fill(255);
  textAlign(CENTER);
  textSize(60);
    
    
//  console.log(num);
//    
//  let word = char(num); // select random word
//  text("Generation: " + word, width/2, height/1.13);
    
  counter = frameCount % 360;
  
    
  //draw rectangles to display counter
//  noStroke();
//  fill(255);
//  rect(width/3.5, height/1.4, 360*1.5, 40);
//    
//  fill(255, 0, 255);
//  rect(width/3.5, height/1.4, counter*1.5, 40);
    
  time = frameCount*0.015;
    
  if(counter == 0){
      nextGen();
  }
    
}

// If the counter resets, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
  num++;
  num%90;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}