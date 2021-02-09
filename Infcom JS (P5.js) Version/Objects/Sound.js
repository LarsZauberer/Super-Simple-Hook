class Sound {
    constructor(assets) {
        // Load all Songs
        this.sounds = [];

        // Sound currently playing
        this.currentSound;

        // Load all sounds
        for (let index = 0; index < assets.length; index++) {
            const element = assets[index];
            this.sounds.push(loadSound(element));
        }
    }

    play(name) {
        // Play a sound by file name
        // Calculate whole path
        name = "Assets/music/" + name;

        // If a sound is currently playing -> Stop it!
        if (this.currentSound) {
            this.currentSound.stop();
        }

        // Play File by file name
        for (let index = 0; index < this.sounds.length; index++) {
            const element = this.sounds[index];
            // If sound found
            if (element.file == name) {
                // PLay file
                this.currentSound = element;
                this.currentSound.play();
                this.currentSound.loop();
            }
        }
    }
}