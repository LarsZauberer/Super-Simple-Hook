class Grid {
    constructor(sx, sy) {
        this.sx = sx;
        this.sy = sy;

        this.square = windowWidth/this.sy;
    }

    update() {
        push();
        fill(0, 0, 0, 0);
        stroke(0);
        for (let index = 0; index < this.sx; index++) {
            for (let e = 0; e < this.sy; e++) {
                rect(this.square*index, this.square*e, this.square, this.square)
            }
        }
        pop();
    }
}