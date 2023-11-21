class Water{
	constructor(x,y,width, height){
		this.x = x;
		this.y = y;
		this.w = width;
		this.h = height;

		this.drips = [];
	}

	update(){
		this.y += 18;
	}

	draw(){
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = 'rgba(0,40,230,0.8)';
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.closePath();
		ctx.restore();

		this.drips.forEach((drip, index) => {
			drip.draw();
			drip.update();

			if(drip.y + drip.r > cvs.height){
				this.drips.splice(index, 1);
			}
		})
	}

	generateDrips(length){
		for(let i = 0; i < length; i++){
			let hSpeed = random(1,3);
			let vSpeed = -random(2,random(3,8));
			let dir = random(0,2) ? hSpeed : -hSpeed;

			this.drips.push(new Drip(this.x + this.w / 2, this.y + this.h, vSpeed, dir));
		}
	}
}