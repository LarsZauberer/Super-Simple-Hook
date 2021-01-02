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
let door;
let obstacles = [];
let unstatics = [];
let targets = [];
let triggers = [];
let loadTriggers = [];

let lavaAni = []

let tileCanvas;





let debug = true;

let objectRegistry = [
					DevObstacle,
					UnstaticRect,
					UnstaticCircle,
					Button,
					Door,
					LoadTrigger,
					DeathTrigger
					]

let cam;

let levelManager;
let grid;
let soundmanager;
let tilesManager;

const tw = 32; // Tile Width
const th = 18; // Tile Height

let obstacleTiles;
let targetTiles;

let pauseMenu;

let pauseButton;

let mainMenu;

let continueMap = 1;


function preload() {
	soundmanager = new Sound([
		"Assets/music/Try and Solve This Loop.wav"
	]);


	tilesManager = new TileManager()

}


function setup() {
    /* Setting everything up
    */
    // P5JS Settings
	createCanvas(windowHeight/9*16, windowHeight);
	background(100);
	rectMode(CENTER);
    angleMode(DEGREES);
    
    tileCanvas = createGraphics(width/32*200, height/18*200);
    tileCanvas.clear();

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
									"emptyMap.json",
									"level (17).json",
									"level.json",
								  ]);
	
	continueMap = window.localStorage.getItem("map");
	if (continueMap == null) continueMap = 1;

	mainMenu = new Menu("Super Simple Hook",
	[
		{
			"label": "Continue",
			"value": "",
			"function": function() {
				levelManager.loaded = continueMap;
				levelManager.load();
				pauseButton = createButton("Pause", "Pause");
				pauseButton.position(0, 0);
				pauseButton.mousePressed(function() {
					pauseButton.remove();
					pauseButton = null;
					pauseMenu.show();
					pauseMenu.shouldUpdate = true;
				})
				mainMenu.hide();
			}
		},
		{
			"label": "New Game",
			"value": "",
			"function": function() {
				levelManager.loaded = 1;
				levelManager.load();
				pauseButton = createButton("Pause", "Pause");
				pauseButton.position(0, 0);
				pauseButton.mousePressed(function() {
					pauseButton.remove();
					pauseButton = null;
					pauseMenu.show();
					pauseMenu.shouldUpdate = true;
				})
				mainMenu.hide();
			}
		}
	]);


	pauseMenu = new Menu("Pause",
	[{
		"label": "<img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCDkaJymmr9v5Vf9JKsIaf2tCnDrgk4OndJw&usqp=CAU'></img>",
		"value": "Test",
		"function": function() {
			pauseButton = createButton("Pause", "Pause");
			pauseButton.position(0, 0);
			pauseButton.mousePressed(function() {
				pauseButton.remove();
				pauseButton = null;
				pauseMenu.show();
				pauseMenu.shouldUpdate = true;
			})
			pauseMenu.shouldUpdate = false;
			pauseMenu.hide();
		}
	},
	{
		"label": "Main Menu",
		"value": "",
		"function": function() {
			levelManager.loaded = 0;
			levelManager.load();
			pauseMenu.hide();
			pauseMenu.shouldUpdate = false;
			pauseButton = null;
			mainMenu.show();
		}
	}
], 40);

	mainMenu.show();
}


function draw() {
    /* Main Game Loop
    */


	background(100);
	push()

	
	console.log(loadTriggers)
	

	if (debug) {
		levelManager.drawGrid();
	}

	
	// Camera Calculation
	if (player) {
		player.camera();
	}

	image(tileCanvas, 0,height/18*-100)

	
	if(door){
		door.update();
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

	for (let i = 0; i < triggers.length; i++) {
		triggers[i].update();
	}
	
	// Player Calculation
	if(player){
		player.update();
	}



	for(let i = 0; i < lavaAni.length; i++){
		image(lavaAni[i].nr, lavaAni[i].x, lavaAni[i].y, width/32, height/18)
	}
	
	for(let i = 0; i < loadTriggers.length; i++){
		loadTriggers[i].update();
	}

	if (pauseMenu.shouldUpdate) pauseMenu.update();
	if (levelManager.loaded == 0) mainMenu.update();
}


function keyPressed() {
    /* Keypress Handling
    */
	// Jumping
	if (key == " " && !player.death) player.jump();
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

