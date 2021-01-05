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
            button.position(width/2-width/8, y);
            button.mousePressed(element.function);
            
            button.style("background-color", "Transparent")
            button.style("border-color", "Transparent")
            button.style("font-size", "25px")
            button.style("color", "Lightgray")
            button.style("width", "20%");
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
            background(this.bg);
        }
        push();

        let y = height/8*3
        for(let i = 0; i < this.buttons.length; i ++){
        image(buttonImg, width/2-width/10, y, width/100*20,50)
        y += height/8
        }
        textSize(50);
        stroke(255);
        fill(255);
        text(this.title, width/2-w, height/4, ws, 50);

        pop();

        
    }
}
// TODO: Pause Button Fix