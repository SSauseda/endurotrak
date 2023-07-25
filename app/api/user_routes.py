from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Challenge, Follower

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
    
@user_routes.route('/<int:user_id>/challenges')
@login_required
def get_user_challenges(user_id):
    """
    get all challenges created by logged in user
    """
    if current_user.id != user_id:
        return {'errors': ['Unauthorized']}, 401
    user_challenges = Challenge.query.filter_by(user_id=user_id).all()
    return {'challenges': [challenge.to_dict() for challenge in user_challenges]}

