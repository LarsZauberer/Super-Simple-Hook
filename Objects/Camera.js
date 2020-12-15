class Camera {
    // Camera Class
    constructor(player) {
        // Constructor
        this.x = 0;
        this.player = player;
    }

    update() {
        // Player is over the half of the screen
        if (this.player.x > width/2) {
            this.x = -(this.player.x-width/2);
        }
        // Translate Screen
        translate(this.x, 0);
    }
}