var score=0;

var alien,ship, ground;
var alienImg,shipImg,ratImg,cheesImg,gameoverImg,stoneImg,restartImg;
var edges;

var restart;

var gameState = "spaceShip";

function preload(){
  alienImg = loadImage("alien.png");
  shipImg = loadImage("spaceship.png");
  ratImg = loadImage("rat.png");
  stoneImg = loadImage("stone.png");
  cheesImg = loadImage("chees.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(400, 400);
  
  //ground= createSprite(0,390,1000,30);
  //ground.shapeColor="red";
  
  ship = createSprite(200, 50);
  ship.addImage(shipImg);
  ship.scale = 0.5;

  alien=createSprite(200,380);
  alien.addImage(alienImg);
  alien.scale=0.2;

  gameover = createSprite(200,200);
  gameover.addImage(gameoverImg);
  gameover.scale = 1.5;
  gameover.visible = false;

  restart = createSprite(200,350);
  restart.addImage(restartImg);
  restart.scale = 0.25;
  restart.visible = false;

  chees = createSprite(355, 370);
  chees.addImage(cheesImg);
  chees.scale = 0.30;
  chees.visible = false;
  
  rat = createSprite(200, 40);
  rat.addImage(ratImg);
  rat.scale = 0.2;
  rat.visible = false;

  stone=createSprite(200,380);
  stone.addImage(stoneImg);
  stone.scale=0.2;
  stone.visible = false;
}

function draw() {
  background("black");
  
  if (gameState === "spaceShip") 
  {
  textSize(22);
  fill("white");
  text("Make the alien go to their SpaceShip",20,200);
  
  edges = createEdgeSprites();
  ship.bounceOff(edges[0]);
  ship.bounceOff(edges[1]);
  
  alien.velocityY=-5;
  
  if(keyDown("RIGHT_ARROW")){
      ship.velocityX=4;
    }
  if(keyDown("LEFT_ARROW")){
    ship.velocityX=-4;
  }
  
  if (ship.isTouching(alien)){
   alien.x=random(30,360);
   score = score + 10;
   alien.y=380;
  }
  
  textSize(22);
  fill("white");
  text("Score: " +score,150,370);
  
  if (alien.y<0){
    background("black");
    ship.velocityX=0;
    //alien.y = 200;
    gameover.visible = true;
    restart.visible = true;
    alien.visible = false;
    ship.visible = false;
    
    alien.velocityY=0;
  }

  if (score >=100)
  {
    gameState = "chees";
    changeGame();
  }
  
  textSize(20);
  fill ("black");
  text(mouseX + "," + mouseY, mouseX,mouseY);
  }

  else if (gameState === "chees")
  {
    gameover.visible = false;
    
    edges = createEdgeSprites();
    rat.bounceOff(edges[0]);
    rat.bounceOff(edges[1]);
    
    stone.velocityY=-10;
    
    if(keyDown("RIGHT_ARROW")){
        rat.velocityX=5;
      }
    if(keyDown("LEFT_ARROW")){
      rat.velocityX=-5;
    }
    if(keyDown("UP_ARROW")){
      rat.velocityY=-5;
    }
    if(keyDown("DOWN_ARROW")){
      rat.velocityY=5;
    }
    
    if (rat.isTouching(stone)){
     stone.x=random(30,360);
     score = score + 10;
     stone.y=380;
    }
    
    textSize(22);
    fill("white");
    text("Score: " +score,290,20);
    
    if (stone.y<0){
      background("black");
      rat.velocityX=0;
      rat.velocityY=0;
      rat.visible = false;
      chees.visible = false;
      alien.visible = false;
      alien.velocityY=0; 

      gameover.visible = true;
    }
    
     if (rat.isTouching(chees))
    {
      fill("white");
     textSize(50);
     text ("YOU WON" ,90,200);
     rat.velocityX=0;
     rat.velocityY=0;
     stone.velocityY=0;
     }
   }
  drawSprites();
  if(mousePressedOver(restart)) {
    reset();
  }
}

function reset ()
{
    gameover.visible = false;
    restart.visible = false;
    ship.visible = true;
    alien.visible = true;

    score = 0;

    alien.velocityY=-5;
    alien.y=380;
}
function changeGame () 
{
  ship.visible = false;
  alien.visible = false;
  stone.visible = true;
  rat.visible = true;
  chees.visible = true;
  gameover.visible = false;
}