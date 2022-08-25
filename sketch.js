var gamestate = 0
var VoidSaberDmg=[12, 15, 17, 20]
var crit=36
var AvailableSave=false
var ErrorMessage=false
var waitForInput=false
var controlSwitch=false
var PlayerAnimation=false
choice=0

TheBeginingMsg=["Once upon a Time..", "In a world that was full of peace", "Only for the chaos of the world to be released", "People refered the darkness to a wolf..", "A darkness was released from deep under..", "And covered the world..", "No one knows who caused it.", "But a path of light will shine the way,", "And take on the darkness of the deep..", "As the prophecy was fortold..", "They would conquer the darkness and free the light", "This is the story of", "HEART OF THE VOID"]
FallingSceneMsg = ["You can't remember anything from the past or why you are here..", "...", "You can't walk as you feel pain shooting through your body..", "..!", "You don't know what you did..", "But you feel better.."] //<6>

TheBeginingMsgNumber=1
FallingSceneMsgNumber=1

//Armour
var armours= ["Void Shield", "Bugged Shield", "NaN Shield"] 

//Weapons



//BATTLE
var health=100
var dmg=VoidSaberDmg
var def=25
Armour=armours[0]


//Auidiovisualization
var song
var fft
let texttimer=9


function preload(){
//Player
PlayerDown=loadAnimation("sprites/Player/WalkDown1.png", "sprites/Player/WalkDown2.png", "sprites/Player/WalkDown3.png", "sprites/Player/WalkDown4.png")
PlayerUp=loadAnimation("sprites/Player/WalkUp1.png", "sprites/Player/WalkUp2.png", "sprites/Player/WalkUp3.png", "sprites/Player/WalkUp4.png")
PlayerLeft=loadAnimation("sprites/Player/WalkLeft1.png", "sprites/Player/WalkLeft2.png")
PlayerRight=loadAnimation("sprites/Player/WalkRight1.png", "sprites/Player/WalkRight2.png")
PlayerFallImg=loadImage("Images/PlayerFall.png")
PlayerFall=loadImage("sprites/Player/Healed4.png")

//Music
wolves=loadSound("Music/WolvesSiamese.mp3")

//Fonts
Chiller=loadFont("Fonts/CHILLER.TTF")
pressStart=loadFont("Fonts/Ps2p.ttf")
VerminVibes=loadFont("Fonts/VerminVibes.ttf")

//Images
heart=loadImage("Images/Heart.png")
img=loadImage("Images/mainmenuimg.jpg")
//Loading Screen
LoadScreen=loadAnimation("Images/LoadScreen1.png", "Images/LoadScreen2.png")
LoadingImage=loadImage("Images/LoadScreen1.png")
//Triggers
TriggerAImg=loadImage("Triggers/TriggerA.png")
TriggerBImg=loadImage("Triggers/TriggerB.png")

Heal=loadSound("Sounds/Heal.wav")
TitleSplash=loadSound("Sounds/TitleSplash.wav")

Begining=loadSound("Music/begining.wav")
DontGiveUp=loadSound("Music/DontGiveUp.wav")
NewWorld=loadSound("Music/NewWorld.wav")
}



function setup(){
createCanvas(windowWidth,windowHeight)
fft = new p5.FFT()
img.filter(BLUR, 5)
LoadingImage.filter(BLUR, 15)

//Player
Player=createSprite(windowWidth/2,windowHeight/2,50,70)
Player.addImage(PlayerFallImg)
Player.addImage(PlayerFall)
Player.addAnimation("PlayerUp", PlayerUp)
Player.addAnimation("PlayerDown", PlayerDown)
Player.addAnimation("PlayerLeft", PlayerLeft)
Player.addAnimation("PlayerRight", PlayerRight)
Player.visible=true
Player.scale=2
player=Player
//player.debug=true
player.setCollider("rectangle",0,0,100,player.height)
player.visible=false

//Trigger A && B

//TRIGGER B
TriggerB=createSprite(0, windowHeight/2+200)
TriggerB.addImage(TriggerBImg)
TriggerB.visible=false
TriggerB.debug=true
TriggerB.scale=4
TriggerB.setCollider("rectangle",0,-10,30,70)

//TRIGGER A
TriggerA=createSprite(windowWidth,windowHeight/2+200)
TriggerA.addImage(TriggerAImg)
TriggerA.visible=false
TriggerA.debug=true
TriggerA.scale=4
TriggerA.setCollider("rectangle",0,-10,30,70)
Slide=createSprite(windowWidth/2+250,windowHeight/2+323)
Slide.shapeColor=44,46,68
Slide.visible=false

TopEdge=createSprite(windowWidth/2, -100, windowWidth, 500)
BottomEdge=createSprite(windowWidth/2, windowHeight+150, windowWidth, 500)

}



