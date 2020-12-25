class Sound {
    constructor(assets) {
        this.sounds = [];
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            this.sounds.push(loadSound(element));
        }
    }

    play(name) {
        for (let index = 0; index < this.sounds.length; index++) {
            const element = this.sounds[index];
            if (element.file == name) {
                element.play();
            }
        }
    }
}