from flask import Flask, render_template, request
from stories import Story

app = Flask(__name__)



templates = [
    "Once upon a time in a {place}, there lived a {adjective} {noun}. It loved to {verb} {plural_noun}.",
    "In a {adjective} land, a brave {noun} decided to {verb} through the {place}."
]



story = Story(["place", "noun", "verb", "adjective", "plural_noun"], templates)



@app.route("/")
def show_home():
    
    return render_template("home_page.html", templates=templates)


@app.route("/form")
def show_form():
    int_template_idx = int(request.args.get("template_idx", 0))
    return render_template(
    "form_page.html", words=story.prompts, int_template_idx=int_template_idx
    ) 

@app.route("/story")
def show_story():
    prompt_user_ans = request.args
    int_template_idx = int(request.args.get("template_idx", 0))
    current_story = Story(["place", "noun", "verb", "adjective","plural_noun"], templates[int_template_idx])
    generated_story = current_story.generate(prompt_user_ans)
    return render_template("story.html", generated_story=generated_story)


