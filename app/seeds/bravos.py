from app.models import db, Bravo, User, ChallengeResult, environment, SCHEMA
from sqlalchemy.sql import text


def seed_bravos():

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)
    user6 = User.query.get(6)
    user7 = User.query.get(7)
    user8 = User.query.get(8)
    user9 = User.query.get(9)
    user10 = User.query.get(10)

    result1 = ChallengeResult.query.get(1)
    result2 = ChallengeResult.query.get(2)
    result3 = ChallengeResult.query.get(3)
    result4 = ChallengeResult.query.get(4)
    result5 = ChallengeResult.query.get(5)
    result6 = ChallengeResult.query.get(6)


    # User 2 gives Bravo to User 1 for Result 1
    bravo1 = Bravo(
        user_id=user2.id,
        recipient_id=user1.id,
        result_id=result1.id,
    )

    bravo2 = Bravo(
        user_id=user8.id,
        recipient_id=user1.id,
        result_id=result2.id,
    )

    bravo3 = Bravo(
        user_id=user3.id,
        recipient_id=user1.id,
        result_id=result3.id,
    )

    bravo4 = Bravo(
        user_id=user4.id,
        recipient_id=user1.id,
        result_id=result4.id,
    )

    bravo5 = Bravo(
        user_id=user7.id,
        recipient_id=user1.id,
        result_id=result5.id,
    )

    bravo6 = Bravo(
        user_id=user9.id,
        recipient_id=user1.id,
        result_id=result6.id,
    )

    db.session.add(bravo1)
    db.session.add(bravo2)
    db.session.add(bravo3)
    db.session.add(bravo4)
    db.session.add(bravo5)
    db.session.add(bravo6)

    db.session.commit()

def undo_bravos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bravos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bravos"))
    db.session.commit()

