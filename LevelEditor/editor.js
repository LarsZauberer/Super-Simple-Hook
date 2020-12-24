function obstacleDraw(mx, my) {
    // Draw an Obstacle on the grid
    // Check if the obstacle already exists
    let found = false;
    for (let index = 0; index < obstacles.length; index++) {
        const element = obstacles[index];
        if (element.x-element.size.x/2 == mx, element.y-element.size.y/2 == my) {
            found = true;
        }
    }

    // Create a new obstacle if it doesn't exist
    if (found == false) {
        obstacles.push(new DevObstacle(world, mx, my, windowWidth/80, windowHeight/45));
        mapData.obstacles.push({"x": 80/windowWidth*mx, "y": 45/windowHeight*my, "sx": 1, "sy": 1, "type": 0});
    }
}