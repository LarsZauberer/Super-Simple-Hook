class GameObject {
    constructor (world, x, y, sx, sy, static=false) {
        this.x = x;
        this.y = y;

        this.size = createVector(sx, sy);
        this.body = Bodies.rectangle(x, y, sx, sy, {isStatic: static});
        World.add(world, this.body)
    }

    update () {
        // GameObject Update
        this.mesh();
    }

    mesh() {
        // Empty Overwrite Function
    }
}