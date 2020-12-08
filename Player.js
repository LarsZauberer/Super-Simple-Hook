class Player {
	constructor(world) {
		this.body = Bodies.rectangle(100, 200, 80, 80);
		World.add(world, this.body)

		Body.setInertia(this.body, Infinity);

		this.body.friction = 0;
		this.body.frictionAir = 0.1;
	}


	update() {
		this.move();
		this.show();
	}


	show() {
		push();
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle)
		rect(0, 0, 80, 80);
		pop();
	}



	move() {
		if (keyIsDown(65)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: -0.01,
			y: 0
		});
		if (keyIsDown(68)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: 0.01,
			y: 0
		});
	}



	jump(ground) {
		
		if (this.canJump(ground)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: 0,
			y: -0.5
		});
	}
	

canJump(ground) {
	var collision = Matter.SAT.collides(this.body, ground.body);
	if (collision.collided) {
		return true;
		
	}
}
	

}