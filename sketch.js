var END = 0;
var PLAY = 1;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var jungle,bg;
var invisibleGround;
var crashSound,eatSound;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bg = loadImage("Screenshot (154).png")
  
  eatSound = loadSound("banana eating.mp3");
  crashSound = loadSound("crash.wav");

}


function setup() {
  
  createCanvas(600,400);
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  jungle = createSprite(200,200,400,400);
  jungle.addImage("jungle" , bg);
  jungle.scale = 0.98;
  
  monkey = createSprite(40,370,20,20)
  monkey.addAnimation("monkey" , monkey_running)
  monkey.scale = 0.1;
  
  invisibleGround = createSprite(50,400,100,10);
  invisibleGround.visible = false;
  
  score = 0;
}


function draw() {
  
  background("white");
  drawSprites();
  
  textSize(20);
  fill("red");
  text("SCORE = "+ score , 200,50)
  
  if(gameState === PLAY){
    food();
    opponent();
    
    monkey.visible = true;
    jungle.velocityX = -(7 + score/2);
    
    text("press SPACE to jump and G to come down quickly",10,100);
    
    if(monkey.isTouching(foodGroup)){
      score = score + 1;
      eatSound.play();
      foodGroup.destroyEach();
    }
    
    if(obstacleGroup.isTouching(monkey)){
      crashSound.play();
      gameState = END;
    }
    
  }

    else if(gameState === END){
    fill("BLUE")
    text("Well played!!",200,100)
    text("Press R to restart",180,130)
    monkey.visible = false;
    jungle.velocityX = 0;
    
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    
   if(keyDown("R")) {
      gameState = PLAY;
      restart();
    }
  }
  

  if (jungle.x < 0){
      jungle.x = jungle.width/2;
     
     }
  monkey.collide(invisibleGround);
  
    if(keyDown("space") && monkey.y >= 364){
       monkey.velocityY = -20;  
  }
      monkey.velocityY = monkey.velocityY + 0.8;
  
    if(keyDown("G")){
      monkey.velocityY = monkey.velocityY + 10;
    }
  
    if(monkey.y > 365){
      monkey.y = 364.3
    }
    
  
}
function restart(){
   obstacleGroup.destroyEach();
   foodGroup.destroyEach();
   score = 0;
}

function food(){
  if(frameCount % 100 === 0){
    var banana = createSprite(620,Math.round(random(120,180)),20,20)
    banana.addImage("banana" , bananaImage)
    banana.scale = 0.1;
    
    banana.velocityX = -(7 + score/2);
    
    banana.lifetime = 96;
    
    foodGroup.add(banana)
    
    }
}
function opponent(){
  if(frameCount % 120 === 0){
    var obstacle = createSprite(610,360,10,10);
    obstacle.addImage("obstacle" , obstacleImage);
    obstacle.scale = random(0.2,0.2);
    
    obstacle.velocityX = -(7 + score/2);
    
    obstacle.lifetime = 96;
  
    obstacle.setCollider("circle",0,10,170);
    
    obstacleGroup.add(obstacle);
  }
  
}




