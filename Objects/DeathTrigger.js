class DeathTrigger extends GameObject{
    constructor(world, x, y, w, h){
        x = x+w/2;
		y = y+h/2;
        super(world, x, y, w, h, true);

        this.fade = 0;
    }

    mesh(){
        fill(255,0,0);
        rect(this.x,this.y,this.size.x,this.size.y);


        if(player){
            if (Matter.SAT.collides(this.body, player.body).collided) {
                player.death = true;
                this.death()
            }
        }
    }


    death(){
        background(0,this.fade)
        if(this.fade < 255) this.fade+=5
        else{
            levelManager.load()
            this.fade = 0;
        }
        
        
    }
}