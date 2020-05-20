class BoggleGame {
    // new game instance
    constructor(boardId) {
        // # create ID for game instance
        this.board = $("#" + boardId);
        this.guesses = new Set()
        this.score = 0;
        this.timeLeft = 60;
        this.setGameTimer();

        $(".player-guess", this.board).on("submit", this.handleSubmitWord.bind(this));
    }

    // event handler for submitted word, collects word value
    async handleSubmitWord(e) {
        e.preventDefault();

        const $word_guess = $(".word_guess", this.board);
        let word_guess = $word_guess.val();
        // check if word was submitted
        if (!word_guess) return;
        // check if word has already been submitted
        if (this.guesses.has(word_guess)) {
            this.messageToPlayer("Duplicate word", "alert-danger");
            return;
        }
        // add guess to set - *** code is different from solution ***
        this.guesses.add(word_guess)
        //check if guess is a valid word on the server
        const resp = await axios.get("/player_guess", {params: {word_guess: word_guess}});
        // return validity message to player
        if (resp.data.result === "not-word") {
            this.messageToPlayer(`${word_guess} is not a valid word`, "alert-danger")
        } else if (resp.data.result === "not-on-board") {
            this.messageToPlayer(`${word_guess} is not included on board`)
        } else {
            this.messageToPlayer(`Great job!`, 'alert-success')
            this.score += word_guess.length   // # add length of word to player score
            this.showWords(word_guess)   // add word to word bank
            this.playerScore()   // update player score
        }
    }

    // show message to player
    messageToPlayer(message, messageType) {
        $(".message", this.board).text(message).addClass(`message, ${messageType}`)
    }

    // show guesses
    showWords(word_guess) {
        $(".word-bank", this.board).append($(`<h5>${word_guess}</h5>`))
    }

    // show and update player score
    playerScore() {
        $(".score", this.board).text(this.score);
    }

    // set game timer to start at 60 seconds and call updateTimer() until time left is 0
    setGameTimer() {
        this.timerId = setInterval(function() {
            if (this.timeLeft <= 0){
                clearInterval(this.timerId)
                this.gameOver()
            } else {
                this.timeLeft -= 0.1;
                this.updateTimer();
            }
        }.bind(this), 100)
    }

    // update progress bar to show percentage of time remaining
    updateTimer() {
        $(".timer").css({width: `${this.timeLeft/60*100}%`})
    }

     async gameOver() {
         $(".word-bank", this.board).hide()
         $(".player-guess", this.board).hide()
         const resp = await axios.post('/post-score', {score: this.score});
        if (resp.data.highest_score) {
            this.messageToPlayer(`New high score is ${this.score}!`, "alert-success")
            $(".high-score", this.board).text(this.score);
        } else {
            this.messageToPlayer(`Your score is ${this.score}!`, "alert-info")
        }
    }
}