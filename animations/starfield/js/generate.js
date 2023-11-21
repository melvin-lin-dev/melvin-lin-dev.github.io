function generateStar(){
	for(let i = 0; i < 500; i++){
		let starX = random(20, cvs.width/2) * (random(0,1) ? -1 : 1);
		let starY = random(20, cvs.height/2) * (random(0,1) ? -1 : 1);
		let starZ = random(0,cvs.width/1.5);
		stars[i] = new Star(starX, starY, starZ);
	}
}