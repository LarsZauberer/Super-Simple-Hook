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
            mapData.targets.push({"x": 80/windowWidth*pos1.x, "y": 45/windowHeight*pos1.y, "sx": 80/windowWidth*size.x, "sy": 45/windowHeight*size.y});
        } else {
            obstacles.push(new DevObstacle(world, pos1.x, pos1.y, size.x, size.y));
            mapData.obstacles.push({"x": 80/windowWidth*pos1.x, "y": 45/windowHeight*pos1.y, "sx": 80/windowWidth*size.x, "sy": 45/windowHeight*size.y, "type": 0});
        }
    }

    mouseDown = null;
    mouseUp = null;
}


function deleteObject(index, category, mapCategory) {
    let inRange = dist(category[index].x, category[index].y, mouseX, mouseY) < 50
    if (inRange && keyIsDown(46)) {
        category.splice(index, 1);
        mapCategory.splice(index, 1);
    }
}