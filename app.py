from flask import Flask, request, render_template, redirect, session
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

@app.route('/player_guess', methods=["POST"])
def player_guess():
    '''collects player guess from class BoggleGame'''
    # word = get(req)
    # print(word)
    # # print(request.__dict__)
    return "200"
    # guess = request.args["word_guess"]
    # print(guess)
    # board = session["board"]
    # print(board)
