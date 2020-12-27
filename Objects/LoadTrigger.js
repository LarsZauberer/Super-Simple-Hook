class LoadTrigger extends GameObject {
    constructor(world, x, y, sx, sy, nextLevel) {
        x = x-sx/2;
        y = y-sy/2;

        super(world, x, y, sx, sy, true);

        this.nextLevel = nextLevel;
    }

    mesh() {
        // Debug Mesh
        if (debug) {
            fill(0, 0, 255, 10);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

        // If Collided with player
        if (Matter.SAT.collides(this.body, player.body).collided) {
            if (this.nextLevel) {
                levelManager.loaded++;
            }
            levelManager.load()
        }
    }
}