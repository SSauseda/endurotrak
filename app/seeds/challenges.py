from app.models import db, Challenge, User, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, timedelta


def seed_challenges():

    # Fetching user IDs by username
    demo = User.query.filter(User.username == 'Demo').first()
    marnie = User.query.filter(User.username == 'marnie').first()
    bobbie = User.query.filter(User.username == 'bobbie').first()
    karen = User.query.filter(User.username == 'KarenKeepsFit').first()
    jess = User.query.filter(User.username == 'JessTheBest').first()
    mike = User.query.filter(User.username == 'MikeTheHiker').first()


    challenge1 = Challenge(
        user_id=demo.id,
        title='Run 5K!',
        description='Run 5 kilometers as fast as you can.',
        activity_type='Running',
        goal=5.0,
        goal_unit='km',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg',
        rules='Run 5 kilometers as fast as you can. You can run as many times as you want during the challenge period. Your fastest time will be recorded.',
    )
    challenge2 = Challenge(
        user_id=marnie.id,
        title='Your fastest Mile!',
        description='Run 1 mile as fast as you can.',
        activity_type='Running',
        goal=1.0,
        goal_unit='mi',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg',
        rules='The winner is the one who completes the goal in the shortest time.',
    )
    challenge3 = Challenge(
        user_id=bobbie.id,
        title='Run 10K',
        description='Run 10 kilometers as fast as you can.',
        activity_type='Running',
        goal=10.0,
        goal_unit='km',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg',
        rules='The winner is the one who completes the goal in the shortest time.',
    )
    challenge4 = Challenge(
        user_id=karen.id,
        title='Bike 20K',
        description='Bike 20 kilometers as fast as you can.',
        activity_type='Cycling',
        goal=20.0,
        goal_unit='km',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://st3.depositphotos.com/1439758/37733/v/600/depositphotos_377334960-stock-illustration-love-cycling-banner.jpg',
        rules='The winner is the one who completes the goal in the shortest time.',
    )
    challenge5 = Challenge(
        user_id=jess.id,
        title='August Gran Fondo',
        description='Complete a Gran Fondo (100km).',
        activity_type='Cycling',
        goal=100.0,
        goal_unit='km',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://st3.depositphotos.com/1439758/37733/v/600/depositphotos_377334960-stock-illustration-love-cycling-banner.jpg',
        rules='The winner is the one who completes the goal in the shortest time.',
    )
    challenge6 = Challenge(
        user_id=mike.id,
        title='Virtual Marathon!',
        description='Run a marathon (42km) as fast as you can.',
        activity_type='Running',
        goal=42.0,
        goal_unit='km',
        start_date=datetime.now(),
        end_date=datetime.now() + timedelta(days=30),
        image_url='https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg',
        rules='The winner is the one who completes the goal in the shortest time.',
    )


    db.session.add(challenge1)
    db.session.add(challenge2)
    db.session.add(challenge3)
    db.session.add(challenge4)
    db.session.add(challenge5)
    db.session.add(challenge6)

    db.session.commit()


def undo_challenges():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.challenges RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM challenges"))
        
    db.session.commit()
