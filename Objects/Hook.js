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
        
            this.pullAngle = atan2 (this.y-player.body.position.y, this.x-player.body.position.x-this.startpoint);
            this.pullPlayer(this.pullAngle)
            player.fly = true
        } 
        else{
            this.shoot(); 
        }
        this.mesh();
    }


    

    collidedAny(collObstacle, returnIt){
      
        for(let i = 0; i < collObstacle.length; i++){
            let collision = Matter.SAT.collides(this.body, collObstacle[i].body);
            if (collision.collided) {
                if(returnIt = null){
                    return true;
                }
                else{
                    return collObstacle[i].body
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
                if(this.hookTwo.collidedAny(unstatics)){
                    this.twoHookPull = true;
                    this.pullObject2 = this.hookTwo.collidedAny(unstatics, "return")
                }
                if(this.hookTwo.collidedAny(targets)){
                    this.twoHookPull = true
                    this.pullObject2 = this.pullObject1;
                    this.pullObject1 = this.hookTwo.collidedAny(targets, "return")
                    this.hook2posX = this.hookTwo.body.position.x - this.pullObject2.position.x;
                    this.hook2posY =  this.hookTwo.body.position.y - this.pullObject2.position.y;


                }  
            }
            else{

                if(!this.pullObject2.isStatic){
                Body.setPosition(this.hookTwo.body, {x: this.pullObject2.position.x + this.hook2posX, y: this.pullObject2.position.y + this.hook2posY});
                }
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