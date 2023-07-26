from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, ChallengeResult, ChallengeParticipant
from app.forms import ChallengeResultsForm


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
            result_description = form.result_description.data,
            distance = form.distance.data,
            duration = form.duration.data,
            pace = form.pace.data,
        )

        db.session.add(result)
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

    db.session.delete(result)
    db.session.commit()
    return {'message': 'Challenge Result deleted successfully'}
