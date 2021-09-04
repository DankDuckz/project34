const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var missileImg, helicopterImg
var bricks = []
var missiles = []
var score = 300
var gameState = 0

function preload() {
  missileImg = loadImage("assets/missile.png")
  helicopterImg = loadImage("assets/helicopter.png")
  backgroundImg = loadImage("assets/background.jpeg")

  missileSfx = loadSound("assets/missile.wav")
  timeRunning = loadSound("assets/time_running_out.flac")
  timeRunning.setVolume(0.5)
  win = loadSound("assets/win.wav")
  lose = loadSound("assets/lose.wav")
  music = loadSound("assets/bg_music.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  ground_options = {
    isStatic: true
  }

  engine = Engine.create();
  world = engine.world;

  helicopter = new Helicopter(width/13.3,width/10,width/6.6,width/13.3)
  ground = new Base(width/2,height,width,10)
  rightWall = new Base(0,height/2,5,height)
  leftWall = new Base(width,height/2,5,height)

  base = new Base(width/1.43,height/1.4,width/3.3,height/8)
  
  createRows()

  button = createButton("PLAY")
    button.size(width/10,height/12)
    button.position(width/2.9,height/1.5)
    button.mouseClicked(function() {
        gameState = 1
    })
}


function draw() 
{
  musicPlaying = music.isPlaying()
  if (!musicPlaying) {
    music.play()
  }
  background(51);
  imageMode(CENTER)
  rectMode(CENTER)
  Engine.update(engine);

  image(backgroundImg,width/2,height/2,width,height)
  helicopter.display()
  base.display()

  frameRate(60)

  if (gameState == 1) {
    button.hide()
    Body.setStatic(helicopter.body,false)
    if (keyDown(UP_ARROW)) {
      Body.applyForce(helicopter.body,{x:0,y:0},{x:0,y:-width/20})
    }
  
    if (keyWentDown("space")) {
      missileSfx.setVolume(0.5)
      missileSfx.play()
      heliPos = helicopter.body.position
      missile = new Missile(heliPos.x+width/10,heliPos.y,width/20,height/24)
      missiles.push(missile)
      missile.life()
    }
  
    textSize(40)
    push()
    fill("black")
    text("Score: " + score,width/20,height/8)
    pop()
  
    if (frameCount % 6 == 0) {
      score -= 1
    }

    if (score <= 100) {
      timePlaying = timeRunning.isPlaying()
      if (!timePlaying) {
        timeRunning.play()
      }
    }

  }
  else if (gameState == 2) {
    winPlaying = win.isPlaying()
    if (!winPlaying) {
      win.play()
    }
    Body.setStatic(helicopter.body,true)
    push()
    fill("green")
    textSize(50)
    text("YOU WON!",width/3.3,height/4)
    textSize(30)
    text("Final score: " + score,width/3.3,height/1.5)
    pop()
  }
  else if (gameState == 3) {
    losePlaying = lose.isPlaying()
    if (!losePlaying) {
      lose.play()
    }    
    Body.setStatic(helicopter.body,true)
    push()
    fill("red")
    textSize(50)
    text("YOU LOST!",width/3.3,height/4)
    pop()
  }
  else {
    push()
    textSize(30)
    fill("purple")
    text("INSTRUCTIONS:",width/3.3,height/4)
    text("CONTROLS:",width/3.3,height/2.14)
    textSize(20)
    fill("orange")
    text("Objective is to shoot the",width/3.3,height/3.16)
    text("building down while airborne",width/3.3,height/2.8)
    text("as fast as possible!",width/3.3,height/2.5)
    text("UP ARROW: Go up",width/3.3,height/1.88)
    text("SPACE: Shoot",width/3.3,height/1.74)
    text("(Press UP in short bursts)",width/3.3,height/1.62)
    pop()
  }
 
  if (bricks.length == 0) {
    gameState = 2
  }

  heliCollision = Matter.SAT.collides(helicopter.body,ground.body)
  if (score == 0 || heliCollision.collided) {
    gameState = 3
  }

  for (var i = 0;i < bricks.length;i++) {
    bricks[i].display()
    collision = Matter.SAT.collides(bricks[i].body,ground.body)
    if (collision.collided) {
      World.remove(world,bricks[i].body)
      bricks.splice(i,1)
    }
  }

  for (var i = 0;i < missiles.length;i++) {
    missiles[i].display()
  }

}

function createRow(y) { 
  for (var i = 1;i <= 5;i++) {
    brick = new Part(width/1.82+i*width/20,y,width/20,height/24)
    bricks.push(brick)
  }
}

function createRows() {
  for (var i = 0;i < 12;i++) {
    createRow(height/1.58-i*height/23.9)
  }
}



