class Player extends GameObject{
	/* The Complete player object and all it's mechanics
	*/
	constructor(world, x, y, w, h) {
		/* The constructor of the object
			Attributes:
				world [Matter.World]: The world where the player will be spawned
		*/
		super(world, x, y, w, h, false)
		World.remove(world, this.body)
        this.body = Bodies.rectangle(x,y,w,h, {chamfer: 5})
        World.add(world, this.body)
	
		// Settings
		this.world = world;
		

		//foot
		this.foot = Bodies.rectangle(this.x, this.y, this.size.x-1, 10, {isStatic: true});

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
		this.body.frictionAir = 0.1
		this.foot.friction = 0;
		this.foot.frictionAir = 0.1

		// Mass
		Body.setMass(this.body, 4);
		
		Body.setMass(this.foot, 4);

		this.death = false;
	}


	update() {
		
		super.update();
		
		
		if(!this.death){
			this.x = this.body.position.x;
			this.y = this.body.position.y;

			Body.setPosition(this.foot, {x: this.body.position.x, y: this.body.position.y+this.size.y/2-5})
		
			if(!this.fly) this.move();

			//hook mechanics
			this.hookMechanics();
		}
		
		// Mass
		Body.setMass(this.body, 4);
		Body.setMass(this.foot, 4);



	}


	mesh() {
		/* Displays the matter.js calculation with p5js
		*/



		translate(this.body.position.x,this.body.position.y);

		
		if(keyIsDown(65) && !this.death){
			image(playerLeft, -height/100-this.size.x/2,-this.size.y/2, this.size.x+height/100,this.size.y)
		}
		else if(keyIsDown(68) && !this.death){
			image(playerRight, 0-this.size.x/2,-this.size.y/2, this.size.x+height/100,this.size.y)
		}
		else if (!loading){
			image(playerImg, 0-this.size.x/2,-this.size.y/2, this.size.x,this.size.y)
		} else {
			image(playerRight, 0-this.size.x/2,-this.size.y/2, this.size.x+height/100,this.size.y)
		}
	}


	move() {
		/* Player Movement Forces
		*/

		// Left
		let leftForce = createVector(-0.01 * (height/593), 0);
		if (keyIsDown(65)) {
			Body.applyForce(this.body, this.body.position, leftForce);
		}
		// Right
		let rightForce = createVector(0.01 * (height/593), 0);
		if (keyIsDown(68)) {
			Body.applyForce(this.body, this.body.position, rightForce);
		}

		
		
	}


	jump() {
		/* Jumping Mechanic
		*/
		// TODO: Self Commenting Code
		let allBodies = Matter.Composite.allBodies(this.world)
		for (let i = 0; i < allBodies.length; i++) {
			if (this.specificCollide(this.foot, allBodies[i])) {
				Body.applyForce(this.body, {
					x: this.body.position.x,
					y: this.body.position.y
				}, {
					x: 0,
					// 593 because thats the pixel count where it works
					y: -0.38*height/593 +0.05*height/593
				});
				break;
			}
		}
	}

	


	hookMechanics(){
		this.hook = this.shootHook(this.hook)
		if (this.hook != null){
			this.hook.update();
			//hook deleting because distance
			let hookWillDelete = false;
			if (dist(this.hook.x,this.hook.y,this.x,this.y) > height-100 && !this.hook.twoHookMode){
				hookWillDelete = true;
			}
			if(keyIsPressed && key == "c"){
				hookWillDelete = true;
			}
			if(this.hook.playerGetsPulled && !this.hook.twoHookMode && this.specificCollide(this.body, this.hook.body)){
				hookWillDelete = true;
			}

		
			

			if(this.hook.hookTwo){
				if(dist(this.hook.x,this.hook.y,this.hook.hookTwo.body.position.x, this.hook.hookTwo.body.position.y) > height+100) {
					hookWillDelete = true;
				}
				if(this.hook.hookTwo.collidedAny(obstacles) && this.hook.pullObject2 == null){
					hookWillDelete = true;
				}
				if(this.hook.pullObject1 == this.hook.pullObject2 ){
					hookWillDelete = true;
				}
				if(this.hook.pullObject2){
					if(this.hook.pullObject1.isStatic && this.hook.pullObject2.isStatic){
						hookWillDelete = true;
					}
				}
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

					if ((this.specificCollide(this.body, collidedObstacle) ||  this.specificCollide(this.body, this.hook.body)) && !this.hook.hookTwo){
						hookWillDelete = true;
						Body.applyForce(this.body, this.body.position, {x: 0, y: -0.15*(height/593)})
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

			let shotAngle = atan2(mouseY-this.cam.smoothedY-this.body.position.y, mouseX-this.cam.x-(this.body.position.x+this.size.x/2*direction));
			hook = new Hook(this.body.position.x+this.size.x/2*direction,this.body.position.y,shotAngle, this.size.x/2*direction, this)
		}
		this.hookIsShot = false;
		return hook;
	}


	specificCollide(player, body2){
			if(body2 != player && body2 != this.body){
			let collision = Matter.SAT.collides(player, body2);
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