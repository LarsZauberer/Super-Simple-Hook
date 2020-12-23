let player;
let obstacles = [];
let unstatics = [];

let objectRegistry = [
					Player,
					UnstaticObstacle,
					DevObstacle,
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

let translation;

let mouseDown = false;

let mapData;

const step = 40;

let scaling = false;

let showMenu = false;
let menu;

let checkbox


let checked = 0;

let getsEdit = {
    obstacles: [],
    unstatics: []
} 

/*
Erklärung:

Box auswählen
mit Maus auf Map platzieren
WASD: Objekt nachträglich verschieben
up/down/left/right: grösse verändern
Enter: editieren beenden


*/ 


function setup() {
    createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	angleMode(DEGREES);

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
	world.gravity.scale = 0;

    

    translation = createVector(0, 0, 0)

    checkbox = createCheckbox('obstacle', false);
  checkbox.changed(canObjectPlace);
  checkbox.position(100,10)
}

function canObjectPlace() {
  if (this.checked) {
    checked = 1;
  }
  else{
      checked = 0;
  }
}


function draw() {
    background(100);
    

    for(let i = 0; i < width/step; i++){
        for(let j = 0; j < height/step; j++){
            push();
                noFill()
                rect(i*step, j*step, step, step)
            pop()
            
        }
    }

    rect(width/2,20,width,40)

    for(let i = 0; i < obstacles.length; i++){
        obstacles[i].update();
    }



    for(let i = 0; i < getsEdit.obstacles.length; i++){
        if(getsEdit.obstacles[i]){
            obstacles[i] = edit(obstacles[i])
            if(keyIsDown(13)){getsEdit.obstacles[i] = false;}
            
        } 
    }
   
}



function mousePressed() {
    mouseDown = true;
    let placePos = createVector(Math.round(mouseX/step), Math.round(mouseY/step))


    if(mouseY > 40){
        if (checked == 1 && !getsEdit.obstacles[getsEdit.obstacles.length-1]) {
            obstacles.push(new DevObstacle(world,placePos.x*step,placePos.y*step,step,step))
            getsEdit.obstacles.push(true)

        }
    } 
}

function edit(object){
    if(frameCount % 10 == 0){
        if(keyIsDown(68)){
            object.x += step
        }
        if(keyIsDown(65) ){
            object.x -= step
        }
        if(keyIsDown(83)){
            object.y += step
        }
        if(keyIsDown(87)){
            object.y -= step
        }

        if(keyIsDown(39)){
            object.x+=step/2
            object.size.x += step
        }
        if(keyIsDown(37)){
            object.x-=step/2
            object.size.x -= step
        }
        if(keyIsDown(40)){
            object.y+=step/2
            object.size.y += step
        }
        if(keyIsDown(38)){
            object.y-=step/2
            object.size.y -= step
        }
    }
    World.remove(world, object.body)
    return new DevObstacle(world, object.x, object.y, object.size.x, object.size.y)

}


