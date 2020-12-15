class Hook {
    constructor(x,y,angle,direction, player) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.player = player
        this.startpoint = direction;

        this.pullAngle = null;
        this.firstCollision = false;


        //for collision detection
        this.body = Bodies.circle(this.x, this.y, 5, {isStatic: true});
        

    }

    
    update(obstacle){

        if(this.collided(obstacle)){
            this.pullPlayer(this.pullAngle)
            player.fly = true

        }
        else{
            this.shoot(obstacle); 
        }
      



        this.mesh();
    }

    collided(obstacle){

        for(let i = 0; i<obstacle.length; i++){
            var collision = Matter.SAT.collides(this.body, obstacle[i].body);
            if (collision.collided) {
                this.player.hookCollision = i;
                //first Collision. because pullAngle shouldn't change
                if(this.firstCollision == false){
                    this.pullAngle = atan2 (this.y-player.body.position.y, this.x-player.body.position.x-this.startpoint);
                    this.firstCollision = true;
                }
                return true 
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
    


    mesh(){
        circle(this.body.position.x,this.body.position.y,10)
			
            line(this.x,this.y, this.player.body.position.x+this.startpoint, this.player.body.position.y)
    }


    delete(world)
    {
        World.remove(world, this.body);
    }

	
}