from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Follower(db.Model):
    __tablename__ = 'followers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # User being followed by user_id
    follower_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    # One who is following another user
    user = db.relationship('User',foreign_keys=[user_id], back_populates='followings')
    # One who is being followed by another user
    follower = db.relationship('User', foreign_keys=[follower_id], back_populates='followers')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'follower_id': self.follower_id,
            'follower_username': self.follower.username,
            'follower_profile_image': self.follower.profile_image,
        }
