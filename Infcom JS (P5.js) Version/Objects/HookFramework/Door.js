class Door extends GameObject {
    constructor(world, x, y) {
        //position calculation
        let w = 1 * width / 32
        let h = 5 * height / 18

        let x1 = x + (width / 32) / 2;
        let y1 = y + h * 1.5

        super(world, x1, y1, w, h, true)

        this.currentPos = 0;
        this.h = h;
        this.w = w;
    }

    mesh() {
        if (debug) {
            fill(255, 0, 255);
            rect(this.body.position.x, this.body.position.y, this.size.x, this.size.y)
            rect(this.x, this.y - this.h * 1.5, this.w, 5)
        } else {
            image(doorImg, this.body.position.x - this.size.x / 2, this.body.position.y - this.size.y / 2 + (height / 593 * 3), this.size.x, this.size.y - (height / 593 * 3))
        }

    }

    update() {

        //Checks if every button is triggered
        let allTriggered;
        for (let i = 0; i < triggers.length; i++) {
            if (triggers[i].triggered()) {
                allTriggered = true;
            } else {
                allTriggered = false;
                break;
            }
        }
        if (allTriggered) {
            this.open();
        } else if (this.body.position.y < this.y) {
            //close Door if it is higher than closed position
            Body.setPosition(this.body, {
                x: this.x,
                y: this.y - this.currentPos
            })
            this.currentPos -= 4;
        }

        this.mesh();


        //delete Hook in case of collision
        if (player) {
            if (player.hook) {
                let collision = Matter.SAT.collides(this.body, player.hook.body);
                if (collision.collided) {
                    player.hook.delete(world)
                }
            }
        }
    }



    open() {
        //open door until max
        if (this.body.position.y > this.y - this.h) {
            this.currentPos += 4;
            Body.setPosition(this.body, {
                x: this.x,
                y: this.y - this.currentPos
            })
        }
    }



}