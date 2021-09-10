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
 var osc;
 let time;
 let spc;
 let words = [];
 let num = 65;
 var img; // Variable for background image
 let noiseIter = 0;
 let angle = 0;
 var newGenSound, newUser, dreaming; // Variables for sound effects
 var clientCount = 0;
 var clientBubble = []; // Array for client bubbles
 let extraCanvas; // Variable for second canvas
 let counter = 0; // Variable for generation counter
 let fit; // Variable for data taken from server
 let timer; // Variable for timer data
 let timerBool = true; // Bool to avoid repeating shapes


 // Establish socket connection
 const socket = io.connect('http://localhost:3000');

 // Get dna array from server
 socket.on('fittest', fittestCreature);

 // Log changes in timer and generation from server
 socket.on('timer', data => {
     timer = data;
 });

 // Retrieve client count from server
 socket.on('count', count => {
     clientCount = count;
 });

 // Retrieve array of fittest creature from server & send to population class
 function fittestCreature(data) {
     fit = data;
     population.receiveFit(fit);
 }


 function preload() {
     // Load sound files, background image and font
     newGenSound = loadSound('sounds/newGen.MP3');
     newUser = loadSound('sounds/newUser.MP3');
     dreaming = loadSound('sounds/dreaming.MP3');
     font = loadFont('Codex-Regular.otf');
     img = loadImage('background-terminal-new.png');
 }

 function setup() {
     // Draw canvas at width and height of display
     createCanvas(displayWidth, displayHeight);

     // Define size of extra canvas - initiate background in setup to enable trail
     extraCanvas = createGraphics(80, width / 4);
     extraCanvas.background(0);

     // Hide cursor from view
     noCursor();

     // Create a population with a target phrase, mutation rate, and population max
     population = new Population(clientCount);

     // Initiate scan line object
     scan = new scanLine();

     // Load custom font    
     textFont(font);

     for (let i = 0; i < clientCount; i++) {
         clientBubble.push(new clientShape()); // Create a new bubble object for every client
     }
 }


 function draw() {
     background(0);

     // Draw background image    
     imageMode(CORNER);
     image(img, 20, 20, width - 50, height - 90);

     // Display the faces
     population.displayFittest();

     // Display scan animation    
     scan.display();

     // Call function for bounding circle of client balls
     boundingCircle();

     // Statements for showing client bubbles on screen    
     if (clientCount < clientBubble.length) {
         clientBubble.splice(0, 1); // Remove oldest element from array if client count decreases by 1
     } else if (clientCount > clientBubble.length) {
         clientBubble.push(new clientShape()); // Add new bubble object if there is a new client
         newUser.play(); // Play sound effect when someone joins the server
     }

     for (let i = 2; i < clientBubble.length; i++) { // Start from 2 to avoid bug where the websites recognise themselves as clients
         clientBubble[i].move();
         clientBubble[i].display();
     }

     // Draw creature name    
     fill(255);
     noStroke();
     textSize(78);
     textAlign(LEFT);

     let word = char(num); // Convert random number into a letter
     text(`generation: ${word}`, width / 13, height / 6.5); // Write the title with a letter that updates every generation

     // Draw writing underneath    
     fill(255);
     noStroke();
     textSize(30);

     let writing = ['hello, wagsydsa, xbsajxgyag']; // Select random word
     text(`${writing}`, width / 13, height / 4.8);

     // Draw counter rectangles      
     noFill();
     stroke(255);
     strokeWeight(2);
     rect(width / 2 - 400 - 1, height / 1.11 - 1, 802, 22, 22, 20);

     // Draw inner rectangle, its width effected by server timer    
     fill(255, 0, 255);
     noStroke();
     rect(width / 2 - 400, height / 1.11, map(timer, 0, 12, 0, 800), 20, 20, 20);

     // Establish time variable for shapes    
     time = frameCount * 0.015;

     // Call next generation when server timer resets    
     if (timer == 0 && timerBool == true) {
         nextGen();
         timerBool = false;
     } else if (timer > 0) {
         timerBool = true;
     }
 }

 function keyPressed() {
     let fs = fullscreen();
     if (keyCode === ENTER) {
         fullscreen(!fs); // Make sketch fullscreen when enter key is pressed
         newGenSound.play(); // Play sound files
         newUser.play();
         dreaming.play();
         dreaming.loop();
     }
 }

 function boundingCircle() {
     // Draw bounding circle    
     noFill();
     stroke(255);
     strokeWeight(1);
     ellipse(width / 5, height / 2, 300, 300);

     // Draw dotted circle outline
     push();
     translate(width / 5, height / 2);
     stroke(255);
     strokeWeight(2);
     noFill();
     for (let a = 0; a < TWO_PI; a += 0.1) {
         let r = 160;
         let x = r * cos(a);
         let y = r * sin(a);
         point(x, y);
     }
     pop();

     // Draw moving circle outline
     noStroke();
     let circleCol = frameCount * 0.01;
     for (let a = 0; a < TWO_PI; a += 0.01) {
         fill(127 + 127 * sin(a * 0.4 + circleCol), 127 + 127 * sin(a * 0.1 + circleCol), 127 + 127 * sin(a * 0.01 + circleCol))
         let r = 170;
         let x = r * cos(a * 0.5 + time);
         let y = r * sin(a * 0.5 + time);
         ellipse(width / 5 + x, height / 2 + y, 3, 3);
     }
 }

 function nextGen() {
     newGenSound.play(); // Play sound effect every time the generation resets
     num = random(65, 80); // Generate new number to change generation letter

     // Take screen grab of canvas, convert to base64 data and send to server
     const img64 = canvas.toDataURL();
     socket.emit('img64', img64);
 }

 function windowResized() {
     resizeCanvas(window.innerWidth, window.innerHeight);
 }