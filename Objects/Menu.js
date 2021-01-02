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
            button.style("background", "#ccc url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDkaJymmr9v5Vf9JKsIaf2tCnDrgk4OndJw&usqp=CAU') no-repeat top left");
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
            background(this.bg, 200);
        }
        push();
        textSize(50);
        stroke(255);
        fill(255);
        text(this.title, width/2-w, height/4, ws, 50);
        pop();
    }
}