class Hook {
    constructor(x,y,angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
    }

    
    update(player){
        this.x += cos(this.angle)*10
        this.y += sin(this.angle)*10

        circle(this.x,this.y,20)
			
			line(this.x,this.y, player.body.position.x, player.body.position.y)
    }
	
}