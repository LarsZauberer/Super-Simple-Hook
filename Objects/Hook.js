class Hook {
    constructor(x,y,angle,direction, player) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.player = player
        this.startpoint = direction;

        this.pullAngle = null;


        //for collision detection
        this.body = Bodies.circle(this.x, this.y, 10, {isStatic: true});
        

    }

    
    update(obstacle){

        if(this.collided(obstacle)){
            this.pullPlayer()
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
                //pullAngle...
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
    
    

    
   pullPlayer(){
    Body.applyForce(this.player.body, {x: this.player.x, y: this.player.y}, {x: cos(this.angle)*0.04, y: sin(this.angle)*0.04}) 
    }
    


    mesh(){
        circle(this.body.position.x,this.body.position.y,20)
			
            line(this.x,this.y, this.player.body.position.x+this.startpoint, this.player.body.position.y)
    }


    delete(world)
    {
        World.remove(world, this.body);
    }

	
}