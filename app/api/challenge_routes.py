from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Challenge, ChallengeParticipant
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
    return {'challenges': [challenge.to_dict(current_user) for challenge in challenges]}


# GET A CHALLENGE BY ID
@challenge_routes.route('/<int:challenge_id>')
@login_required
def get_challenge(challenge_id):
    challenge = Challenge.query.get(challenge_id)
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
            description = form.data['description'],
            activity_type = form.data['activity_type'],
            goal = form.data['goal'],
            goal_unit = form.data['goal_unit'],
            start_date = form.data['start_date'],
            end_date = form.data['end_date'],
            image_url = form.data['image_url'],
            rules = form.data['rules'],
        )
        db.session.add(challenge)
        db.session.commit()
        print('CHALLENGE ADDED!')
        return challenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# UPDATE A CHALLENGE
@challenge_routes.route('/<int:challenge_id>', methods=['PUT'])
@login_required
def update_challenge(challenge_id):
    challenge = Challenge.query.get(challenge_id)
    if not challenge:
        return {'errors': ['Challenge not found']}, 404

    if challenge.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this challenge']}, 401

    form = ChallengeForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        challenge = Challenge.query.get(challenge_id)
        challenge.title = form.data['title']
        challenge.description = form.data['description']
        challenge.activity_type = form.data['activity_type']
        challenge.goal = form.data['goal']
        challenge.goal_unit = form.data['goal_unit']
        challenge.start_date = form.data['start_date']
        challenge.end_date = form.data['end_date']
        challenge.image_url = form.data['image_url']
        challenge.rules = form.data['rules']

        db.session.commit()
        return challenge.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# DELETE A CHALLENGE
@challenge_routes.route('/<int:challenge_id>', methods=['DELETE'])
@login_required
def delete_challenge(challenge_id):
    challenge = Challenge.query.get(challenge_id)
    if not challenge:
        return {'errors': ['Challenge not found']}, 404

    if challenge.user_id != current_user.id:
        return {'errors': ['You are not authorized to edit this challenge']}, 401

        
    db.session.delete(challenge)
    db.session.commit()
    return {'message': 'Challenge deleted'}


# ALLOW A USER TO JOIN A CHALLENGE
@challenge_routes.route('/<int:challenge_id>/participants', methods=['POST'])
@login_required
def join_challenge(challenge_id):
    user_id = current_user.id

    existing_participant = ChallengeParticipant.query.filter_by(user_id=user_id, challenge_id=challenge_id).first()
    if existing_participant:
        return {'errors': ['You are already a participant in this challenge']}, 400
    participant = ChallengeParticipant(
        user_id = user_id,
        challenge_id = challenge_id
    )
    db.session.add(participant)
    db.session.commit()
    return participant.to_dict()


# ALLOW USER TO LEAVE A CHALLENGE
@challenge_routes.route('/<int:challenge_id>/participants', methods=['DELETE'])
@login_required
def leave_challenge(challenge_id):
    user_id = current_user.id
    participant = ChallengeParticipant.query.filter_by(user_id=user_id, challenge_id=challenge_id).first()
    if not participant:
        return {'errors': ['You are not a participant in this challenge']}, 400
    db.session.delete(participant)
    db.session.commit()
    return {'message': 'You have successfully left this challenge'}


# GET CHALLENGES FOR USER BY PARTICIPANT ID
@challenge_routes.route('/my-challenges')
@login_required
def get_challenges_by_participant():

    challenge_participant_instances = ChallengeParticipant.query.filter_by(user_id = current_user.id).all()
    challenge_ids = [instance.challenge_id for instance in challenge_participant_instances]
    challenges = Challenge.query.filter(Challenge.id.in_(challenge_ids)).all()

    return jsonify([challenge.to_dict() for challenge in challenges])


# GET CHALLENGES FOR USER BY USER ID
@challenge_routes.route('/user-challenges/<int:user_id>')
@login_required
def get_challenges_by_user_id(user_id):
    challenge_participant_instances = ChallengeParticipant.query.filter_by(user_id=user_id).all()
    challenge_ids = [instance.challenge_id for instance in challenge_participant_instances]
    challenges = Challenge.query.filter(Challenge.id.in_(challenge_ids)).all()

    return jsonify([challenge.to_dict() for challenge in challenges])
