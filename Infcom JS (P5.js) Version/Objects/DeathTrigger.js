class DeathTrigger extends GameObject {
    constructor(world, x, y, w, h) {
        x = x + w / 2;
        y = y + h / 2;
        super(world, x, y, w, h, true);

        this.fade = 0;

        this.load = false;
    }

    mesh() {
        if (debug) {
            fill(255, 0, 0);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

        if (player) {
            //kill Player on collision
            if (Matter.SAT.collides(this.body, player.body).collided) {
                player.death = true;
                this.death()
            }
            if (player.hook) {
                //delete Hook on collision
                if (Matter.SAT.collides(this.body, player.hook.body).collided) {
                    player.hook.delete(world);
                }
            }
        }

        for (let i = 0; i < unstatics.length; i++) {
            //reset Position of unstatics on collision
            if (Matter.SAT.collides(this.body, unstatics[i].body).collided) {
                Body.setPosition(unstatics[i].body, unstatics[i].startPos)
            }
        }

    }


    death() {
        //fade background and restart level
        background(0, this.fade)
        if (this.fade < 255) this.fade += 4
        else if(!this.load){

            this.load = true;
            window.localStorage.setItem("map", levelManager.loaded);
            window.localStorage.setItem("reloaded", true);
            window.location.reload();
        }


    }
}