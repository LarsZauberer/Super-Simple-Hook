function obstacleDraw(pos1, pos2, target, deathTrigger) {
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
            mapData.targets.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y)+0.02, "sx": 32/width*size.x, "sy": 18/height*size.y});
        } 
        else if (deathTrigger) {
            loadTriggers.push(new DeathTrigger(world, pos1.x, pos1.y, size.x, size.y));
            mapData.loadTriggers.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y), "sx": 32/width*size.x, "sy": 18/height*size.y, "type": 5});
        }
        else{
            obstacles.push(new DevObstacle(world, pos1.x, pos1.y, size.x, size.y));
            mapData.obstacles.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y), "sx": 32/width*size.x, "sy": 18/height*size.y, "type": 0});
        }
        
    }

    // Reset positions
    mouseDown = null;
    mouseUp = null;
}


function deleteObject(index, category, mapCategory) {
    // Delete an object
    let inRange = dist(category[index].x, category[index].y, mouseX-cameraX, mouseY-cameraY) < 50
    if (inRange && keyIsDown(46)) {
        category.splice(index, 1);
        mapCategory.splice(index, 1);
    }
}


function spawnObject(id, group, mapGroup, sx, sy, gridbased) {
    // Spawn an object
    if(gridbased){
    group.push(new objectRegistry[id](world, Math.trunc((mouseX-cameraX)/(width/32)+1)*(width/32), Math.trunc((mouseY-cameraY)/(height/18)+1)*(height/18), width/32*sx, height/18*sy));
    mapGroup.push({"x": 32/width*Math.trunc((mouseX-cameraX)/(width/32)+1)*(width/32), "y": 18/height*Math.trunc((mouseY-cameraY)/(height/18)+1)*(height/18), "sx": sx, "sy": sy, "type": id});
    }
    else{
        group.push(new objectRegistry[id](world, mouseX-cameraX, mouseY-cameraY, width/32*sx, height/18*sy));
        mapGroup.push({"x": 32/width*(mouseX-cameraX), "y": 18/height*(mouseY-cameraY), "sx": sx, "sy": sy, "type": id}); 
    }
}

function spawnPlayer() {
    // Spawn a player
    player = new Player(world, mouseX-cameraX, mouseY-cameraY, width/32*2, height/18*3);
    mapData.player = {"x": 32/width*(mouseX-cameraX), "y": 18/height*(mouseY-cameraY), "sx": 1.8, "sy": 2.7};
}

function spawnDoor() {
    // Spawn Door
    door = new Door(world, Math.trunc((mouseX-cameraX)/(width/32))*(width/32), Math.trunc((mouseY-cameraY)/(height/18))*(height/18));
    mapData.door = {"x": 32/width*Math.trunc((mouseX-cameraX)/(width/32))*(width/32), "y": 18/height*Math.trunc((mouseY-cameraY)/(height/18))*(height/18)};
}
