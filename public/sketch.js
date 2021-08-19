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
//let y;
let iter = 2;
let pw = 2;
let ph = 3;

//variables from server
let timer = 0;

//connect to server
const socket = io.connect('https://interactive-selection.herokuapp.com/');

//create instance of hammer library
var hammertime = new Hammer(myElement, myOptions);
hammertime.on('pan', function(ev) {
	console.log(ev);
});


function preload() {
  font = loadFont('Codex-Regular.otf')
}

function setup() {
    createCanvas(displayWidth, displayHeight);
        
    //log changes in timer and generation from server
    socket.on('timer', intervalTimer); 
       
    
    //change variables if screen is resized
    if(width < height){
        pw = 3;
        ph = 2;
        //console.log("pw: ", pw, "ph: ", ph);
    }
    
  let popmax = 9;
  let mutationRate = 0.09 // A pretty high mutation rate here, our population is rather small we need to enforce variety
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(mutationRate, popmax, pw, ph);

  textFont(font);
    
}

function intervalTimer(data){
    //console.log("timer: ", data);
    timer = data;
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
  rect(width/5, height/1.25, width/1.6, 20, 35, 20);
    
  fill(255, 0, 255);
  rect(width/5, height/1.25, map(timer, 0, 240, 0, width/1.6), 20, 35, 20);
    
  time = frameCount*0.015;
    
  //call next gen when server timer resets    
  if(parseInt(timer) <= 1){
      nextGen();
  }
    
}

// If the timer resets, evolve next generation
function nextGen() {
  population.selection();
  population.reproduction();
  console.log("pop reset");

  //print fittest array     
  var fittestCreature = population.returnFit()
  console.log(fittestCreature);
    
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