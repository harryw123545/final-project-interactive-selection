// Setup express web server and listen on port 3000
let express = require('express');
let app = express();

var port = 3000;
//var port = process.env.PORT || 3000;
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
        console.log(data);
        io.emit('fittest', data);
    });
    
    socket.on('img64', (data) => {
        //console.log(data);
        io.emit('img64', data);
    });
    
    socket.on('selection', (data) => {
        console.log(data);
        io.emit('selection', data);
    });

    
});

setInterval(() => {
        countdown++;
        
        let interTimer = countdown % 13;
        //console.log(interTimer);
    
        if(interTimer == 0){
            //console.log('countdown reset');
        }
    
    
        io.emit('timer', interTimer);
        //console.log(countdown)
    }, 1000);
