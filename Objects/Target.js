class Target extends GameObject {
    constructor(world, x, y, w, h, tile) {
        // Position Calculation
		x = x+w/2;
        y = y+h/2;

        // Constructor
        super(world, x, y, w, h, true)
        this.tile = tile;
    }

    mesh() {
        // Design of the target
        try {
            image(targetTiles.tiles[this.tile], this.x, this.y, this.size.x, this.size.y);
        } catch (error) {
            image(targetTiles.tiles[0], this.x, this.y, this.size.x, this.size.y);
        }
    }
}