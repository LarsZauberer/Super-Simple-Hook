// Namespace Variablename change
let Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Detector = Matter.Detector;

// Globale Variables
let engine;
let world;

let player;
let obstacles = [];
let unstatics = [];

let objectRegistry = [
					Player,
					UnstaticObstacle,
					DevObstacle,
					]

let cam;

let levelManager;

let grid;


function setup() {
    /* Setting everything up
    */
    // P5JS Settings
	createCanvas(windowWidth, windowHeight);
	background(100);
	rectMode(CENTER);
	angleMode(DEGREES)

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
	world.gravity.scale = 0.0025;

	// Level Manager
	levelManager = new MapManager([
									"percentDev.json",
									"dev_map.json",
								  ]);
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	// Camera Calculation
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
}


function keyPressed() {
    /* Keypress Handling
    */
	// Jumping
	let allBodies = Matter.Composite.allBodies(world)
	
	

	for (let i = 0; i < allBodies.length; i++) {
		if (key == " ") player.jump(allBodies[i]);
	}
}


/*
function mousePressed()
{
	for (let index = 0; index < obstacles.length; index++) {
		const element = obstacles[index];
		if (element.target) {
			if (element.target.canHook) {
				player.hookIsShot = true;
			}
		}
	}
}
*/

function mousePressed()
{
	
	player.hookIsShot = true;
	
}

