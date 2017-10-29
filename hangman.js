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
    this.val = this.choices[this.num];
    this.placeholder = [];
    this.guess = function (ltr) {
        //console.log("This is the word to guess was", this.val);
        //adjust so that if true replace underscore with letter if it's false
        if (this.val.indexOf(ltr) === -1) {
            //return [];
            return undefined;
        } else {
            //console.log(true);
            //return [this.val.indexOf(ltr)];
            return this.val.indexOf(ltr);
        }
    };
    this.buildPlaceholder = function (){

        var displayWord = [];

        //get the length of the word to guess
        //then create something looking like "_ _ _ _ _"
        for (var i = 0; i < this.val.length; i++){
            displayWord.push('_');
        }

        //put "_ _ _ _ _" it in placeholder
        this.placeholder = displayWord;
        console.log("the placeholder array", this.placeholder);


    }
}

//Letter constructor
function Letter(numGuess = 12){
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

Letter.prototype.guessLetter = function(){
    //guess letter
};

Letter.prototype.displayWord = function(){
    //display word
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

        //console.log(chosenWord.val);
        //console.log(chosenWord.guess('a'));
        console.log("The word now looks like this", chosenWord.placeholder);
        inquirer.prompt([
            {
                name: "name",
                message: "Guess a letter!"
            }
        ]).then(function (answer) {
            //theWord = chosenWord.val;

            console.log("answer", answer);
            var result = chosenWord.guess(answer.name);
            console.log(result);

            if (result === undefined) {
                //dont update dashes, decrease number of guesses left
                chosenLetter.decreaseGuessesLeft();
                console.log(chosenLetter.guessLeft);
            } else {

                //update placeholder
                chosenWord.placeholder[result] = answer.name;

                //var arr = []
                //arr = chosenWord.placeholder.trim().split(" ");

                //console.log("this is the array", arr);

                //review this
                //if (result !== undefined) arr[result] = answer.name;

                //console.log(arr);
                console.log(chosenWord.placeholder);

                //arr[2] = answer.na,e
                // if game needs to continue
                // call start game
                processGame(chosenWord, chosenLetter);
            }
        });
    };
}


// Game.prototype.startGame = function (){
//     console.log("Welcome to Hangman");
//     var chosenWord = new Word();
//     console.log(chosenWord.val);
// };
Game.prototype.losingGame = function (){};
Game.prototype.winGame = function (){};