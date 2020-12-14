class DevObstacle extends Obstacle {
    mesh() {
        // Mesh of the obstacle
        fill(255, 255, 255)
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