from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Challenge(db.Model):
    __tablename__ = 'challenges'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    activity_type = db.Column(db.String(50), nullable=False)
    goal = db.Column(db.Float, nullable=False)
    goal_unit = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    image_url = db.Column(db.String(255))
    rules = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='created_challenges')
    participants = db.relationship('ChallengeParticipant', back_populates='challenge', cascade='all, delete')
    results = db.relationship('ChallengeResult', back_populates='challenge', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user_username': self.user.username,
            'title': self.title,
            'description': self.description,
            'activity_type': self.activity_type,
            'goal': self.goal,
            'goal_unit': self.goal_unit,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'image_url': self.image_url,
            'rules': self.rules,
            'participants': [participant.to_dict_user() for participant in self.participants],
        }
