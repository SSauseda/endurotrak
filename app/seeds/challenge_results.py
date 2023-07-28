from app.models import db, User, ChallengeResult, Challenge, ChallengeParticipant, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time


def seed_challenge_results():

    def update_total_distance(user, challenge_result, activity_type):
        distance = challenge_result.distance
        if challenge_result.goal_unit == 'mi':
            distance = distance * 1.60934
        if activity_type == 'Running':
            user.total_distance_running += distance
        elif activity_type == 'Cycling':
            user.total_distance_cycling += distance


    # Fetching challenge IDs by title
    challenge1 = Challenge.query.filter(Challenge.title == 'Run 5K!').first()
    challenge2 = Challenge.query.filter(Challenge.title == 'Your fastest Mile!').first()
    challenge3 = Challenge.query.filter(Challenge.title == 'Run 10K').first()
    challenge4 = Challenge.query.filter(Challenge.title == 'Bike 20K').first()
    challenge5 = Challenge.query.filter(Challenge.title == 'August Gran Fondo').first()
    challenge6 = Challenge.query.filter(Challenge.title == 'Virtual Marathon!').first()

    participant1 = ChallengeParticipant.query.filter_by(user_id=1).first()
    participant2 = ChallengeParticipant.query.filter_by(user_id=2).first()
    # participant3 = ChallengeParticipant.query.filter_by(user_id=3).first()
    # participant4 = ChallengeParticipant.query.filter_by(user_id=4).first()
    # participant5 = ChallengeParticipant.query.filter_by(user_id=5).first()
    # participant6 = ChallengeParticipant.query.filter_by(user_id=6).first()
    # participant7 = ChallengeParticipant.query.filter_by(user_id=7).first()
    # participant8 = ChallengeParticipant.query.filter_by(user_id=8).first()
    # participant9 = ChallengeParticipant.query.filter_by(user_id=9).first()
    # participant10 = ChallengeParticipant.query.filter_by(user_id=10).first()
    # user = User.query.get(1)




    result1 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge1.id,
        result_description='Finished 5k run in my best time yet!',
        distance=5.0,
        goal_unit='km',
        duration=time(hour=0, minute=30),
        pace=6.0,
    )
    update_total_distance(participant1.user, result1, challenge1.activity_type)

    result2 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge2.id,
        result_description='Ran my fastest mile today! Can you beat it?',
        distance=1.0,
        goal_unit='mi',
        duration=time(hour=0, minute=6),
        pace=6.0,
    )
    update_total_distance(participant1.user, result2, challenge2.activity_type)
    
    result3 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge3.id,
        result_description='10K run was tough, but rewarding.',
        distance=10.0,
        goal_unit='km',
        duration=time(hour=1, minute=5),
        pace=6.5,
    )
    update_total_distance(participant1.user, result3, challenge3.activity_type)

    result4 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge4.id,
        result_description='Completed the 20k bike ride! My legs are tired.',
        distance=20.0,
        goal_unit='km',
        duration=time(hour=1, minute=10),
        pace=3.5,
    )
    update_total_distance(participant1.user, result4, challenge4.activity_type)

    result5 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge5.id,
        result_description='Completed the August Gran Fondo! Feeling good about my time.',
        distance=100.0,
        goal_unit='km',
        duration=time(hour=5),
        pace=3.0,
    )
    update_total_distance(participant1.user, result5, challenge5.activity_type)

    result6 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge6.id,
        result_description='Completed my first virtual marathon! It was tough, but I did it!',
        distance=42.0,
        goal_unit='km',
        duration=time(hour=3, minute=30),
        pace=5.0,
    )
    update_total_distance(participant1.user, result6, challenge6.activity_type)

    result7 = ChallengeResult(
        participant_id=participant2.id,
        challenge_id=challenge1.id,
        result_description='Finished 5k run in my best time yet!',
        distance=5.0,
        goal_unit='km',
        duration=time(hour=0, minute=30),
        pace=6.0,
    )
    update_total_distance(participant2.user, result7, challenge1.activity_type)

    db.session.add(result1)
    db.session.add(result2)
    db.session.add(result3)
    db.session.add(result4)
    db.session.add(result5)
    db.session.add(result6)
    db.session.add(result7)

    db.session.commit()


def undo_challenge_results():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenge_results RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenge_results"))
    db.session.commit()
