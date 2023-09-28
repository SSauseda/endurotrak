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
    participant3 = ChallengeParticipant.query.filter_by(user_id=3).first()
    participant4 = ChallengeParticipant.query.filter_by(user_id=4).first()
    participant5 = ChallengeParticipant.query.filter_by(user_id=5).first()
    participant6 = ChallengeParticipant.query.filter_by(user_id=6).first()
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

    result8 = ChallengeResult(
        participant_id=participant2.id,
        challenge_id=challenge2.id,
        result_description='Not my best mile, but working on it!',
        distance=1.1,
        goal_unit='mi',
        duration=time(hour=0, minute=7, second=30),
        pace=6.8,
    )
    update_total_distance(participant2.user, result8, challenge2.activity_type)

    result9 = ChallengeResult(
        participant_id=participant2.id,
        challenge_id=challenge3.id,
        result_description='My first 10k run, happy with the results!',
        distance=10.5,
        goal_unit='km',
        duration=time(hour=1, minute=10),
        pace=6.7,
    )
    update_total_distance(participant2.user, result9, challenge3.activity_type)

    result10 = ChallengeResult(
        participant_id=participant2.id,
        challenge_id=challenge4.id,
        result_description='20k bike ride in the countryside, loved it!',
        distance=21.0,
        goal_unit='km',
        duration=time(hour=1, minute=15),
        pace=3.6,
    )
    update_total_distance(participant2.user, result10, challenge4.activity_type)

    result11 = ChallengeResult(
        participant_id=participant3.id,
        challenge_id=challenge1.id,
        result_description='My first ever 5k, proud of the achievement!',
        distance=5.0,
        goal_unit='km',
        duration=time(hour=0, minute=35),
        pace=7.0,
    )
    update_total_distance(participant3.user, result9, challenge1.activity_type)

    result12 = ChallengeResult(
        participant_id=participant4.id,
        challenge_id=challenge1.id,
        result_description='Trying to improve my 5k time, getting there!',
        distance=5.0,
        goal_unit='km',
        duration=time(hour=0, minute=29),
        pace=5.8,
    )
    update_total_distance(participant4.user, result10, challenge1.activity_type)

    result13 = ChallengeResult(
        participant_id=participant5.id,
        challenge_id=challenge1.id,
        result_description='5k in the rain, was challenging but fun!',
        distance=5.0,
        goal_unit='km',
        duration=time(hour=0, minute=32),
        pace=6.4,
    )
    update_total_distance(participant5.user, result11, challenge1.activity_type)

    result14 = ChallengeResult(
    participant_id=participant3.id,
    challenge_id=challenge2.id,
    result_description='Pushing for a better mile every day!',
    distance=1.0,
    goal_unit='mi',
    duration=time(hour=0, minute=7),
    pace=7.0,
    )
    update_total_distance(participant3.user, result14, challenge2.activity_type)

    result15 = ChallengeResult(
        participant_id=participant4.id,
        challenge_id=challenge2.id,
        result_description='Beat my personal best for a mile today!',
        distance=1.0,
        goal_unit='mi',
        duration=time(hour=0, minute=6, second=30),
        pace=6.5,
    )
    update_total_distance(participant4.user, result15, challenge2.activity_type)

    result16 = ChallengeResult(
        participant_id=participant5.id,
        challenge_id=challenge2.id,
        result_description='Every mile counts!',
        distance=1.0,
        goal_unit='mi',
        duration=time(hour=0, minute=8),
        pace=8.0,
    )
    update_total_distance(participant5.user, result16, challenge2.activity_type)


    # Challenge 3 Results
    result17 = ChallengeResult(
        participant_id=participant3.id,
        challenge_id=challenge3.id,
        result_description='10K was hard, but worth every step!',
        distance=10.0,
        goal_unit='km',
        duration=time(hour=1, minute=15),
        pace=7.5,
    )
    update_total_distance(participant3.user, result17, challenge3.activity_type)

    result18 = ChallengeResult(
        participant_id=participant4.id,
        challenge_id=challenge3.id,
        result_description='10K under the sun!',
        distance=10.0,
        goal_unit='km',
        duration=time(hour=1, minute=10),
        pace=7.0,
    )
    update_total_distance(participant4.user, result18, challenge3.activity_type)

    result19 = ChallengeResult(
        participant_id=participant5.id,
        challenge_id=challenge3.id,
        result_description='Finished my 10K in the morning mist!',
        distance=10.0,
        goal_unit='km',
        duration=time(hour=1, minute=20),
        pace=8.0,
    )
    update_total_distance(participant5.user, result19, challenge3.activity_type)




    db.session.add(result1)
    db.session.add(result2)
    db.session.add(result3)
    db.session.add(result4)
    db.session.add(result5)
    db.session.add(result6)
    db.session.add(result7)
    db.session.add(result8)
    db.session.add(result9)
    db.session.add(result10)
    db.session.add(result11)
    db.session.add(result12)
    db.session.add(result13)
    db.session.add(result14)
    db.session.add(result15)
    db.session.add(result16)
    db.session.add(result17)
    db.session.add(result18)

    db.session.commit()


def undo_challenge_results():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenge_results RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenge_results"))
    db.session.commit()
