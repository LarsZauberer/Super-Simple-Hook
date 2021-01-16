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

// Graphics
let lavaAni = [];
let obstacleTiles = [];
let targetTiles = [];

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



let pauseMenu;

let pauseButton;

let mainMenu;

let continueMap = 1;

let dialogBack;

let dialog;

let hook2;

let shotTwice = false;

let playerImg
let playerRight
let playerLeft
let bg;
let pauseImg
let buttonImg
let explenations = [];
let font
let unstaticImg;
let circleImg;
let doorImg;
let greenTrigImg;
let redTrigImg;

let loading = false;

let endTimer = 0;


function preload() {
	soundmanager = new Sound([
		"Assets/music/Try and Solve This Loop.wav",
		"Assets/music/Quantum Loop.wav",
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
	unstaticImg = loadImage("unstaticImg.png")
	doorImg = loadImage("door.png")
	redTrigImg = loadImage("buttonRed.png")
	greenTrigImg = loadImage("buttonGreen.png")
	font = loadFont("Helvetica.ttf");
	circleImg = loadImage("circle.png")




}

function createPause() {
	pauseButton = createButton("", "");
	pauseButton.style("background-color", "Transparent")
	pauseButton.style("border-color", "Transparent")
	let pwPercent = width/windowWidth*4.5;
	pwPercent.toString();
	pauseButton.style("width", pwPercent + "%")
	pauseButton.style("height", "8%")
	pauseButton.position(10, 10);
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
	
	
		tileCanvas = createGraphics(width, height);
	
   
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

    // World Properties
	world.gravity.scale = 0.0025;

	// Level Manager
	levelManager = new MapManager([
									"startscreen (1).json",
									"level1.json",
									"level2.json",
									"level3.json",
									"level4.json",
									"level5.json",
									"level6.json",
									"level7.json",
									"level8.json",
									"level9.json",

								  ]);

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
				levelManager.loaded = parseInt(continueMap, 10);
				levelManager.load();

				// Play Music
				soundmanager.play("Try and Solve This Loop.wav")

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

				// Play Music
				soundmanager.play("Try and Solve This Loop.wav")

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

	// Consistant Updating
	Engine.update(engine, 16)

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


	switch (levelManager.loaded) {
		case 1:
			image(explenations[0], width/32*9,height/18*4, width/32*10,height/18*6)
			break;
		case 3:
			image(explenations[1], width/32*3,height/18*4, width/32*8,height/18*6)
			break;
		case 5:
			image(explenations[2], width/32*3,height/18*4, width/32*11,height/18*6) 
	}

	
	
	
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

	if(!debug){
		
		
		for(let i = 0; i < obstacleTiles.length; i++){
			image(obstacleTiles[i].nr, obstacleTiles[i].x, obstacleTiles[i].y-height/18*100, width/32, height/18)
		}

		for(let i = 0; i < targetTiles.length; i++){
			image(targetTiles[i].nr, targetTiles[i].x, targetTiles[i].y-height/18*100, width/32, height/18)
		}
	}

		if(player){
			player.update();
		}


	if(!debug){
		for(let i = 0; i < lavaAni.length; i++){
			image(lavaAni[i].nr, lavaAni[i].x, lavaAni[i].y-height/18*100, width/32, height/18)
		}

	if (levelManager.loaded > levelManager.mapNames.length-1) {
		push();
		background(0)
		endTimer++;
		let textS = 75 * height/593;
		textSize(textS);
		fill(255);
		stroke(255);
		rectMode(CORNER);
		text("Success! You beat the game! Please give us positive feedback!", width/8*1, height/8*2, width/4*3, height/8*6);
		pop();
		if (endTimer >= 360) {
			endTimer = 0;
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

		

	}
	
		

	

	
	for(let i = 0; i < loadTriggers.length; i++){
		loadTriggers[i].update();
	}

	if (pauseButton) {
		image(pauseImg, 10-player.cam.x,10-player.cam.smoothedY, height/100*8,height/100*8)
	}

	if (dialog) {
		dialog.show();
	}
	
	if (levelManager.loaded == 0 && player) {
		// General Settings
		player.death = true;
		mainMenu.update();
		pauseMenu.shouldUpdate = false;
		pauseMenu.hide();

		// Music Credits
		push();
		let textS = 15 * height/593;
		textSize(textS);
		rectMode(CORNER);
		stroke(255);
		fill(255);
		text("Music by Tim Beek", width/8*7, height/4*4-textS, width, height)
		pop();
	}
	if(levelManager.loaded == 1){
		player.death = false;
	}

	}
		else pauseMenu.update();
	

	resetMatrix();
}


function keyPressed() {
    /* Keypress Handling
    */
	// Jumping
	if (key == " " && !player.death) player.jump();
}



function mousePressed()
{
	if (!dialog && !shotTwice) player.hookIsShot = true;
		// Hook Releasing
		if (shotTwice) {
			shotTwice = false;
			try {
				player.hook.delete(world)
			} catch (error) {
				
			}
		}
	
}



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

