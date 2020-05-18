from flask import Flask, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from boggle import Boggle

boggle_game = Boggle()
app = Flask(__name__)
app.config['SECRET_KEY'] = "secret"
app.debug = True
app.config['TESTING'] = True
toolbar = DebugToolbarExtension(app)
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

@app.route('/')
def index():
    '''homepage'''
    return render_template("index.html")