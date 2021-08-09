const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const socket = require('socket.io');


let server = app.listen(port);

console.log(`The server is now running at http://localhost/${port}`);
app.use(express.static("public"));

let io = socket(server);
