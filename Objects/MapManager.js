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
                player = null;

                // Create Objects
                for (let index = 0; index < map.mapData.length; index++) {
                    const element = map.mapData[index];
                    if (element.id == 1) {
                        // ID Player, create Player
                        player = new Player(world, element.x, element.y, element.sx, element.sy);
                    } else {
                        obstacles.push(new objectRegistry[element.id](world, element.x, element.y, element.sx, element.sy))
                    }
                }
            }
        };
        xml.open("GET", this.mapNames[this.loaded], true)
        xml.send();
    }
}