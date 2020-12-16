class MapManager {
    constructor(names) {
        this.mapNames = names;
        this.loaded = 0;

    this.load();
    }

    load() {
        let xml = new XMLHttpRequest();
        xml.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let map = JSON.parse(this.responseText);
                /*for (let index = 0; index < obstacles.length; index++) {
                    const element = obstacles[index];
                    World.remove(world, element.body)
                    if (element.target) {
                        World.remove(world, element.target)
                    }
                    if (element.ground) {
                        World.remove(world, element.ground)
                    }
                }*/
                World.clear(world);
                obstacles = [];
                player = null;
                for (let index = 0; index < map.mapData.length; index++) {
                    const element = map.mapData[index];
                    if (element.id == 1) {
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