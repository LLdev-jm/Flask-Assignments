from flask import Flask, request, render_template, jsonify, session
from boggle import Boggle


app = Flask(__name__)
app.config['SECRET_KEY'] = "DisIsSecretKey8395234hellooo"

boggle_game = Boggle()




@app.route('/')
def display_board():
    """displays game board"""
    generated_board = boggle_game.make_board()
    session['generated_board'] = generated_board
    print("Generated Board:", generated_board)
    return render_template('index.html', generated_board=generated_board)



@app.route('/check-word', methods=['POST'])
def check_word():
    """check to see if word is valid and on board"""
    user_word = request.json.get('word') if request.json else None
    generated_board = session.get('generated_board')
    if generated_board and user_word is not None:
        result = boggle_game.check_valid_word(generated_board, user_word)
        print('successful')
        return jsonify({'result': result})
    else:
        return jsonify({'ERROR': 'Invalid request data'})

@app.route("/post-score", methods=["POST"])
def post_score():
    """Handle incoming score, update the highest score, and return the result"""
    if request.method == "POST":
        data = request.json
        current_score = data.get('score', 0)
        print("Current Score:", current_score)
        high_score = session.get('high_score', 0)
        print("high score in session: ", high_score)
        if current_score is not None and current_score > high_score:
            session['high_score'] = max(current_score, high_score)
            print("modified high score in session: ", session['high_score'])
            return jsonify({"high_score": session["high_score"]})
        else:
            return jsonify({"high_score": high_score})