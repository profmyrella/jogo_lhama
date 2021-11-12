
var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=1;

var joshua,monstro,gBelinha,gMonstro, placar,r, posicao, back, backImg;
var joshuaImg , belinha, belinhaImg, imgMonstro, imgFimdeJogo;
var somFimdeJogo;

function preload(){
  backImg = loadImage("background.jpg");
  joshuaImg = loadImage("joshua.png");
  imgMonstro = loadImage("monstro.png");
  belinhaImg = loadImage("belinha.png");
  imgFimdeJogo = loadImage("gameover.png");
  
  somFimdeJogo = loadSound("gameover.mp3");
 
}



function setup() {
  createCanvas(600, 600);
  
  back = createSprite(300,300);
  back.addImage(backImg);
  back.scale = 1.5;
  
  //criando a faca
   joshua=createSprite(40,200,20,20);
   joshua.addImage(joshuaImg);
   joshua.scale=0.25;
  
  
  
 //definir função collider para a faca
  joshua.setCollider("rectangle",0,0,40,40);

 // Placar, variáveis e grupos
  placar=0;
  gBelinha=createGroup();
  gMonstro=createGroup();
  
}

function draw() {
  background("lightblue");
  

  
  if(estadoJogo===JOGAR){
    
    //Chamar as funções frutas e Monstros
    fbelinha();
    Monstro();
    
    // Mover a faca com o mouse
    joshua.y=World.mouseY;
    joshua.x=World.mouseX;
  
  
    if(gBelinha.isTouching(joshua)){
      gBelinha.destroyEach();
      placar=placar+1;
    }
    else
    {
      if(gMonstro.isTouching(joshua)){
        estadoJogo=ENCERRAR;
        //som de fim de jogo
        somFimdeJogo.play()
        
       gBelinha.destroyEach();
        gMonstro.destroyEach();
        gBelinha.setVelocityXEach(0);
        gMonstro.setVelocityXEach(0);
        

       joshua.addImage(imgFimdeJogo);
        joshua.scale=2;
        joshua.x=300;
        joshua.y=300;
      }
    }
  }
  
  drawSprites();
  //Exibir placar
  textSize(25);
  fill("green");
  stroke("black");
  text("Placar : "+ placar,250,50);
  textSize(30);
  
  text("Parabéns Luiz Eduardo! 13/11/2021 ", 50,550);
}


function Monstro(){
  if(World.frameCount%200===0){
    monstro=createSprite(400,200,20,20);
    monstro.addImage(imgMonstro);
    monstro.scale = 0.1;
    monstro.y=Math.round(random(100,550));
    monstro.velocityX=-(8+(placar/10));
    monstro.setLifetime=50;
    
    gMonstro.add(monstro);
  }
}

function fbelinha(){
  if(World.frameCount%20===0){
    position = Math.round(random(1,2));
    belinha=createSprite(400,200,20,20);
   belinha.scale = 0.15;
    if(posicao==1)
    {
    belinha.x=600;
    belinha.velocityX=-(7+(placar/4));
    }
    else
    {
      if(posicao==2){
      belinha.x=0;

     belinha.velocityX= (7+(placar/4));
      }
    }
    belinha.addImage(belinhaImg);
    
     //fruta.debug=true;
    
    
    belinha.y=Math.round(random(50,550));
    belinha.x=Math.round(random(50,550));
    
    belinha.setLifetime=100;
    
    gBelinha.add(belinha);
  }
}