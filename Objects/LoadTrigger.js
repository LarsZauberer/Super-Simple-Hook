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
                this.nextLoad()
            }
        }
    }


    nextLoad(){
        player.death = true;
        background(0, this.fade)

        if (this.fade < 255) {
            this.fade+=5;

            // Next Level walking
            let rightForce = createVector(0.01 * (height/593), 0);
            Body.applyForce(player.body, player.body.position, rightForce);

            // Animation
            image(playerRight, 0-player.size.x/2,-player.size.y/2, player.size.x+5, player.size.y);

        } else if(!this.load) {
            tileCanvas.background(100);
            levelManager.loaded++;
            levelManager.load();
            window.localStorage.setItem("map", levelManager.loaded);
            this.load = true;
        }
    }
}