class LoadTrigger extends GameObject {
    constructor(world, x, y, sx, sy) {
        x = x-sx/2;
        y = y-sy/2;

        super(world, x, y, sx, sy, true);

        this.fade = 0;

        this.load = false;

        
    }

    mesh() {
        // Debug Mesh
        if (debug) {
            fill(0, 0, 255, 10);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

        // If Collided with player
        if(player){
            if (Matter.SAT.collides(this.body, player.body).collided) {
                console.log(11)
                this.nextLoad()
            }
        }
    }


    nextLoad(){
        player.death = true;
        background(0,this.fade)
        if(this.fade < 255) this.fade+=5
        else if(!this.load){
            tileCanvas.background(100);
            levelManager.loaded++;
            levelManager.load();
            window.localStorage.setItem("map", levelManager.loaded);
            this.load = true;
        }
    }
}