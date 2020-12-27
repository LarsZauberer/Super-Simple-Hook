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
                player = null;

                // Create Player
                player = new Player(world, width/tw*map.player.x, height/th*map.player.y, width/tw*map.player.sx, height/th*map.player.sy);

                // Create Obstacles
                for (let index = 0; index < map.obstacles.length; index++) {
                    const element = map.obstacles[index];
                    obstacles.push(new DevObstacle(world, width/tw*element.x, height/th*element.y, width/tw*element.sx, height/th*element.sy, element.tileNum));
                }

                // Create Unstatics
                for (let index = 0; index < map.unstatics.length; index++) {
                    const element = map.unstatics[index];
                    unstatics.push(new objectRegistry[element.type](world, width/tw*element.x, height/th*element.y, width/tw*element.sx, height/th*element.sy, element.tileNum));
                }

                // Create Targets
                for (let index = 0; index < map.targets.length; index++) {
                    const element = map.targets[index];
                    targets.push(new Target(world, width/tw*element.x, height/th*element.y, width/tw*element.sx, height/th*element.sy));
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
        for (let index = 0; index < tw; index++) {
            line(width/tw*index, 0, width/tw*index, height);
        }
        // y Stripes
        for (let index = 0; index < th; index++) {
            line(0, height/th*index, width, height/th*index);
        }
    }
}