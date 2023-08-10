from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ChallengeParticipant(db.Model):
    __tablename__ = 'challenge_participants'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenges.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='challenge_participants')
    challenge = db.relationship('Challenge', back_populates='participants')
    challenge_results = db.relationship('ChallengeResult', back_populates='participant', cascade='all, delete-orphan')
    bravos = db.relationship('Bravo', back_populates='participant', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_username': self.user.username,
            'challenge_id': self.challenge_id,
            'challenge_title': self.challenge.title,
        }

    def to_dict_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_username': self.user.username,
        }
