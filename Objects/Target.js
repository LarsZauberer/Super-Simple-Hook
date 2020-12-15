class Target extends GameObject {
    constructor(world, x, y) {
        super(world, x, y, 10, 10, true)
        this.canHook = false;
    }

    update() {
        super.update();

        let sideCheck = this.x-10 <= mouseX && this.x <= mouseX+10
        let heightCheck = this.y-10 <= mouseY && this.y <= mouseY+10

        this.canHook = sideCheck && heightCheck;
        console.log(this.canHook)
    }

    mesh() {
        fill(0, 255, 0);
        rect(this.x, this.y, this.size.x, this.size.y);
    }
}