function draw(){
background(0,0,0)

text(gamestate,150,150)

//Gamestate 0
if(gamestate==0){
AudioVisualization()
}

//Gamestate 1
if(gamestate==1){
if(keyWentDown("ENTER")){
TheBeginingMsgNumber=TheBeginingMsgNumber+1
console.log(TheBeginingMsgNumber)
}
textFont(pressStart)
fill(255)
KeyTextIntro()

fill("gold")
textSize(12)
text("Press Enter To Continue...",windowWidth-200, windowHeight-30)


}

//Gamestate 2
if(gamestate==2){
//Background 
background(25, 0, 25)
fill(45, 0, 45);
//noStroke();
var diameter = 50;
for (var i=0; i<width/diameter; i=i+1) {
for (var j=0; j<height/diameter; j=j+1) {
noStroke()
rect(
diameter/2 + i * diameter,
diameter/2 + j * diameter,
// applying a different
//animation to each circle
diameter * noise(frameCount/100 +
j*10000 + i*10000),
// applying a different
//animation to each circle
diameter * noise(frameCount/100 +
j*10000 + i*10000)
);
}
}


textAlign(CENTER)
textFont(pressStart)
textSize(25)
fill("purple")
imageMode(CENTER)

//stroke(random(0, 255),random(0, 255),random(0, 255))
strokeWeight(5)
text("HEART OF THE VOID", windowWidth/2, 150)
textSize(15)
noStroke()
text("LOAD GAME", windowWidth/2, windowHeight/2)
text("NEW GAME", windowWidth/2, windowHeight/2+50)
text("EXIT GAME", windowWidth/2, windowHeight/2+100)

stroke(25)

if(choice==1){
fill("yellow")
text("LOAD GAME", windowWidth/2, windowHeight/2)
}
if(choice==0){
fill("yellow")
text("NEW GAME", windowWidth/2, windowHeight/2+50)
}
if(choice==-1){
fill("yellow")
text("EXIT GAME", windowWidth/2, windowHeight/2+100)
}

if(choice==1 && keyWentDown("ENTER") && AvailableSave==false){
ErrorMessage=true
}

if(choice==0 && keyWentDown("ENTER") && AvailableSave==true){
ErrorMessage=true
}


if(ErrorMessage==true && choice==1){
text("No Saves Available..", mouseX, mouseY)
}

if(ErrorMessage==true && choice==0){
fill("yellow")
text("This will overwrite your save.. Continue?", mouseX, mouseY)
}

if(ErrorMessage==true && choice==0){
if(keyWentDown("ENTER")){
gamestate=3
}
}

if(AvailableSave==false && choice==0){
if(keyWentDown("ENTER")){
gamestate=3
}
}


if(choice < -1){
choice=-1
}

if(choice > 1){
choice=1
}


choiceFunc()

}

if(gamestate==1 || gamestate==3){
if (Begining.isPlaying()) {
} else {
Begining.loop();
}
} else {Begining.stop()}

//Gamestate 3
if(gamestate==3){
Player.scale=Player.scale-0.03

if(Player.scale==0 || Player.scale < 0){
Player.visible=false

textAlign(CENTER)

textFont(pressStart)

fill(255)

if(keyWentDown("ENTER")){
FallingSceneMsgNumber=FallingSceneMsgNumber+1
}

KeyTextFall()

if(keyWentDown("ENTER") && FallingSceneMsgNumber==7){
gamestate=gamestate+1
Player.scale=0.5
Player.visible=true
Player.changeAnimation("PlayerLeft")
}

}

}

if(gamestate==4){
//Floor Design
rectMode(CENTER)
noStroke()
fill(95, 99, 137)
rect(windowWidth/2, windowHeight-200, windowWidth, 200)
fill(75, 78, 112)
rect(windowWidth/2, windowHeight, windowWidth, 200)


Player.frameDelay = 12
Player.scale = 0.3
Player.visible = true
controller()
controlSwitch=true
edges()


if(player.isTouching(TriggerB)){
gamestate=gamestate+1
player.x=TriggerA.x
}

//player.collide(TriggerA)

if(player.isTouching(TriggerA)){
    fill(0)
    stroke(255)
    strokeWeight(6)
    rect(windowWidth/2, windowHeight-200, 500,200)
    noStroke()
    fill(255)
    textFont(pressStart)
    textAlign(CENTER)
    text("*Theres nothing back here..!", windowWidth/2,windowHeight-200)
    controlSwitch=false
    Player.pause()
    if(keyWentDown("ENTER")){
    Player.velocityX=-24
    Player.play()
    }
}


}

if(gamestate==5){
//Floor Design
rectMode(CENTER)
noStroke()
fill(95, 99, 137)
rect(windowWidth/2, windowHeight-200, windowWidth, 200)
fill(75, 78, 112)
rect(windowWidth/2, windowHeight, windowWidth, 200)

controller()
controlSwitch=true
edges()

Player.setVelocity(0,0)
if(keyDown("LEFT_ARROW")){
Player.velocityX=-12
Player.changeAnimation("PlayerLeft")
}
if(keyDown("RIGHT_ARROW")){
Player.velocityX=12
Player.changeAnimation("PlayerRight")
}
if(keyDown("UP_ARROW")){
Player.velocityY=-12
Player.changeAnimation("PlayerUp")
}
if(keyDown("DOWN_ARROW")){
Player.velocityY=12
Player.changeAnimation("PlayerDown")
}

if(player.isTouching(TriggerB)){
gamestate=gamestate+1
player.x=TriggerA.x
}

Player.frameDelay = 12
Player.scale = 0.3

console.log("5")
}

if(gamestate==4 || gamestate==5 || gamestate==6){
if (NewWorld.isPlaying()) {
} else {
NewWorld.loop();
}
} else {NewWorld.stop();}

if(gamestate==6){
//Floor Design
rectMode(CENTER)
noStroke()
fill(95, 99, 137)
rect(windowWidth-300, windowHeight-200, windowWidth/2, 200)
fill(75, 78, 112)
rect(windowWidth-300, windowHeight, windowWidth/2, 200)

//Edges
fill(95, 99, 137)
rect(windowWidth/2+60, windowHeight/2+99,50,52)
rect(windowWidth/2+80, windowHeight/2+150,50,50)
rect(windowWidth/2+70, windowHeight/2+200,50,50)
rect(windowWidth/2+60, windowHeight/2+248,50,50)
fill(75, 78, 112)
rect(windowWidth/2+60, windowHeight/2+298,50,50)


Player.visible=true
controller()
controlSwitch=true
Player.collide(TopEdge)

Player.scale=0.3
Player.frameDelay = 12

Slide.visible=true

//TriggerB.visible=true
TriggerB.x=windowWidth/2
Player.collide(TriggerB)

if(Player.isTouching(Slide)){
fill(0)
stroke(255)
strokeWeight(6)
rect(windowWidth/2, windowHeight-200, 500,200)
noStroke()
fill(255)
textFont(pressStart)
textAlign(CENTER)
text("It's a long way down..", windowWidth/2,windowHeight-200)
controlSwitch=false
Player.pause()
if(keyWentDown("ENTER")){
PlayerAnimation=true
}
Player.depth=+999
} else {Player.depth=12}

if(PlayerAnimation==true){
player.velocityY=12
controlSwitch=false
Player.changeImage(PlayerFall)
}

if(Player.y > windowHeight){
gamestate=7
TitleSplash.play()
}

}

if(gamestate==7){
textSize(75)
textFont(VerminVibes)
fill("purple")
strokeWeight(15)
stroke(random(0,255),random(0,255),random(0,255))
textAlign(CENTER)
text("HEART OF THE VOID",windowWidth/2, windowHeight/2)
Slide.visible=false

if(keyWentDown("ENTER")){
text("Thank You For Playing")
window.close();
}

if(gamestate==7){
if (DontGiveUp.isPlaying()) {
} else {
DontGiveUp.loop();
}
}


}

TopEdge.visible=false
BottomEdge.visible=false

drawSprites()
}







