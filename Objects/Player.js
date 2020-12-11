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

		this.x = this.body.position.x;
		this.y = this.body.position.y;

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
		translate(this.x, this.y);
		rotate(this.body.angle);
		rect(0, 0, 80, 80);
		pop();
	}


	move() {
		/* Player Movement Forces
		*/
		// TODO: Self Commenting Code
		// Left
		let leftForce = createVector(-0.01,0);
		if (keyIsDown(65)) {
			 Body.applyForce(this.body, {	x: this.body.position.x,	y: this.body.position.y,}, leftForce);
		}	
		// Right
		let rightForce = createVector(0.01,0);
		if (keyIsDown(68)) {
			Body.applyForce(this.body, {x: this.body.position.x,	y: this.body.position.y,}, rightForce);
		}
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
        var collision = Matter.SAT.collides(this.body, ground);
        if (collision.collided) {
            return true;
        }
	}
	

	shootHook(hook)
	{
	let shotAngle = atan2(mouseY-this.body.position.y, mouseX-this.body.position.x);
		hook = new Hook(this.body.position.x,this.body.position.y,shotAngle)
		return hook;
	}
}