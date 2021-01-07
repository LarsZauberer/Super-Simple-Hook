class MapManager {
    constructor(names) {
        // Properties
        this.mapNames = names;
        this.loaded = 0;

    // Load Map
    this.load();
    }

    load() {
        // Load Map File and Generate
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                // Load Json
                let map = JSON.parse(this.responseText);

                try {
                    mapData = map;
                } catch (error) {
                    
                }

                // Reset the world
                World.clear(world);
                obstacles = [];
                unstatics = [];
                targets = [];
                triggers = [];
                loadTriggers = [];
                lavaAni = [];

                tileCanvas.clear();
                
              
                player = null;
                door = null;



                // Create Player
                if(map.player){
                player = new Player(world, width/32*map.player.x, height/18*map.player.y, width/32*map.player.sx, height/18*map.player.sy);
                }
                if(map.door){
                    door = new Door(world, width/32*map.door.x, height/18*map.door.y);
                }

                // Create Obstacles
                for (let index = 0; index < map.obstacles.length; index++) {
                    const element = map.obstacles[index];
                    obstacles.push(new DevObstacle(world, width/tw*element.x, height/th*element.y, width/tw*element.sx, height/th*element.sy, element.tileNum));
                }

                // Create Unstatics
                for (let index = 0; index < map.unstatics.length; index++) {
                    const element = map.unstatics[index];
                    unstatics.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy, element.rest));
                }

                // Create Targets
                for (let index = 0; index < map.targets.length; index++) {
                    const element = map.targets[index];
                    targets.push(new Target(world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy, element.tileNum));
                }

                 // Create Triggers
                 for (let index = 0; index < map.triggers.length; index++) {
                    const element = map.triggers[index];
                    triggers.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy));
                }


                // Create Load Triggers
                for (let index = 0; index < map.loadTriggers.length; index++) {
                    const element = map.loadTriggers[index];
                    loadTriggers.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy))
                }

                for(let index = 0; index < map.obstacleTiles.length; index++){
                    const element = map.obstacleTiles[index];
                    tileCanvas.image(tilesManager.obstacTiles[element.nr], element.x*width/32, element.y*height/18, width/32, height/18)
                    
                }

                for(let index = 0; index < map.targetTiles.length; index++){
                    const element = map.targetTiles[index];
                    tileCanvas.image(tilesManager.tarTiles[element.nr], element.x*width/32, element.y*height/18, width/32, height/18)
                }

                for(let index = 0; index < map.lavaTiles.length; index++){
                    const element = map.lavaTiles[index];
                    if(debug){
                        tileCanvas.image(tilesManager.lavTiles[element.nr], element.x*width/32, element.y*height/18, width/32, height/18)
                    }
                    lavaAni.push({nr: tilesManager.lavTiles[element.nr],x: element.x*width/32,y: element.y*height/18})
                }


                //seperate level changes
                
            

                if (levelManager.loaded == 1){
                    tileCanvas.image(explenations[0], width/32*9,height/18*104, width/32*10,height/18*6)
                }

                if (levelManager.loaded == 3){
                    tileCanvas.image(explenations[1], width/32*3,height/18*104, width/32*8,height/18*6)
                }

                
                
                
                

                // Load Music for the map:
                try {
                    soundmanager.play(map.soundtrack);
                } catch (error) {
                    
                }

                if (map.dialog) {
                    dialog = new Dialog(map.dialog);
                }
            }
        };
        xml.open("GET", this.mapNames[this.loaded], true);
        xml.send();
    }

    drawGrid() {
        // Debug Grid
        // x Stripes
        for (let index = 0; index < 200; index++) {
            line(width/32*index, height/18*-100, width/32*index, height/18*100);
        }
        // y Stripes
        for (let index = -100; index < 100; index++) {
            line(0, height/18*index, width/32*200, height/18*index);
        }

        //red outline
        push();
        stroke(255,0,0)
        line(0,0,width,0)
        line(0,height,width,height)
        line(0,0,0,height)
        line(width,0,width,height)
        pop();
    }


    
}