const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, friend1,friend3;
var backgroundImg,platform;
var friend, slingshot;

var gameState = "onSling";
//var bg = "sprites/playground.jpg";
var score = 0;



function preload() {
    getBackgroundImg();
 // var  pig1image=loadImage("sprites/deepthi.png");
  //  var pig3image=loadImage("sprites/prashanth.png");   
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    friend1 = new Friend1(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    friend3 = new Friend3(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    friend = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(friend.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
       // console.log(hour);
       /*if(hour>=7 && hour<=16){
            console.log("school");
            noStroke();
            textSize(25);
            fill("white");
            text("Welcome to my school"  ,200, 50);
            console.log(text);

        }
        else{
            noStroke();
            textSize(25);
            fill("white");
            text("Welcome to my house", 200, 50);
        }*/
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    friend1.display();
  //  pig1image( 810,350, 50, 50);
    friend1.score();
    log1.display();

    box3.display();
    box4.display();
    friend3.display();
   // pig3image( 810,220, 50, 50);
    friend3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    friend.display();
    //console.log(friend.body.speed);
    platform.display();
    //log6.display();
    slingshot.display();    

}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(friend.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
        if( keyCode === 32 && friend.body.speed<1 || friend.body.speed>27){
        friend.trajectory=[];
        Matter.Body.setPosition(friend.body,{x:200,y:50});
        image(friend.image,200,50);
       slingshot.attach(friend.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    console.log(hour);
    
    if(hour>=7 && hour<=16){
        
        noStroke();
        textSize(25);
              
        fill("white");
       
       console.log("hello for day");
        
        bg = "sprites/playground.jpg";
       
    }
    else{
        noStroke();
        textSize(25);
        fill("white");
        
        console.log("hello night");
        bg = "sprites/house.jpg";
       

    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}