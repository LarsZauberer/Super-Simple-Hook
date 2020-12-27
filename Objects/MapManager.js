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
                player = null;


                // Create Player
                player = new Player(world, width/32*map.player.x, height/18*map.player.y, width/32*map.player.sx, height/18*map.player.sy);
                door = new Door(world, width/32*map.door.x, height/18*map.door.y);

                // Create Obstacles
                for (let index = 0; index < map.obstacles.length; index++) {
                    const element = map.obstacles[index];
                    obstacles.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy));
                }

                // Create Unstatics
                for (let index = 0; index < map.unstatics.length; index++) {
                    const element = map.unstatics[index];
                    unstatics.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy));
                }

                // Create Targets
                for (let index = 0; index < map.targets.length; index++) {
                    const element = map.targets[index];
                    targets.push(new Target(world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy));
                }

                 // Create Triggers
                 for (let index = 0; index < map.triggers.length; index++) {
                    const element = map.triggers[index];
                    triggers.push(new objectRegistry[element.type](world, width/32*element.x, height/18*element.y, width/32*element.sx, height/18*element.sy));
                }


                // Create Load Triggers
                for (let index = 0; index < map.loadTriggers.length; index++) {
                    const element = map.loadTriggers[index];
                    loadTriggers.push(new LoadTrigger(world, windowWidth/32*element.x, windowHeight/18*element.y, windowWidth/32*element.sx, windowHeight/18*element.sy, element.nextLoad))
                }

                // Load Music for the map:
                try {
                    soundmanager.play(map.soundtrack);
                } catch (error) {
                    
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