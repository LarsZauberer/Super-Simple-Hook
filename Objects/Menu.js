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
            button.position(width/2-width/10, y);
            button.mousePressed(element.function);
            
            button.style("background-color", "Transparent")
            button.style("border-color", "Transparent")
            let fontPercent = 150 * height/593
            fontPercent.toString();
            button.style("font-size", fontPercent + "%")
            button.style("color", "Lightgray")
            let bwPercent = width/windowWidth*20
            bwPercent.toString();
            button.style("width", bwPercent + "%");
            button.style("height", "9%");
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

    update() {
        // Background
        pop();
        if (this.bg) {
            background(this.bg);
        }
        push();
        //Buttons
        let y = height/8*3
        for(let i = 0; i < this.buttons.length; i ++){
        
        image(buttonImg, width/2-width/10, y, width/100*20,height/100*9)
        y += height/8
        }
        //Title
        let sText = 50 * height/593
        let titlebounds = font.textBounds(this.title, width/2, height/4, sText)
        rectMode(CORNERS)
        textSize(sText);
        noStroke();
        fill(255);
        textFont(font)
        text(this.title, width/2-titlebounds.w/2, height/4-titlebounds.h/2, titlebounds.w*2, 100);
        pop();

        

        
    }
}
