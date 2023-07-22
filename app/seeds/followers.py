from app.models import db, Follower, User, Challenge, environment, SCHEMA
from sqlalchemy.sql import text


def seed_followers():

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)

    # User 1 follows User 2
    follower1 = Follower(
        user_id=user1.id,
        follower_id=user2.id,
    )

    follower2 = Follower(
        user_id=user2.id,
        follower_id=user3.id,
    )

    follower3 = Follower(
        user_id=user3.id,
        follower_id=user4.id,
    )

    follower4 = Follower(
        user_id=user4.id,
        follower_id=user5.id,
    )

    follower5 = Follower(
        user_id=user5.id,
        follower_id=user1.id,
    )

    follower6 = Follower(
        user_id=user2.id,
        follower_id=user1.id,
    )

    db.session.add(follower1)
    db.session.add(follower2)
    db.session.add(follower3)
    db.session.add(follower4)
    db.session.add(follower5)
    db.session.add(follower6)

    db.session.commit()

def undo_followers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.followers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM followers"))
    
    db.session.commit()

