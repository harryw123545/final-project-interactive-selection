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


//establish socket connection
const socket = io.connect('https://interactive-selection.herokuapp.com/');

//variable for data taken from server
let fit;

function fittestCreature(data){
    fit = data;
    testCounter++;
    console.log(fit, testCounter);
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
  newGenSound = loadSound('sounds/newGen.MP3');
  newUser = loadSound('sounds/newUser.MP3');
  dreaming = loadSound('sounds/dreaming.MP3');
  font = loadFont('Codex-Regular.otf');
  img = loadImage('background-terminal.png');

}

function setup() {
  createCanvas(displayWidth, displayHeight);
  //canvas.parent('canvas-container');

  extraCanvas = createGraphics(80, width/4);
  extraCanvas.background(10);

  //hide cursor from view
  noCursor();
    

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(clientCount);
  
  scan = new scanLine();

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
   
  //display scan animation    
  scan.display();
    
  //console.log(clientCount);
    
  //draw bounding circle    
  noFill();
  stroke(255);
  strokeWeight(1);
  ellipse(width/5, height/2, 200, 200);
    
  //draw dotted circle outline
  push();
      translate(width/5, height/2);
      stroke(255);
      strokeWeight(2);
      noFill();
      for(let a = 0; a < TWO_PI; a+=0.1){
          let r = 110;
          let x = r * cos(a);
          let y = r * sin(a);
          point(x, y);
      }
  pop();
     
  //draw dotted circle outline
  push();
      //translate(width/5, height/2);
      noStroke();
      let circleCol = frameCount*0.01;
      for(let a = 0; a < TWO_PI; a+=0.01){
          fill(127 + 127 * sin(a * 0.4 + circleCol), 127 + 127 * sin(a * 0.1 + circleCol), 127 + 127 * sin(a * 0.01 + circleCol))
          let r = 120;
          let x = r * cos(a * 0.5 + time);
          let y = r * sin(a * 0.5 + time);
          ellipse(width/5 + x, height/2 + y, 3, 3);
      }
  pop();

  
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
    
    
  //create counter - send to server
  counter = frameCount % 240;

  //send counter to server
  socket.emit('timer', counter);    
    
  
  //draw creature name    
  fill(255);
  noStroke();
  textSize(65);
  textAlign(LEFT);
    
  let word = char(num); // select random word
  text(`generation: ${word}`, width/13, height/6);
    
  //draw writing underneath    
  fill(255);
  noStroke();
  textSize(20);
    
  let writing = ['hello, wagsydsa, xbsajxgyag']; // select random word
  text(`${writing}`, width/13, height/4.8);
  
    
  //draw counter rectangles    
  noStroke();
  
  fill(255);
  rect(width/3.3, height/1.08, 500, 20, 20, 20);
    
  fill(255, 0, 255);
  rect(width/3.3, height/1.08, map(counter, 0, 240, 0, 500), 20, 20, 20);
      
  //extablish time variable for shapes    
  time = frameCount*0.015;
    
  //call next gen when counter resets
  if(counter == 0){
      //send fittest array to nextGen
      nextGen();
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

// If the timer resets, evolve next generation
function nextGen() {
  //console.log("new population");
  //saveCanvas('myCanvas', 'png');
  newGenSound.play();
  num++;
  num%85;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);

}