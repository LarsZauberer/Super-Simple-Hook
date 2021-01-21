class UnstaticRect extends GameObject {
    constructor(world, x, y, w, h, restitution) {
        //unstatic
        super(world, x, y, w, h, false);

        //readd object with rounded edges
        World.remove(world, this.body)
        this.body = Bodies.rectangle(x, y, w, h, {
            chamfer: 5
        })
        World.add(world, this.body)

        //settings
        this.body.restitution = restitution
        this.body.friction = 0.7;
        Body.setMass(this.body, 3);
        this.body.friction = 0.1;
        this.startPos = createVector(this.x, this.y);
    }


    mesh() {
        translate(this.body.position.x, this.body.position.y)
        rotate(degrees(this.body.angle))
        image(unstaticImg, -this.size.x / 2, -this.size.y / 2, this.size.x, this.size.y)

        if (debug) {
            fill(0, 0, 100)
            rect(0, 0, this.size.x, this.size.y);
        }
    }
}