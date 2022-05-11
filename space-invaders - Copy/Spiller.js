class Spiller {
    constructor(x, y, x1, y1, hastighedPlayer,SBillede){
      this.x = x;
      this.y = y;
      this.x1 = x1;
      this.y1 = y1;
      this.hastighedPlayer = hastighedPlayer;
      this.SBillede = SBillede;
    }
  
    draw(){
      fill("white");
      image(this.SBillede, this.x, this.y - 100, 150, 150)
      //rect(this.x, this.y, 150, 50);
      //rect(this.x1, this.y1, 50);
      this.x = this.x + this.hastighedPlayer;
      this.x1 = this.x1 + this.hastighedPlayer;
      this.border();
    }

    border() {
        if (this.x <= 0) {
          this.hastighedPlayer = (-1) * this.hastighedPlayer;
        }
        if (this.x + 150 >= width) {
          this.hastighedPlayer = -this.hastighedPlayer;
        }
    }
  
  }