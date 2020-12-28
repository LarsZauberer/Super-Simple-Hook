class DeathTrigger extends GameObject{
    constructor(world, x, y, w, h){
        x = x+w/2;
		y = y+h/2;
		super(world, x, y, w, h, true);
    }

    mesh(){
        fill(255,0,0);
        rect(this.x,this.y,this.size.x,this.size.y);
    }
}