class Player {

  constructor() {
    this.name = null
    this.index = null
    this.positionX = 0
    this.positionY = 0
    this.rank = 0
    this.score = 0
    this.fuel = 185
    this.life = 185
  }

  getCount() {
    var playerCountRef = database.ref("playerCount");
    playerCountRef.on("value", data => {
      playerCount = data.val();
    });
  }
  //Bp
  updateCount(count) {
    database.ref("/").update({
      playerCount: count
    });
  }
  addPlayer() {
    var playerIndex = "players/player" + this.index
    if(this.index==1){
      this.positionX=width-200
      this.positionY=height/2-100
    }
    else{
      this.positionX=width-200
      this.positionY=height/2+100
    }
    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,

    })

  }
  update() {
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).set({
      positionX: this.positionX,
      positionY: this.positionY,
      rank: this.rank,
      score: this.score,
      fuel: this.fuel,
      life: this.life

    })

  }
  static getPlayersInfo() {
    var playerInfo = database.ref("players")
    playerInfo.on("value", function (data) {
allPlayers = data.val()
    })
  }
  getCarsAtEnd(){
    var getCars=database.ref("carsAtEnd")
    getCars.on("value",data=>{
      this.rank=data.val()
    })
  }
  static updateCarsAtEnd(rank){
    database.ref("/").update({
    carsAtEnd:rank  
    })
    }


}