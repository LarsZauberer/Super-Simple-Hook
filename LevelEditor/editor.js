function loc(ele, id, posX, posY) {
    // Change Location

    // Update Visuals
    Body.setPosition(ele.body, {"x": posX, "y": posY})

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if (element.id == id) {
            mapData.mapData[index] = {"x": 100/windowWidth*posX, "y": 50/windowHeight*posY, "sx": element.sx, "sy": element.sy, "id": id}
        }
    }
}

function scaleObj(ele, id, trans) {
    // Change Scaling

    // Change Visuals
    ele.size.x = trans.x
    ele.size.y = trans.y

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if (element.id == id) {
            mapData.mapData[index] = {"x": ele.x, "y": ele.y, "sx": 100/windowWidth*trans.x, "sy": 50/windowHeight*trans.y, "id": id}
        }
    }
}

function delFromMap(id) {
    // Delete Objects

    // Change MapData
    for (let index = 0; index < mapData.mapData.length; index++) {
        const element = mapData.mapData[index];
        if (element.id == id) {
            mapData.mapData.splice(index, 1);
        }
    }
}
