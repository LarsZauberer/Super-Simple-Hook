class Grid {
    constructor(square) {
        this.square = square;
        this.sx = windowWidth/this.square;
        this.sy = windowHeight/this.square;
    }

    update() {
        push();
        rectMode(CORNER);
        fill(0, 0, 0, 0);
        stroke(0);
        for (let index = 0; index < this.sx; index++) {
            for (let e = 0; e < this.sy; e++) {
                rect(this.square*index, this.square*e, this.square, this.square);
            }
        }
        pop();
    }
}