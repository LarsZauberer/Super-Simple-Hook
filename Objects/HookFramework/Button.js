class Button extends GameObject{
    constructor(world, x,y,w,h){
        //unstatic
        super(world, x,y, 50, 10, true);
        this.base = Bodies.rectangle(x,y+10, 60, 20, {isStatic: true});
        World.add(world, this.base)
    }

    mesh(){
        
        fill(255)
        push();
        if(this.triggered()) {fill(0)}
        rect(this.x,this.y,this.size.x,this.size.y);
        pop()
        rect(this.x, this.y+10, 60, 20)
        
    }


    
    triggered(){
        let allBodies = Matter.Composite.allBodies(this.world)
		for (let i = 0; i < allBodies.length; i++) {
        var collision = Matter.SAT.collides(this.body, allBodies[i]);
            if (collision.collided && allBodies[i] != this.body && allBodies[i] != this.base) {
                return true;
            } 
        }
    }
    
}