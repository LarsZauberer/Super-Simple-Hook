class Obstacle
{
	constructor(x,y,w,h, world) {
		this.x = x+w/2;
		this.y = y+h/2;
		this.w = w;
		this.h = h;
		this.body = Bodies.rectangle(this.x,this.y,this.w,this.h, {isStatic: true});
		World.add(world,this.body);

		this.ground = new Ground(this.x,this.y,this.w, this.h, world);
	}

	update() {
		rect(this.x,this.y,this.w,this.h);
		this.ground.update();
	}
}