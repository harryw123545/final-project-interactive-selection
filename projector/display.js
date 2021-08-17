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

var clientCount = 0;
var clientBubble = [];

//variable for second canvas
let extraCanvas;

let counter = 0;

const socket = io.connect('http://localhost');

////variable for data taken from server
let fit;

function fittestCreature(data){
    fit = data;
    //population.fit = data;
    population.receiveFit(fit);
//    console.log(population.fit);
}

 //get dna array from server
    socket.on('fittest', fittestCreature);

    socket.on('count', count => {
            clientCount = count;
            //console.log(clientCount);
        });

function preload() {
  font = loadFont('Codex-Regular.otf');
  img = loadImage('background-terminal.png');

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //canvas.parent('canvas-container');

  extraCanvas = createGraphics(80, width/4);
  extraCanvas.background(10);

    
  let popmax = 6;
  let mutationRate = 0.05 // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax);

  textFont(font);    
    
  for(let i = 0; i < clientCount; i++){
       clientBubble.push(new clientShape());
  }
}


function draw() {
    
  background(10);


  //draw background image    
  imageMode(CORNER);
  image(img, 20, 20, width-50, height-90);
    
  // Display the faces
  population.displayFittest();
    
  console.log(clientCount);
    
  //statements for showing client bubbles on screen    
  if(clientCount < clientBubble.length){
        clientBubble.splice(0, 1);
  } 
  else if(clientCount > clientBubble.length){
      clientBubble.push(new clientShape());
  }
    
  for (let i = 0; i < clientBubble.length; i++) {
        clientBubble[i].move();
        clientBubble[i].display();
  }
    
//  if(clientCount < 2){
//      fill(255, 0, 0);
//      ellipse(width/2, height/2, 200, 200);
//  }
    
    
  //create counter - send to server
  counter = frameCount % 240;

  //send counter to server
  socket.emit('timer', counter);    
    
  
  //draw creature name    
  fill(255);
  textAlign(CENTER);
  textSize(55);
    
  let word = char(num); // select random word
  text("Generation: " + word, 260, 100);
  
    
  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/3.3, height/1.08, 500, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/3.3, height/1.08, map(counter, 0, 240, 0, 500), 20, 20, 20);
      
  //extablish time variable for shapes    
  time = frameCount*0.015;
    
  //call next gen when counter resets
  if(counter == 240){
      
      //send fittest array to nextGen
      nextGen();
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
  console.log("new population");
  num++;
  num%90;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

}