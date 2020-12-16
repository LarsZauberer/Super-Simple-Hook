class Target extends GameObject {
    constructor(world, x, y) {
        // Constructor
        super(world, x, y, 10, 10, true)
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