class Ground
{
constructor(x,y,w,h, world)
	{
	this.h = 10
		
	this.x = x
	this.y = y-h/2+this.h/2
	this.w = w-5;
		
		this.body = Bodies.rectangle(this.x,this.y,this.w,this.h, {isStatic: true});
		World.add(world,this.body);
	
	}
	
	update()
	{
	push();
		fill(255,0,0);
		rect(this.x,this.y,this.w,this.h);
		pop();
	}
}