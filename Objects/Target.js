class Target extends GameObject {
    constructor(world, x, y, w, h) {
        // Position Calculation
		x = x+w/2;
        y = y+h/2;

        // Constructor
        super(world, x, y, w, h, true)
    }

    update() {
        super.update();
    }

    mesh() {
        // Design of the target
        fill(0, 255, 0);
        rect(this.x, this.y, this.size.x, this.size.y);
    }
}