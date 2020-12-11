class Obstacle extends GameObject {
	constructor(world, x, y, w, h) {
		super(world, x+w/2, y+h/2, w, h, true);
		this.ground = new Ground(world, this.x, this.y- h/2 + 5, this.size.x-5, 10, true);
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