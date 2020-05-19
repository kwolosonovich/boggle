from flask import Flask, request, render_template, redirect, session, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle


app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.debug = True
# app.config['TESTING'] = True
toolbar = DebugToolbarExtension(app)
# app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

boggle_game = Boggle()

@app.route('/', methods=["POST"])
def index():
    '''homepage, render game board'''
    board = boggle_game.make_board()
    session['board'] = board
    return render_template("index.html", board=board)

@app.route('/player_guess')
def player_guess():
    '''collects player guess and checks for validity'''
    word_guess = request.args['word_guess']
    print(word_guess)
    board = session["board"]
    response = boggle_game.check_valid_word(board, word_guess)
    print(response)

    return jsonify({'result': response})

