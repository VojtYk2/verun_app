from flask import Flask, render_template, session, redirect, url_for, request
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import SubmitField, PasswordField
from wtforms.validators import DataRequired, Length
from flask_bootstrap import Bootstrap5
import json
import secrets
from datetime import date
import random

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
            data = {'days': (date(2025, 12, 20) - date.today()).days }
            return render_template('index.html', data=data)
        else:
            return render_template('my_side.html')

@app.route('/day_x')
def day_x():
    try:
        data_day_x = load('day_x.json')
    except Exception:
        data_day_x = {'gameSave': [0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0]}
    return render_template('day_x.html', data_day_x=data_day_x)

@app.route('/day_x_play', methods=['POST'])
def day_x_play():
    data = request.get_json()
    try:
        data_day_x = load('day_x.json')
    except Exception:
        data_day_x = {'gameSave': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
    data_day_x['gameSave'][data[0] + data[1]] = 1
    save(data_day_x, 'day_x.json')

@app.route('/day_1')
def day_1():
    data = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7]
    random.shuffle(data)
    data_day_1 = {'layout': data}
    return render_template('day_1.html', data_day_1=data_day_1)

@app.route('/day_2')
def day_2():
    image1 = {'path':'img/day_2_1.jpg', 'date':'2025-10-09'}
    image2 = {'path':'img/day_2_2.jpg', 'date':'2025-09-02'}
    image3 = {'path':'img/day_2_3.jpg', 'date':'2025-09-30'}
    image4 = {'path':'img/day_2_4.png', 'date':'2025-08-21'}
    images = [image1, image2, image3, image4]
    return render_template('day_2.html', image = random.choice(images))

@app.route('/day_3')
def day_3():
    return render_template('day_3.html')
if __name__ == '__main__':
    app.run(debug=True)