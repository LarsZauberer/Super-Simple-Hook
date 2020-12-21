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

let mouseDown = false;

let mapData;

const STEP = 10;

let scaling = false;

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

    mx = Math.round(mouseX/STEP)*STEP
    my = Math.round(mouseY/STEP)*STEP

    if (player) {
        player.update(obstacles);

        let inRange = dist(player.x, player.y, mouseX, mouseY) < 50

        if (mouseDown && inRange) {
            // Change Location
            loc(player, 0, mx, my);

        } else if (scaling && inRange) {
            // Change Scaling of Object
            scaleObj(player, 0, translation);

        } else if (keyIsDown(46) && inRange) {
            // Delete Objects
            delFromMap(player, 0);
            player = null;
        }
	}

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}

	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
		unstatics[i].update();
    }

    console.log(mapData);
}

function keyPressed() {
    switch (keyCode) {
        case 39:
            // Right
            translation.x -= STEP;
            break;
        case 37:
            // Left
            translation.x += STEP;
            break;
        case 38:
            // Up
            translation.y += STEP;
            break;
        case 40:
            // Down
            translation.y -= STEP;
            break;
        case 17:
            scaling = true;
            break;
        case 81:
            console.log(mapData)
            let a = document.createElement("a");
            let d = JSON.stringify(mapData)
            let file = new Blob([d], {type: "txt"});
            a.href = URL.createObjectURL(file);
            a.download = "percentDev.json";
            a.click();
            break;
    }
}

function keyReleased() {
    if (keyCode === 17) scaling = false;
}

function mousePressed() {
    mouseDown = true;
}

function mouseReleased() {
    mouseDown = false;
}
