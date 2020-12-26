class DevObstacle extends Obstacle {
    constructor(world, x, y, sx, sy, st) {
        // Constructor
        super(world, x, y, sx, sy, st);
    }

    mesh() {
        // Mesh of the obstacle
        fill(255, 255, 255);
		rect(this.x, this.y, this.size.x, this.size.y);

        // Setting the ground mesh for the obstacle
        //this.ground.mesh = this.groundMesh; 
    }
}