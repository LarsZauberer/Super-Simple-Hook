class UnstaticRect extends GameObject{
    constructor(world, x,y,w,h, restitution){
        //unstatic
        super(world, x,y,w,h, false);
        World.remove(world, this.body)
        this.body = Bodies.rectangle(x,y,w,h, {chamfer: 5})
        World.add(world, this.body)
        
        this.body.restitution = restitution

        Body.setMass(this.body, 3);
        this.body.friction = 0.1;
        this.startPos = createVector(this.x, this.y);
    }


    mesh(){
        translate(this.body.position.x,this.body.position.y)
        rotate(degrees(this.body.angle))
        fill(0, 0, 100)
        rect(0,0,this.size.x,this.size.y);

        
    }

    
    
} 