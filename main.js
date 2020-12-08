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
	createCanvas(800, 500);
	background(100);
	rectMode(CENTER);

    // Matter JS Settings
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

    // World Properties
	world.gravity.scale = 0.0025;

    // Map
	player = new Player(world, this);
	obstacles.push(new Obstacle(0, height - 20, width, 20, world));
	obstacles.push(new Obstacle(200, 400, 100, 80, world));
	obstacles.push(new Obstacle(400, 300, 200, 180, world));
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}
	player.update();
}


function keyPressed() {
    /* Keypress Handling
    */
    // Jumping
	for (let i = 0; i < obstacles.length; i++) {
		if (key == " ") player.jump(obstacles[i].ground);
	}
}