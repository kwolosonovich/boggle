class BoggleGame {
    // new game instance
    constructor(boardId) {
        // # create ID for game instance
        this.board = $("#" + boardId);

        $(".player-guess", this.board).on("submit", this.handleSubmitWord.bind(this));
    }
    // event handler for submitted word, collects word value
     async handleSubmitWord(e) {
        e.preventDefault();

         const $word_guess = $(".word_guess", this.board);

         let word_guess = $word_guess.val();
         console.log(word_guess)

    }
}