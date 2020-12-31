class Menu {
    constructor(title, buttons, bg=null) {
        this.title = title;
        this.buttons = buttons;
        this.btns = [];
        this.bg = bg;
    }

    show() {
        let y = height/4
        for (let index = 0; index < this.buttons.length; index++) {
            const element = this.buttons[index];
            let button = createButton(element.label, element.value);
            button.position(width/2, y);
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
        if (this.bg) {
            background(this.bg);
        }
        text(this.title, width/2, height/8, width/2, height/8)
    }
}