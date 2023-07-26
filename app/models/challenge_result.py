from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ChallengeResult(db.Model):
    __tablename__ = 'challenge_results'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenge_participants.id')), nullable=False)
    challenge_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenges.id')), nullable=False)
    result_description = db.Column(db.String(255), nullable=False)
    distance = db.Column(db.Float, nullable=False)
    duration = db.Column(db.Time, nullable=False)
    pace = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)
  
    comments = db.relationship('Comment', back_populates='result', cascade='all, delete')
    bravos = db.relationship('Bravo', back_populates='result', cascade='all, delete')
    challenge = db.relationship('Challenge', back_populates='results')
    participant = db.relationship('ChallengeParticipant', back_populates='challenge_results')



    def to_dict(self):
        return {
            'id': self.id,
            'participant_id': self.participant_id,
            'participant_username': self.participant.user.username,
            'challenge_id': self.challenge_id,
            'result_description': self.result_description,
            'distance': self.distance,
            'duration': self.duration.strftime("%H:%M:%S") if self.duration else None,
            'pace': self.pace,
            'comments': [comment.to_dict() for comment in self.comments],
            'bravos': len(self.bravos),
        }
