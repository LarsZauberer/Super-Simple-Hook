class Obstacle extends GameObject {
	constructor(world, x, y, w, h) {
		super(world, x, y, w, h, true);
		this.ground = new Ground(world, x, y-h/2, w, 10, true);
	}

	update() {
		super.update();
		this.ground.update();
	}

	mesh() {
		fill(255, 255, 255)
		rect(this.x, this.y, this.size.x, this.size.y);
	}
}