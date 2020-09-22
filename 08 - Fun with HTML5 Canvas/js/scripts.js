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
   if (!isDrawing) return; // stops function from running when mouse is not down
    console.log(e);

    ctx.beginPath();

    //start from
    ctx.moveTo(lastX, lastY);
    //got to 
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;

}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', () => isDrawing = true);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseup', () => isDrawing = false);



