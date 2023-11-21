let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let rain = [];

window.onload = () => {
	start();
}

function start(){
	update();
}

function update(){
	ctx.clearRect(0,0,cvs.width,cvs.height);

	generateWater();
	updateObjects();

	requestAnimationFrame(update);
}

function random(min,max){
	return Math.floor(Math.random() * max) + min;
}