class MapManager {
    constructor(names) {
        // TODO: Docstring
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
                // TODO: Convert to a Method
                World.clear(world);
                obstacles = [];
                unstatics = [];
                player = null;

                // Create Objects
                for (let index = 0; index < map.mapData.length; index++) {
                    // TODO: Create World as Resizeable
                    const element = map.mapData[index];
                    if (element.id == 0) {
                        // ID Player, create Player
                        player = new objectRegistry[element.id](world, element.x, element.y, element.sx, element.sy);
                    } else if (element.id == 1){
                        obstacles.push(new objectRegistry[element.id](world, element.x, element.y, element.sx, element.sy));
                    }
                    //unstatic Obstacle. Has own Brackets because organization.
                    else{
                        unstatics.push(new objectRegistry[element.id](world, element.x, element.y, element.sx, element.sy));
                    }
                   
                }
            }
        };

        // GET File
        xml.open("GET", this.mapNames[this.loaded], true);
        xml.send();
    }
}