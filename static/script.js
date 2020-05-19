class BoggleGame {
    // new game instance
    constructor(boardId) {
        // # create ID for game instance
        this.board = $("#" + boardId);
        this.guesses = new Set()
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
             this.messageToPlayer("Duplicate word","error");
             return;
         }
         // add guess to set - *** code is different from solution ***
         this.guesses.add(word_guess)
            console.log(this.guesses)


         //check if guess is a valid word on the server
         const resp = await axios.get("/player_guess", { params: { word_guess: word_guess}});
         if (resp.data.result === "not-word") {
             console.log('not valid word')
             this.messageToPlayer(`${word_guess} is not a valid word`, "error")
         } else if (resp.data.result === "not-on-board") {
             console.log("not a valid game word")
             this.messageToPlayer(`${word_guess} is not included on board`)
         } else {
             console.log('match')
             this.messageToPlayer(`Great job!`, 'match')
         }
    }
    // show message to player
    messageToPlayer(message, messageType) {
        $(".message", this.board).text(message).addClass(`message, ${messageType}`)
    }
}