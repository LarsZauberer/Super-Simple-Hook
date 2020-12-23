class Camera {
    // Camera Class
    constructor(player) {
        // Constructor
        this.x = 0;
        this.y = 0;
        this.player = player;
    }

    update() {
        // Player is over the half of the screen
        if (this.player.x > width/2 && this.player.x < door.x-width/2+150) {
            this.x = -(this.player.x-width/2);
        }

        if(this.player.y < height/3){
            this.y = -this.player.y + height/3
        }
        // Translate Screen
        translate(this.x, this.y);
    }
}