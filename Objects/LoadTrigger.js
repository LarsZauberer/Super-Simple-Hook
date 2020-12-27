class LoadTrigger extends GameObject {
    constructor(world, x, y, sx, sy) {
        x = x-sx/2;
        y = y-sy/2;

        super(world, x, y, sx, sy, true);

        
    }

    mesh() {
        // Debug Mesh
        if (debug) {
            fill(0, 0, 255, 10);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

        // If Collided with player
        if (Matter.SAT.collides(this.body, player.body).collided) {
            levelManager.loaded++;
            levelManager.load()
        }
    }
}