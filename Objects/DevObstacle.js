class DevObstacle extends Obstacle {
    constructor(world, x, y, sx, sy, tile) {
        // Constructor
        super(world, x, y, sx, sy, true);
        this.tile = tile;
    }

    mesh() {
        // Mesh of the obstacle
        try {
            image(obstacleTiles.tiles[this.tile], this.x, this.y, this.size.x, this.size.y);
        } catch (error) {
            image(obstacleTiles.tiles[0], this.x, this.y, this.size.x, this.size.y);
        }
    }
}