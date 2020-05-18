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
         // ckeck if word was submitted
         if (!word_guess) return;
         // check if word has already been submitted and is duplicate
         if (this.guesses.has(word_guess)) {
             console.log('error - this.guesses.has(word_guess)')
         }
         // add guess to set
         this.guesses.add(word_guess)
         console.log(this.guesses)
    }
}