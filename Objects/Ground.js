class Ground extends GameObject {
	mesh() {
		push();
		fill(255,0,0);
		rect(this.x,this.y,this.w,this.h);
		pop();
	}
}