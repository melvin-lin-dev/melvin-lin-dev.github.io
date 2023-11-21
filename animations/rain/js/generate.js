function generateWater(){
	let generateSpeed = 3;

	for(let i = 0; i < generateSpeed;i++){
		let w = random(2, 5);
		let h = random(25, 50);
		let x = random(-3, cvs.width - w / 2);
		let y = -h;

		rain.push(new Water(x,y,w,h));
	}
}