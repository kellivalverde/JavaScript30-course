const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // ctx = the context for the canvas

//  vvv handled in css vvv
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let isDrawing = false;
let lastX = 0;
let lastY = 0;


function draw(e){  //e = event
    console.log(e);
}

canvas.addEventListener('mousemove', draw);
