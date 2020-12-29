class TileManager{
    constructor(){
        this.tiles = []

        this.load()
    }

    load(){
       for(let i = 1; i <= 13; i++){
	        this.tiles.push(loadImage("../Assets/tiles/" + i + ".jpg"))
	    }
    }



}