class Player {
	/* The Complete player object and all it's mechanics
	*/
	constructor(world) {
		/* The constructor of the object
			Attributes:
				world [Matter.World]: The world where the player will be spawned
		*/
		// Creating the body
		this.body = Bodies.rectangle(100, 200, 80, 80);
		World.add(world, this.body)

		// Settings
		// Rotation lock
		Body.setInertia(this.body, Infinity);

		// Friction Settings
		this.body.friction = 0;
		this.body.frictionAir = 0.1;
	}


	update() {
		/* The Loop of the Player Character
		*/
		this.move();
		this.show();
	}


	show() {
		/* Displays the matter.js calculation with p5js
		*/
		// TODO: Create an GameObject Class
		push();
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		rect(0, 0, 80, 80);
		pop();
	}


	move() {
		/* Player Movement Forces
		*/
		// TODO: Self Commenting Code
		// Left
		if (keyIsDown(65)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y,
		}, {
			x: -0.01,
			y: 0,
		});
		// Right
		if (keyIsDown(68)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y,
		}, {
			x: 0.01,
			y: 0,
		});
	}


	jump(ground) {
		/* Jumping Mechanic
		*/
		// TODO: Self Commenting Code
		if (this.canJump(ground)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: 0,
			y: -0.5
		});
	}


    canJump(ground) {
		/* Checks if the player is grounded
		*/
        var collision = Matter.SAT.collides(this.body, ground.body);
		return collision.collided;
    }
}