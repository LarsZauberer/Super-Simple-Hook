class Hook {
    constructor(x,y,angle,direction) {
        this.x = x;
        this.y = y;
        this.angle = angle;

        this.startpoint = direction;

        //for collision detection
        this.body = Bodies.circle(this.x, this.y, 10, {isStatic: true});
        

    }

    
    update(player, obstacle){

        if(this.collided(obstacle)){
            this.pullPlayer(player)
        }
        else{
            player.fly = false;
            this.shoot(obstacle); 
        }
      



        this.mesh();
    }

    collided(obstacle){

        for(let i = 0; i<obstacle.length; i++){
            var collision = Matter.SAT.collides(this.body, obstacle[i].body);
            if (collision.collided) {
                return true;  
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
    
    

    
   pullPlayer(player){
    Body.applyForce(player.body, {x: player.x, y: player.y}, {x: cos(this.angle)*0.05, y: sin(this.angle)*0.05}) 
    }
    


    mesh(){
        circle(this.body.position.x,this.body.position.y,20)
			
            line(this.x,this.y, player.body.position.x+this.startpoint, player.body.position.y)
    }


    delete(world)
    {
        World.remove(world, this.body);
    }

	
}