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





let debug = false;

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

let dialogBack;

let dialog;


let playerImg
let playerRight
let playerLeft
let bg;
let pauseImg
let buttonImg
let explenations = [];


function preload() {
	soundmanager = new Sound([
		"Assets/music/Try and Solve This Loop.wav"

		
	]);


	tilesManager = new TileManager()

	dialogBack = loadImage("Assets/UI/Dialog.png")

	playerImg = loadImage("playerStanding.png")
	playerRight = loadImage("playerRight.gif")
	playerLeft = loadImage("playerLeft.gif")
	bg = loadImage("background.png");
	pauseImg = loadImage("Assets/UI/Pause.png")
	buttonImg = loadImage("Assets/UI/Button.png")
	explenations.push(loadImage("Erklaerung1.png"));
	explenations.push(loadImage("Erklaerung2.png"));
	explenations.push(loadImage("Erklaerung3.png"));




}

function createPause() {
	pauseButton = createButton("", "");
	pauseButton.style("background-color", "Transparent")
	pauseButton.style("border-color", "Transparent")
	pauseButton.style("width", "5%")
	pauseButton.style("height", "9%")
	pauseButton.position(0, 0);
	pauseButton.mousePressed(function() {
		pauseButton.remove();
		pauseButton = null;
		pauseMenu.show();
		pauseMenu.shouldUpdate = true;
		background(40, 200)
	})
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
									"startscreen (1).json",
									"level1.json",
									"level2.1.json",
									"level3.1.json",
									"level2.json",
									"level3.json",
									"level4.json",
									"level5.json",
									
								  ]);
	
	continueMap = window.localStorage.getItem("map");
	if (continueMap == null) continueMap = 1;

	// Main Menu creation
	mainMenu = new Menu("Super Simple Hook",
	[
		{
			// Continue Button
			"label": "Continue",
			"value": "",
			"function": function() {
				// Load Save
				continueMap = window.localStorage.getItem("map");
				if (continueMap == null) continueMap = 1;

				// Load Map
				levelManager.loaded = continueMap;
				levelManager.load();

				// Create Pause Button and hide the main menu
				createPause();
				mainMenu.hide();
			}
		},
		{
			// New Game Button
			"label": "New Game",
			"value": "",
			"function": function() {
				// Load the first level
				levelManager.loaded = 1;
				levelManager.load();

				// Show the Pause button and hide the main menu
				createPause();
				mainMenu.hide();
			}
		}
	]);


	// Pause Menu Creation
	pauseMenu = new Menu("Pause",
	[{
		// Continue Button
		"label": "Continue",
		"value": "",
		"function": function() {
			// Create Pause button
			createPause();
			// Hide Pause menu
			pauseMenu.shouldUpdate = false;
			pauseMenu.hide();
		}
	},
	{
		// Restart Button
		"label": "Restart Level",
		"value": "",
		"function": function() {
			// Reload Map
			levelManager.load();
			// Hide Pause menu
			pauseMenu.hide();
			pauseMenu.shouldUpdate = false;
			// Show Pause Button
			createPause();
		}
	},
	{
		// Back to Main Menu
		"label": "Main Menu",
		"value": "",
		"function": function() {
			// Load Empty Map
			levelManager.loaded = 0;
			levelManager.load();
			// Hide Pause Menu
			pauseMenu.hide();
			pauseMenu.shouldUpdate = false;
			pauseButton = null;
			// Show Main Menu
			mainMenu.show();
		}
	}
]);
	// Standard show Main Menu after setup
	mainMenu.show();
}


function draw() {
    /* Main Game Loop
    */
	push()
	   
	if(pauseMenu.shouldUpdate == false){

	background(bg);


	

		
	
	

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

	

	

	if (player){
		player.update();
	}

	for(let i = 0; i < lavaAni.length; i++){
		let y;
		if(lavaAni[i].y-height/18*100 < 0){
			y = lavaAni[i].y-height/18*99
		}  
		else{
			y = lavaAni[i].y-height/18*100
		}
		image(lavaAni[i].nr, lavaAni[i].x, y, width/32, height/18)
	}

	for(let i = 0; i < loadTriggers.length; i++){
		loadTriggers[i].update();
	}


	

	
	if (pauseButton) {
		image(pauseImg, 10-player.cam.x,10-player.cam.smoothedY, height/100*7,height/100*7)
	}

	if (dialog) {
		dialog.show();
	}
	
	if (levelManager.loaded == 0) {
		player.death = true;
		mainMenu.update(-35, 500);
		pauseMenu.shouldUpdate = false;
		pauseMenu.hide();
	}
	else{
		player.death = false;
	}

	}
		else pauseMenu.update(50, 50);
	


}


function keyPressed() {
    /* Keypress Handling
    */
	// Jumping
	if (key == " " && !player.death) player.jump();
}



function mousePressed()
{
	if (dialog == null) player.hookIsShot = true;
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

