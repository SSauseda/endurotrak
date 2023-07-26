from app.models import db, User, ChallengeResult, Challenge, ChallengeParticipant, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import time


def seed_challenge_results():

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
        duration=time(hour=0, minute=30),
        pace=6.0,
    )
    if challenge1.activity_type == 'Running':
        participant1.user.total_distance_running += result1.distance
    elif challenge1.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result1.distance

    result2 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge2.id,
        result_description='Ran my fastest mile today! Can you beat it?',
        distance=1.61,
        duration=time(hour=0, minute=6),
        pace=6.0,
    )
    if challenge2.activity_type == 'Running':
        participant1.user.total_distance_running += result2.distance
    elif challenge2.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result2.distance
    
    result3 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge3.id,
        result_description='10K run was tough, but rewarding.',
        distance=10.0,
        duration=time(hour=1, minute=5),
        pace=6.5,
    )
    if challenge3.activity_type == 'Running':
        participant1.user.total_distance_running += result3.distance
    elif challenge3.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result3.distance

    result4 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge4.id,
        result_description='Completed the 20k bike ride! My legs are tired.',
        distance=20.0,
        duration=time(hour=1, minute=10),
        pace=3.5,
    )
    if challenge4.activity_type == 'Running':
        participant1.user.total_distance_running += result4.distance
    elif challenge4.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result4.distance

    result5 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge5.id,
        result_description='Completed the August Gran Fondo! Feeling good about my time.',
        distance=100.0,
        duration=time(hour=5),
        pace=3.0,
    )
    if challenge5.activity_type == 'Running':
        participant1.user.total_distance_running += result5.distance
    elif challenge5.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result5.distance

    result6 = ChallengeResult(
        participant_id=participant1.id,
        challenge_id=challenge6.id,
        result_description='Completed my first virtual marathon! It was tough, but I did it!',
        distance=42.0,
        duration=time(hour=3, minute=30),
        pace=5.0,
    )
    if challenge6.activity_type == 'Running':
        participant1.user.total_distance_running += result6.distance
    elif challenge6.activity_type == 'Cycling':
        participant1.user.total_distance_cycling += result6.distance

    result7 = ChallengeResult(
        participant_id=participant2.id,
        challenge_id=challenge1.id,
        result_description='Finished 5k run in my best time yet!',
        distance=5.0,
        duration=time(hour=0, minute=30),
        pace=6.0,
    )
    if challenge1.activity_type == 'Running':
        participant2.user.total_distance_running += result7.distance
    elif challenge1.activity_type == 'Cycling':
        participant2.user.total_distance_cycling += result7.distance

    db.session.add(result1)
    db.session.add(result2)
    db.session.add(result3)
    db.session.add(result4)
    db.session.add(result5)
    db.session.add(result6)
    db.session.add(result7)

    db.session.commit()

    # if challenge1.activity_type == 'Running':
    #     participant1.user.total_distance_running += result1.distance
    # elif challenge1.activity_type == 'cycling':
    #     participant1.total_distance_cycling += result1.distance

def undo_challenge_results():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenge_results RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenge_results"))
    db.session.commit()
