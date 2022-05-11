class Tal {
    constructor(x, y, værdi, løsning, radius, hastighed) {
        this.x = x;
        this.y = y;
        this.værdi = værdi;
        this.løsning = løsning;
        this.radius = radius;
        this.hastighed = hastighed;
    }

    draw() {
        fill("orange");
        circle(this.x, this.y, this.radius);
        fill("black");
        textSize(20);
        textAlign(CENTER, CENTER);
        text(this.værdi, this.x, this.y);
        this.y = this.y + this.hastighed;
    }
}