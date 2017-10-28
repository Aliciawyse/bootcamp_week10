//
// function word (){
//     this.choices = ['apple', 'organge', 'pear'];
//     this.num = Math.floor((Math.random() * this.choices.length) + 1) - 1;
//     return this.choices[num];
// }

function Word (word){
    //this.guesses = [];
    this.letters = [];
    // make Letter for each letter in word
    word.split('').forEach((letter) => {
        this.letters.push(new Letter(letter))
    });

    this.guess = function (choice) {
        // checkValue each item in this.letters
        this.letters.forEach((letter) => {
            letter.checkValue(choice);
        });
        this.printWord();
    };

    this.printWord = function () {
        // loop on each letter and
        var word = this.letters.map(function (t) {
            return t.toString()
        }).join('');
        console.log(word);
    }
}

function Letter(letter){
    this.value = letter.toLowerCase();
    this.placeholder = '_';
    this.guessed = false;
    this.checkValue = function (choice) {
        this.guessed = this.guessed || choice.toLowerCase() === this.value;
    };
    this.toString = function () {
        // if guessed, show letter
        // if not guessed, show placeholder
        return this.guessed ? this.value : this.placeholder;
    }
}