class MapManager {
    constructor(names) {
        this.mapNames = names;
        this.maps = [];
        this.loaded = false;

    this.load();
    /*while (this.loaded == false) {
        // Empty to wait until all maps are loaded
    }*/
    }

    load() {
        for (let index = 0; index < this.mapNames.length; index++) {
            const element = this.mapNames[index];
            let xml = new XMLHttpRequest();
            xml.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    levelManager.maps.push(JSON.parse(this.responseText));
                    console.log(levelManager);
                    if (levelManager.maps.length == levelManager.mapNames.length) {
                        levelManager.loaded = true;
                    }
                }
            };
            xml.open("GET", element, true);
            xml.send();
        }
    }

    loadLevel(index, elements) {
        let obst = []
        let map = this.maps[index];
        console.log(this.maps);

        for (let index = 0; index < map.mapData.length; index++) {
            const element = map.mapData[index];
            obst.push(new elements[element.id](world, element.x, element.y, element.sx, element.sy, true))
        }
        return obst;
    }
}