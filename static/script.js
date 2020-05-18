class BoggleGame {
    // new game instance
    constructor(boardId) {
        // # create ID for game instance
        this.board = $("#" + boardId);

        $(".add-word", this.board).on("submit", this.handleSubmitWord.bind(this));
    }
    // event handler for submitted word, collects word value
     async handleSubmitWord(e) {
        e.preventDefault();

         const $word = $(".word", this.board);

         let word = $word.val();
         console.log(word)
         // if (!word) return;

        // let $guessedWord = await axios.get(".player_guess", this.board)
        // console.log($guessedWord)
    }
}