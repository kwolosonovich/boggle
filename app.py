from flask import Flask, request, render_template, redirect, session, jsonify
from boggle import Boggle


app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.debug = True
# app.config['TESTING'] = True
# app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

boggle_game = Boggle()

@app.route('/', methods=["GET", "POST"])
def index():
    '''homepage, render game board'''
    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get("highscore", 0)
    return render_template("index.html", board=board, highscore=highscore)

@app.route('/player_guess')
def player_guess():
    '''collects player guess and checks for validity'''
    word_guess = request.args['word_guess']
    board = session["board"]
    response = boggle_game.check_valid_word(board, word_guess)
    print(response)

    return jsonify({'result': response})

@app.route("/post-score", methods=["POST"])
def player_score():
    '''post player score and get highest score'''
    score = request.json["score"]
    highscore = session.get("highscore", 0)
    session['highscore'] = max(score, highscore)
    print(score)
    return jsonify(highest_score=score > highscore)

