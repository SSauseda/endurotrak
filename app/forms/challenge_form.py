from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Challenge


class ChallengeForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('description', validators=[DataRequired(), Length(max=255)])
    submit = SubmitField('Create Challenge')
