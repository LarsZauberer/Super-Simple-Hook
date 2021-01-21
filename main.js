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
	DeathTrigger,
];

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

let playerImg;
let playerRight;
let playerLeft;
let bg;
let pauseImg;
let buttonImg;
let explenations = [];
let font;
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

	tilesManager = new TileManager();

	dialogBack = loadImage("Assets/UI/Dialog.png");

	playerImg = loadImage("playerStanding.png");
	playerRight = loadImage("playerRight.gif");
	playerLeft = loadImage("playerLeft.gif");
	bg = loadImage("background.png");
	pauseImg = loadImage("Assets/UI/Pause.png");
	buttonImg = loadImage("Assets/UI/Button.png");
	explenations.push(loadImage("Erklaerung1.png"));
	explenations.push(loadImage("Erklaerung2.gif"));
	explenations.push(loadImage("Erklaerung3.gif"));
	unstaticImg = loadImage("unstaticImg.png");
	doorImg = loadImage("door.png");
	redTrigImg = loadImage("buttonRed.png");
	greenTrigImg = loadImage("buttonGreen.png");
	font = loadFont("Helvetica.ttf");
	circleImg = loadImage("circle.png");
}

function createPause() {
	pauseButton = createButton("", "");
	pauseButton.style("background-color", "Transparent");
	pauseButton.style("border-color", "Transparent");
	let pwPercent = (width / windowWidth) * 4.5;
	pwPercent.toString();
	pauseButton.style("width", pwPercent + "%");
	pauseButton.style("height", "8%");
	pauseButton.position(10, 10);
	pauseButton.mousePressed(function () {
		pauseButton.remove();
		pauseButton = null;
		pauseMenu.show();
		pauseMenu.shouldUpdate = true;
		background(40, 200);
	});
}

function setup() {
	/* Setting everything up
	 */
	// P5JS Settings

	createCanvas((windowHeight / 9) * 16, windowHeight);
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

	continueMap = window.localStorage.getItem("map");
	if (continueMap == "null") continueMap = 1;

	// Main Menu creation
	mainMenu = new Menu("Super Simple Hook", [{
			// Continue Button
			label: "Continue",
			value: "",
			function: function () {
				// Load Save
				continueMap = window.localStorage.getItem("map");
				if (continueMap == "null") continueMap = 1;

				// Load Map
				levelManager.loaded = parseInt(continueMap, 10);
				levelManager.load();

				// Play Music
				soundmanager.play("Try and Solve This Loop.wav");

				// Create Pause Button and hide the main menu
				createPause();
				mainMenu.hide();
			},
		},
		{
			// New Game Button
			label: "New Game",
			value: "",
			function: function () {
				// Load the first level
				levelManager.loaded = 1;
				levelManager.load();

				// Play Music
				soundmanager.play("Try and Solve This Loop.wav");

				// Show the Pause button and hide the main menu
				createPause();
				mainMenu.hide();
			},
		},
	]);

	// Pause Menu Creation
	pauseMenu = new Menu("Pause", [{
			// Continue Button
			label: "Continue",
			value: "",
			function: function () {
				// Create Pause button
				createPause();
				// Hide Pause menu
				pauseMenu.shouldUpdate = false;
				pauseMenu.hide();
			},
		},
		{
			// Restart Button
			label: "Restart Level",
			value: "",
			function: function () {
				// Reload Map

				levelManager.load();
				// Hide Pause menu
				pauseMenu.hide();
				pauseMenu.shouldUpdate = false;
				// Show Pause Button
				createPause();
			},
		},
		{
			// Back to Main Menu
			label: "Main Menu",
			value: "",
			function: function () {
				window.location.reload();
			},
		},
	]);

	if (window.localStorage.getItem("reloaded") == "true") {
		window.localStorage.setItem("reloaded", false);
		// Load Save
		continueMap = window.localStorage.getItem("map");
		if (continueMap == "null") continueMap = 1;
		levelManager.loaded = parseInt(continueMap, 10);
		levelManager.load();
		createPause();
	} else {
		// Standard show Main Menu after setup
		mainMenu.show();
	}
}

