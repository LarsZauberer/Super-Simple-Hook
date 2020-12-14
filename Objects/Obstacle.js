class Obstacle extends GameObject {
	constructor(world, x, y, w, h, gs=10) {
		// Position Calculation
		x = x+w/2
		y = y+h/2


		super(world, x, y, w, h, true);

		// Create the ground for the object
		this.groundpos = -h/2+gs/2
		this.ground = new Ground(world, x, y+this.groundpos, w-1, gs, true);
	}

	update() {
		// Update everything
		super.update();
		//Ground mit obstacle bewegen?.....
		Body.setPosition(this.ground.body, {x: this.body.position.x, y: this.body.position.y + this.groundpos })
		this.ground.update();
	}

	mesh() {
		// Draw the Main Obstacle
		fill(255, 255, 255)
		rect(this.x, this.y, this.size.x, this.size.y);
	}
	
}