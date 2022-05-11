

let x = 50; //Store firkant x
let y; //Store firkant y
let x1 = 100; //Lille firkant x
let y1; //Lille firkant y
let hastighedPlayer = 5 //Hastighed for player
let hastighedLøsning = 0.3;
let spiller;

let kugler = [];
let tal = [];
let løst = true;
let score = 0;
let visMenu = true;
let button;
let antalLiv = 3;
let a, b, fx;

let baggrund;
let SBillede;

function klik(){
  visMenu = false;
  button.hide();
}

function setup() {
  //createCanvas(100, 100);
  createCanvas(windowWidth, windowHeight);
  background(0);
  button = createButton('Start spil');
  button.position(windowWidth/2-250, windowHeight/2-30);
  button.style("background: none; border: none; font-size: 60px");

  
  button.size(500, 60);
  button.mousePressed(klik);


  y = windowHeight - x;
  y1 = windowHeight - x1;
  spiller = new Spiller(x, y, x1, y1, hastighedPlayer, SBillede);
  nyOpgave(true);
}

function preload() {
  baggrund = loadImage("Space.webp");
  SBillede = loadImage("Player.png");
}




function draw() {
  if (visMenu) {
    image(baggrund, 0, 0, width, height);
  }
  else {
    image(baggrund, 0, 0, width, height);
    //background(220);
    lavScore();
    spiller.draw();
    tegnKugler();
    tegnOpgave();
    tegnTal();
    tjekOmKuglerRammerTal();
    if (tal[0].y - (tal[0].radius / 2) >= windowHeight) {
      console.log("Nu er tal uden for skærm.");
      antalLiv--;
      if (antalLiv == 0) {
        GameOver();
      }
      nyOpgave(false);
    }
  }
}

function lavScore() {
  textAlign(LEFT);
  fill("white");
  textSize(40);
  stroke(0);
  strokeWeight(4);
  text("Score:" + score, 10, 30+windowHeight*0.05); //overloading af plus-operator.
  text("Hastighed:" + round(hastighedLøsning, 2), 10, 60+windowHeight*0.05);
  text("Antal liv: " + antalLiv, 15, 95+windowHeight*0.05);

  stroke(255);
  strokeWeight(5);
  noFill();
  rectMode(CENTER); 
  rect(110,70,310,135+windowHeight*0.05);

  stroke(0);
  strokeWeight(4);
  noFill();
  rectMode(CENTER); 
  rect(110,70,310,135+windowHeight*0.05);
}

function GameOver() {
  textAlign(CENTER, CENTER);
  textSize(50);
  text("GAME OVER!", windowWidth / 2, windowHeight / 2);
  noLoop();
}

function tjekOmKuglerRammerTal() {
  for (var i = 0; i < kugler.length; i++) {
    for (var j = 0; j < tal.length; j++) {
      if (sqrt(pow(kugler[i].x - tal[j].x, 2) + pow(kugler[i].y - tal[j].y, 2)) < (kugler[i].radius + tal[j].radius) / 2 - 10) {
        console.log("En kugle har ramt et tal!!");
        if (tal[j].løsning) {
          textAlign(CENTER);
          textSize(40);
          console.log("Du ramte rigtigt!! Du har vundet");
          text("Du ramte rigtigt!!", windowWidth / 2, windowHeight / 2);
          score++;
          nyOpgave(true);
          return;
        }
        antalLiv--;

          if (antalLiv == 0) {
            GameOver()
          }
        else {
          textAlign(CENTER, windowWidth / 2, windowHeight / 2);
          textSize(40);
          text("Du ramte forkert!! Game Over.", windowWidth / 2, windowHeight / 2);
          console.log("Du ramte forkert");
          //noLoop();
          nyOpgave(false);
          return;
        }

      }
    }
  }
}



function nyOpgave(op) {
  if (op) hastighedLøsning += 0.1; //hastighedLøsning = hastighedLøsning + 0.1
  else if (op == false && hastighedLøsning > 0.5) hastighedLøsning -= 0.1;
  kugler = [];
  a = int(random(1, 10));
  b = int(random(0, 10));
  løsning = int(random(0, 10));
  funktionsværdi = a * løsning + b;

  tal = [];
  antalTal = 5
  placering = int(random(antalTal));
  for (var i = 0; i < antalTal; i++) {
    if (placering == i) {
      tal.push(new Tal(100 + i * windowWidth / antalTal, 100, løsning, true, 60, hastighedLøsning));
    }
    else {
      tal.push(new Tal(100 + i * windowWidth / antalTal, 100, round(løsning + int(random(-5, -1)), 2), false, 60, hastighedLøsning));
    }
  }
}

function tegnKugler() {
  strokeWeight(0.5);
  for (let i = 0; i < kugler.length; i++) {
    kugler[i].draw();
  }
}

function tegnTal() {
  strokeWeight(1);
  for (let i = 0; i < tal.length; i++) {
    tal[i].draw();
  }
}

function tegnOpgave() {
  stroke(255);
  strokeWeight(6);
  noFill();
  rect(windowWidth - 175, 61,380,140+windowHeight*0.05)
  strokeWeight(5);
  stroke(0);
  noFill();
  rect(windowWidth - 175, 61,380,140+windowHeight*0.05)
  fill("white");
  textAlign(RIGHT, TOP);
  strokeWeight(4);
  textSize(40);
  stroke(0);
  text("Givet f(x)=" + a + "x+" + b + ".\n Find x så f(x)=" + funktionsværdi + ".", windowWidth - 50, 15+windowHeight*0.05);
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === 65 && spiller.hastighedPlayer > 0) {
    spiller.hastighedPlayer = -spiller.hastighedPlayer;

  } else if (keyCode === RIGHT_ARROW || keyCode === 68 && spiller.hastighedPlayer < 0) {
    spiller.hastighedPlayer = -spiller.hastighedPlayer;
  } else if (keyCode === 32) { // trykket på space
    kugler.push(new Kugle(spiller.x1 + 25, windowHeight - 50, 7, 20));
  }
}




