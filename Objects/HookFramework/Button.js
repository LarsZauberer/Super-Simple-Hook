class Button extends GameObject{
    constructor(world, x,y){
        //unstatic
        let w = 2*width/32
        let h = (height/18)/4;

        let y1 = y - 2*h+3

        super(world, x+w/2,y1+h/2, w-10, h, true);
        this.base = Bodies.rectangle(this.x,this.y+h/2, w, h, {isStatic: true});
        World.add(world, this.base)
    }

    update(){
        if(player){
            if(player.hook){
                let collision = Matter.SAT.collides(this.base, player.hook.body);
                if (collision.collided) {
                player.hook.delete(world)
                }
            }
        }

        this.mesh();
    }


    mesh(){
        
        fill(255)
        push();
        if(this.triggered()) {fill(0)}
        rect(this.x,this.y,this.size.x,this.size.y);
        pop()
        rect(this.base.position.x, this.base.position.y, this.size.x+10,this.size.y)
        
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