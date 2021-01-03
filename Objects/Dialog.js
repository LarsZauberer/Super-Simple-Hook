class Dialog {
    constructor(text) {
        this.text = text;
        this.frame = 0;
        this.update = true;
        this.changed = millis();
    }

    show() {
        push()
        rectMode(CORNER);
        image(dialogBack, 0, height/8*6, width, height/8*2);
        textSize(50);
        stroke(0)
        fill(0)
        text(this.text[this.frame], width/16*1.5, height/16*13, width/16*13.5, height/16*14);
        if (mouseIsPressed && this.changed+1000 < millis()) {
            this.frame++;
            if (this.frame > this.text.length-1) {
                this.update = false;
            }
            this.changed = millis();
        }
        pop();
    }
}