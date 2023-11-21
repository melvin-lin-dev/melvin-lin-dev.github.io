function updateObjects(){
	rain.forEach((water,index) => {
		water.draw();
		water.update();

		if(water.y + water.h > cvs.height && water.h > 0){
			water.h -= water.y + water.h - (cvs.height);

			water.generateDrips(random(2,5));
		}

		if(water.h <= 0 && !water.drips.length){
			rain.splice(index, 1);
		}
	});
}