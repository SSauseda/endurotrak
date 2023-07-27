from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Incorrect email.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    email = form.email.data
    user = User.query.filter(User.email == email).first()
    if not user or not user.check_password(password):
        raise ValidationError('Incorrect password.')


class LoginForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email(message='Please enter a valid email address'), user_exists])
    password = PasswordField('password', validators=[DataRequired(), password_matches])
