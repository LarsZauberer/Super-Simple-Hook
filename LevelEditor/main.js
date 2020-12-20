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

    mx = Math.round(mouseX/STEP)*STEP
    my = Math.round(mouseY/STEP)*STEP

    if (player) {
        player.update(obstacles);
        if (mouseDown && dist(player.x, player.y, mouseX, mouseY) < 50) {
            // Update Visuals
            Body.setPosition(player.body, {"x": mx, "y": my})

            // Change MapData
            for (let index = 0; index < mapData.mapData.length; index++) {
                const element = mapData.mapData[index];
                if (element.id == 0) {
                    element[index] = {"x": 100/windowWidth*mx, "y": 50/windowHeight*my, "sx": element.sx, "sy": element.sy, "id": 0}
                }
            }
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

function mousePressed() {
    mouseDown = true;
}

function mouseReleased() {
    mouseDown = false;
}
