////////////
// Setup express web server and listen on port 3000
let express = require('express');
let app = express();
let server = app.listen(80);

console.log('The server is now running at http://localhost/');
app.use(express.static("projector"));
app.use(express.static("public"));


////////////
// Start socket.io
let socket = require('socket.io');

// Connect it to the web server
let io = socket(server);

//countdown variable
var countdown = 0;
var generation = 0;

io.sockets.on('connection', (socket) => {
    console.log('new connection: ' + socket.id);
       
    //log client count
    io.emit('count', io.engine.clientsCount);
    console.log("clients: " + io.engine.clientsCount);
    
    //log when a user disconnects
    socket.on("disconnect", () => {
        io.emit('count', io.engine.clientsCount);
        console.log("a user has disconnected")
    });
    
    setInterval(timeIt, 200)
    
    function timeIt() {
      countdown++
    
      if(countdown == 360){
          countdown = 0
          generation+=1
      }
        //console.log(countdown)
      io.sockets.emit('timer', { countdown: countdown, generation: generation });
    }
    
});