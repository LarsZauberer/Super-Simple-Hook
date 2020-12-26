class Obstacle extends GameObject {
	constructor(world, x, y, w, h, gs=10) {
		// Position Calculation
		x = x+w/2;
		y = y+h/2;

		super(world, x, y, w, h, true);

		// Create the ground for the object
		let groundpos = y-h/2;

		
	}

	update() {
		// Update everything
		super.update();
	
	}
}