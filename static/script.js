class BoggleGame {
    // new game instance
    constructor(boardId) {
        // # create ID for game instance
        this.board = $("#" + boardId);
        this.guesses = new Set()
        this.score = 0;
        // this.gameTimer()
        // this.progressTimer = $(".timer")
        // console.log(progressTimer)

        $("#start", this.board).on("submit", this.gameTimer.bind(this))


        // $("#start").addEventListener('click', ev => this.OnEvent(e), this.board).onclick(function(e) {})
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

    // gameboard timer - 60 second progress bar

    gameTimer() {
        console.log('start game')
    }
    //     // e.preventDefault();
    //     // console.log('here');
    //     // let gameTime = $('.timer').progressBarTimer()
    //     // gameTime.start()
    //
    //     $('.progress').progressBarTimer({autostart: true})
    //
    //     // show final score on finish
    //     // onFinish:function() {}
    // }

    // gameTimer() {
    //     $("#progressTimer").progressTimer({
    //         timeLimit: 120,
    //         warningThreshold: 10,
    //         baseStyle: 'progress-bar-warning',
    //         warningStyle: 'progress-bar-danger',
    //         completeStyle: 'progress-bar-info',
    //         onFinish: function () {
    //             console.log("I'm done");
    //         }
    //     });
    // }
}