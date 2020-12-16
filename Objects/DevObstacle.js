class DevObstacle extends Obstacle {
    constructor(world, x, y, sx, sy, st) {
        // Constructor
        super(world, x, y, sx, sy, st);

        // Target creation
        this.target = new Target(this.world, this.x-this.size.x/2+5, this.y);
    }

    mesh() {
        // Mesh of the obstacle
        fill(255, 255, 255);
		rect(this.x, this.y, this.size.x, this.size.y);

        // Setting the ground mesh for the obstacle
        this.ground.mesh = this.groundMesh;
    }

    groundMesh() {
        // Ground Mesh
        fill(255,0,0);
		rect(this.x, this.y, this.size.x, this.size.y);
    }
}