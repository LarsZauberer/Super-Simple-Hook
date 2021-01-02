class TileManager{
    constructor(){
        this.obstacTiles = [];
        this.tarTiles = [];
        this.lavTiles = []

        this.load()
    }

    load(){
       for(let i = 1; i <= 13; i++){
	        this.obstacTiles.push(loadImage("../Assets/obstacleTiles/" + i + ".jpg"))
        }

        for(let i = 1; i <= 25; i++){
	        this.tarTiles.push(loadImage("../Assets/targetTiles/" + i + ".jpg"))
        }

        for(let i = 1; i <= 5; i++){
            this.lavTiles.push(loadImage("../Assets/lavaTiles/" + i + ".gif"))
            
        }
        

    }



}