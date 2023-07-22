from .db import db, environment, SCHEMA, add_prefix_for_prod


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



    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'challenge_id': self.challenge_id,
        }
