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

let translation;

let mouseDown;
let mouseUp;

let mapData;

const STEP = 40;

let scaling = false;

let showMenu = false;
let menu;

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

    mapEngine = new MapManager(["../dev_map2.json"]);

    translation = createVector(0, 0, 0)
}

function draw() {
    background(100);

    mapEngine.drawGrid();


    mx = Math.round(mouseX/(windowWidth/80))*(windowWidth/80);
    my = Math.round(mouseY/(windowHeight/45))*(windowHeight/45);

    if (showMenu) {
        return;
    }

    // Player Calculation
    if (player) {
        player.update(obstacles);
        player.camera();

        let inRange = dist(player.x, player.y, mouseX, mouseY) < 50
	}

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
        const element = obstacles[i];
        element.update();

        let inRange = dist(element.x, element.y, mouseX, mouseY) < 50
	}

	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
        const element = unstatics[i];
        unstatics[i].update();
        
        let inRange = dist(element.x, element.y, mouseX, mouseY) < 50
    }

    // Targets Calculations
    for (let i = 0; i < targets.length; i++) {
		targets[i].update();
    }

    if (mouseDown) {
        obstacleDraw(mouseDown.x, mouseDown.y);
    }
}

function keyPressed() {
    // TODO: KeyIsPressed
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
            // Control (Scaling)
            scaling = true;
            break;
        case 81:
            // q (Saving)
            console.log(mapData)
            let a = document.createElement("a");
            let d = JSON.stringify(mapData)
            let file = new Blob([d], {type: "txt"});
            a.href = URL.createObjectURL(file);
            a.download = "percentDev.json";
            a.click();
            break;
        case 27:
            // Show and Hide Menu
            if (showMenu) {
                showMenu = false;
                menu = null;
            } else {
                showMenu = true;
                menu = new Menu();
                menu.generate();
            }
    }
}

function keyReleased() {
    if (keyCode === 17) scaling = false;
}

function mousePressed() {
    mx = Math.round(mouseX/(windowWidth/80))*(windowWidth/80);
    my = Math.round(mouseY/(windowHeight/45))*(windowHeight/45);
    mouseDown = createVector(mx, my, 0);
}

function mouseReleased() {
    mouseDown = null;
    mx = Math.round(mouseX/(windowWidth/80))*(windowWidth/80);
    my = Math.round(mouseY/(windowHeight/45))*(windowHeight/45);
    mouseUp = createVector(mx, my, 0);
}