function AudioVisualization(){
//AudioVisualization
stroke(255)
//stroke(random(0, 255), random(0, 255), random(0, 255)) //RAINBOW VISUALIZER
if(keyDown("ENTER")){
gamestate=1
}

noFill()

translate(width/2, height/2)

fft.analyze()
amp =fft.getEnergy(20, 200)

push()
if(amp > 230){
    rotate(random(-0.5, 0.5))
    stroke("blue")
}

if(amp > 230){
    rotate(random(-0.5, 0.5))
    stroke("blue")
}

imageMode(CENTER)

image(img, 0, 0, width, height)
tint(800)
stroke("red")
image(heart, 0, 0, 200,200)
pop()
var wave = fft.waveform()



for(var t =-1; t <= 1; t +=2){
    beginShape()
    for (var i = 0; i <= 180; i += 0.5){
        if(amp > 230){
            stroke("RED")
        }

        var index = floor(map(i, 0, 180, 0, wave.length -1))
        
        var r = map(wave[index], -1, 1, 150, 353)
        
        var x=r * sin(i) * t
        var y=r * cos(i)
        vertex(x,y)
    }
    endShape()    
}
//translate(x, y)
strokeWeight(5)
stroke("red")
textAlign(CENTER)
if (frameCount % 18 == 0 && texttimer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
    texttimer --;
}
//bps
fill(128, 0, 32)
textFont(Chiller)
stroke(0)
//noStroke()

if(texttimer==9){
    textSize(20)
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==8){
    textSize(30)
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==7){
    textSize(40)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==6){
    textSize(50)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==5){
    textSize(60)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==4){
    textSize(70)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==3){
    textSize(80)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==2){
    textSize(90)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==1){
    textSize(100)        
    text("HEART OF THE VOID", -10, 10)
    
}
if(texttimer==0|| texttimer < 0){
    textSize(200)        
    text("HEART OF THE VOID", -10, 10)
    textSize(20)
    fill(255)
    textFont(pressStart)
    text("ENTER", -10, 200)
    //enterbutton.visible=true
    
}

textSize(+5)
    if(gamestate==0){
    if (wolves.isPlaying()) {
        //text(gameState, 50,50)
    } else {
        wolves.loop();
    }
}

if(gamestate==0==false && wolves.isPlaying){
    wolves.pause()
}


}

