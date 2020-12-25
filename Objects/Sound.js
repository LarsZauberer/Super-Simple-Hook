class Sound {
    constructor(assets) {
        // Load all Songs
        this.sounds = [];
        this.currentSound;
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            this.sounds.push(loadSound(element));
        }
    }

    play(name) {
        // Calculate whole path
        name = "Assets/music/" + name;

        if (this.currentSound) {
            this.currentSound.stop();
        }

        // Play File
        for (let index = 0; index < this.sounds.length; index++) {
            const element = this.sounds[index];
            if (element.file == name) {
                this.currentSound = element;
                this.currentSound.play();
                this.currentSound.loop();
            }
        }
    }
}