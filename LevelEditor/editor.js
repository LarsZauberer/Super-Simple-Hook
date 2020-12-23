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
        console.log(mx);
        console.log(my);
        if ((Math.round((100/windowWidth*ele.x)-(100/windowWidth*ele.size.x)/2) == Math.round(element.x) && Math.round((50/windowHeight*ele.y)-(50/windowHeight*ele.size.y)/2) == Math.round(element.y)) || (Math.round(100/windowWidth*ele.x) == Math.round(element.x) && Math.round(50/windowHeight*ele.y) == Math.round(element.y))) {
            mapData.mapData[index] = {"x": 100/windowWidth*posX-(100/windowWidth*ele.size.x)/2,
                                      "y": 50/windowHeight*posY-(50/windowHeight*ele.size.y)/2,
                                      "sx": element.sx,
                                      "sy": element.sy,
                                      "id": element.id
                                     }
        }
    }
}

function scaleObj(ele, trans) {
    // Change Scaling

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if ((Math.round((100/windowWidth*ele.x)-(100/windowWidth*ele.size.x)/2) == Math.round(element.x) && Math.round((50/windowHeight*ele.y)-(50/windowHeight*ele.size.y)/2) == Math.round(element.y)) || (Math.round(100/windowWidth*ele.x)) == Math.round(element.x) && Math.round(50/windowHeight*ele.y) == Math.round(element.y)) {
            mapData.mapData[index] = {"x": 100/windowWidth*ele.x-(100/windowWidth*trans.x)/2,
                                      "y": 50/windowHeight*ele.y-(50/windowHeight*trans.y)/2,
                                      "sx": 100/windowWidth*trans.x,
                                      "sy": 50/windowHeight*trans.y,
                                      "id": element.id
                                     }
        }
    }

    // Change Visuals
    // TODO: Target Update

    ele.size.x = trans.x
    ele.size.y = trans.y
}

function delFromMap(ele) {
    // Delete Objects

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if ((Math.round((100/windowWidth*ele.x)-(100/windowWidth*ele.size.x)/2) == Math.round(element.x) && Math.round((50/windowHeight*ele.y)-(50/windowHeight*ele.size.y)/2) == Math.round(element.y)) || (Math.round(100/windowWidth*ele.x)) == Math.round(element.x) && Math.round(50/windowHeight*ele.y) == Math.round(element.y)) {
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
                mapData.mapData.push({"x": 100/windowWidth*mouseX, "y": 50/windowHeight*(mouseY+100), "sx": 10, "sy": 10, "id": parseInt(btn.value(), 10)})
                obstacles.push(new objectRegistry[parseInt(btn.value(), 10)](world, mouseX-(windowWidth/100*10)/2, (mouseY+100)-(windowWidth/100*10)/2, windowWidth/100*10, windowHeight/100*10));
                showMenu = false;
                clearButtons();
                menu = null;
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
}

function clearButtons() {
    if (menu) {
        for (let index = 0; index < menu.btns.length; index++) {
            const element = menu.btns[index];
            element.remove()
        }
    }
}
