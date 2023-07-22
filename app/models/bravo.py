from .db import db, environment, SCHEMA, add_prefix_for_prod


class Bravo(db.Model):
    __tablename__ = 'bravos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    result_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('challenge_results.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='given_bravos', foreign_keys=[user_id]
    recipient = db.relationship('User', back_populates='received_bravos', foreign_keys=[recipient_id])

    result = db.relationship('ChallengeResult', back_populates='bravos')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'recipient_id': self.recipient_id,
            'result_id': self.result_id,
        }