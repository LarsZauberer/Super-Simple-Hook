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
        if (mouseDown && dist(player.x, player.y, mouseX, mouseY) < 50) {
            // Update Visuals
            Body.setPosition(player.body, {"x": mx, "y": my})

            // Change MapData
            for (let index = 0; index < mapData.mapData.length; index++) {
                const element = mapData.mapData[index];
                if (element.id == 0) {
                    mapData.mapData[index] = {"x": 100/windowWidth*mx, "y": 50/windowHeight*my, "sx": element.sx, "sy": element.sy, "id": 0}
                }
            }
        } else if (scaling && dist(player.x, player.y, mouseX, mouseY) < 50) {
            // Change Visuals
            player.size.x = translation.x
            player.size.y = translation.y

            // Change MapData
            for (let index = 0; index < mapData.mapData.length; index++) {
                const element = mapData.mapData[index];
                if (element.id == 0) {
                    mapData.mapData[index] = {"x": player.x, "y": player.y, "sx": 100/windowWidth*translation.x, "sy": 50/windowHeight*translation.y, "id": 0}
                }
            }
        } else if (keyIsDown(46) && dist(player.x, player.y, mouseX, mouseY) < 50) {
            // Change Visuals
            player = null;

            // Change MapData
            for (let index = 0; index < mapData.mapData.length; index++) {
                const element = mapData.mapData[index];
                if (element.id == 0) {
                    mapData.mapData.splice(index, 1);
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
