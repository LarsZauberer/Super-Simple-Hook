let player;
let door;
let obstacles = [];
let unstatics = [];
let targets = [];
let triggers = [];
let loadTriggers = [];
let lavaAni = []




let objectRegistry = [
                      DevObstacle,
                      UnstaticRect,
                      UnstaticCircle,
                      Button,
                      Door,
                      LoadTrigger,
                      DeathTrigger
                     ]

let levelManager;

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
const tw = 32; // Tile Width
const th = 18; // Tile Height






// tile settings
let tilemode = false;
let tilesManager;

let playerImg;
let playerRight;
let playerLeft;

function preload(){
    tilesManager = new TileManager();
    playerImg = loadImage("../playerStanding.png")
	playerRight = loadImage("../playerRight.gif")
	playerLeft = loadImage("../playerLeft.gif")
}
let tileCanvas;
let tileNum = 0;
let specTileMode = 0;

let loading = false;


function setup() {
    createCanvas(windowHeight/9*16, windowHeight);
	rectMode(CENTER);
    angleMode(DEGREES);
    
    tileCanvas = createGraphics(width/32*200, height/18*200);
    tileCanvas.clear();
    tileCanvas.fill(100);

    // Matter JS Settings
	engine = Engine.create({
        element: document.body,
        engine: engine,
        options: {
            width: width,
            height: height,
        },
    });
	world = engine.world;
	Engine.run(engine);

    // World Properties
    world.gravity.scale = 0;

    mapName = window.localStorage.getItem("mapEditor");
    if (!mapName) mapName = "";

    mapName = prompt("Map Name", mapName);

    window.localStorage.setItem("mapEditor", mapName);

    if (mapName.indexOf(".json") == -1) {
        mapName = "../" + mapName + ".json"
    }

    levelManager = new MapManager([mapName]);

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

    // Debug Modes
    if (debug) {
        // Debug Grid
        levelManager.drawGrid();
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
        if(keyIsDown(17)){
        deleteObject(i, targets, mapData.targets);
        }
    }

    for (let i = 0; i < triggers.length; i++) {
        triggers[i].update();
        deleteObject(i, triggers, mapData.triggers);
    }

    for(let i = 0; i < loadTriggers.length; i++){
        loadTriggers[i].update();
        if(keyIsDown(16)){
            deleteObject(i, loadTriggers, mapData.loadTriggers)
        }
    }
    

    if (mouseUp) {
        // Drawing
        obstacleDraw(mouseDown, mouseUp, targetDrawing, deathTrigDrawing);
    }



    

    if(tilemode){
        image(tileCanvas, 0, height/18*-100)

        if(mouseIsPressed){
            let mx = Math.floor((mouseX-cameraX)/(width/32))*(width/32);
            let my = Math.floor((mouseY-cameraY)/(height/18))*(height/18);

           
                my += height/18*100;
            

            if(!foundTile(mapData.obstacleTiles) && specTileMode == 0){
                if(tileNum > 12) tileNum = 0;
                tilePlace(mx, my, tileNum, tilesManager.obstacTiles, mapData.obstacleTiles);
            }
            if(!foundTile(mapData.targetTiles) && specTileMode == 1){
                tilePlace(mx, my, tileNum, tilesManager.tarTiles, mapData.targetTiles);
            }
            if(!foundTile(mapData.lavaTiles) && specTileMode == 2){
                if(tileNum > 4) tileNum = 0;
                tilePlace(mx, my, tileNum, tilesManager.lavTiles, mapData.lavaTiles);
            }
        }
        

            deleteTile(mapData.obstacleTiles);
            deleteTile(mapData.targetTiles);
            deleteTile(mapData.lavaTiles);
    }


   
}

function keyPressed() {

    if(keyCode == 13){
        tilemode = !tilemode
        specTileMode = 0;
    }

    if(!tilemode){
    switch (keyCode) {
        case 17:
            // Control: Draw a target
            targetDrawing = true;
            break;
        case 16:
            // Shift: Draw Death Trigger
            deathTrigDrawing = true;
            break;
        case 83:
            // s (Saving)
            console.log(mapData)
            let a = document.createElement("a");
            let d = JSON.stringify(mapData)
            let file = new Blob([d], {type: "txt"});
            a.href = URL.createObjectURL(file);
            a.download = mapName.split("../")[1];
            a.click();
            break;
        case 49:
            //1 Spawn Player
            spawnPlayer();
            break;
        case 50:
            //2
            spawnDoor();
            break;
        case 51:
            // 3 Spawn Unstatic
            spawnObject(1, unstatics, mapData.unstatics, 2, 2, false)
            break;
        case 52:
            //4 button
            spawnObject(3, triggers, mapData.triggers, 0, 0, true)
            break;
        case 53:
            //5 loadTrigger
            spawnObject(5, loadTriggers, mapData.loadTriggers, 1, 7, true)
            break;
        case 54:
            //6
            spawnObject(2, unstatics, mapData.unstatics, 1, 0, false)
    }
    } 
    
    else{
        switch(keyCode){
            case 83:
                // s (Saving)
                console.log(mapData)
                let a = document.createElement("a");
                let d = JSON.stringify(mapData)
                let file = new Blob([d], {type: "txt"});
                a.href = URL.createObjectURL(file);
                a.download = mapName.split("../")[1];
                a.click();
                break; 

            case 223:
                //$
                specTileMode+=1;
                if(specTileMode > 2){
                    specTileMode = 0;
                }
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
            case 81:
                //q
                tileNum = 13;
                break;
            case 87:
                //w
                tileNum = 14;
                break;
            case 69:
                //e
                tileNum = 15;
                break;
            case 82:
                //r
                tileNum = 16;
                break;
            case 84:
                //t
                tileNum = 17;
                break;
            case 90:
                //z
                tileNum = 18;
                break;
            case 85:
                //u
                tileNum = 19;
                break;
            case 73:
                //i
                tileNum = 20;
                break;
            case 79:
                //o
                tileNum = 21;
                break;
            case 80:
                //p
                tileNum = 22;
                break;
            case 186:
                //[
                tileNum = 23;
                break;
            case 192:
                //]
                tileNum = 24;
                break;

        }
    }

}

function keyReleased() {
    // Should draw target or not

    //ctrl
    if (keyCode === 17) targetDrawing = false;
    //shift
    if (keyCode === 16) deathTrigDrawing = false;
}

function mousePressed() {
    // First Position of the Obstacle/Target
    let mx = Math.floor((mouseX-cameraX)/(width/tw))*(width/tw);
    let my = Math.floor((mouseY-cameraY)/(height/th))*(height/th);
    mouseDown = createVector(mx, my, 0);

    


}

function mouseReleased() {
    // Second Position of the Obstacle/Target
    let mx = Math.floor((mouseX-cameraX)/(width/32)+1)*(width/32);
    let my = Math.floor((mouseY-cameraY)/(height/18)+1)*(height/18);
    mouseUp = createVector(mx, my, 0);
}
