class Food {
  constructor(){
  this.foodStock=0;
  this.lastFed;
  this.image=loadImage('Dog food.png');
  }

 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 getFedTime(lastFed){
   this.lastFed=lastFed;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){

     
      var x=10,y=200; 
      imageMode(CENTER);
      image(this.image,870,500,70,50);
      this.image.scale=0.5;
      if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=100;
          y=y+50;
        }
        image(this.image,x,y,70,50);
        x=x+70;
      }
    }
  }

  // bedroom(){
  //     background(bedroom,550,500);  
  // }
    
  // garden(){
  //     background(garden,550,500);  
  // } 

  // washroom(){
  //     background(washroom,550,500); 
  // }
}
