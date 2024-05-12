let touching = 0;
let lastMoveTime=0;
let moveIntervalTime = 5;

const initEventlistener = () => {
    window.addEventListener('resize', resize, false);
    canvas.addEventListener('mousedown', touchIn, false);
    canvas.addEventListener('touchstart', touchIn, false);
    canvas.addEventListener('mousemove', moveIn, false);
    canvas.addEventListener('touchmove', moveIn, false);
    canvas.addEventListener('mouseup', releaseIn, false);
    canvas.addEventListener('touchend', releaseIn, false);
}

const touchIn=(event)=>{
    event.preventDefault();
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	//x *= pixelRatio;
	//y *= pixelRatio;
	touchX = x;
	touchY = y;
	touch(x,y);
}
const moveIn=(event)=>{
    event.preventDefault();
	//Check time first
	if(Date.now()-lastMoveTime<moveIntervalTime) return;
	lastMoveTime = Date.now();
	//Get coordinate
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	//x *= pixelRatio;
	//y *= pixelRatio;
	move(x,y);
}
const releaseIn=(event)=>{
    event.preventDefault();
	const rect = event.target.getBoundingClientRect();
	let x = event.pageX-rect.left-document.scrollingElement.scrollLeft;
	let y = event.pageY-rect.top-document.scrollingElement.scrollTop;
	//x *= pixelRatio;
	//y *= pixelRatio;
	release(x,y);
}
const touch = (x,y) => {
    touching = true;
    drawStart(x,y);
}
const move = (x,y) => {
    if(!touching) return;
    drawMove(x,y);
}
const release = (x,y) => {
    touching = false;
    drawEnd(x,y);
    log("pixelRatio:"+pixelRatio);
}

console.log("Loaded: canvas.js");