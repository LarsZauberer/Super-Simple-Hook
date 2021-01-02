class Menu {
    constructor(title, buttons, bg=null) {
        this.title = title;
        this.buttons = buttons;
        this.btns = [];
        this.bg = bg;
        this.shouldUpdate = false;
    }

    show() {
        let y = height/4
        for (let index = 0; index < this.buttons.length; index++) {
            const element = this.buttons[index];
            let button = createButton(element.label, element.value);
            button.position(width/2-200, y);
            button.mousePressed(element.function);
            this.btns.push(button);
        }
    }

    hide() {
        for (let index = 0; index < this.btns.length; index++) {
            const element = this.btns[index];
            element.remove();
        }
    }

    update() {
        // Background
        pop();
        if (this.bg) {
            background(this.bg);
        }
        push();
        textSize(50);
        stroke(255);
        fill(255);
        text(this.title, width/2-100, height/8, 50, 50);
        pop();
    }
}