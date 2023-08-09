from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SubmitField, IntegerField, SelectField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import Challenge

def validate_end_date(form, field):
    if field.data < form.start_date.data:
        raise ValidationError('End date must not be earlier than start date.')

def validate_image_url(form, field):
    if field.data:
        if not (field.data.endswith('.jpg') or field.data.endswith('.jpeg') or field.data.endswith('.png')):
            raise ValidationError('Please upload a valid image file (.jpg, .jpeg, .png)')


class ChallengeForm(FlaskForm):
    # user_id = IntegerField('user_id', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired(), Length(max=100)])
    description = TextAreaField('description', validators=[DataRequired(), Length(max=255)])
    activity_type = SelectField('activity_type', choices=[('running', 'Running'), ('cycling', 'Cycling')], validators=[DataRequired(), Length(max=50)])
    goal = FloatField('goal', validators=[DataRequired()])
    goal_unit = SelectField('goal_unit', choices=[('mi', 'Miles'), ('km', 'Kilometers')], validators=[DataRequired()])
    start_date = DateField('start_date', validators=[DataRequired()])
    end_date = DateField('end_date', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[validate_image_url])
    rules = TextAreaField('rules')
    submit = SubmitField('Create Challenge')
