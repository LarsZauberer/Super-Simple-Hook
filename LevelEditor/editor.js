function obstacleDraw(pos1, pos2, target, deathTrigger) {
    // Draw an Obstacle on the grid
    // Check if the obstacle already exists
    
     if(pos1.y < 0){
        pos1.y -= height/18;
        if(pos2.y < 0){
            pos2.y -= height/18;
        }
     } 

     let size = createVector(-(pos1.x-pos2.x), -(pos1.y-pos2.y));


  

    let found = false;
    for (let index = 0; index < obstacles.length; index++) {
        const element = obstacles[index];
        if (Math.round(element.x-element.size.x/2) == Math.round(pos1.x) && Math.round(element.y-element.size.y/2) == Math.round(pos1.y) && !target && !deathTrigger) {
            found = true;
        }
    }

    // Create a new obstacle if it doesn't exist
    if (found == false && !tilemode) {
        if (target) {
            targets.push(new Target(world, pos1.x, pos1.y, size.x, size.y));
            mapData.targets.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y), "sx": Math.round(32/width*size.x), "sy": Math.round(18/height*size.y)});
        } 
        else if (deathTrigger) {
            loadTriggers.push(new DeathTrigger(world, pos1.x, pos1.y, size.x, size.y));
            mapData.loadTriggers.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y), "sx": Math.round(32/width*size.x), "sy": Math.round(18/height*size.y), "type": 6});
        }
        else{
            obstacles.push(new DevObstacle(world, pos1.x, pos1.y, size.x, size.y));
            mapData.obstacles.push({"x": Math.round(32/width*pos1.x), "y": Math.round(18/height*pos1.y), "sx": Math.round(32/width*size.x), "sy": Math.round(18/height*size.y), "type": 0});
        }    
    }

    // Reset positions
    mouseDown = null;
    mouseUp = null;
}


function deleteObject(index, category, mapCategory) {
    // Delete an object
    let inRange = dist(category[index].x, category[index].y, mouseX-cameraX, mouseY-cameraY) < 40
    if (inRange && keyIsDown(46) && !tilemode) {
        category.splice(index, 1);
        mapCategory.splice(index, 1);
    }
}


function spawnObject(id, group, mapGroup, sx, sy, gridbased) {
    // Spawn an object
    if (group == unstatics){
        group.push(new objectRegistry[id](world, Math.trunc((mouseX-cameraX)/(width/32)+1)*(width/32), Math.trunc((mouseY-cameraY)/(height/18)+1)*(height/18), width/32*sx, height/18*sy, 0));
        mapGroup.push({"x": 32/width*Math.trunc((mouseX-cameraX)/(width/32)+1)*(width/32), "y": 18/height*Math.trunc((mouseY-cameraY)/(height/18)+1)*(height/18), "sx": sx, "sy": sy, "rest": 0, "type": id});
    }
    else if(gridbased){
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
    player = new Player(world, mouseX-cameraX, mouseY-cameraY, width/32*1.8, height/18*2.7);
    mapData.player = {"x": 32/width*(mouseX-cameraX), "y": 18/height*(mouseY-cameraY), "sx": 1.8, "sy": 2.7};
}

function spawnDoor() {
    // Spawn Door
    door = new Door(world, Math.trunc((mouseX-cameraX)/(width/32))*(width/32), Math.trunc((mouseY-cameraY)/(height/18))*(height/18));
    mapData.door = {"x": 32/width*Math.trunc((mouseX-cameraX)/(width/32))*(width/32), "y": 18/height*Math.trunc((mouseY-cameraY)/(height/18))*(height/18)};
}


function tilePlace(posX, posY, nr, group, mapGroup){
    tileCanvas.image(group[nr], posX, posY, width/32, height/18)
    mapGroup.push({"nr": nr, "x": Math.round(32/width*posX), "y": Math.round(32/width*posY)})
}

function foundTile(mapGroup, returnIt){
    let mx = Math.trunc((mouseX-cameraX)/(width/32))*(width/32);
    let my = Math.trunc((mouseY-cameraY)/(height/18))*(height/18)
    if (my <= 0){
        my += height/18*99;
    }
    else{
        my += height/18*100;
    }

    for(let i = 0; i < mapGroup.length; i++){
        const element = mapGroup[i];
        if(Math.round(32/width*mx) == element.x && Math.round(32/width*my) == element.y){
            
            if(returnIt == null){
                return true;  
            }
            else{
                return i;
            }
            
           
        }
    }
}

function deleteTile(mapGroup){
    if(foundTile(mapGroup) && keyIsDown(8)){
        const element = mapGroup[foundTile(mapGroup, "return")];
        

        tileCanvas.circle(element.x*width/32+width/32/2,element.y*height/18+height/18/2,20)

        mapGroup.splice(foundTile(mapGroup, "return"), 1)
        
        
    }
}
