from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, SelectField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Challenge


class ChallengeForm(FlaskForm):
    # user_id = IntegerField('User ID', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('description', validators=[DataRequired(), Length(max=255)])
    activity_type = SelectField('activity_type', choices=[('running', 'Running'), ('cycling', 'Cycling')], validators=[DataRequired(), Length(max=50)])
    submit = SubmitField('Create Challenge')
