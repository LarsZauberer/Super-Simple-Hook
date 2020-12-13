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
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.world = world;

		// hook mechanics setting
		this.hookIsShot = false;
		this.hook = null;
		this.fly = false
		this.hookCollision = null;

		// Rotation lock
		Body.setInertia(this.body, Infinity);

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

		if(!this.fly) this.move();

		//hook mechanics
		this.hookMechanics(obstacle);


	}


	mesh() {
		/* Displays the matter.js calculation with p5js
		*/
		translate(this.body.position.x, this.body.position.y);
		rotate(this.body.angle);
		rect(0, 0,this.w, this.h);
	}


	move() {
		/* Player Movement Forces
		*/
		// TODO: Self Commenting Code
		// Left
		let leftForce = createVector(-0.01,0);
		if (keyIsDown(65)) {
			 Body.applyForce(this.body, this.body.position, leftForce);
		}	
		// Right
		let rightForce = createVector(0.01,0);
		if (keyIsDown(68)) {
			Body.applyForce(this.body, this.body.position, rightForce);
		}
	}


	jump(ground) {
		/* Jumping Mechanic
		*/
		// TODO: Self Commenting Code
		if (this.specificCollide(ground)) Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: 0,
			y: -0.4
		});
	}


   
	

	hookMechanics(obstacle){
		this.shootHook()
		if (this.hook != null){ 
			this.hook.update(obstacle);
			//hook deleting because distance
			let hookWillDelete = false;
			if (dist(this.hook.x,this.hook.y,this.x,this.y) > 400){ 
				hookWillDelete = true;
			}
			
			
			if(this.hook.collided(obstacle)){
				if (this.specificCollide(obstacle[this.hookCollision])){
				hookWillDelete = true;
				Body.applyForce(this.body, this.body.position, {x: 0, y: -0.2})
				}
			}
			
			if(hookWillDelete){
				this.hook.delete(this.world)
				this.hook = null;
				this.fly = false
				Body.setDensity(this.body, 0.001)
			} 

		}  
	}



	shootHook(){
		if (this.hookIsShot){
			let shotAngle = atan2(mouseY-this.body.position.y, mouseX-this.body.position.x);
			let direction = -1;
			if(mouseX > this.body.position.x){direction = 1}
			this.hook = new Hook(this.body.position.x+this.w/2*direction,this.body.position.y,shotAngle, this.w/2*direction, this)
		}
		this.hookIsShot = false;
	}


	specificCollide(obstacle){
		var collision = Matter.SAT.collides(this.body, obstacle.body);
            if (collision.collided) {
                return true;  
            }
	}

	



	

}