class Button extends GameObject{
    constructor(world, x,y){
        //unstatic
        let w =80
        let h = 10;

        super(world, x+w/2,y+h/2, w, h, true);
        this.base = Bodies.rectangle(x+w/2,y+h/2+5, w+10, h, {isStatic: true});
        World.add(world, this.base)
    }

    mesh(){
        
        fill(255)
        push();
        if(this.triggered()) {fill(0)}
        rect(this.x,this.y,this.size.x,this.size.y);
        pop()
        rect(this.x, this.y+5, this.size.x+10,this.size.y)
        
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