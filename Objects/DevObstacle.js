class DevObstacle extends Obstacle {
    constructor(world, x, y, sx, sy, tile) {
        // Constructor
        super(world, x, y, sx, sy, true);
        this.tile = tile;
    }

    mesh() {
        // Mesh of the obstacle

        if (debug) {
            fill(255, 255, 255);
            rect(this.x, this.y, this.size.x, this.size.y);
        }


        // Setting the ground mesh for the obstacle
        //this.ground.mesh = this.groundMesh; 
    }
}