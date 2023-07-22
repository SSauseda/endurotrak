from app.models import db, Challenge, environment, SCHEMA
from sqlalchemy.sql import text


def seed_challenge_participants():

    challenge1 = Challenge.query.filter(Challenge.title == 'Run 5K!').first()
    challenge2 = Challenge.query.filter(Challenge.title == 'Your fastest Mile!').first()
    challenge3 = Challenge.query.filter(Challenge.title == 'Run 10K').first()
    challenge4 = Challenge.query.filter(Challenge.title == 'Bike 20K').first()
    challenge5 = Challenge.query.filter(Challenge.title == 'August Gran Fondo').first()
    challenge6 = Challenge.query.filter(Challenge.title == 'Virtual Marathon!').first()

    user1 = User.query.get(1)

    participant1 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge1.id)
    participant2 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge2.id)
    participant3 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge3.id)
    participant4 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge4.id)
    participant5 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge5.id)
    participant6 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge6.id)

    db.session.add_all([participant1, participant2, participant3, participant4, participant5, participant6])
    db.session.commit()

    def undo_challenge_participants():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.challenge_participants RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM challenge_participants"))
        db.session.commit()
