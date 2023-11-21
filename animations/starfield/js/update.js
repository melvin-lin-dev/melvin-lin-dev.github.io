function updateObjects(){
	stars.forEach((star, index) => {
		star.draw();
		star.update();
	})
}