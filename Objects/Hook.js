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
            let allBodies = Matter.Composite.allBodies(world);
                for(let i = 0; i < allBodies.length; i++){
                    if(this.hookTwo.collided(allBodies[i])){
                        
                        this.pullObject2 = allBodies[i];
                        this.twoHookPull = true;
                    }
                }
            }
            else{
                Body.setPosition(this.hookTwo.body, this.pullObject2.position)
                
                this.twoHookPullAngle = atan2(this.y-this.hookTwo.body.position.y, this.x-this.hookTwo.body.position.x);
                Body.applyForce(this.pullObject1, this.pullObject1.position, {x: -cos(this.twoHookPullAngle)*0.04, y: -sin(this.twoHookPullAngle)*0.04})
                Body.applyForce(this.pullObject2, this.pullObject2.position, {x: cos(this.twoHookPullAngle)*0.02, y: sin(this.twoHookPullAngle)*0.02})
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
        World.remove(world, this.body);
    }

	
}