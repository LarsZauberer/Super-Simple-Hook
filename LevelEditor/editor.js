function obstacleDraw(pos1, pos2, target) {
    // Draw an Obstacle on the grid
    // Check if the obstacle already exists
    let size = createVector(-(pos1.x-pos2.x), -(pos1.y-pos2.y));

    let found = false;
    for (let index = 0; index < obstacles.length; index++) {
        const element = obstacles[index];
        if (Math.round(element.x-element.size.x/2) == Math.round(pos1.x) && Math.round(element.y-element.size.y/2) == Math.round(pos1.y)) {
            found = true;
        }
    }

    // Create a new obstacle if it doesn't exist
    if (found == false) {
        if (target) {
            targets.push(new Target(world, pos1.x, pos1.y, size.x, size.y));
            mapData.targets.push({"x": tw/width*pos1.x, "y": th/height*pos1.y, "sx": tw/width*size.x, "sy": th/height*size.y, "tileNum": tileNum});
        } else {
            obstacles.push(new DevObstacle(world, pos1.x, pos1.y, size.x, size.y, true, tileNum));
            mapData.obstacles.push({"x": tw/width*pos1.x, "y": th/height*pos1.y, "sx": tw/width*size.x, "sy": th/height*size.y, "type": 0, "tileNum": tileNum});
        }
    }

    // Reset positions
    mouseDown = null;
    mouseUp = null;
}


function deleteObject(index, category, mapCategory) {
    // Delete an object
    let inRange = dist(category[index].x, category[index].y, mouseX, mouseY) < 50
    if (inRange && keyIsDown(46)) {
        category.splice(index, 1);
        mapCategory.splice(index, 1);
    }
}


function spawnObject(id, group, mapGroup, sx, sy) {
    // Spawn an object
    group.push(new objectRegistry[id](world, mouseX, mouseY, width/tw*sx, height/th*sy));
    mapGroup.push({"x": tw/width*mouseX, "y": th/height*mouseY, "sx": sx, "sy": sy, "type": id});
}

function spawnPlayer() {
    // Spawn a player
    player = new Player(world, mouseX, mouseY, width/tw*1, height/th*2);
    mapData.player = {"x": tw/width*mouseX, "y": th/height*mouseY, "sx": 1, "sy": 2};
}
