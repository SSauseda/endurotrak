from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


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
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan', lazy='joined')
    given_bravos = db.relationship('Bravo', back_populates='user', foreign_keys=[Bravo.user_id], cascade='all, delete-orphan')
    received_bravos = db.relationship('Bravo', back_populates='recipient', foreign_keys=[Bravo.recipient_id], cascade='all, delete-orphan')
    created_challenges = db.relationship('Challenge', back_populates='user', cascade='all, delete-orphan')
    challenge_participants = db.relationship('ChallengeParticipant', back_populates='user', cascade='all, delete-orphan')
    # instance where user is following another user
    followings = db.relationship('Follower', foreign_keys='Follower.user_id', back_populates='user', cascade='all, delete-orphan', lazy='dynamic')
    # instance where user is being followed by another user
    followers = db.relationship('Follower', foreign_keys='Follower.follower_id', back_populates='follower', cascade='all, delete-orphan', lazy='dynamic')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name
            'username': self.username,
            'email': self.email
            'location': self.location,
            'about': self.about,
            'profile_image': self.profile_image,
        }
