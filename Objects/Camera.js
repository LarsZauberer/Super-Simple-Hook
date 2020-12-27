class Camera {
    // Camera Class
    constructor(player) {
        // Constructor
        this.x = 0;
        this.y = 0;
        this.player = player;

        this.smooth = 0
        this.smoothedY = 0
    }

    update() {
        // Player is over the half of the screen
        if (this.player.x > width/2) {
            if(door == null){
                this.x = -(this.player.x-width/2);
            }
            else if(this.player.x < door.x-width/2+150) {
                this.x = -(this.player.x-width/2);
            }
        }

        if(this.player.y-this.player.size.y/2 < 0){
            this.y = -this.player.y+this.player.size.y/2
            if(this.smooth < 200) this.smooth +=4
        }
        else if(this.smooth > 0){
            this.smooth-=3
        }
       

        if(this.player.y+this.player.size.y/2 > height){
            this.y = -this.player.y-this.player.size.y/2 + height
            if(this.smooth > -100) this.smooth-= 2
        }
        else if(this.smooth < 0){
            this.smooth+=3
        }


        
        this.smoothedY = this.y+this.smooth
           
        // Translate Screen
        translate(this.x, this.smoothedY);
    }
}