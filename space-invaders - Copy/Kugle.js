class Kugle {

    constructor(x, y, hastighed, radius) {
      this.x = x;
      this.y = y;
      this.hastighed = hastighed;
      this.radius = radius;
    }
  
    draw() {
      fill("red");
      circle(this.x, this.y, this.radius);
      this.y = this.y - this.hastighed;
    }
  }