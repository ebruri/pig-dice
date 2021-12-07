//business logic
function Player(name, score, active){
  this.name = name;
  this.score = score;
  this.active = active;
};
Player.prototype.addScore = function(number){
  this.score = this.score + number;
};
function rollDice(){
  return Math.round(Math.random() * 5) + 1;
};
function updateScore(number, player){
  if(number === 1){
    player.score = 0;
  } else{
    player.addScore(number);
  }
};
function changeRound(player1, player2){
  if(player1.active === true){
    player1.active = false;
    player2.active = true;
  } else{
    player1.active = true;
    player2.active = false;
  }
};
function checkActivePlayer(player1, player2){
  if(player1.active === true){
    return player1;
  } else {
    return player2;
  }
}

function emptyForm(){
  $("#roll").html("");
  $("#current-score").html("");
};
//UI Logic--------------------------------------------------------

$(document).ready(function(){
  let dice = 0;
  let player1 = new Player("player1", 0, true);
  let player2 = new Player("player2", 0, false);
  let activePlayer = checkActivePlayer(player1, player2);
  let roundCounter = 1;
  $("#current-player-name").html("The current player is: " + activePlayer.name);
  $("#dice").click(function(){
    dice = rollDice();
    $("#roll").html("You rolled a: " + dice);
    if(dice === 1){
      changeRound(player1, player2);
      if(activePlayer.name === "player1"){
        player1.score = 0;
        $("#player1-score").append("Round " + roundCounter + " score: " + activePlayer.score + "<br>");
        emptyForm();
      } else if(activePlayer.name === "player2"){
        player2.score = 0;
        $("#player2-score").append("Round " + roundCounter + " score: " + activePlayer.score + "<br>")
        emptyForm();
        roundCounter++;
      }
      activePlayer = checkActivePlayer(player1, player2);
      $("#current-player-name").html("The current player is: " + activePlayer.name);
    }
    updateScore(dice, activePlayer);
    $("#current-score").html("Your current score is: " + activePlayer.score);
  })

  $("#finish").click(function(){
    if(activePlayer.name === "player1"){
      $("#player1-score").append("Round " + roundCounter + " score: " + activePlayer.score + "<br>");
      emptyForm();
      player1.score = 0;
    } else if(activePlayer.name === "player2"){
      $("#player2-score").append("Round " + roundCounter + " score: " + activePlayer.score + "<br>")
      emptyForm();
      player2.score = 0;
      roundCounter++;
    }
    changeRound(player1, player2);
    activePlayer = checkActivePlayer(player1, player2);
    $("#current-player-name").html("The current player is: " + activePlayer.name);
  })
})