from flask import Flask, request, render_template, redirect, session
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.debug = True
# app.config['TESTING'] = True
toolbar = DebugToolbarExtension(app)
# app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

@app.route('/')
def index():
    '''homepage, render game board'''
    board = boggle_game.make_board()
    session['board'] = board
    return render_template("index.html", board=board)

@app.route('/player_guess')
def player_guess():
    '''collects player guess from JS class, checks if guess is valid'''
    guess = request.args["word_guess"]
    raise
    # print(guess)
    # board = session["board"]
    # print(board)
