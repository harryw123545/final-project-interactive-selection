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


app.use(express.static("projector"));
app.use(express.static("public"));
app.use(express.static("databank"));


// Start socket.io
let socket = require('socket.io');

// Connect it to the web server
let io = socket(server);

//countdown variable
var countdown = 0;
var mod 
var generation = 0;


io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);
       
    //log client count
    io.emit('count', io.engine.clientsCount);
    console.log("clients: " + io.engine.clientsCount);
    
    //log when a user disconnects
    socket.on("disconnect", () => {
        io.emit('count', io.engine.clientsCount);
        console.log("a user has disconnected");
    });
    
    
    socket.on('fittest', (data) => {
        io.emit('fittest', data);
    });
    
    socket.on('img64', (data) => {
        io.emit('img64', data);
    });

    
});

setInterval(() => {
        countdown++;
        
        let interTimer = countdown % 13;
    
        if(interTimer == 0){
        }
    
        io.emit('timer', interTimer);
    }, 1000);
