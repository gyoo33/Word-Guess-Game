// Global variables:
var words = ["antigua", "bali", "bora bora", "capri", "grand cayman", "ibiza", "maldives", "maui", "mykonos", "ko samui", "santorini", "tahiti"];
var currentWord = "";
var guessingWord = [];
var numBlanks = 0;
var blanksAndLetters = [];
var wrongLetters = [];

var wins = 0;
var loss = 0;
var lives = 7;

// reset the game to a newGame, determine what word is to be guessed, random function to select from words array to start the game, make sure the correct spaces are showing for the guessing word

function startGame() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    guessingWord = currentWord.split("");
    numBlanks = guessingWord.length;

    // resets below variables
    lives = 7;
    wrongLetters = [];
    blanksAndLetters = [];

    // replaces success with correct # of blanks
    for(var i = 0; i < numBlanks; i++) {
        blanksAndLetters.push("_");
    }

    //change html
    document.getElementById("wordToGuess").innerHTML = blanksAndLetters.join(" ");
    document.getElementById("guessesRemaining").innerHTML = lives;
    document.getElementById("totalWins").innerHTML = wins;
    document.getElementById("remainingLetters").innerHTML = wrongLetters.join(" ");

    // debugging
    console.log(currentWord);
    console.log(guessingWord);
    console.log(numBlanks);
    console.log(blanksAndLetters);
}

// does the letter exist in the word
function checkForLetter(letter) {
    
    var letterInWord = false;

    for(var i = 0; i < numBlanks; i++) {
        if(currentWord[i] == letter) {
            letterInWord = true;
        }   
    }

// input the letter, if a match then add in letter, if not a match then reduce by 1 life
    if(letterInWord) {
        for(var i = 0; i < numBlanks; i++) {
            if(currentWord[i] === letter) {
                blanksAndLetters[i] = letter;
            }
        }
    }
    
    else {
        wrongLetters.push(letter);
        lives --;
    }

    // debugging
    console.log(blanksAndLetters);
}

// how to determine win vs loss and sets up the reset of game
function roundComplete (){
    document.getElementById("guessesRemaining").innerHTML = lives;
    document.getElementById("wordToGuess").innerHTML = blanksAndLetters.join(" ");
    document.getElementById("remainingLetters").innerHTML = wrongLetters.join(" ");
    
    // check win
    if (guessingWord.toString() == blanksAndLetters.toString()){
        wins++;
        alert("You won!");

    document.getElementById("totalWins").innerHTML = wins;

    startGame();
    }
    
    // check loss
    else if (lives == 0){
        loss ++;
        alert("You lost!")

        startGame();
    }
}

// starts game
startGame();

// onkeyup event to get letters guessed
document.onkeyup = function(event) {
    var guessingWord = String.fromCharCode(event.keyCode).toLowerCase();
    checkForLetter(guessingWord);
    roundComplete();
}
