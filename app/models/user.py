from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    about = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=True)
    banner_image1 = db.Column(db.String(255), nullable=True)
    banner_image2 = db.Column(db.String(255), nullable=True)
    banner_image3 = db.Column(db.String(255), nullable=True)
    total_distance_running = db.Column(db.Float, default=0)
    total_distance_cycling = db.Column(db.Float, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan', lazy='joined')
    given_bravos = db.relationship('Bravo', back_populates='user', foreign_keys='Bravo.user_id', cascade='all, delete-orphan')
    received_bravos = db.relationship('Bravo', back_populates='recipient', foreign_keys='Bravo.recipient_id', cascade='all, delete-orphan')
    created_challenges = db.relationship('Challenge', back_populates='user', cascade='all, delete-orphan')
    challenge_participants = db.relationship('ChallengeParticipant', back_populates='user', cascade='all, delete-orphan')
    # instance where user is following another user
    followings = db.relationship('Follower', foreign_keys='Follower.user_id', back_populates='user', cascade='all, delete-orphan', lazy='joined')
    # instance where user is being followed by another user
    followers = db.relationship('Follower', foreign_keys='Follower.follower_id', back_populates='follower', cascade='all, delete-orphan', lazy='joined')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict_basic(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'location': self.location,
            'about': self.about,
            'profileImage': self.profile_image,
            'bannerImage1': self.banner_image1,
            'bannerImage2': self.banner_image2,
            'bannerImage3': self.banner_image3,
            'totalDistanceRunning': self.total_distance_running,
            'totalDistanceCycling': self.total_distance_cycling,
            'participatingChallenges': [participant.challenge.to_dict_challenge() for participant in self.challenge_participants],
        }
    
    
    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'username': self.username,
            'email': self.email,
            'location': self.location,
            'about': self.about,
            'profileImage': self.profile_image,
            'bannerImage1': self.banner_image1,
            'bannerImage2': self.banner_image2,
            'bannerImage3': self.banner_image3,
            'followers': [follower.to_dict() for follower in self.followers],
            'followings': [following.to_dict() for following in self.followings],
            'comments': [comment.to_dict() for comment in self.comments],
            'givenBravos': len(self.given_bravos),
            'receivedBravos': len(self.received_bravos),
            'createdChallenges': [challenge.to_dict() for challenge in self.created_challenges],
            'challengeParticipants': [participant.to_dict() for participant in self.challenge_participants],
            'participatingChallenges': [participant.challenge.to_dict() for participant in self.challenge_participants],
            'participantIds': [participant.id for participant in self.challenge_participants],
        }

    # def to_dict_followers(self):
    #     user_dict = self.to_dict_basic()
    #     user_dict['followers'] = [follower.to_dict() for follower in self.followers]
    #     return user_dict

    # def to_dict_comments(self):
    #     user_dict = self.to_dict_basic()
    #     user_dict['comments'] = [comment.to_dict() for comment in self.comments]
    #     return user_dict
