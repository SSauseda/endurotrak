from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, ChallengeResult, ChallengeParticipant, User, Challenge
from app.forms import ChallengeResultsForm, ChallengeForm


result_routes = Blueprint('results', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

def update_total_distance(user_id, challenge_result, activity_type, is_deleted=False):
    user = User.query.get(user_id)
    distance = challenge_result.distance
    if challenge_result.goal_unit == 'mi':
        distance = distance * 1.60934
    if is_deleted:
        distance = -distance # SUBTRACT THE DISTANCE FROM THE TOTAL
    if activity_type == 'Running':
        user.total_distance_running += distance
        user.total_distance_running = round(user.total_distance_running, 2)
    elif activity_type == 'Cycling':
        user.total_distance_cycling += distance
        user.total_distance_cycling = round(user.total_distance_cycling, 2)
    db.session.commit()


@result_routes.route('/<int:challenge_id>/results', methods=['POST'])
@login_required
def create_challenge_result(challenge_id):
    """
    Logged in User creates a Challenge Result
    """
    data = request.get_json()
    form = ChallengeResultsForm(data=data)
    form['csrf_token'].data = request.cookies['csrf_token']

    # CHECK IF THE USER IS A PARTICIPANT IN THE CHALLENGE
    participant = ChallengeParticipant.query.filter_by(user_id=current_user.id, challenge_id=challenge_id).first()
    if not participant:
        return {'errors': ['You are not a participant in this challenge']}, 400

    # CHECK IF THE USER HAS ALREADY SUBMITTED A RESULT FOR THIS CHALLENGE
    existing_result = ChallengeResult.query.filter_by(participant_id=participant.id, challenge_id=challenge_id).first()
    if existing_result:
        return {'errors': ['You have already submitted a result for this challenge']}, 400

    if form.validate():
        result = ChallengeResult(
            participant_id = participant.id,
            challenge_id = challenge_id,
            result_description = form.data['result_description'],
            distance = form.data['distance'],
            duration = form.data['duration'],
            pace = form.data['pace'],
            goal_unit = form.data['goal_unit'],
        )

        db.session.add(result)
        challenge = Challenge.query.get(challenge_id)

        # UPDATE THE PARTICIPANT'S TOTAL DISTANCE
        update_total_distance(current_user.id, result, challenge.activity_type)

        db.session.commit()

        return result.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@result_routes.route('/<int:challenge_id>/results', methods=['GET'])
@login_required
def get_challenges_results(challenge_id):
    """
    Get all Challenge Results for a Challenge
    """
    results = ChallengeResult.query.filter_by(challenge_id=challenge_id).all()
    return {'results': [result.to_dict() for result in results]}


@result_routes.route('/<int:challenge_id>/results/<int:result_id>', methods=['GET'])
@login_required
def get_challenge_result(challenge_id, result_id):
    """
    Get a Challenge Result by ID
    """
    result = ChallengeResult.query.get(result_id)
    if result is None:
        return {'errors': ['Challenge Result not found']}, 404
    return result.to_dict()


@result_routes.route('/<int:challenge_id>/results/<int:result_id>', methods=['DELETE'])
@login_required
def delete_challenge_result(challenge_id, result_id):
    """
    Delete a Challenge Result by ID
    """
    result = ChallengeResult.query.get(result_id)
    if result is None:
        return {'errors': ['Challenge Result not found']}, 404
    
    if result.participant.user_id != current_user.id:
        return {'errors': ['You do not have permission to delete this result']}, 403

    # UPDATE THE PARTICIPANT'S TOTAL DISTANCE
    challenge = Challenge.query.get(challenge_id)
    update_total_distance(current_user.id, result, challenge.activity_type, is_deleted=True)

    db.session.delete(result)
    db.session.commit()
    return {'message': 'Challenge Result deleted successfully'}
