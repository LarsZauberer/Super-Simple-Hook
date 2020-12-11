class Ground extends GameObject {
	mesh() {
		// Draw the Ground
		fill(255,0,0);
		rect(this.x, this.y, this.size.x, 10);
	}
}
