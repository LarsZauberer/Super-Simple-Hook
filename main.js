// Namespace Variablename change
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Detector = Matter.Detector;

// Globale Variables
var engine;
var world;

var player;
var obstacles = [];


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
	player = new Player(world, 100, 200, 80, 80);
	obstacles.push(new DevObstacle(world, 0, height - 20, width, 20, 10));
	obstacles.push(new DevObstacle(world, 200, windowHeight-100, 100, 80, 10));
	obstacles.push(new DevObstacle(world, 400, windowHeight-200, 200, 180, 10));
	obstacles.push(new DevObstacle(world, 500, 500, 200, 100));
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}

	player.update(obstacles);
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
	player.hookIsShot = true;
}