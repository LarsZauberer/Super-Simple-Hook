let player;
let obstacles = [];
let unstatics = [];
let targets = [];

let objectRegistry = [
                      DevObstacle,
                      UnstaticObstacle,
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

let mouseDown;
let mouseUp;

let mapData;

let targetDrawing = false;

let mapName;

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

    mapName = prompt("Map Name");

    if (mapName.indexOf(".json") == -1) {
        mapName = "../" + mapName + ".json"
    }

    mapEngine = new MapManager([mapName]);

    translation = createVector(0, 0, 0)
}

function draw() {
    background(100);

    // Debug Grid
    mapEngine.drawGrid();

    // Player Calculation
    if (player) {
        player.update(obstacles);
        player.camera();

        // Delete Object if in range and button pressed
        let inRange = dist(player.x, player.y, mouseX, mouseY) < 50
        if (inRange && keyIsDown(46)) {
            player = null;
            mapData.player = null;
        }
	}

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
        const element = obstacles[i];
        element.update();

        deleteObject(i, obstacles, mapData.obstacles);
	}

	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
        const element = unstatics[i];
        unstatics[i].update();
        
        deleteObject(i, unstatics, mapData.unstatics);
    }

    // Targets Calculations
    for (let i = 0; i < targets.length; i++) {
        targets[i].update();

        deleteObject(i, targets, mapData.targets);
    }

    if (mouseUp) {
        // Drawing
        obstacleDraw(mouseDown, mouseUp, targetDrawing);
    }
}

function keyPressed() {
    switch (keyCode) {
        case 17:
            targetDrawing = true;
            break;
        case 81:
            // q (Saving)
            console.log(mapData)
            let a = document.createElement("a");
            let d = JSON.stringify(mapData)
            let file = new Blob([d], {type: "txt"});
            a.href = URL.createObjectURL(file);
            a.download = mapName.split("../")[1];
            a.click();
            break;
        case 80:
            // Spawn Player
            spawnPlayer();
            break;
        case 49:
            // Spawn Unstatic
            spawnObject(1, unstatics, mapData.unstatics, 2, 2)
            break;
    }
}

function keyReleased() {
    // Should draw target or not
    if (keyCode === 17) targetDrawing = false;
}

function mousePressed() {
    // First Position of the Obstacle/Target
    let mx = Math.trunc(mouseX/(windowWidth/80))*(windowWidth/80);
    let my = Math.trunc(mouseY/(windowHeight/45))*(windowHeight/45);
    mouseDown = createVector(mx, my, 0);
}

function mouseReleased() {
    // Second Position of the Obstacle/Target
    let mx = Math.round(mouseX/(windowWidth/80))*(windowWidth/80);
    let my = Math.round(mouseY/(windowHeight/45))*(windowHeight/45);
    mouseUp = createVector(mx, my, 0);
}
