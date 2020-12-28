class Door extends GameObject{
    constructor(world, x, y){
        let w = 0.9*width/32
        let h = 5*height/18

        let x1 = x+(width/32)/2;
        let y1 = y+h*1.5

        super(world, x1, y1, w, h, true)

        this.currentPos = 0;
        this.h = h;
        this.w = w;
    }

    mesh(){
        rect(this.body.position.x,this.body.position.y,this.size.x,this.size.y)
        rect(this.x, this.y-this.h*1.5, this.w, 5)
    }

    update(){
      
        let allTriggered;
        for(let i = 0; i < triggers.length; i++){
            if (triggers[i].triggered()) {
                allTriggered = true;
            }
            else {
                allTriggered = false;
                break;
            }
        }
        if(allTriggered){
            this.open();
        }
        else if(this.body.position.y < this.y){
            Body.setPosition(this.body, {x: this.x, y: this.y-this.currentPos})
            this.currentPos-=6;
        }

        this.mesh();


        if(player){
            if(player.hook){
                let collision = Matter.SAT.collides(this.body, player.hook.body);
                if (collision.collided) {
                player.hook.delete(world)
                }
            }
        }
    }
    


    open(){
        if(this.body.position.y > this.y-this.h){
        this.currentPos+=6;
        Body.setPosition(this.body, {x: this.x, y: this.y-this.currentPos})
        }
    }



}