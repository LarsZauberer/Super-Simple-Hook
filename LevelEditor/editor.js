function obstacleDraw(pos1, pos2) {
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
        obstacles.push(new DevObstacle(world, pos1.x, pos1.y, size.x, size.y));
        mapData.obstacles.push({"x": 80/windowWidth*pos1.x, "y": 45/windowHeight*pos1.y, "sx": 80/windowWidth*size.x, "sy": 45/windowHeight*size.y, "type": 0});
    }

    mouseDown = null;
    mouseUp = null;
}