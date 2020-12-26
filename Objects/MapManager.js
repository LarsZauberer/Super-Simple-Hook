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
                player = new Player(world, windowWidth/80*map.player.x, windowHeight/45*map.player.y, windowWidth/80*map.player.sx, windowHeight/45*map.player.sy);

                // Create Obstacles
                for (let index = 0; index < map.obstacles.length; index++) {
                    const element = map.obstacles[index];
                    obstacles.push(new objectRegistry[element.type](world, windowWidth/80*element.x, windowHeight/45*element.y, windowWidth/80*element.sx, windowHeight/45*element.sy));
                }

                // Create Unstatics
                for (let index = 0; index < map.unstatics.length; index++) {
                    const element = map.unstatics[index];
                    unstatics.push(new objectRegistry[element.type](world, windowWidth/80*element.x, windowHeight/45*element.y, windowWidth/80*element.sx, windowHeight/45*element.sy));
                }

                // Create Targets
                for (let index = 0; index < map.targets.length; index++) {
                    const element = map.targets[index];
                    targets.push(new Target(world, windowWidth/80*element.x, windowHeight/45*element.y, windowWidth/80*element.sx, windowHeight/45*element.sy));
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
        for (let index = 0; index < 32; index++) {
            line(width/32*index, 0, width/32*index, height);
        }
        // y Stripes
        for (let index = 0; index < 18; index++) {
            line(0, height/18*index, width, height/18*index);
        }
    }
}