from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):
    def setUp(self):
        '''to run before each test, creates client'''
        self.client = app.test_client()
        app.config['testing'] = True

    def test_index(self):
        '''test if game board is generated'''

