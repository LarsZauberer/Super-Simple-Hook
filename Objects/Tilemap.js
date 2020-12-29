class Tilemap {
    constructor(tileFiles) {
        // Variables
        this.tileFiles = tileFiles;
        this.tiles = [];

        // Load Images
        for (let index = 0; index < this.tileFiles.length; index++) {
            const element = this.tileFiles[index];
            this.tiles.push(loadImage(element));
        }
    }
}