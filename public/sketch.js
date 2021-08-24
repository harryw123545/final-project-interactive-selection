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
let iter = 2;
let pw = 2;
let ph = 3;

let bugCounter = 0;

//variables from server
let timer;
let timerBool = true;

//variable for smooted timer data
let smoothed = 0;

let nextChange = 0;


//connect to server
const socket = io.connect('https://codex-live.ngrok.io');

//log changes in timer and generation from server
socket.on('timer', data => {
        timer = data;
}); 

function preload() {
  font = loadFont('Codex-Regular.otf')
}

function setup() {
    createCanvas(displayWidth, displayHeight);    
    
    //change variables if screen is resized
    if(width < height){
        pw = 3;
        ph = 2;
        //console.log("pw: ", pw, "ph: ", ph);
    }
    
  let popmax = 9;
  let mutationRate = 0.3 // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax, pw, ph);

  textFont(font);
    
}


function draw() {
  background(10);
  // Display the faces
  population.display();
  population.rollover(mouseX, mouseY);
  fill(255);
  textAlign(CENTER);
  textSize(60);
    
  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/5, height/1.4, width/1.6, 20, 35, 20);
    
  fill(255, 0, 255);
  rect(width/5, height/1.4, map(smoothed = lerp(smoothed, timer, width/1.6)), 20, 35, 20);
    
  time = frameCount*0.015;
  //console.log(timer);
    
  //console.log(timerBool);
    
  //call next gen when server timer resets    
  if(timer == 0 && timerBool == true){
      nextGen();
      timerBool = false;   
  } else if(timer > 0){
      timerBool = true;
  }
    
}

// If the timer resets, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
  console.log("pop reset", bugCounter);
  bugCounter++;
    
  //print fittest array     
  var fittestCreature = population.returnFit()
  //console.log("bug test: ", fittestCreature, bugCounter);
    
  //send fittest array to server
  socket.emit('fittest', fittestCreature);

}

function windowResized() {
  resizeCanvas(displayWidth, displayHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling
 * the page.
 */
function touchStarted(){
  return false;
}

function touchMoved(){
  return false;
}

function touchEnded(){
  return false;
}