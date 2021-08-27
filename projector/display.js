// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html


var osc;
let time;
let spc;
let words = [];
var canvas;
let num = 65;
var img; 
let noiseIter = 0;

let angle = 0;

//variable for sound effects
var newGenSound, newUser, dreaming;

var clientCount = 0;
var clientBubble = [];

//variable for second canvas
let extraCanvas;

//variable for generation counter
let counter = 0;

let testCounter = 0;

//variable for data taken from server
let fit;

//variable for timer data
let timer;
let timerBool = true;
let smoothed;

let easing = 0.1;
let target = 800;
let start = 0;
let timerX = 1;


//establish socket connection
const socket = io.connect('https://codex-live.ngrok.io');

//get dna array from server
socket.on('fittest', fittestCreature);

//log changes in timer and generation from server
socket.on('timer', data => {
    timer = data;
}); 

socket.on('count', count => {
        clientCount = count;
        //console.log(clientCount);
});


function fittestCreature(data){
    fit = data;
    testCounter++;
    //console.log(fit, testCounter);
    population.receiveFit(fit);
//    console.log(population.fit);
}



function preload() {
  newGenSound = loadSound('sounds/newGen.MP3');
  newUser = loadSound('sounds/newUser.MP3');
  dreaming = loadSound('sounds/dreaming.MP3');
  font = loadFont('Codex-Regular.otf');
  img = loadImage('background-terminal-new.png');

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //canvas.parent('canvas-container');

  extraCanvas = createGraphics(80, width/4);
  extraCanvas.background(0);

  //hide cursor from view
  noCursor();
    
  smoothed = 0;
        
  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(clientCount);
  
  scan = new scanLine();

  textFont(font);    
    
  for(let i = 0; i < clientCount; i++){
       clientBubble.push(new clientShape());
  }
}


function draw() {
    
  background(0);

  //draw background image    
  imageMode(CORNER);
  image(img, 20, 20, width-50, height-90);
    
  // Display the faces
  population.displayFittest();
   
  //display scan animation    
  scan.display();
        
  boundingCircle();
  
  //statements for showing client bubbles on screen    
  if(clientCount < clientBubble.length){
        clientBubble.splice(0, 1);
  } 
  else if(clientCount > clientBubble.length){
      clientBubble.push(new clientShape());
      newUser.play();
  }
    
  for (let i = 1; i < clientBubble.length; i++) {
        clientBubble[i].move();
        clientBubble[i].display();
  }
    
  
  //draw creature name    
  fill(255);
  noStroke();
  textSize(95);
  textAlign(LEFT);
    
  let word = char(num); // select random word
  text(`generation: ${word}`, width/13, height/6.5);
    
  //draw writing underneath    
  fill(255);
  noStroke();
  textSize(38);
    
  let writing = ['hello, wagsydsa, xbsajxgyag']; // select random word
  text(`${writing}`, width/13, height/4.8);

//  smoothed = lerp(smoothed, timer, 0.1);
  //console.log(timer);

  let targetX = 800;

  let dx = targetX - timerX;
  timerX += dx * easing;

  //timerX = map(timer, 0, 7, 0, 800) - timerX * easing;
    
    
  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/2-400, height/1.1, 800, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/2-400, height/1.1, map(timer, 0, 7, 0, 800), 20, 20, 20);
      
  //extablish time variable for shapes    
  time = frameCount*0.015;
    
  
  //call next gen when server timer resets    
  if(timer == 0 && timerBool == true){
      nextGen();
      timerBool = false;   
  } else if(timer > 0){
      timerBool = true;
  }
    
}


function keyPressed() {
    let fs = fullscreen();
    if (keyCode === ENTER) {
        fullscreen(!fs);
        newGenSound.play();
        newUser.play();
        dreaming.play();
        dreaming.loop();
    }
  }

function boundingCircle() {
    //draw bounding circle    
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(width/5, height/2, 300, 300);
    
  //draw dotted circle outline
  push();
      translate(width/5, height/2);
      stroke(255);
      strokeWeight(2);
      noFill();
      for(let a = 0; a < TWO_PI; a+=0.1){
          let r = 160;
          let x = r * cos(a);
          let y = r * sin(a);
          point(x, y);
      }
  pop();
     
  //draw moving circle outline
  push();
      //translate(width/5, height/2);
      noStroke();
      let circleCol = frameCount*0.01;
      for(let a = 0; a < TWO_PI; a+=0.01){
          fill(127 + 127 * sin(a * 0.4 + circleCol), 127 + 127 * sin(a * 0.1 + circleCol), 127 + 127 * sin(a * 0.01 + circleCol))
          let r = 170;
          let x = r * cos(a * 0.5 + time);
          let y = r * sin(a * 0.5 + time);
          ellipse(width/5 + x, height/2 + y, 3, 3);
      }
  pop();

}

// If the timer resets, evolve next generation
function nextGen() {
  //console.log("new population");
  //saveCanvas('myCanvas', 'png');
  newGenSound.play();
  num = random(65, 80);
  const img64 = canvas.toDataURL();
  socket.emit('img64', img64); 
  //console.log(img64);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

}