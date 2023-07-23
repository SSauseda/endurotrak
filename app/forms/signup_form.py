from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from flask_wtf.file import FileField, FileAllowed
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def password_matches(form, field):
    if field.data != form.password.data:
        raise ValidationError('Passwords do not match.')

def validate_image_url(form, field):
    if field.data:
        if not (field.data.endswith('.jpg') or field.data.endswith('.jpeg') or field.data.endswith('.png')):
            raise ValidationError('Please upload a valid image file (.jpg, .jpeg, .png)')


class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(message="Please create a username"), username_exists])
    first_name = StringField('first_name',validators=[DataRequired(message="Please enter your first name")])
    last_name = StringField('last_name',validators=[DataRequired(message="Please enter your last name")])
    location = StringField('location',validators=[DataRequired(message="Please enter your location")])
    about = TextAreaField('about',validators=[DataRequired(message="Please enter a short bio"), Length(max=255)])
    profile_image = StringField('profile_image', validators=[validate_image_url])
    email = StringField('email', validators=[DataRequired(message="Please enter your email"), Email(message="Please enter a valid email address"), user_exists])
    password = PasswordField('password', validators=[DataRequired(message="Please create a password")])
    confirm_password = PasswordField('confirm_password', validators=[DataRequired(message="Please confirm your password"), password_matches])
    
