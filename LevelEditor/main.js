let player;
let obstacles = [];
let unstatics = [];

let objectRegistry = [
					Player,
					UnstaticObstacle,
					DevObstacle,
                    ]

let mapEngine;

// Namespace Variablename change
let Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Detector = Matter.Detector;

// Globale Variables
let engine;
let world;

let translation;

function setup() {
    createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);

    // Matter JS Settings
	engine = Engine.create({
        element: document.body,
        engine: engine,
        options: {
            width: windowWidth,
            height: windowHeight,
        },
    });
	world = engine.world;
	Engine.run(engine);

    // World Properties
	world.gravity.scale = 0;

    mapEngine = new MapManager(["../percentDev.json"]);
    mapEngine.load()

    translation = createVector(0, 0, 0)
}

function draw() {
    background(100);
    translate(translation.x, translation.y, translation.z);

    if (player) {
		player.update(obstacles);
	}

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}

	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
		unstatics[i].update();
	}
    // translate(x, y, [z])
}

function keyPressed() {
    switch (keyCode) {
        case 39:
            // Right
            translation.x -= 10;
            break;
        case 37:
            // Left
            translation.x += 10;
            break;
        case 38:
            // Up
            translation.y += 10;
            break;
        case 40:
            // Down
            translation.y -= 10;
            break;
    }
}
