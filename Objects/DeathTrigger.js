class DeathTrigger extends GameObject{
    constructor(world, x, y, w, h){
        x = x+w/2;
		y = y+h/2;
        super(world, x, y, w, h, true);

        this.fade = 0;
    }

    mesh(){
        if(debug){
        fill(255,0,0);
        rect(this.x,this.y,this.size.x,this.size.y);
        }


        if(player && !debug){
            if (Matter.SAT.collides(this.body, player.body).collided) {
                player.death = true;
                this.death()
            }
            if(player.hook){
                if (Matter.SAT.collides(this.body, player.hook.body).collided) {
                    player.hook.delete(world);
                }
            }
        }

        for(let i = 0; i < unstatics.length; i++){
            if (Matter.SAT.collides(this.body, unstatics[i].body).collided) {
                Body.setPosition(unstatics[i].body, unstatics[i].startPos)
            }
        }

    }


    death(){
        background(0,this.fade)
        if(this.fade < 255) this.fade+=4
        else{
            tileCanvas.background(100)
            levelManager.load()
        }
        
        
    }
}