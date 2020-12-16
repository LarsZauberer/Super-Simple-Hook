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

let objectRegistry = [
					DevObstacle,
					Player,
					]

let cam;

let levelManager;


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

    // Map
	player = new Player(world, 100, 200, 60, 80);
	obstacles.push(new DevObstacle(world, 0, height - 20, width, 20, 10));
	obstacles.push(new DevObstacle(world, 200, height-100, 100, 80, 10));
	obstacles.push(new DevObstacle(world, 400, height-200, 200, 180, 10));
	obstacles.push(new DevObstacle(world, 500, height-500, 200, 100));

	// Camera
	cam = new Camera(player);

	// Level Manager
	levelManager = new MapManager([
									"dev_map.json",
								  ]);
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	// Camera Calculation
	cam.update();

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}

	// Player Calculation
	if (player) {
		player.update(obstacles);
	}
}


function keyPressed() {
    /* Keypress Handling
    */
    // Jumping
	for (let i = 0; i < obstacles.length; i++) {
		if (key == " ") player.jump(obstacles[i].ground);
	}
}


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