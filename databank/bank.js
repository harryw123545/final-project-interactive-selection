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

const socket = io.connect('http://localhost:3000'); // Establish socket connection

var img;
var raw;

//log changes in timer and generation from server
socket.on('img64', data => {
    // Retrieve base64 data from the server and convert into an image
    raw = data;
    img = createImg(raw, () => {
    img.size(400, AUTO); // Resize each image to 400 px wide
    img.style('padding', '15px');
    window.scrollTo(0,document.body.scrollHeight); // Auto scroll to the bottom of the page
  });
}); 


function setup() {
    
}

