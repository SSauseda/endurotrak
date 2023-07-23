from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length


class CommentForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[DataRequired()])
    result_id = IntegerField('Result ID', validators=[DataRequired()])
    text = TextAreaField('text', validators=[DataRequired(), Length(max=255)])
    