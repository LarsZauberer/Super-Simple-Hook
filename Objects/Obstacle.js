class Obstacle extends GameObject {
	constructor(world, x, y, w, h) {
		super(world, x, y, w, h, true);

		// Create the ground for the object
		let groundpos = y-h/2;
		this.ground = new Ground(world, x, groundpos, w, 10, true);
	}

	update() {
		// Update everything
		super.update();
		this.ground.update();
	}

	mesh() {
		// Draw the Main Obstacle
		fill(255, 255, 255)
		rect(this.x, this.y, this.size.x, this.size.y);
	}
}