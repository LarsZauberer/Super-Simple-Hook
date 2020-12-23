class Door extends GameObject{
    constructor(world, x, y){
        let w = 20
        let h = 120

        super(world, x, y, w, h, true)

        this.currentPos = 0;
    }

    mesh(){
        rect(this.body.position.x,this.body.position.y,this.size.x,this.size.y)
    }

    update(){
        console.log(this.x)
        
        if (triggers[0].triggered()){
            this.opene();
        }
        else if(this.body.position.y < this.y){
            Body.setPosition(this.body, {x: this.x, y: this.y +this.currentPos})
            currentPos++;
        }

        this.mesh();
    }


    opene(){
        Body.setPosition(this.body, {x: this.x, y: this.x-100})
    }

}