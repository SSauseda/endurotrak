from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, Follower

follower_routes = Blueprint('followers', __name__)


@follower_routes.route('/<int:user_id>/follower', methods=['POST'])
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
@follower_routes.route('/<int:user_id>/follower/<int:follower_id>', methods=['DELETE'])
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
@follower_routes.route('/<int:user_id>/follower')
@login_required
def get_followers(user_id):

    followers = Follower.query.filter_by(user_id=user_id).all()
    return {'followers': [follower.to_dict_follower() for follower in followers]}



# GET USERS WHO ARE FOLLOWING THE LOGGED IN USER
@follower_routes.route('/<int:user_id>/following')
@login_required
def get_followers_for_user(user_id):

    followers = Follower.query.filter_by(follower_id=user_id).all()
    return {'followers': [follower.to_dict_followings() for follower in followers]}
