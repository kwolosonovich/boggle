from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        '''to run before each test, creates client'''
        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_if_board_generated(self):
        '''test if game board is generated'''
        with self.client as client:
            response = client.get('/')
            self.assertIn('board', session)
            self.assertIsNone(session.get('highscore'))

    def test_player_guess(self):
        with self.client.session_transaction() as sess:
            sess['board'] = [["A", "B", "C", "D", "E"],
                             ["T", "B", "C", "D", "E"],
                             ["A", "B", "C", "D", "E"],
                             ["A", "B", "C", "D", "E"],
                             ["A", "B", "C", "D", "E"]]


        response = self.client.get('/player_quess?word_guess=tab')
        print(response.status_code)
            # self.assertEqual(response.json['result'], "ok")

    # def test_valid_word_on_board(self):
    #     '''Test if player guess is a valid word on board'''
    #     with self.client as client:
    #         with client.session_transaction() as sess:
    #             sess['board'] = [["A", "B", "C", "D", "E"],
    #                              ["T", "B", "C", "D", "E"],
    #                              ["A", "B", "C", "D", "E"],
    #                              ["A", "B", "C", "D", "E"],
    #                              ["A", "B", "C", "D", "E"]]
    #         response = self.client.get('/player-guess?word_guess=tab')
    #         self.assertEqual(response.json['result'], 'ok')

    # def test_invalid_word(self):
    #     """Test if word is on the board"""
    #
    #     self.client.get('/')
    #     response = self.client.get('/check-word?word=impossible')
    #     self.assertEqual(response.json['result'], 'not-on-board')

    # def non_english_word(self):
    #     """Test if word is in the dictionary"""
    #
    #     self.client.get('/')
    #     response = self.client.get('/check-word?word=fksj')
    #     self.assertEqual(response.json['result'], 'not-word')

    # def player_score_and_highscore(self):
    #     score = 3
    #     highscore = 5
    #     session['highscore'] = max(score, highscore)
    #     return jsonify(highest_score=score > highscore)
