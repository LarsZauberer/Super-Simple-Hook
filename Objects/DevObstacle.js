class DevObstacle extends Obstacle {
    constructor(world, x, y, sx, sy, st, tile) {
        // Constructor
        super(world, x, y, sx, sy, st);
        this.tile = tile;
    }

    mesh() {
        // Mesh of the obstacle
        image(obstacleTiles.tiles[this.tile], this.x, this.y, this.size.x, this.size.y);
    }
}