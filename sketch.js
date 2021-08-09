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

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCkznCvF3h6e-UxE7OH5u3j6J6OXbBBKGE",
    authDomain: "database-tutorial-codingtrain.firebaseapp.com",
    projectId: "database-tutorial-codingtrain",
    storageBucket: "database-tutorial-codingtrain.appspot.com",
    messagingSenderId: "99303950136",
    appId: "1:99303950136:web:a26fc977d613b6ed57a3cd",
    measurementId: "G-B1G0X6BQSG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
    
  var database = firebase.database();
  var ref = database.ref('fitness');

function preload() {
  font = loadFont('Codex-Regular.otf')
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