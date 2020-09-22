const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d'); // ctx = the context for the canvas

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
ctx.globalCompositeOperation = 'multiply'; // like Photoshop blend modes 

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true; // building up - ascending


function draw(e) { //e = event
    if (!isDrawing) return; // stops function from running when mouse is not down
    console.log(e);
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    // ctx.lineWidth = hue;  -- handled below instead
    ctx.beginPath();
    // start from
    ctx.moveTo(lastX, lastY);
    // go to
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; // new ES6 way to write this

    hue++; // adds 1 to color - changes hue
    if (hue >= 360) {
        hue = 0; // resets hue
    }

    //for every loop, we will increment the line width, but add conditions so it doesn't keep growing infinately
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction; //flip the direction
    }
    if (direction) {
        ctx.lineWidth++; //increment
    } else {
        ctx.lineWidth--; //decrement
    }
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});


canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);