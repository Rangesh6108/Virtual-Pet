var dog,sadDog,happyDog,garden,washroom, database;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState,readState;
var bgimg;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
bgimg=loadImage("BG.jpg");
}

function setup() {
  database=firebase.database();
  createCanvas(1500,1000);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(1000,500,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("Feed the dog");
  feed.position(1000,200);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,200);
  addFood.mousePressed(addFoods);
}

function draw() {
  background(bgimg);

  foodObj.display();

  strokeWeight(4);
  stroke("white");  
  fill("black");
  textSize(50);
  if(lastFed>=12){
      text("Last Feed : "+ lastFed%12 + " PM", 50,50);
  }else if(lastFed==0){
      text("Last Feed : 12 AM",50,30);
  }else{
      text("Last Feed : "+ lastFed + " AM", 50,50);
  }

  
   
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}