function KeyTextIntro(){

textAlign(CENTER)

textSize(18)

if(TheBeginingMsgNumber==1){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==2){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==3){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==4){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==5){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==6){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==7){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==8){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==9){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==10){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==11){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==12){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==13){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
}
if(TheBeginingMsgNumber==13){
text(TheBeginingMsg[TheBeginingMsgNumber],windowWidth/2,windowHeight/2)
gamestate=gamestate+1
}
}

function KeyTextFall(){
if(FallingSceneMsgNumber==1){
text(FallingSceneMsg[0], windowWidth/2,windowHeight/2)
}
if(FallingSceneMsgNumber==2){
text(FallingSceneMsg[1], windowWidth/2,windowHeight/2)
}
if(FallingSceneMsgNumber==3){
text(FallingSceneMsg[2], windowWidth/2,windowHeight/2)
}

if(keyWentDown("ENTER") && FallingSceneMsgNumber==4){
Heal.play()
}

if(FallingSceneMsgNumber==4){
text(FallingSceneMsg[3], windowWidth/2,windowHeight/2)
}
if(FallingSceneMsgNumber==5){
text(FallingSceneMsg[4], windowWidth/2,windowHeight/2)
}
if(FallingSceneMsgNumber==6){
text(FallingSceneMsg[5], windowWidth/2,windowHeight/2)
}

}

function choiceFunc(){
if(keyWentDown("LEFT_ARROW")){
choice=choice-1
}
if(keyWentDown("RIGHT_ARROW")){
choice=choice+1
}

if(keyWentDown("UP_ARROW")){
choice=choice+1
}

if(keyWentDown("DOWN_ARROW")){
choice=choice-1
}

}

function controller(){
if(controlSwitch==true){
Player.setVelocity(0,0)
if(keyDown("LEFT_ARROW")){
Player.velocityX=-12
Player.changeAnimation("PlayerLeft")
}
if(keyDown("RIGHT_ARROW")){
Player.velocityX=12
Player.changeAnimation("PlayerRight")
}
if(keyDown("UP_ARROW")){
Player.velocityY=-12
Player.changeAnimation("PlayerUp")
}
if(keyDown("DOWN_ARROW")){
Player.velocityY=12
Player.changeAnimation("PlayerDown")
}
}else{Player.setVelocity(0,0)}
}

function edges(){
Player.collide(TopEdge)
Player.collide(BottomEdge)
}

//const intsmg = ['Once upon a time, the world was in perfect harmony', 'or was it really?', 'My name is Christian, I am a computer programmer under the hacker name "Aspen".', 'I have recently uncovered some horrific truth.', 'It turns out humanity is unknowingly trapped inside a simulated reality.', 'The world government has created this system to distract humans while growing in power.', 'They create chaos, division and illnesses to control the people.', 'Now they have grown into a power where they do not need us any longer and want us to be exterminated off the face of this planet.', 'I have been drawn into a rebellion against this worlds corrupt government, along with other people who have been freed from the system like yourself.', 'We must take this world back immediately for humanitys sake.', 'We do not have much time.'] //11 LINES
