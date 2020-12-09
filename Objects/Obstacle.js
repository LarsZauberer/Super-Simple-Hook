class Obstacle extends GameObject {
	constructor(world, x, y, w, h) {
		super(world, x, y, w, h, true);
		this.ground = new Ground(world, x, y, w, h);
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