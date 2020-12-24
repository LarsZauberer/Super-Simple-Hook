function obstacleDraw(mx, my) {
    obstacles.push(new DevObstacle(world, mx, my, windowWidth/80, windowHeight/45));
    mapData.obstacles.push({"x": 80/windowWidth*mx, "y": 45/windowHeight*my, "sx": 1, "sy": 1, "type": 0});
}