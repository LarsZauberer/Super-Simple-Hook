class Obstacle extends GameObject {
	constructor(world, x, y, w, h, gs=10) {
		// Position Calculation
		x = x+w/2;
		y = y+h/2;

		super(world, x, y, w, h, true);

		// Create the ground for the object
		let groundpos = y-h/2;
		//this.ground = new Ground(world, x, groundpos+gs/2, w-1, gs, true);
		this.target;

		// Difference Calculation Variables for the Editor
		this.diffCalc = false;
		this.diff;
	}

	update() {
		// Update everything
		super.update();
		//this.ground.update();
		if (this.target) {
			this.target.update();
		}
		// Difference Calculation for the Editor
		if (this.diffCalc == false && this.target) {
			this.diff = createVector(-(this.x-this.target.x), -(this.y-this.target.y));
			this.diffCalc = true;
		}
	}
}