//Create variables here
var dog, dogImage;
var happyDog, happyDogImage;
var foodStorage
var FoodValue = 20;

function preload() {
  //load images here
  dogImage = loadImage("dogImg.png");
  happyDogImage = loadImage("dogImg1.png");

}

function setup() {
  database = firebase.database();

  createCanvas(500, 800);
  dog = createSprite(250, height / 2, 50, 50);
  dog.addImage("dogImg", dogImage);
  dog.scale = 0.3;

  foodStorage = database.ref('Food');
  foodStorage.on("value", readStorage);

}

function draw() {
  background(46, 139, 87);

  if (keyWentUp(UP_ARROW)) {
    writeData(FoodValue);
    console.log(FoodValue);
    console.log("Data Saved 👍");
    dog.visible = false;

    happyDog = createSprite(250, height / 2, 50, 50);
    happyDog.addImage(happyDogImage);
    happyDog.scale = 0.3;

  }

  drawSprites();
  //add styles here

  textSize(20);
  fill("white");
  strokeWeight(2);
  stroke("black");
  text("Note : Press UP_ARROW key to feed Drago Milk", 30, 50);
  textSize(40);
  fill("black");
  text("Food remaining : " + FoodValue, 70, 200);
  text("Enjoy! 👍 ", 170, 600);

}

function writeData(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x--;
  }
  database.ref('/').update({
    'Food': x
  })
}

function readStorage(data) {
  FoodValue = data.val();
}

//  End  // 