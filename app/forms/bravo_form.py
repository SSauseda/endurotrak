from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class BravoForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    recipient_id = IntegerField('recipient_id', validators=[DataRequired()])
    result_id = IntegerField('result_id', validators=[DataRequired()])
