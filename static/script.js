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
            console.log('error')
            this.messageToPlayer("Duplicate word", "error");
            return;
        }
        // add guess to set - *** code is different from solution ***
        this.guesses.add(word_guess)
        console.log(this.guesses)


        //check if guess is a valid word on the server
        const resp = await axios.get("/player_guess", {params: {word_guess: word_guess}});
        if (resp.data.result === "not-word") {
            console.log('not valid word')
            this.messageToPlayer(`${word_guess} is not a valid word`, "error")
        } else if (resp.data.result === "not-on-board") {
            console.log("not a valid game word")
            this.messageToPlayer(`${word_guess} is not included on board`)
        } else {
            console.log('match')
            this.messageToPlayer(`Great job!`, 'match')
            // # add length of word to player score
            this.score += word_guess.length
            console.log(this.score)
            this.playerScore()
        }
    }

    // show message to player
    messageToPlayer(message, messageType) {
        $(".message", this.board).text(message).addClass(`message, ${messageType}`)
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
                console.log('if called')
            } else {
                console.log('else called')
                this.timeLeft -= 0.1;
                this.updateTimer();
            }
        }.bind(this), 100)
    }

    // update progress bar to show percentage of time remaining
    updateTimer() {
        console.log(this.timeLeft/60*100)
        $(".timer").css({width: `${this.timeLeft/60*100}%`})
    }
}