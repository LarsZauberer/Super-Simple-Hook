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

let targets = []

let objectRegistry = [
					DevObstacle,
					UnstaticObstacle,
					]

let cam;

let levelManager;

let grid;

let soundmanager;


function preload() {
	soundmanager = new Sound([
		"Assets/music/Try and Solve This Loop.wav"
	]);
}


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
									"dev_map2.json",
								  ]);


	targets.push(new Target(world, 600, 95, 100, 10))

	soundmanager.play("Assets/music/Try and Solve This Loop.wav");
	
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	//update Obstacle list
	

	// Camera Calculation
	if (player) {
		player.camera();
	}

	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}

	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
		unstatics[i].update();
	}

	for (let i = 0; i < targets.length; i++) {
		targets[i].update();
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
	if (key == " ") player.jump();
}



function mousePressed()
{
	player.hookIsShot = true;
	
}


let hook2
function mouseReleased(){
	if(player.hook){
		if(player.hook.twoHookMode){
		player.hookIsShot = true;
		hook2 = player.shootHook(hook2)
		hook2.getMeshed = false;
		player.hook.hookTwo = hook2;
		}
	}
}

