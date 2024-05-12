let pixelRatio;
let width;
let height;
let LineWidthThin;
let LineWidthThick;
let ct;
let canvasScale;
let division = 16;
let side;

const initCanvas = () => {
    ct = canvas.getContext("2d");
    resize();
}
const resize = () => {
    //Get window rect and resolution
    rect = canvas.getBoundingClientRect();
    pixelRatio = window.devicePixelRatio;
    
    //Set canvas width and height
    canvas.width = Math.floor(window.innerWidth * 0.9);
    if(Math.floor(window.innerWidth)>520)   canvas.width = 520;
    if(Math.floor(window.innerWidth)<320)   canvas.width = 320;
    canvas.height = canvas.width;
    canvas.style.width  = canvas.width +"px";    
    canvas.style.height = canvas.width +"px";
    canvas.width  *= pixelRatio;
    canvas.height *= pixelRatio;
    width  = canvas.width;
    height = canvas.width;
    
    //Define thickness
    LineWidthThin = Math.ceil(width/500);
    LineWidthThick = Math.ceil(width/150);

    //Define side
    side = Math.floor(width/division);

    draw();
}

const addline = (xyData) => {
    ct.strokeStyle = "blue";
    ct.lineWidth = LineWidthThin;
    ct.beginPath();
    ct.moveTo(xyData.oldXY.x*pixelRatio,xyData.oldXY.y*pixelRatio);
    ct.lineTo(xyData.newXY.x*pixelRatio,xyData.newXY.y*pixelRatio);
    ct.stroke();
}

const draw=()=>{
    ct.fillStyle = "white";
    ct.beginPath();
    ct.rect(0.5, 0.5, width-1, height-1, 200);
    ct.fill();
    
    //Box
    drawRectR(0,0,15,15,side/8,0.8,"gray");
}

const drawRectR = (xii,yii,xil,yil,r=side/3,ratio=0.6,color="black") => {
    //Prepare variables
    let left__x = Math.floor(width * ((0.5+xii)/division) - side*ratio/2 + r)+0.5;
    let upper_y = Math.floor(width * ((0.5+yii)/division) - side*ratio/2 + r)+0.5;
    let right_x = Math.floor(width * ((0.5+xil)/division) + side*ratio/2 - r)-0.5;
    let lower_y = Math.floor(width * ((0.5+yil)/division) + side*ratio/2 - r)-0.5;
    
    //Start Stroke
    ct.beginPath();
    ct.strokeStyle = color;
    ct.arc(left__x,upper_y,r,1.0*Math.PI,1.5*Math.PI);
    ct.arc(right_x,upper_y,r,1.5*Math.PI,2.0*Math.PI);
    ct.arc(right_x,lower_y,r,0.0*Math.PI,0.5*Math.PI);
    ct.arc(left__x,lower_y,r,0.5*Math.PI,1.0*Math.PI);
    ct.arc(left__x,upper_y,r,1.0*Math.PI,1.0*Math.PI);
    ct.stroke();
}

console.log("Loaded: canvas.js");