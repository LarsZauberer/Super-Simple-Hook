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
					Player,
					DevObstacle,
					UnstaticObstacle
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
	//player = new Player(world, 100, 200, 60, 80);
	
	/*
	obstacles.push(new DevObstacle(world, 0, height - 20, width, 20, 10));
	obstacles.push(new DevObstacle(world, 200, height-100, 100, 80, 10));
	obstacles.push(new DevObstacle(world, 400, height-200, 200, 180, 10));
	obstacles.push(new DevObstacle(world, 500, height-500, 200, 100));
	obstacles.push(new UnstaticObstacle(world, 300, height - 200, 60, 60));
	*/



	// Camera
	

	// Level Manager
	levelManager = new MapManager([
									"dev_map.json",
								  ]);


	targets.push(new Target(world, 600, 95, 100, 10))

	
	
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	//update Obstacle list
	

	// Camera Calculation
	player.camera();

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

	levelManager.drawGrid();
	
	// Player Calculation
	player.update(obstacles);
	
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

