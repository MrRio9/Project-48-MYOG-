var cat,catImg
var dog,dogImg
var canvas
var database
var backgroundImage
var player,form
var playerCount
var gameState
var fishImg,boneImg
var bugsImg
var fishGroup, boneGroup
var bugsGroup
var playerAll
var allPlayers
var lifeImg



function preload() {
  backgroundImage = loadImage("./assets/background.jpg");
  catImg= loadImage("./assets/Cat1.png")
  dogImg= loadImage("./assets/Dog1.png")
  fishImg= loadImage("./assets/fish.png")
  boneImg= loadImage("./assets/bone.png")
  bugsImg= loadImage("./assets/bugs.png")
  lifeImg= loadImage("./assets/life.png")
 
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.start();
  game.getState();
}

function draw() {
  background(backgroundImage);
  if(playerCount==2) {
   game.updateState(1)
  }
  if(gameState==1){
    game.play();
  }
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
