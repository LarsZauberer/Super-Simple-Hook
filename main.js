var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies,
	Body = Matter.Body,
	Detector = Matter.Detector;

var engine;
var world;

var player;
var obstacles = [];

function setup() {
	createCanvas(800, 500);
	background(100);
	rectMode(CENTER);
	engine = Engine.create();
	world = engine.world;
	Engine.run(engine);

	world.gravity.scale = 0.0025;

	player = new Player(world, this);
	obstacles.push(new Obstacle(0, height - 20, width, 20, world));
	obstacles.push(new Obstacle(200, 400, 100, 80, world));
	obstacles.push(new Obstacle(400, 300, 200, 180, world));

}

function draw() {
	background(100);


	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].update();
	}
	player.update();




}




function keyPressed() {
	for (let i = 0; i < obstacles.length; i++) {
		if (key == " ") player.jump(obstacles[i].ground);
	}
}