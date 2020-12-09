class Obstacle extends GameObject {
	constructor(world, x, y, w, h) {
		super(world, x, y, w, h);
		this.ground = new Ground(this.x,this.y,this.w, this.h, world);
	}

	update() {
		// super.update();
		this.ground.update();
	}

	mesh() {
		rect(this.x, this.y, this.w, this.h);
	}
}