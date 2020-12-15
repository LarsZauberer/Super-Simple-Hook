class Target extends GameObject {
    constructor(world, x, y) {
        // Constructor
        super(world, x, y, 10, 10, true)
        this.canHook = false;
    }

    update() {
        super.update();

        // Checking Mouse is in range
        let sideCheck = this.x-50 <= mouseX+(-cam.x) && mouseX+(-cam.x) <= this.x+50
        let heightCheck = this.y-50 <= mouseY && mouseY <= this.y+50

        // CanHook?
        this.canHook = sideCheck && heightCheck;
    }

    mesh() {
        // Design of the target
        fill(0, 255, 0);
        rect(this.x, this.y, this.size.x, this.size.y);
    }
}