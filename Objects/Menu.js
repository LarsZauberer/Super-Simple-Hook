class Menu {
    constructor(title, buttons, bg=null) {
        this.title = title;
        this.buttons = buttons;
        this.btns = [];
        this.bg = bg;
        this.shouldUpdate = false;
    }

    show() {
        let y = height/8*3
        for (let index = 0; index < this.buttons.length; index++) {
            const element = this.buttons[index];
            let button = createButton(element.label, element.value);
            button.position(width/2-200, y);
            button.mousePressed(element.function);
            button.style("background", "#ccc url('Assets/UI/Button.png') no-repeat top left");
            button.style("background-color", "Transparent")
            button.style("border-color", "Transparent")
            button.style("font-size", "25px")
            button.style("width", "200px");
            button.style("height", "50px");
            this.btns.push(button);
            y += height/8;
        }
    }

    hide() {
        for (let index = 0; index < this.btns.length; index++) {
            const element = this.btns[index];
            element.remove();
        }
    }

    update(w, ws) {
        // Background
        pop();
        if (this.bg) {
            background(this.bg, 50);
        }
        push();
        textSize(50);
        stroke(255);
        fill(255);
        text(this.title, width/2-w, height/4, ws, 50);
        pop();
    }
}
// TODO: Pause Button Fix