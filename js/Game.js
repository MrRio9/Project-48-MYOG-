class Game {
    constructor() {
      this.resetTitle=createElement("h2")
      this.resetButton=createButton("")
      this.leaderboardTitle=createElement("h2")
      this.leader1=createElement("h2")
      this.leader2=createElement("h2")
      this.playerMoving= false
      this.leftKeyActive= false
      this.blast= false
    }
    start() {
      player = new Player();
      playerCount=player.getCount();
      form=new Form()
      form.display()
      dog= createSprite(width-200, height/2-100)
      dog.addImage("dog",dogImg)
      dog.scale=0.1
      cat= createSprite(width-200, height/2+100)
      cat.addImage("cat",catImg)
      cat.scale=0.1
      playerAll = [dog,cat]
      fishGroup= new Group()
      boneGroup= new Group()
      bugsGroup= new Group()
      this.addSprites(fishGroup,4,fishImg,0.1)
      this.addSprites(boneGroup,19,boneImg,0.1)
     
      var obsPosition=[{x:width/2+250,y:100,image:bugsImg},{x:width/2+150,y:200,image:bugsImg},
        {x:width/2+180,y:500,image:bugsImg},{x:width/2-180,y:600,image:bugsImg},
        {x:width/2,y:250,image:bugsImg},{x:width/2,y:350,image:bugsImg},
        {x:width/2-180,y:450,image:bugsImg},{x:width/2+250,y:550,image:bugsImg}]
        this.addSprites(bugsGroup,obsPosition.length,bugsImg,0.2,obsPosition)
  
    }

    getState(){
     database.ref("gameState").on("value",function(data){
         gameState= data.val()
         
     })
    }

    updateState(state){
        database.ref("/").update({
            gameState:state
        })
    }

    handleElements(){
      form.hide()
      form.titleImg.position(40,60)
      form.title.position(20,5)
      form.title.class("titleAfterEffect")
      form.titleImg.class("gameTitleAfterEffect")
      this.resetTitle.html("Reset game")
      this.resetTitle.class("resetText")
      this.resetTitle.position(width/2+200,40)
      this.resetButton.class("resetButton")
      this.resetButton.position(width/2+230,100)
      this.leaderboardTitle.html("Leaderboard")
      this.leaderboardTitle.class("resetText")
      this.leaderboardTitle.position(width/3-60,40)
      this.leader1.class("resetText")
      this.leader1.position(width/3-50,80)
      this.leader2.class("resetText")
      this.leader2.position(width/3-50,130)
    }
    
    handleReset(){
    this.resetButton.mousePressed(()=>{
      database.ref("/").set({
        playerCount:0,
        gameState:0,
        players:{},
        carsAtEnd:0
      })
      window.location.reload()
    })
    }

    showLeaderboard(){
      var Leader1,Leader2
      var players=Object.values(allPlayers)
      if((players[0].rank==0&&players[1].rank==0)||players[0].rank==1){
        Leader1=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
        Leader2=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
      }
      if(players[1].rank==1){
        Leader1=players[1].rank+"&emsp;"+players[1].name+"&emsp;"+players[1].score
        Leader2=players[0].rank+"&emsp;"+players[0].name+"&emsp;"+players[0].score
      }
      this.leader1.html(Leader1)
      this.leader2.html(Leader2)
    }

    addSprites(spritesGroup,NumberOfSprites,spriteImage,scale,positions=[]){
      for(var i=0; i<NumberOfSprites;i++){
        var x,y
        if(positions.length>0){
          x=positions[i].x
          y=positions[i].y
          spriteImage=positions[i].image 
        }
        else{
        x=random(0,width)
        y=random(0,height)
        }
        var sprite =createSprite(x,y)
        sprite.addImage("Sprite",spriteImage)
        sprite.scale=scale
        spritesGroup.add(sprite)      
      }
    }
    handleFishs(index){
      playerAll[index-1].overlap(fishGroup,function(collector,collected){
        player.fuel=185
        collected.remove()
      })
      if(player.fuel>0&&this.playerMoving){
        player.fuel-=0.3
      }
      if(player.fuel<=0){
        gameState=2
        this.gameOver();
      }
      
    }
  
    handleBones(index){
      playerAll[index-1].overlap(boneGroup,function(collector,collected){
        player.score+=20
        player.update()
        collected.remove()
      })
  
    }

    handlePlayerControl(){

        
        if(keyIsDown(UP_ARROW)){
          player.positionY-=10
          player.update()
          this.playerMoving= true
        }
        if(keyIsDown(LEFT_ARROW)){
          player.positionX+=10
          player.update()
          this.leftKeyActive= true
        }
        if(keyIsDown(RIGHT_ARROW)){
          player.positionX-=10
          player.update()
          this.leftKeyActive = false
        }
        if(keyIsDown(DOWN_ARROW)){
          player.positionY+=10
          player.update()
          this.playerMoving= true
        
        }
      
      
        }
        showRank(){
          swal({
            title: `Awesome! Very Great!${"\n"}Rank${"\n"}${player.rank}`,
            text: `You have reached the finish line successfully!`,
            imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
      
          })
        }
        gameOver(){
          swal({
            title: `Game Over!`,
            text: `Oh no! You ran out of fuel! Try again!`,
            imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
            imageSize: "100x100",
            confirmButtonText:"Thanks For Playing!"
      
          })
        }

        showLife(){
          push();
          image(lifeImg,70,200,30,30)
          fill("white")
          rect(100,200,185,20)
          fill("red")
          rect(100,200,player.life,20)
          noStroke()
          pop();
        }
      
        showFuel(){
          push();
          image(fishImg,70,300,40,40)
          fill("white")
          rect(100,300,185,20)
          fill("yellow")
          rect(100,300,player.fuel,20)
          noStroke()
          pop();
        }

        handleObstacleCollision(index){
          if(playerAll[index-1].collide(bugsGroup)){
            if(player.life>0){
              player.life-=185/4
            }
            if(this.leftKeyActive){
              player.positionX+=100
            }
            else{
              player.positionX-=100
            }
            player.update();
          }
          
        }
      
        handleCarCollision(index){
        if(index==1){
          if(playerAll[index-1].collide(playerAll[1])){
            if(this.leftKeyActive){
              player.positonX+=100
            }
            else{
              player.positionX-=100
            }
            if(player.life>0){
              player.life-=185/4
            }
            player.update();
          }
        } 
        if(index==2){
          if(playerAll[index-1].collide(playerAll[0])){
            if(this.leftKeyActive){
              player.positionX+=100
            }
            else{
              player.positionX-=100
            }
            if(player.life>0){
              player.life-=185/4
            }
            player.update();
          }
        }
        }

    play(){
    this.handleElements()
    this.handleReset()
    Player.getPlayersInfo()
    if(allPlayers!==undefined){
      var index=0
      for(var plr in allPlayers){
        index=index+1
        var x= width-allPlayers[plr].positionX
        var y = allPlayers[plr].positionY 
        this.showLeaderboard();
        this.showFuel();
        this.showLife();
        var currentLife= allPlayers[plr].life
        playerAll[index-1].position.x=x
        playerAll[index-1].position.y=y
       if(index==player.index){
         stroke(10)
         fill("green")
         ellipse(x,y,60,60)
         this.handleBones(index)
         this.handleFishs(index)
         this.handleObstacleCollision(index)
         this.handleCarCollision(index)
         camera.position.x=playerAll[index-1].position.x
         camera.position.y=playerAll[index-1].position.y
       }
       
      
      }
      this.handlePlayerControl();
       const finishLine=width*6
     if(player.positionY>finishLine){
      gameState=2
      player.rank+=1
      Player.updateCarsAtEnd(player.rank);
      player.update();
      this.showRank();
     }
    }
    drawSprites();
    }


    

}