class Drip{
	constructor(x, y, vSpeed, dir){
		this.x = x;
		this.y = y;
		this.r = 1;
		this.dir = dir;

		this.verticalSpeed = vSpeed;
	}

	update(){
		this.verticalSpeed += 0.4;

		this.x += this.dir;
		this.y += this.verticalSpeed;
	}

	draw(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0,40,230,0.8)';
		ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
		ctx.fill();
		ctx.closePath();
		ctx.restore();
	}
}