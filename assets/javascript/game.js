// Grab reference 
var placeholdersId = document.getElementById("placeholders");
var guessesLettersId = document.getElementById("guesses-letters");
var guessesLeftId = document.getElementById("guesses-left");
var winsId = document.getElementById("wins");
var lossesId = document.getElementById("losses");
var messageId = document.getElementById("message")
//create var for game (wordBank, wins, losses, picked word, guesses left, game running, picked word placeholder, guessed letter bank, incorrect letter bank)
var game = {
    wordBank: ["Headlines", "One dance", "Work", "Hotline bling", "Best i ever had", "Started from the bottom", "Forever", "Nice for what", "Take care", "God plan", "In my feeling", "Im upset", "Finesse", "I got my eyes on you", "Find your love", "Controlla", "Passionfruit", "Over", "Successful", "No new friends"],
    wins: 0,
    losses: 0,
    guessesLeft: 10,
    gameRunning: false,
    pickedWord: '',
    pickedWordPlaceholderArr: [],
    guessedletterBank: [],
    incorrectLetterBank: [],
    //new gamw
    newGame: function () {
        this.gameRunning = true;
        this.guessesLeft = 10;
        this.guessedletterBank = [];
        this.incorrectLetterBank = [];
        this.pickedWordPlaceholderArr = [];
        // pick a new word

        this.pickedWord = this.wordBank[Math.floor(Math.random() * this.wordBank.length)];

        // create placeholders out of new pickedword
        for (var i = 0; i < this.pickedWord.length; i++) {
            if (this.pickedWord[i] === ' ') {
                this.pickedWordPlaceholderArr.push(' ');
            } else {
                this.pickedWordPlaceholderArr.push('_');
            }
        }

        //write all new game info
        guessesLeftId.textContent = this.guessesLeft;
        placeholdersId.textContent = this.pickedWordPlaceholderArr.join('');
        guessesLettersId.textContent = this.incorrectLetterBank;
    },

    // letterGuess function, takes in the letter your pressed and sees if it's in the selected word
    letterGuess: function (letter) {
        console.log(letter);

        if (this.gameRunning === true && this.guessedletterBank.indexOf(letter) === -1) {
            this.guessedletterBank.push(letter);
            for (var i = 0; i < this.pickedWord.length; i++) {
                if (this.pickedWord[i].toLowerCase() === letter.toLowerCase()) {
                    this.pickedWordPlaceholderArr[i] = this.pickedWord[i];
                }
            }

            placeholdersId.textContent = this.pickedWordPlaceholderArr.join('');
            // pass letter into our checkIncorrect function
            this.checkIncorrect(letter);
        } else {
            if (!this.gameRunning) {
                alert("Click the button to start a new game, ");
            } else {
                alert("you already guessed this letter");
            };
        }
    },
    // checkIncorrect
    checkIncorrect: function (letter) {
        // check to see if letter didn't make it into the word pick
        if (this.pickedWordPlaceholderArr.indexOf(letter.toLowerCase()) === -1 && this.pickedWordPlaceholderArr.indexOf(letter.toUpperCase()) === -1) {
            this.guessesLeft--;
            this.incorrectLetterBank.push(letter);
            guessesLettersId.textContent = this.incorrectLetterBank.join(' ');
            guessesLeftId.textContent = this.guessesLeft;
        }
        this.checkLose();
    },
    // checkLose
    checkLose: function () {
        if (this.guessesLeft === 0) {
            this.losses++;
            this.gameRunning = false;
            lossesId.textContent = this.losses;
            placeholdersId.textContent = this.pickedWord;
        }
        this.checkWin();
    },
    // checkWin
    checkWin: function() {
        if (this.pickedWord.toLowerCase() === this.pickedWordPlaceholderArr.join('').toLowerCase()) {
            this.wins++;
            this.gameRunning = false;
            winsId.textContent = this.wins;
        }
    }
};

messageId.addEventListener('click', function() {
    game.newGame();
})

document.onkeyup = function(event) {
    console.dir(event);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
        game.letterGuess(event.key);
    }
}