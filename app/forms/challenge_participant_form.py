from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired


class ChallengeParticipantForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    challenge_id = IntegerField('Challenge ID', validators=[DataRequired()])
