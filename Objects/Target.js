class Target extends GameObject {
    constructor(world, x, y, w, h, tile) {
        // Position Calculation
        x = x + w / 2;
        y = y + h / 2;

        // Constructor
        super(world, x, y, w, h, true)
        this.tile = tile;
    }

    mesh() {
        // Design of the target
        if (debug) {
            fill(0, 255, 0);
            rect(this.x, this.y, this.size.x, this.size.y);
        }

    }
}