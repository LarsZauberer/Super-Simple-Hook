class UnstaticObstacle extends GameObject{
    constructor(world, x,y,w,h){
        //unstatic
        super(world, x,y,w,h, false);
        Body.mass(this.body, 3);
    }

    mesh(){
        translate(this.body.position.x,this.body.position.y)
        rotate(degrees(this.body.angle))
        fill(255)
        rect(0,0,this.size.x,this.size.y);
    }
} 