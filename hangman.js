//load npm package inquirer
var inquirer = require("inquirer");

//create prompt with series of questions
inquirer
    .prompt([
        //Here we create basic text prompt
        {
            type:"confirm",
            name: "playGame",
            message: "Would you like to play hangman?"
        }
    ]).then(function(response){

        if(response.playGame === true){
            //initialize the variable game to be a Game object
            var game = new Game();
            game.startGame();
        } else {
            console.log("Okay, maybe next time? Have a great day!")
        }
});

//Word constructor
function Word () {
    this.choices = ['apple', 'orange', 'pear'];
    this.num = Math.floor((Math.random() * this.choices.length) + 1) - 1;
    this.val = this.choices[this.num].split("");
    this.placeholder = [];
    this.buildPlaceholder = function (){

        var displayWord = [];

        //get the length of the word to guess
        //then create something looking like "_ _ _ _ _"
        for (var i = 0; i < this.val.length; i++){
            displayWord.push('_');
        }

        //put "_ _ _ _ _" it in placeholder
        this.placeholder = displayWord;
    };

    this.updatePlaceholder = function(theLetterGuessed, chosenLetter){

        var correctLetterGuessed = false;




        //going through two arrays in a for loop!
        for (var i = 0; i < this.placeholder.length; i ++){

            //compare
            // ['p','e','a','r']
            // ['_','_','_','_']

            if (this.val[i] === theLetterGuessed){
            // then update placeholder
                this.placeholder[i] = theLetterGuessed;

                correctLetterGuessed = true;
            }
        }

        if (correctLetterGuessed === false){
            chosenLetter.decreaseGuessesLeft();
            console.log("Wrong choice! You have this many guesses left: ", chosenLetter.guessLeft);
        }


        if (chosenLetter.guessLeft === 0){
            return console.log("Game Over!");
        }

        //console.log("the word", this.val.join(""), "the placeholder", this.placeholder.join(""));

        //compare here
        if (this.val.join("") === this.placeholder.join("")){
            console.log("You won");
            //reset game
            //var game2 = new Game();
            //game2.startGame();

        }
    }
}

//Letter constructor
function Letter(numGuess = 3){

    this.maxGuess = numGuess; //this won't be mutable
    this.guessLeft = numGuess; //this will be mutable
}

//Letter prototypes
Letter.prototype.resetGuessesLeft = function(){
    this.guessLeft = this.maxGuess;
};

Letter.prototype.decreaseGuessesLeft = function(){
    this.guessLeft--;
};


// //Game constructor
function Game () {

    this.startGame = function (){

        console.log("Welcome to Hangman");

            //selects word from my array
            var chosenWord = new Word();

            var chosenLetter = new Letter();

            //creates placeholder (underscores)
            chosenWord.buildPlaceholder();

            processGame(chosenWord, chosenLetter);

    };

    function processGame(chosenWord, chosenLetter){

        console.log("The word now looks like this: ", chosenWord.placeholder.join(" "));

        inquirer.prompt([
            {
                name: "name",
                message: "Guess a letter!"
            }
        ]).then(function (answer) {

            chosenWord.updatePlaceholder(answer.name, chosenLetter);

            processGame(chosenWord, chosenLetter);


        });
    }
}

Game.prototype.losingGame = function (){};
Game.prototype.winGame = function (){};