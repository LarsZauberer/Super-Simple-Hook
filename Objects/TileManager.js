class TileManager {
    constructor() {
        // Arrays of all files
        this.obstacTiles = [];
        this.tarTiles = [];
        this.lavTiles = []

        // Load all files
        this.load()
    }

    load() {
        // Load all obstacle tiles
        for (let i = 1; i <= 13; i++) {
            this.obstacTiles.push(loadImage("../Assets/obstacleTiles/" + i + ".png"))
        }

        // Load all target tiles
        for (let i = 1; i <= 29; i++) {
            this.tarTiles.push(loadImage("../Assets/targetTiles/" + i + "b.jpg"))
        }

        // Load all lava tiles
        for (let i = 1; i <= 4; i++) {
            this.lavTiles.push(loadImage("../Assets/lavaTiles/" + i + ".gif"))
        }
        // Load the static lava tile
        this.lavTiles.push(loadImage("../Assets/lavaTiles/5c.png"))


    }



}