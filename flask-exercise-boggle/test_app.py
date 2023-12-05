from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure  board is in the session and HTML is displayed"""

        with self.client:
            response = self.client.get('/')
            self.assertIn('generated_board', session)
            self.assertIn(b'Score:', response.data)


    def test_valid_word(self):
        with self.client as client:
            with client.session_transaction() as session:
                session['generated_board'] = [
                ['A', 'B', 'C', 'D', 'E'],
                ['F', 'G', 'H', 'I', 'J'],
                ['K', 'L', 'M', 'N', 'O'],
                ['P', 'Q', 'R', 'S', 'T'],
                ['U', 'V', 'W', 'X', 'Y']
            ]
            response = self.client.post('/check-word', json={'word': 'hint'})

        
        self.assertEqual(response.status_code, 200)
        self.assertIn('result', response.json)
        self.assertEqual(response.json['result'], 'ok')



    def test_invalid_word(self):
        with self.client as client:
            with client.session_transaction() as session:
                session['generated_board'] = [
                ['A', 'B', 'C', 'D', 'E'],
                ['F', 'G', 'H', 'I', 'J'],
                ['K', 'L', 'M', 'N', 'O'],
                ['P', 'Q', 'R', 'S', 'T'],
                ['U', 'V', 'W', 'X', 'Y']
            ]
            response = self.client.post('/check-word', json={'word': 'afdfag'})
            self.assertEqual(response.json['result'], 'not-word')

    def test_high_score(self):
        with self.client as client:
            with client.session_transaction() as session:

                session['high_score'] = 20

            response = self.client.post('/post-score', json={'score': 40})
            self.assertEqual(response.status_code, 200)
            self.assertIn('high_score', response.json)
            self.assertEqual(response.json['high_score'], 40)

