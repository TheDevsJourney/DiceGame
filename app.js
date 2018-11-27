var scores, roundScore, activePlayer, playingTo;
var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");
var btnNew = document.querySelector(".btn-new");
var rolls = [];
var playTo = document.querySelector("#playTo");
var playToInput = document.querySelector("#playTo input");
var playToButton = document.querySelector("#playTo a");
var showPlayingToValueSpan = document.querySelector("#showPlayingToValue span")


init();

// See what they players want to play to and change the playingTo value to the inputvalue as long as its a number greater than 0.
playTo.addEventListener("submit", function(){
    init();
    setPlayingTo();
});

playToButton.addEventListener("click", function(){
    init();
    setPlayingTo();
});

// Click event for play button.
btnRoll.addEventListener("click", function(){
    document.querySelector(".dice").style.display = 'initial';
    if(scores[activePlayer] < playingTo){
        rollDice();
    }else{
        document.querySelector(".dice").style.display = 'none';
    }
});

function setPlayingTo(){
    if(Number(playToInput.value)  > 0){
        playingTo = playToInput.value;
        showPlayingToValueSpan.textContent = playingTo;
    }else if(Number(playToInput.value)  === 0){
        alert("Enter a value greater than 0");
    }else{
        alert("enter a number idiot");
    }
    playTo.reset();
}

// Rolls the dice and changes the current value for the active player
function rollDice(){
    var dice = Math.floor(Math.random() * 6) + 1;
    var imgURL = "dice-" + dice + ".png";
    document.querySelector(".dice").src = imgURL;

    // Add each roll to an array.
    rolls.push(dice);
    console.log(rolls);
    // Check if the player rolls two sixes in a row, if so, reset their score and call the next player function.
    if(rolls[rolls.length - 1] === 6 && rolls[rolls.length - 2] === 6){
        alert("it happened!");
        scores[activePlayer] = 0;
        document.querySelector("#score-" + activePlayer).textContent = 0;
        nextPlayer();
    }
    // Update round score if roll !== 1
    else if(dice !== 1){
        // Add score
        roundScore += dice;
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    }else{
        nextPlayer();
    };
};

// Click event for hold button.
btnHold.addEventListener("click", function(){
    if(scores[activePlayer] < playingTo){
        hold();
    }
});

btnNew.addEventListener("click", init);

function hold(){
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    // Check if player won the game
    if(scores[activePlayer] >= playingTo){
        gameWinner();
    }else{
        nextPlayer();
    }
};

function nextPlayer(){
    // Next players turn
    activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
    roundScore = 0;

    // Set roll back to an empty array, just incase the player holds after rolling a 6. 
    // If the next player rolls and gets a 6, without setting the array to empty, it would think they rolled two 6's in a row.
    rolls = [];

    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = 'none';
};

function gameWinner(){
    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = 'none';
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
};

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    playingTo = 30;
    document.querySelector("#score-0").textContent = 0;
    document.querySelector("#score-1").textContent = 0;
    document.querySelector("#current-0").textContent = 0;
    document.querySelector("#current-1").textContent = 0;
    document.querySelector(".dice").style.display = 'none';
    document.querySelector("#name-0").textContent = "PLAYER 1";
    document.querySelector("#name-1").textContent = "PLAYER 2";
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
    showPlayingToValueSpan.textContent = playingTo;
};