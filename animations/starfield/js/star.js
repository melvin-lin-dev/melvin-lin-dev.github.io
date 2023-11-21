class Star{
	constructor(x,y,z){
		this.x = x;
		this.y = y;
		this.z = z;

		this.lastZ = z + 1;
	}

	update(){
		this.lastZ = this.z;
		this.z -= 30;

		if(this.z < 1){
			this.x = random(20, cvs.width/2) * (random(0,1) ? -1 : 1);
			this.y = random(20, cvs.height/2) * (random(0,1) ? -1 : 1);
			this.z = cvs.width/1.5;
			this.lastZ = this.z + 1;
		}
	}

	draw(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'white';

		let lastX = this.x / this.lastZ * cvs.width / 3;
		let lastY = this.y / this.lastZ * cvs.height / 1.5;

		let x = this.x / this.z * cvs.width / 3;
		let y = this.y / this.z * cvs.height / 1.5;

		ctx.arc(x,y,2,0,2*Math.PI);
		ctx.fill();

		ctx.strokeStyle = 'white';
		ctx.moveTo(lastX,lastY);
		ctx.lineTo(x,y);
		ctx.stroke();

		ctx.closePath();
		ctx.restore();
	}
}