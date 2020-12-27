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
let targets = [];
let triggers = [];

let door;




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
	createCanvas(windowHeight/9*16, windowHeight);
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
	triggers.push(new LoadTrigger(world, 200, windowHeight-100, 10, 100));
}


function draw() {
    /* Main Game Loop
    */
	background(100);

	
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
	if(player){
		player.update(obstacles);
	}

	for(let i = 0; i < triggers.length; i++){
		triggers[i].update();
	}

	if(door){
		door.update();
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

