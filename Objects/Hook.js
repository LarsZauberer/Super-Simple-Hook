class Hook {
    constructor(x,y,angle,direction, player) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.player = player
        this.startpoint = direction;

        this.pullAngle = null;
        this.firstCollision = false;
        this.playerGetsPulled = false

        this.twoHookMode = false;
        this.hookTwo;
        this.twoHookPull = false
        this.getMeshed = true;
        this.pullObject1;
        this.pullObject2;
        this.twoHookPullAngle;

        this.hook2posX = 0;
        this.hook2posY = 0;


        //for collision detection
        this.body = Bodies.circle(this.x, this.y, 5, {isStatic: true});
    }

    
    update(){

        if(this.twoHookMode){
            this.twoHooks();
        }
        else if(this.playerGetsPulled){
            this.pullPlayer(this.pullAngle)
            player.fly = true
        } 
        else{
            this.shoot(); 
        }
        this.mesh();
    }


    collided(obstacle){
        let collision = Matter.SAT.collides(this.body, obstacle);
            if (collision.collided) {
                //first Collision. because pullAngle shouldn't change
                if(this.firstCollision == false){
                    this.pullAngle = atan2 (this.y-player.body.position.y, this.x-player.body.position.x-this.startpoint);
                    this.firstCollision = true;
                }
                return true;
            }
    }

    anyCollision(collObstacle){
        let allBodies = Matter.Composite.allBodies(world);
        for(let i = 0; i < allBodies.length; i++){
            let collision = Matter.SAT.collides(this.body, allBodies[i]);
            if (collision.collided && !this.player.specificCollide(this.player.body, this.body) ) {
                this.pullObject2 = allBodies[i]
                if(collObstacle = null){
                    return true;
                }
                else{
                    return allBodies[i]
                }
            }
        }
    }
    
    


    shoot(){
        this.x += cos(this.angle)*10;
        this.y += sin(this.angle)*10;
        Body.setPosition(this.body, {x: this.x, y: this.y});
    }


    /*
    pullPlayer(player){
        let forceX = player.x += cos(this.angle)*10
        let forceY = player.y += sin(this.angle)*10
        Body.setPosition(player.body, {x: forceX, y: forceY}) 
    }
    */
    
    

    
   pullPlayer(angle){
    Body.applyForce(this.player.body, {x: this.player.x, y: this.player.y}, {x: cos(angle)*0.04, y: sin(angle)*0.04}) 
    }


   
    //twoHook
    twoHooks(){
        if(this.hookTwo){
            if(!this.twoHookPull){
            this.hookTwo.shoot();
                    if(this.hookTwo.anyCollision()){
                        this.twoHookPull = true;
                        //2nd Object settings.
                        this.pullObject2 = this.hookTwo.anyCollision("return Obstacle")
                        if(this.pullObject2.isStatic){
                        this.hook2posX = this.hookTwo.body.position.x - this.pullObject2.position.x;
                        this.hook2posY =  this.hookTwo.body.position.y - this.pullObject2.position.y;
                        }
                    }
            }
            else{
                Body.setPosition(this.hookTwo.body, {x: this.pullObject2.position.x + this.hook2posX, y: this.pullObject2.position.y + this.hook2posY});
                this.twoHookPullAngle = atan2(this.y-this.hookTwo.body.position.y, this.x-this.hookTwo.body.position.x);
                let pDirect = 1;
                if(this.pullObject1.position.y > this.pullObject2.position.y){
                    pDirect = -1;
                }
                Body.applyForce(this.pullObject1, this.pullObject1.position, {x: -cos(this.twoHookPullAngle)*0.02*pDirect, y: -sin(this.twoHookPullAngle)*0.02*pDirect})
                Body.applyForce(this.pullObject2, this.pullObject2.position, {x: cos(this.twoHookPullAngle)*0.02*pDirect, y: sin(this.twoHookPullAngle)*0.02*pDirect})
            }
            this.hookTwo.mesh();
        }
    }


    mesh(){
        circle(this.body.position.x,this.body.position.y,10)
            
        if(this.twoHookMode && this.hookTwo){
            line(this.x,this.y,this.hookTwo.body.position.x,this.hookTwo.body.position.y);
        }
        else if(this.getMeshed == true){
            line(this.body.position.x,this.body.position.y, this.player.body.position.x+this.startpoint, this.player.body.position.y)
        }
    }


    delete(world)
    {
        World.remove(world, this.body)
        this.player.hook = null;
		this.player.fly = false
		Body.setDensity(this.player.body, 0.001)
    }

	
}