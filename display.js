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
var img; 
let y;


function preload() {
  font = loadFont('Codex-Regular.otf');
  img = loadImage('background-terminal.png');

}

function setup() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
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
    
  console.log(num);
    
  let word = char(num); // select random word
  text("Generation: " + word, 260, 100);
  counter = frameCount % 360;
  

  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/3.5, height/1.08, 360*1.5, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/3.5, height/1.08, counter*1.5, 20, 20, 20);
    
    
  //draw rectangle
//  stroke(255);
//  fill(255, 0, 0);
//  rect(70, height/1.3, 160, 30, 30, 40);
    
  time = frameCount*0.015;
    
  if(counter == 0){
      nextGen();
  }
    
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
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