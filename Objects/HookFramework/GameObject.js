class GameObject {
    constructor(world, x, y, sx, sy, staticMesh=false) {
        // Constructor
        // Position
        this.x = x;
        this.y = y;

        // Size
        this.size = createVector(sx, sy);

        // Matter.js Body
        this.body = Bodies.rectangle(x, y, sx, sy, {isStatic: staticMesh});
        World.add(world, this.body)
    }

    update () {
        // GameObject Update
        push();
        this.mesh();
        pop();

        // Change the position to the calculated physics position
        this.x = this.body.position.x
        this.y = this.body.position.y
    }

    mesh() {
        // Empty Overwrite Function
    }
}