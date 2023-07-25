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


@user_routes.route('/<int:user_id>/follower', methods=['POST'])
@login_required
def follow_user(user_id):
    """
    Logged in User follows another User
    """
    data = request.get_json()

    follower_id = data['follower_id']

    # CHECK IF USER IS ATTEMPTING TO FOLLOW THEMSELVES
    if follower_id == current_user.id:
        return {'errors': ['You cannot follow yourself']}, 401
    
    # CHECK IF USER IS ALREADY FOLLOWING THE USER THEY ARE ATTEMPTING TO FOLLOW
    existing_follow = Follower.query.filter_by(user_id=current_user.id, follower_id=follower_id).first()
    if existing_follow is not None:
        return {'errors': ['You are already following this user']}, 400

    follower = Follower(
        user_id = current_user.id,
        follower_id = follower_id
    )

    db.session.add(follower)
    db.session.commit()
    return follower.to_dict_follower()


# USER UNFOLLOWS ANOTHER USER
@user_routes.route('/<int:user_id>/follower/<int:follower_id>', methods=['DELETE'])
@login_required
def remove_follower(user_id, follower_id):
    """
    Logged in User unfollows another User
    """
    follower = Follower.query.filter(Follower.user_id == user_id, Follower.follower_id == follower_id).first()

    if follower is None:
        return {'errors': 'Follower not found'}, 404

    db.session.delete(follower)
    db.session.commit()
    return {'message': 'Follower removed successfully'}

# GET USERS THAT THE LOGGED IN USER IS FOLLOWING
@user_routes.route('/<int:user_id>/follower')
@login_required
def get_followers(user_id):

    followers = Follower.query.filter_by(user_id=user_id).all()
    return {'followers': [follower.to_dict_follower() for follower in followers]}

# GET USERS WHO ARE FOLLOWING THE LOGGED IN USER
@user_routes.route('/<int:user_id>/following')
@login_required
def get_followers_for_user(user_id):

    followers = Follower.query.filter_by(follower_id=user_id).all()
    return {'followers': [follower.to_dict_followings() for follower in followers]}
