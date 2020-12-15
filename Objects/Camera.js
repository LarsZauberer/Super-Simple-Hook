class Camera {
    constructor(player) {
        this.x = 0;
        this.player = player;
    }

    update() {
        if (this.player.x > width/2) {
            this.x = -(this.player.x-width/2);
        }
        translate(this.x, 0);
    }
}