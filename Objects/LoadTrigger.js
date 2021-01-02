class LoadTrigger extends GameObject {
    constructor(world, x, y, sx, sy) {
        x = x-sx/2;
        y = y-sy/2;

        super(world, x, y, sx, sy, true);

        this.fade = 0;

        
    }

    mesh() {
        // Debug Mesh
        if (debug) {
            fill(0, 0, 255, 10);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

        // If Collided with player
        if(player && !debug){
            if (Matter.SAT.collides(this.body, player.body).collided) {
                this.nextLoad()
            }
        }
    }


    nextLoad(){
        player.death = true;
        background(0,this.fade)
        if(this.fade < 255) this.fade+=5
        else{
            tileCanvas.background(100);
            levelManager.loaded++;
            levelManager.load();
            window.localStorage.setItem("map", levelManager.loaded);
        }
    }
}