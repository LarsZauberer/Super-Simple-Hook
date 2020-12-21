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
		this.world = world;

		//foot
		this.foot = Bodies.rectangle(this.x, this.y, 59,10, {isStatic: true});

		//cam
		this.cam = null;

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


	update() {
		this.x = this.body.position.x;
		this.y = this.body.position.y;


		/* The Loop of the Player Character
		*/

		Body.setPosition(this.foot, {x: this.body.position.x, y: this.body.position.y+this.size.y/2-5})
		
		super.update();

		if(!this.fly) this.move();

		//hook mechanics
		this.hookMechanics();

		


	}


	mesh() {
		/* Displays the matter.js calculation with p5js
		*/
		translate(this.body.position.x,this.body.position.y);
		rotate(this.body.angle);
		rect(0, 0,this.size.x, this.size.y);

		fill(255,0,0)
		rect(0, this.size.y/2-5, 60, 10)
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


	jump(obstacle) {
		/* Jumping Mechanic
		*/
		// TODO: Self Commenting Code
		if (this.specificCollide(this.foot, obstacle)) {
		
		Body.applyForce(this.body, {
			x: this.body.position.x,
			y: this.body.position.y
		}, {
			x: 0,
			y: -0.4
		});
		}
	}


	hookMechanics(){
		this.hook = this.shootHook(this.hook)
		if (this.hook != null){
			this.hook.update();
			//hook deleting because distance
			let hookWillDelete = false;
			if (dist(this.hook.x,this.hook.y,this.x,this.y) > 400){
				hookWillDelete = true;
			}
			if(this.hook.hookTwo){
				if(dist(this.hook.x,this.hook.y,this.hook.hookTwo.body.position.x, this.hook.hookTwo.body.position.y) > 500) {
				hookWillDelete = true;
				}
			}
			if(keyIsPressed && key == "c"){
				hookWillDelete = true;
			}


				//pullplayer
				if((this.hook.collidedAny(targets) || this.hook.collidedAny(unstatics)) && !mouseIsPressed){
				this.hook.playerGetsPulled = true;
					let collidedObstacle
					if(this.hook.collidedAny(targets)){
						collidedObstacle = this.hook.collidedAny(targets, "return")
					}
					else{
						collidedObstacle = this.hook.collidedAny(unstatics, "return")
					}
					this.hook.pullAngle = atan2(this.hook.y-this.y, this.hook.x,this.x )

					if (this.specificCollide(this.body, collidedObstacle)){
						hookWillDelete = true;
						Body.applyForce(this.body, this.body.position, {x: 0, y: -0.2})
					}
				}
				//pullObstacles
				else if(this.hook.collidedAny(targets)  && mouseIsPressed){
					this.hook.pullObject1 = this.hook.collidedAny(targets, "return")
					this.hook.twoHookMode = true
				}
				else if(this.hook.collidedAny(unstatics)  && mouseIsPressed){
					this.hook.pullObject1 = this.hook.collidedAny(unstatics, "return")
					this.hook.twoHookMode = true
				}
				else if(this.hook.collidedAny(obstacles)){
					hookWillDelete = true;
				}
			
		
			if(hookWillDelete){	
				this.hook.delete(this.world)
			}

		}
	}



	shootHook(hook){
		if (this.hookIsShot) {
			let direction = -1;
			if(mouseX-this.cam.x > this.body.position.x) {direction = 1}

			let shotAngle = atan2(mouseY-this.body.position.y, mouseX+(-this.cam.x)-(this.body.position.x+this.size.x/2*direction));
			hook = new Hook(this.body.position.x+this.size.x/2*direction,this.body.position.y,shotAngle, this.size.x/2*direction, this)
		}
		this.hookIsShot = false;
		return hook;
	}


	specificCollide(player, body2){
			if(body2 != player && body2 != this.body){
			var collision = Matter.SAT.collides(player, body2);
            if (collision.collided) {
                return true;
			} 
		}	
	}



	camera()	{
		if(this.cam == null){
		this.cam = new Camera(this)
		}
		else{	
			this.cam.update();
		}
		

	}
}