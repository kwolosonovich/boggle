class BoggleGame {
    constructor() {
        $(.word_guess).on("submit", this.handleSubmit.bind(this));
    }
    // send word_guess to server
    // check for validity
}