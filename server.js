////////////
// Setup express web server and listen on port 3000
let express = require('express');
let app = express();

//var port = process.env.PORT || 3000;
var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log(`starting server at ${port}`);


app.use(express.static("projector"));
app.use(express.static("public"));


////////////
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

    socket.on('timer', intervalTimer);
    
    function intervalTimer(counter){
        console.log(counter);
        socket.broadcast.emit('timer', counter);
    }
    
    socket.on('fittest', fittestCreature);
    
    function fittestCreature(data){
        console.log(data);
        socket.broadcast.emit('fittest', data)
    }
    
});