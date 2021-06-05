var balloonImg, balloon,bgImg;
var position, database;

function preload(){
  bgImg = loadImage("cityImage.png");
  balloonImg = loadAnimation("hotairballoon1.png","hotairballoon1.png","hotairballoon2.png","hotairballoon2.png","hotairballoon3.png","hotairballoon3.png")
}

function setup(){
    database = firebase.database();
    
    createCanvas(850,560);
    
    

    bg = createSprite(width/2,height/2,1200,600);
    bg.addImage(bgImg);
    bg.scale = 0.35
    

    balloon = createSprite(250,600,10,10);
    balloon.addAnimation("rotating_balloon",balloonImg);
    balloon.scale=0.5;

    var balloonPosition = database.ref('balloon/position');
    balloonPosition.on("value",readPosition,showError);
}

function draw(){
  background.velocityX = -3;
  if(background.x < 0){
    background.x = background.width/2;
  }
    

    if(position !== undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-3,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(3,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-3);
            balloon.scale -= 0.0035;
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+3);
            balloon.scale += 0.0035;
        }
    
    drawSprites();
    }
    textFont("CASTELLAR");
    fill("blue")
    textAlign(CENTER);
    textSize(25)
    text("Use the arrow keys to move the hot air balloon!",width/2,100)
}

function writePosition(x,y){
    database.ref("balloon/position").set(
        { 
            'x':position.x+x,
            'y':position.y+y
        }
    )
}
function readPosition(data){
    position = data.val();
    console.log(position);
    balloon.x=position.x;
    balloon.y=position.y;
}
function showError(){
    console.log("error");    
}