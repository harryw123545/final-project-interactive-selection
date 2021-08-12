// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

let population;
let info;
var osc = 0;
let time;
let spc;
let font;
let words = [];
var canvas;
let num = 65;
let y;
let iter = 2;
let pw = 2;
let ph = 3;

//variables from server
let timer = 0;
let generation;

//connect to server
const socket = io.connect('http://localhost');

function preload() {
  font = loadFont('Codex-Regular.otf')
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas.parent('canvas-container');
        
    //log changes in timer and generation from server
    socket.on('timer', function (data) {
        timer = (data.countdown);
        console.log("timer: ", timer);
        generation = (data.generation);
        //console.log("generation: ", generation);
    });
    
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
  //population.displayFittest();
  population.rollover(mouseX, mouseY);
  fill(255);
  textAlign(CENTER);
  textSize(60);
    
    
//  console.log(num);
//    
//  let word = char(num); // select random word
//  text("Generation: " + word, width/2, height/1.13);
      
    
  //draw rectangles to display timer
  noStroke();
  
  fill(255);
  rect(width/3.5, height/1.08, 360*1.5, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/3.5, height/1.08, timer*1.5, 20, 20, 20);
    
  time = frameCount*0.015;
    
  //call next gen when server timer resets    
  if(timer <= 1){
      nextGen();
  }
    
}

// If the timer resets, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
    console.log("pop reset");
  num++;
  num%90;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}