const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var socket = require('socket.io');


let server = app.listen(port);

console.log(`The server is now running at http://localhost/${port}`);
app.use(express.static("public"));

var io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket){
    console.log(socket)
}


//let counter = frameCount % 360;
//
//if(counter == 0){
//      console.log("counter reset");
//  }
