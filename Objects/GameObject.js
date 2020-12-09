class GameObject {
    constructor(world, x, y, sx, sy, staticMesh=false) {
        this.x = x;
        this.y = y;

        this.size = createVector(sx, sy);
        this.body = Bodies.rectangle(x, y, sx, sy, {isStatic: staticMesh});
        World.add(world, this.body)
    }

    update () {
        // GameObject Update
        push();
        this.mesh();
        pop();
    }

    mesh() {
        // Empty Overwrite Function
    }
}