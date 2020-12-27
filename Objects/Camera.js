class Camera {
    // Camera Class
    constructor(player) {
        // Constructor
        this.x = 0;
        this.y = 0;
        this.player = player;

        this.lol = 0
    }

    update() {
        // Player is over the half of the screen
        if (this.player.x > width/2 && this.player.x < door.x-width/2+150) {
            this.x = -(this.player.x-width/2);
        }

        if(this.player.y < 0){
            this.y = -this.player.y + this.lol
            if(this.lol < 100) this.lol +=2
            
        }
        if(this.player.y+this.player.size.y/2 > height){
            this.y = -this.player.y-this.player.size.y/2 + height-this.lol
            if(this.lol < 100) this.lol+= 2
        }
        
           
        // Translate Screen
        translate(this.x, this.y);
    }
}