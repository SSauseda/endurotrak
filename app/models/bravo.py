from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Bravo(db.Model):
    __tablename__ = 'bravos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    participant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenge_participants.id')), nullable=False)
    result_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenge_results.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='given_bravos', foreign_keys=[user_id])
    participant = db.relationship('ChallengeParticipant', back_populates='bravos')

    result = db.relationship('ChallengeResult', back_populates='bravos')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'participant_id': self.participant_id,
            'result_id': self.result_id,
        }
