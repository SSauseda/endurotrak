from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Challenge
from app.forms import ChallengeForm


challenge_routes = Blueprint('challenges', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL CHALLENGES
@challenge_routes.route('/')
def get_challenges():
    challenges = Challenge.query.all()
    return {'challenges': [challenge.to_dict() for challenge in challenges]}


# GET A CHALLENGE BY ID
@challenge_routes.route('/<int:id>')
@login_required
def get_challenge(id):
    challenge = Challenge.query.get(id)
    if not challenge:
        return {'errors': ['Challenge not found']}, 404
    return challenge.to_dict()


# CREATE A CHALLENGE
@challenge_routes.route('/', methods=['POST'])
@login_required
def post_challenge():
    """
    Logged in User creates a Challenge
    """
    form = ChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        challenge = Challenge(
            user_id = current_user.id,
            title = form.data['title'],
            description = form.data['description']
        )
        db.session.add(challenge)
        db.session.commit()
        print('CHALLENGE ADDED!')
        return challenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# UPDATE A CHALLENGE
@challenge_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_challenge(id):
    form = ChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        challenge = Challenge.query.get(id)
        challenge.title = form.data['title']
        challenge.description = form.data['description']
        db.session.commit()
        return challenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE A CHALLENGE
@challenge_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_challenge(id):
    challenge = Challenge.query.get(id)
    if not challenge:
        return {'errors': ['Challenge not found']}, 404
    db.session.delete(challenge)
    db.session.commit()
    return {'message': 'Challenge deleted'}
