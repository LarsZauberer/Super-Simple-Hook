let player;
let door;
let obstacles = [];
let unstatics = [];
let targets = [];
let triggers = [];
let loadTriggers = [];


let tilemode = true;

let objectRegistry = [
                      DevObstacle,
                      UnstaticObstacle,
                      Button,
                      Door,
                      LoadTrigger,
                      DeathTrigger
                     ]

let mapEngine;

// Namespace Variablename change
let Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Detector = Matter.Detector;

// Globale Variables
let engine;
let world;

let mouseDown;
let mouseUp;

let mapData;

let targetDrawing = false;
let deathTrigDrawing = false;

let mapName;

let debug = true;

const camSpeed = 10;

let tilesManager;
function preload(){
    tilesManager = new TileManager();
}
let tileCanvas;
let tileNum = 0;


function setup() {
    createCanvas(windowHeight/9*16, windowHeight);
	rectMode(CENTER);
    angleMode(DEGREES);
    
    tileCanvas = createGraphics(width, height);
    tileCanvas.clear();

    // Matter JS Settings
	engine = Engine.create({
        element: document.body,
        engine: engine,
        options: {
            width: windowHeight/9*16,
            height: windowHeight,
        },
    });
	world = engine.world;
	Engine.run(engine);

    // World Properties
    world.gravity.scale = 0;

    mapName = prompt("Map Name");

    if (mapName.indexOf(".json") == -1) {
        mapName = "../" + mapName + ".json"
    }

    mapEngine = new MapManager([mapName]);

    translation = createVector(0, 0, 0)
}


let cameraX = 0;
let cameraY = 0;

function draw() {
    background(100);

    //right
    if(keyIsDown(39)){
        cameraX-=camSpeed;
    }
    //left
    if(keyIsDown(37)){
        cameraX+=camSpeed;
    }
    //down
    if(keyIsDown(40)){
        cameraY-=camSpeed;
    }
    //up
    if(keyIsDown(38)){
        cameraY+=camSpeed;
    }
    translate(cameraX, cameraY)

    if (debug) {
        // Debug Grid
        mapEngine.drawGrid();
    }

    // Player Calculation
    if (player) {
        player.update();
        player.death = true;
        player.camera();

        // Delete Object if in range and button pressed
        let inRange = dist(player.x, player.y, mouseX-cameraX, mouseY-cameraY) < 50
        if (inRange && keyIsDown(46)) {
            player = null;
            mapData.player = null;
        }
    }
    
    //door Calculation
    if (door) {
        door.update();

        // Delete Object if in range and button pressed
        let inRange = dist(door.x, door.y, mouseX-cameraX, mouseY-cameraY) < 50
        if (inRange && keyIsDown(46)) {
            door = null;
            mapData.door = null;
        }
    }
    
	// Obstacle Calculation
	for (let i = 0; i < obstacles.length; i++) {
        const element = obstacles[i];
        element.update();

        deleteObject(i, obstacles, mapData.obstacles);
	}
	// unstatic Obstacles Calculations
	for (let i = 0; i < unstatics.length; i++) {
        const element = unstatics[i];
        unstatics[i].update();
        
        deleteObject(i, unstatics, mapData.unstatics);
    }
    // Targets Calculations
    for (let i = 0; i < targets.length; i++) {
        targets[i].update();
        deleteObject(i, targets, mapData.targets);
    }

    for (let i = 0; i < triggers.length; i++) {
        triggers[i].update();
        deleteObject(i, triggers, mapData.triggers);
    }

    for(let i = 0; i < loadTriggers.length; i++){
        loadTriggers[i].update();
        deleteObject(i, loadTriggers, mapData.loadTriggers)
    }
    

    if (mouseUp && !tilemode) {
        // Drawing
        obstacleDraw(mouseDown, mouseUp, targetDrawing, deathTrigDrawing);
    }


    image(tileCanvas, 0,0)
}

function keyPressed() {
    if(!tilemode){
    switch (keyCode) {
        case 17:
            targetDrawing = true;
            break;
        case 16:
            deathTrigDrawing = true;
            break;
        case 81:
            // q (Saving)
            console.log(mapData)
            let a = document.createElement("a");
            let d = JSON.stringify(mapData)
            let file = new Blob([d], {type: "txt"});
            a.href = URL.createObjectURL(file);
            a.download = mapName.split("../")[1];
            a.click();
            break;
        case 80:
            // Spawn Player
            spawnPlayer();
            break;
        case 79:
            //o
            spawnDoor();
            break;
        case 49:
            // Spawn Unstatic
            spawnObject(1, unstatics, mapData.unstatics, 2, 2, false)
            break;
        case 50:
            //button
            spawnObject(2, triggers, mapData.triggers, 0, 0, true)
            break;
        case 51:
            spawnObject(4, loadTriggers, mapData.loadTriggers, 1, 7, true)
            break;
    }
    } 
    
    else{
        switch(keyCode){
            case 81:
                // q (Saving)
                console.log(mapData)
                let a = document.createElement("a");
                let d = JSON.stringify(mapData)
                let file = new Blob([d], {type: "txt"});
                a.href = URL.createObjectURL(file);
                a.download = mapName.split("../")[1];
                a.click();
                break; 
            
            case 191:
                //§
                tileNum = 0;
                break;
            case 49:
                //1
                tileNum = 1;
                break;
            case 50:
                //2
                tileNum = 2;
                break;
            case 51:
                //3
                tileNum = 3;
                break;
            case 52:
                //4
                tileNum = 4;
                break;
            case 53:
                //5
                tileNum = 5;
                break;
            case 54:
                //6
                tileNum = 6;
                break;
            case 55:
                //7
                tileNum = 7;
                break;
            case 56:
                //8
                tileNum = 8;
                break;
            case 57:
                //9
                tileNum = 9;
                break;
            case 48:
                //0
                tileNum = 10;
                break;
            case 219:
                //' ?
                tileNum = 11;
                break;
            case 221:
                //^^
                tileNum = 12;
                break;
        }
    }

}

function keyReleased() {
    // Should draw target or not
    if (keyCode === 17) targetDrawing = false;
    if (keyCode === 16) deathTrigDrawing = false;
}

function mousePressed() {
    // First Position of the Obstacle/Target
    let mx = Math.trunc((mouseX-cameraX)/(width/32))*(width/32);
    let my = Math.trunc((mouseY-cameraY)/(height/18))*(height/18);
    mouseDown = createVector(mx, my, 0);

    if(tilemode){

        if(!foundTile(mapData.obstacleTiles)){
            tilePlace(mx, my, tileNum, tilesManager.tiles, mapData.obstacleTiles);
        }
        else{
            tileDelete(mapData.obstacleTiles)
        }
        
    }


}

function mouseReleased() {
    // Second Position of the Obstacle/Target
    let mx = Math.trunc((mouseX-cameraX)/(width/32)+1)*(width/32);
    let my = Math.trunc((mouseY-cameraY)/(height/18)+1)*(height/18);
    mouseUp = createVector(mx, my, 0);
}
