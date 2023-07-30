from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Challenge, Follower, ChallengeParticipant

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict_basic() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()
    
@user_routes.route('/<int:user_id>/created_challenges')
@login_required
def get_user_challenges(user_id):
    """
    get all challenges created by logged in user
    """
    if current_user.id != user_id:
        return {'errors': ['Unauthorized']}, 401
    user_challenges = Challenge.query.filter_by(user_id=user_id).all()
    return {'challenges': [challenge.to_dict() for challenge in user_challenges]}

@user_routes.route('/<int:user_id>/participating_challenges')
@login_required
def user_challenges(user_id):

    """
    get all challenges that a user is participating in
    """
    user = User.query.get(user_id)
    if not user:
        return {'errors': ['User not found']}, 404
    
    participants = ChallengeParticipant.query.filter_by(user_id=user_id).all()
    challenges = [Challenge.query.get(participant.challenge_id) for participant in participants]

    return jsonify([challenge.to_dict() for challenge in challenges])


@user_routes.route('/search', methods=['GET'])
def search_users():
    """
    Search for users by username
    """
    search = request.args.get('search')
    if search is None:
        return {'users': []}
    users = User.query.filter(User.first_name.ilike(f'%{search}%')).all()
    return {'users': [user.to_dict_basic() for user in users]}