function draw() {
	/* Main Game Loop
	 */

	// Consistant Updating
	Engine.update(engine, 16);

	// Save normal transformation
	push();

	// If the game isn't paused
	if (pauseMenu.shouldUpdate == false) {
		// Redraw Background
		background(bg);

		// If the debug mode is enabled draw the grid
		if (debug) {
			levelManager.drawGrid();
		}

		// Player Calculation
		if (player) {
			player.camera();
			player.update();
		}

		// Draw the explanations in the specified levels
		switch (levelManager.loaded) {
			case 1:
				// Explanation 1
				image(
					explenations[0],
					(width / 32) * 9,
					(height / 18) * 4,
					(width / 32) * 10,
					(height / 18) * 6
				);
				break;
			case 3:
				// Explanation 2
				image(
					explenations[1],
					(width / 32) * 3,
					(height / 18) * 4,
					(width / 32) * 8,
					(height / 18) * 6
				);
				break;
			case 5:
				// Explanation 3
				image(
					explenations[2],
					(width / 32) * 3,
					(height / 18) * 4,
					(width / 32) * 9,
					(height / 18) * 6
				);
		}

		// Update the door
		if (door) {
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

		// Target calculations
		for (let i = 0; i < targets.length; i++) {
			targets[i].update();
		}

		// Trigger calculations
		for (let i = 0; i < triggers.length; i++) {
			triggers[i].update();
		}

		// If the debug Mode isn't enabled
		// Draw all Tile designs
		if (!debug) {
			// Obstacle Tiles
			for (let i = 0; i < obstacleTiles.length; i++) {
				image(
					obstacleTiles[i].nr,
					obstacleTiles[i].x,
					obstacleTiles[i].y - (height / 18) * 100,
					width / 32,
					height / 18
				);
			}

			// Target Tiles
			for (let i = 0; i < targetTiles.length; i++) {
				image(
					targetTiles[i].nr,
					targetTiles[i].x,
					targetTiles[i].y - (height / 18) * 100,
					width / 32,
					height / 18
				);
			}

			// Lava Tiles
			for (let i = 0; i < lavaAni.length; i++) {
				image(
					lavaAni[i].nr,
					lavaAni[i].x,
					lavaAni[i].y - (height / 18) * 100,
					width / 32,
					height / 18
				);
			}
		}

		// Load Triggers Calculations
		for (let i = 0; i < loadTriggers.length; i++) {
			loadTriggers[i].update();
		}

		// Did you beat the game?
		if (levelManager.loaded > levelManager.mapNames.length - 1) {
			// Congrats message
			push();
			background(0);
			endTimer++;
			let textS = (75 * height) / 593;
			textSize(textS);
			fill(255);
			stroke(255);
			rectMode(CORNERS);
			text(
				"Success! You beat the game! Please give us positive feedback!",
				(width / 8) * 1,
				(height / 8) * 2,
				(width / 4) * 3,
				(height / 8) * 6
			);
			pop();
			// Delay to switch back to the start screen
			if (endTimer >= 360) {
				endTimer = 0;
				window.localStorage.setItem("map", 1);
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

		// Update the pause button
		if (pauseButton && player) {
			image(
				pauseImg,
				10 - player.cam.x,
				10 - player.cam.smoothedY,
				(height / 100) * 8,
				(height / 100) * 8
			);
		}

		// Update Dialog
		if (dialog) {
			dialog.show();
		}

		// Startscreen Update 
		if (levelManager.loaded == 0 && player) {
			// General Settings
			player.death = true;
			mainMenu.update();
			pauseMenu.shouldUpdate = false;
			pauseMenu.hide();

			// Music Credits
			push();
			let textS = (15 * height) / 593;
			textSize(textS);
			rectMode(CORNER);
			stroke(255);
			fill(255);
			text(
				"Music by Tim Beek",
				(width / 8) * 7,
				(height / 4) * 4 - textS,
				width,
				height
			);
			pop();
		}
	} else pauseMenu.update(); // If pause -> Update Pause

	// Reset everything to default
	resetMatrix();
}

function keyPressed() {
	/* Keypress Handling
	 */
	// Jumping
	if (key == " " && !player.death) player.jump();
}

function mousePressed() {
	if (player) {
		// Shoot a hook
		if (!dialog && !shotTwice) player.hookIsShot = true;
		// Hook Releasing unstatic object
		if (shotTwice) {
			shotTwice = false;
			try {
				player.hook.delete(world);
			} catch (error) {}
		}
	}
}

function mouseReleased() {
	// Calculate the Hook
	// TODO: Commenting Robin
	if (player) {
		if (player.hook) {
			if (player.hook.twoHookMode) {
				player.hookIsShot = true;
				hook2 = player.shootHook(hook2);
				hook2.getMeshed = false;
				player.hook.hookTwo = hook2;
			}
		}
	}
}