class UnstaticRect extends GameObject {
    constructor(world, x, y, w, h, restitution) {
        // Unstatic Rectangle
        super(world, x, y, w, h, false);

        // Remove preconstructed Gameobject body
        World.remove(world, this.body)

        // Create new body
        this.body = Bodies.rectangle(x, y, w, h, {
            chamfer: 5
        })
        World.add(world, this.body)

        // Change restitution
        this.body.restitution = restitution

        // Set mass
        Body.setMass(this.body, 3);
        this.body.friction = 0.1;
        this.startPos = createVector(this.x, this.y);
    }


    mesh() {
        // Unstatic rect image
        translate(this.body.position.x, this.body.position.y)
        rotate(degrees(this.body.angle))
        image(unstaticImg, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y)

        // Debug mesh
        if (debug) {
            fill(0, 0, 100)
            rect(0, 0, this.size.x, this.size.y);
        }
    }
}