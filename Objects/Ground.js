class Ground extends GameObject {
	mesh() {
		fill(255,0,0);
		rect(this.x, this.y, this.size.x, 10);
	}
}
