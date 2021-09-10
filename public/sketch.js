 /*
 Codex
 Final Project
 Harry Wakeling
 10/09/21
 */

 /*
 Inspiration:
 https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp09_ga/NOC_9_04_Faces_interactiveselection
 http://www.genarts.com/karl/papers/siggraph91.html
 http://paulbourke.net/geometry/supershape/#2d
 */

 let population;
 let info;
 var osc = 0;
 let time; // Create global variable for use in creature class
 let spc;
 let font;
 let words = [];
 let iter = 2;
 let pw = 2;
 let ph = 3;
 var zoff = 0;
 let timer;
 let timerBool = true;


 // Connect to server
 const socket = io.connect('http://localhost:3000');

 // Log changes in timer and generation from server
 socket.on('timer', data => {
     // Retrieve timer data from server
     timer = data;
 });

 function preload() {
     font = loadFont('Codex-Regular.otf')
 }

 function setup() {
     createCanvas(displayWidth, displayHeight);

     // Change variables if screen is resized
     if (width < height) {
         pw = 3;
         ph = 2;
     }

     let popmax = 9;
     let mutationRate = 0.1 // A pretty high mutation rate here, our population is rather small we need to enforce variety
     // Create a population with a target phrase, mutation rate, and population max
     population = new Population(mutationRate, popmax, pw, ph);

     textFont(font);

 }


 function draw() {
     background(10);
     // Display the creatures
     population.display();
     population.rollover(mouseX, mouseY);
     fill(255);
     textAlign(CENTER);
     textSize(60);

     // Draw counter rectangles      
     noFill();
     stroke(255);
     strokeWeight(2);
     rect(width / 5 - 1, height / 1.4 - 1, width / 1.6 + 2, 22, 37, 20);

     // Inner rectangle effected by timer from server    
     fill(255, 0, 255);
     noStroke();
     rect(width / 5, height / 1.4, map(timer, 0, 12, 0, width / 1.6), 20, 35, 20);

     time = frameCount * 0.015;

     // Call next gen when server timer resets    
     if (timer == 0 && timerBool == true) {
         nextGen();
         timerBool = false;
     } else if (timer > 0) {
         timerBool = true;
     }

 }

 // If the timer resets, evolve next generation
 function nextGen() {
     population.selection();
     population.reproduction();

     // Return fittest array     
     var fittestCreature = population.returnFit();

     // Send fittest array to server
     socket.emit('fittest', fittestCreature);

 }

 function windowResized() {
     resizeCanvas(displayWidth, displayHeight);
 }

 /* prevents the mobile browser from processing some default
  * touch events, like swiping left for "back" or scrolling
  * the page.
  */
 function touchStarted() {
     return false;
 }

 function touchMoved() {
     return false;
 }

 function touchEnded() {
     return false;
 }