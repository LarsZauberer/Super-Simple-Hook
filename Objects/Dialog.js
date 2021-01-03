class Dialog {
    constructor(text) {
        this.text = text;
        this.frame = 0;
        this.update = true;
        this.changed = millis();
    }

    show() {
        push()
        image(dialogBack, 0, height/8*6, width, height/8*2);
        textSize(50);
        stroke(0)
        fill(0)
        console.log(this.text[this.frame])
        text(this.text[this.frame], 10, height/8*6+10, width-10, height-10);
        console.log(this.changed)
        console.log(millis())
        if (keyIsPressed && this.changed+1000 < millis()) {
            this.frame++;
            if (this.frame > this.text.length-1) {
                this.update = false;
            }
            this.changed = millis();
        }
        pop();
    }
}