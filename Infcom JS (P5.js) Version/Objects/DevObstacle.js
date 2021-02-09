class DevObstacle extends GameObject {
    constructor(world, x, y, sx, sy, tile) {
        // Constructor
        // Position Calculation
		x = x + sx / 2;
        y = y + sy / 2;

        super(world, x, y, sx, sy, true);
        this.tile = tile;
    }

    mesh() {
        // Debug mesh of the obstacle
        if (debug) {
            fill(255, 255, 255);
            rect(this.x, this.y, this.size.x, this.size.y);
        }
    }
}