from flask import Flask, render_template, session, redirect, url_for, request
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import SubmitField, PasswordField
from wtforms.validators import DataRequired, Length
from flask_bootstrap import Bootstrap5
import json
import secrets
from datetime import date

app = Flask(__name__)
app.secret_key = secrets.token_urlsafe(16)
bootstrap = Bootstrap5(app)
csrf = CSRFProtect(app)

class loginForm(FlaskForm):
    passwd = PasswordField('Zadej heslo', validators=[DataRequired(), Length(6, 6)])
    submit = SubmitField('Přihlásit se')

def save(data, filename):
    with open(filename, "w") as file:
        json.dump(data, file)
    
def load(filename):
    with open(filename, "r") as file:
        return json.load(file)

@app.route('/', methods=['GET', 'POST'])
def home():
    if 'logged_in' not in session:
        form = loginForm()
        if form.validate_on_submit():
            if form.passwd.data == '210825':
                session['logged_in'] = True
                return redirect(url_for('home'))
            elif form.passwd.data == '191225':
                session['logged_in'] = True
                session['alt'] = True
                return redirect(url_for('home'))
            else:
                form.passwd.errors.append('Nesprávné heslo')
        return render_template('login.html', form=form)
    else:
        if 'alt' not in session:
            data = {'days': (date(2025, 12, 19) - date.today()).days }
            return render_template('index.html', data=data)
        else:
            return render_template('my_side.html')

@app.route('/day_1')
def day_1():
    try:
        data_day_1 = load('day_1.json')
    except Exception:
        data_day_1 = {'gameSave': [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0]}
    return render_template('day_1.html', data_day_1=data_day_1)

@app.route('/day_1_play', methods=['POST'])
def day_1_play():
    data = request.get_json()
    try:
        data_day_1 = load('day_1.json')
    except Exception:
        data_day_1 = {'gameSave': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
    data_day_1['gameSave'][data[0] + data[1]] = 1
    save(data_day_1, 'day_1.json')

if __name__ == '__main__':
    app.run(debug=True)