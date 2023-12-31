from flask import Flask, render_template, redirect, request, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import Question, Survey, satisfaction_survey

app = Flask(__name__)

app.config['SECRET_KEY'] = "surveyyyy123545"
# app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
# debug = DebugToolbarExtension(app)


RESPONSES_KEY = "responses"


@app.route('/')
def show_title():
   """Access title, instructions from satisfaction_survey"""

   session[RESPONSES_KEY] = []

   survey_title = satisfaction_survey.title

   return render_template('title_page.html', survey_title=survey_title)



@app.route('/', methods=['POST'] )
def show_survey():
      survey_title = satisfaction_survey.title
      survey_instructions = satisfaction_survey.instructions
      return render_template('show_survey.html', survey_title=survey_title, survey_instructions=survey_instructions)
    
    


@app.route('/questions/<int:index>')
def question(index):
   """Access questions and indices from satisfaction_survey
        Prevents user from skipping questions """

   survey_questions = satisfaction_survey.questions
   responses = session.get(RESPONSES_KEY,[])

#prevents user from manually entering url and skipping / going back to questions
   if index != len(responses):
      flash("Please do not skip any questions or press the back button. ", "warning")
      return redirect(f"{len(responses)}")

   if 0 <= index < len(survey_questions):
      current_question = survey_questions[index]
      return render_template('question.html', index=index,question=current_question)
   
   return redirect('/title_page')


@app.route('/answer/<int:index>', methods=['POST'])
def answer(index):
   """Save user response and redirect to the next question"""

   if request.method == 'POST':
      user_answer = request.form.get('answer')

      responses = session.get(RESPONSES_KEY, [])
      responses.append(user_answer)
      session[RESPONSES_KEY] = responses

      print("User Answer:", user_answer)
      print("Current responses:", session[RESPONSES_KEY])
      
      next_index = index + 1

      if next_index < len(satisfaction_survey.questions):
         return redirect(f'/questions/{next_index}')
      else:
         return render_template('thank_you.html')