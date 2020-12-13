class Player extends GameObject{
	/* The Complete player object and all it's mechanics
	*/
	constructor(world, x, y, w, h) {
		/* The constructor of the object
			Attributes:
				world [Matter.World]: The world where the player will be spawned
		*/
		super(world, x, y, w, h, false)

		// Settings
		// Rotation lock
		Body.setInertia(this.body, Infinity);
		this.hookIsShot = false;
		this.hook = null;

		// Friction Settings
		this.body.friction = 0;
		this.body.frictionAir = 0.1;
	}


	update(obstacle) {

		this.x = this.body.position.x;
		this.y = this.body.position.y;

		/* The Loop of the Player Character
		*/
		super.update();
		this.move();

		this.shootHook()
		if (this.hook != null) this.hook.update(this, obstacle);

	}


	mesh() {
		/* Displays the matter.js calculation with p5js
		*/
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		rect(0, 0, 80, 80);
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
	

	shootHook(){
		if (this.hookIsShot){
			let shotAngle = atan2(mouseY-this.body.position.y, mouseX-this.body.position.x);
			this.hook = new Hook(this.body.position.x,this.body.position.y,shotAngle)
		}
		this.hookIsShot = false;
	}
}