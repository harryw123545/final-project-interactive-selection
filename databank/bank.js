
//establish socket connection
const socket = io.connect('https://codex-live.ngrok.io');

var img;
var raw;

//log changes in timer and generation from server
socket.on('img64', data => {
    raw = data;
    img = createImg(raw, () => {
    img.size(300, AUTO);
    img.style('padding', '15px');
//    /img.position('fixed');
  });
    console.log(raw);
}); 



function setup() {
    
}

