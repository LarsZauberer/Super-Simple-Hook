function loc(ele, posX, posY) {
    // Change Location

    // Update Visuals
    // Target Update
    try {
        Body.setPosition(ele.target.body, {"x": posX+ele.diff.x, "y": posY+ele.diff.y})
    } catch (error) {
        
    }

    // Obstacle
    Body.setPosition(ele.body, {"x": posX, "y": posY})

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if ((100/windowWidth*ele.x)-(100/windowWidth*ele.size.x)/2) {
            mapData.mapData[index] = {"x": 100/windowWidth*posX, "y": 50/windowHeight*posY, "sx": element.sx, "sy": element.sy, "id": element.id}
        }
    }
}

function scaleObj(ele, id, trans) {
    // Change Scaling

    // Change Visuals
    // TODO: Target Update

    ele.size.x = trans.x
    ele.size.y = trans.y

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if (element.id == id && 100/windowWidth*ele.x == element.x && 100/windowHeight*ele.y == element.y) {
            mapData.mapData[index] = {"x": ele.x, "y": ele.y, "sx": 100/windowWidth*trans.x, "sy": 50/windowHeight*trans.y, "id": id}
        }
    }
}

function delFromMap(ele, id) {
    // Delete Objects

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if (element.id == id && 100/windowWidth*ele.x == element.x && 100/windowHeight*ele.y == element.y) {
            mapData.mapData.splice(index, 1);
        }
    }
}

class Menu {
    constructor(){
        this.btns = [];
    }

    generate() {
        // Generates the Menu

        // Position of the Buttons
        let x = 10
        let y = 10

        // Button Generation
        for (let index = 0; index < objectRegistry.length; index++) {
            const element = objectRegistry[index];

            // Configure the Button
            let btn = createButton(element.name, index.toString());
            btn.position(x, y)
            btn.mousePressed(function() {
                mouseDown = true;
                mapData.mapData.push({"x": 100/windowWidth*mouseX, "y": 100/windowHeight*mouseY, "sx": 10, "sy": 10, "id": parseInt(btn.value(), 10)})
                obstacles.push(new objectRegistry[parseInt(btn.value(), 10)](world, mouseX, mouseY, windowWidth/100*10, windowHeight/100*10));
                this.hide();
            });
            this.btns.push(btn);

            // Calculate next position
            x += 150;
            if (x > windowWidth-10) {
                x = 10;
                y += 100;
            }
        }
    }

    hide() {
        showMenu = false;
        menu = null;
    }
}
