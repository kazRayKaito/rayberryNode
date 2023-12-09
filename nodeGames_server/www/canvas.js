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

const draw=()=>{
    ct.fillStyle = "white";
    ct.beginPath();
    ct.rect(0.5, 0.5, width-1, height-1, 200);
    ct.fill();

    //Cooler or heater
    fillRectR(0,0,3,1,side/3,0.6,cool?"lightblue":"lightgray");
    drawText(2,1,"冷房",side,cool?"blue":"gray");
    drawRectR(0,0,3,1);
    fillRectR(4,0,7,1,side/3,0.6,cool?"lightgray":"pink");
    drawText(6,1,"暖房",side,cool?"gray":"red");
    drawRectR(4,0,7,1);
    
    //Clean Mode
    fillRectR(0,2,7,3,side/3,0.6,clean?"lightgreen":"lightgray");
    drawText(4,3,"内部クリーン "+ (clean?"ON":"OFF"),side*0.7,clean?"black":"gray");
    drawRectR(0,2,7,3);

    //Power Mode
    fillRectR(0,4,7,5,side/3,0.6,power?"lightgreen":"lightgray");
    drawText(4,5,"パワーモード "+ (power?"ON":"OFF"),side*0.7,power?"black":"gray");
    drawRectR(0,4,7,5);
    
    //Temperature
    drawText(1,7,"31℃",side*0.5,color="gray");
    drawText(2.5,12,(16+temp + "℃"),side*0.75,color="black");
    drawText(1,11,"16℃",side*0.5,color="gray");
    fillRectR(2,6.5,2,10.5,side/3,0.6,"red");
    fillRectR(2,6.5,2,5.5+((15-temp)/15*4.5),0,1,"white");
    drawRectR(2,6.5,2,10.5,side/3,0.6,"black");

    //Wind dire and velo
    drawWindDireDisplay();
    drawWindVeloDisplay();

    //Send Signal
    fillRectR(0,13,3,14,side/3,0.6,sendButtonOn?"cyan":"lightgray");
    drawText(2,14,"送信",side*0.7,sendButtonOn?"blue":"gray");
    drawRectR(0,13,3,14);

    //Send Off Signal
    fillRectR(4,13,7,14,side/3,0.6,offButtonOn?"pink":"lightgray");
    drawText(6,14,"停止",side*0.7,offButtonOn?"red":"gray");
    drawRectR(4,13,7,14);
}

const drawWindDireDisplay = () => {
    //Prepare vairables
    let x = Math.floor(width * (7/division));
    let y = Math.floor(width * (7/division));
    let r = Math.floor(width * (1.75/division));
    let thetaI = (0.5/5*(5-dire)+0.5)*Math.PI;
    let thetaL = (0.5/5*(6-dire)+0.5)*Math.PI;
    //Start Stroke
    ct.beginPath();
    ct.fillStyle = "black";
    ct.moveTo(x,y);
    ct.arc(x,y,r,thetaI,thetaL);
    ct.fill();
}

const drawWindVeloDisplay = () => {
    for(let index = 0; index < 4; index++){
        //Prepare vairables
        let xi = Math.floor(width * ((index+4.5)/division) - side*0.4);
        let xl = Math.floor(width * ((index+4.5)/division) + side*0.4);
        let yi_1 = Math.floor(width * ((11-1*(2*xi/width))/division));
        let yi_2 = Math.floor(width * ((11-1*(2*xl/width))/division));
        let yl = Math.floor(width * (11/division));
        //Start Stroke
        ct.beginPath();
        ct.fillStyle = "black";
        ct.moveTo(xi,yi_1);
        ct.lineTo(xl,yi_2);
        ct.lineTo(xl,yl);
        ct.lineTo(xi,yl);
        ct.lineTo(xi,yi_1);
        if(velo >= index + 1){
            ct.fill();
        }else{
            ct.stroke();
        }
    }
}

const drawText = (xi,yi,text,size=side, color="gray", fontFamily="MS Mincho") => {
    //Prepare variables
    let x = Math.floor(width * ((xi)/division));
    let y = Math.floor(width * ((yi)/division));
    //Fill Text
    ct.fillStyle = color;
    ct.font = ""+Math.floor(size*1.2)+"px "+fontFamily;
    ct.textAlign = "center";
    ct.textBaseline = "middle";
    ct.fillText(text,x,y);
}
const fillRectR = (xii,yii,xil,yil,r=side/3,ratio=0.6,color="cyan") => {
    //Prepare variables
    let left__x = Math.floor(width * ((0.5+xii)/division) - side*ratio/2 + r)+0.5;
    let upper_y = Math.floor(width * ((0.5+yii)/division) - side*ratio/2 + r)+0.5;
    let right_x = Math.floor(width * ((0.5+xil)/division) + side*ratio/2 - r)-0.5;
    let lower_y = Math.floor(width * ((0.5+yil)/division) + side*ratio/2 - r)-0.5;
    
    //Start Stroke
    ct.beginPath();
    ct.fillStyle = color;
    ct.arc(left__x,upper_y,r,1.0*Math.PI,1.5*Math.PI);
    ct.arc(right_x,upper_y,r,1.5*Math.PI,2.0*Math.PI);
    ct.arc(right_x,lower_y,r,0.0*Math.PI,0.5*Math.PI);
    ct.arc(left__x,lower_y,r,0.5*Math.PI,1.0*Math.PI);
    ct.arc(left__x,upper_y,r,1.0*Math.PI,1.0*Math.PI);
    ct.fill();
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