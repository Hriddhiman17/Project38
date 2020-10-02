var stone_Img, score, monkey, monkey_Eating, monkey_Running, ground, banana_Img, backgr, background_Img;

function preload(){
  monkey_Running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_Eating = loadImage("Monkey.png");
  background_Img = loadImage("jungle2.jpg");
  banana_Img = loadImage("Banana.png");
  stone_Img = loadImage("stone.png");
}

function setup(){
  createCanvas(800, 400);
  
  backgr = createSprite(500, 100, 2400, 800);
  backgr.addImage(background_Img);
  backgr.velocityX = -6;
  monkey = createSprite(100, 340, 20, 50);
  monkey.addAnimation("Running", monkey_Running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.velocityX = -8;
  ground.visible = false;

  bananaGroup = createGroup();
  stoneGroup = createGroup();

  score = 0;

}
function draw(){
  background(255);

  if(ground.x<0) {
    ground.x=ground.width/2;
  }

  if(backgr.x<300) {
    backgr.x=backgr.width/2;
  }

  if(keyCode === 32 &&  monkey.y > 314){
    monkey.velocityY = -20;
  }

  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score += 1;
  }
  if(monkey.isTouching(stoneGroup)){
    stoneGroup.destroyEach();
    score -= 1;
  }
  monkey.velocityY += 0.8;
  
  monkey.collide(ground);
  
  drawSprites();
  spawnBananas();
  spawnObstacles();
  
  if(score <= -1){
    monkey.destroy();
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    backgr.velocityX = 0;
    
    textSize(24);
    stroke("red");
    fill("red");
    text("You aren't able to feed the monkey", 200, 200);
  }

  if(score >= 50){
    monkey.destroy();
    var monkey2 = createSprite(400, 350);
    monkey2.addImage(monkey_Eating);
    bananaGroup.destroyEach();
    stoneGroup.destroyEach();
    backgr.velocityX = 0;
    
    textSize(24);
    stroke("red");
    fill("red");
    text("Thanks for feeding the monkey", 200, 200);
  }

  textSize(24);
  stroke("green");
  fill("green");
  text("Bananas Collected : " + score, 500, 50);
}
function spawnBananas(){
  if(frameCount%60 === 0){
    var bananas = createSprite(800, random(50, 300), 50, 50);
    bananas.addImage(banana_Img);
    bananas.scale = 0.05;
    bananas.velocityX = -12;
    bananas.lifetime = 90;

    bananaGroup.add(bananas);
  }
}
function spawnObstacles(){
  if(frameCount % 179 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(stone_Img);    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;

    stoneGroup.add(obstacle);
  }
}
