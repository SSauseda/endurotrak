from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, FloatField, TimeField, SelectField
from wtforms.validators import DataRequired, Length

class ChallengeResultsForm(FlaskForm):
    participant_id = IntegerField('Participant ID', validators=[DataRequired()])
    challenge_id = IntegerField('Challenge ID', validators=[DataRequired()])
    result_description = TextAreaField('Result Description', validators=[DataRequired(), Length(max=255)])
    distance = FloatField('Distance', validators=[DataRequired()])
    goal_unit = SelectField('goal_unit', choices=[('mi', 'Miles'), ('km', 'Kilometers')], validators=[DataRequired()])
    duration = TimeField('Duration', format='%H:%M', validators=[DataRequired()])
    pace = FloatField('Pace', validators=[DataRequired()])
    submit = SubmitField('Submit Result')

