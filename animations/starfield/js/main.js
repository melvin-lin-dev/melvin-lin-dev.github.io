let cvs = document.querySelector('canvas');
let ctx = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

let stars = [];

let speed;

window.onload = () => {
	start();
}

function start(){
	generateStar();
	update();
}

function update(){
	ctx.clearRect(0,0,cvs.width,cvs.height);

	ctx.save();
	ctx.translate(cvs.width / 2, cvs.height / 2);
	updateObjects();
	ctx.restore();

	requestAnimationFrame(update);
}

function random(min, max){
	return Math.floor(Math.random() * (max + 1)) + min;
}