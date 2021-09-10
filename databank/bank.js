
//establish socket connection
const socket = io.connect('http://localhost:3000');

var img;
var raw;

//log changes in timer and generation from server
socket.on('img64', data => {
    raw = data;
    img = createImg(raw, () => {
    img.size(400, AUTO);
    img.style('padding', '15px');
    window.scrollTo(0,document.body.scrollHeight);
  });
}); 


function setup() {
    
}

