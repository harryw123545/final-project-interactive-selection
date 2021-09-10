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

 // Setup express web server and listen on port 3000
 let express = require('express');
 let app = express();
 var port = 3000;
 var server = app.listen(port);
 console.log(`starting server at ${port}`);

 // Link to each folder of the project
 app.use(express.static("projector"));
 app.use(express.static("public"));
 app.use(express.static("databank"));


 // Start socket.io
 let socket = require('socket.io');

 // Connect it to the web server
 let io = socket(server);

 // Countdown variable
 var countdown = 0;


 io.sockets.on('connection', (socket) => {
     console.log('new connection: ' + socket.id);

     // Log client count
     io.emit('count', io.engine.clientsCount);
     console.log("clients: " + io.engine.clientsCount);

     // Log when a user disconnects
     socket.on("disconnect", () => {
         io.emit('count', io.engine.clientsCount);
         console.log("a user has disconnected");
     });

     // Emit array of fittest creature
     socket.on('fittest', (data) => {
         io.emit('fittest', data);
     });

     // Emit base 64 data of canvas screenshot
     socket.on('img64', (data) => {
         io.emit('img64', data);
     });


 });

// Run function every second
 setInterval(() => {
     countdown++;

     // Reset counter after 13 seconds
     let interTimer = countdown % 13;

     // Emit timer data
     io.emit('timer', interTimer);
 }, 1000);