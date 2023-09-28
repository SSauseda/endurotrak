from app.models import db, ChallengeParticipant, Challenge, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_challenge_participants():

    challenge1 = Challenge.query.filter(Challenge.title == 'Run 5K!').first()
    challenge2 = Challenge.query.filter(Challenge.title == 'Your fastest Mile!').first()
    challenge3 = Challenge.query.filter(Challenge.title == 'Run 10K').first()
    challenge4 = Challenge.query.filter(Challenge.title == 'Bike 20K').first()
    challenge5 = Challenge.query.filter(Challenge.title == 'August Gran Fondo').first()
    challenge6 = Challenge.query.filter(Challenge.title == 'Virtual Marathon!').first()

    user1 = User.query.get(1)
    user2 = User.query.get(2)
    user3 = User.query.get(3)
    user4 = User.query.get(4)
    user5 = User.query.get(5)

    participant1 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge1.id)
    participant2 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge2.id)
    participant3 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge3.id)
    participant4 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge4.id)
    participant5 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge5.id)
    participant6 = ChallengeParticipant(user_id=user1.id, challenge_id=challenge6.id)
    participant7 = ChallengeParticipant(user_id=user2.id, challenge_id=challenge1.id)
    participant8 = ChallengeParticipant(user_id=user2.id, challenge_id=challenge2.id)
    participant9 = ChallengeParticipant(user_id=user2.id, challenge_id=challenge3.id)
    participant10 = ChallengeParticipant(user_id=user2.id, challenge_id=challenge4.id)
    participant11 = ChallengeParticipant(user_id=user3.id, challenge_id=challenge1.id)
    participant12 = ChallengeParticipant(user_id=user4.id, challenge_id=challenge1.id)
    participant13 = ChallengeParticipant(user_id=user5.id, challenge_id=challenge1.id)
    participant14 = ChallengeParticipant(user_id=user3.id, challenge_id=challenge2.id)
    participant15 = ChallengeParticipant(user_id=user4.id, challenge_id=challenge2.id)
    participant16 = ChallengeParticipant(user_id=user5.id, challenge_id=challenge2.id)
    participant17 = ChallengeParticipant(user_id=user3.id, challenge_id=challenge3.id)
    participant18 = ChallengeParticipant(user_id=user4.id, challenge_id=challenge3.id)
    participant19 = ChallengeParticipant(user_id=user5.id, challenge_id=challenge3.id)

    db.session.add_all([
        participant1, 
        participant2, 
        participant3, 
        participant4, 
        participant5,
        participant6,
        participant7,
        participant8,
        participant9,
        participant10,
        participant11,
        participant12,
        participant13,
        ])
        
    db.session.commit()

def undo_challenge_participants():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenge_participants RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenge_participants"))
    db.session.commit()
