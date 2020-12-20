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

                // Reset the world
                World.clear(world);
                obstacles = [];
                unstatics = [];
                player = null;

                // Create Objects
                for (let index = 0; index < map.mapData.length; index++) {
                    const element = map.mapData[index];
                    if (element.id == 0) {
                        // ID Player, create Player
                        player = new objectRegistry[element.id](world, windowWidth/100*element.x, windowHeight/50*element.y, windowWidth/100*element.sx, windowHeight/50*element.sy);
                    } else if (element.id == 1) {
                        unstatics.push(new objectRegistry[element.id](world, windowWidth/100*element.x, windowHeight/50*element.y, windowWidth/100*element.sx, windowHeight/50*element.sy));
                    } else {
                        obstacles.push(new objectRegistry[element.id](world, windowWidth/100*element.x, windowHeight/50*element.y, windowWidth/100*element.sx, windowHeight/50*element.sy));
                    }                 
                }
            }
        };
        xml.open("GET", this.mapNames[this.loaded], true);
        xml.send();
    }
}