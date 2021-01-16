class TileManager{
    constructor(){
        this.obstacTiles = [];
        this.tarTiles = [];
        this.lavTiles = []

        this.load()
    }

    load(){
       for(let i = 1; i <= 13; i++){
	        this.obstacTiles.push(loadImage("../Assets/obstacleTiles/" + i + ".png"))
        }

        for(let i = 1; i <= 29; i++){
	        this.tarTiles.push(loadImage("../Assets/targetTiles/" + i + ".jpg"))
        }

        for(let i = 1; i <= 4; i++){
            this.lavTiles.push(loadImage("../Assets/lavaTiles/" + i + ".gif"))
        }
        this.lavTiles.push(loadImage("../Assets/lavaTiles/5.png"))
        

    }



}