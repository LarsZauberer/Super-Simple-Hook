class UnstaticCircle extends GameObject {
    constructor(world, x, y, r, sy, restitution) {
        //unstatic
        super(world, x, y, r, 5, false);
        World.remove(world, this.body)
        this.body = Bodies.circle(x, y, r)
        World.add(world, this.body)

        this.body.restitution = restitution;

        this.body.friction = 1;


        Body.setMass(this.body, 3);
        this.body.friction = 0.2;
        this.startPos = createVector(this.x, this.y);
    }


    mesh() {

        translate(this.body.position.x, this.body.position.y)
        rotate(degrees(this.body.angle))

        if (debug) {
            fill(0, 0, 100)
            circle(0, 0, this.size.x * 2);
        } else {
            image(circleImg, 0 - this.size.x, 0 - this.size.x, this.size.x * 2, this.size.x * 2)
        }


    }
}