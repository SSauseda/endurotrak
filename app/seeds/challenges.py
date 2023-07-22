from app.models import db, Challenge, environment, SCHEMA
from sqlalchemy.sql import text


def seed_challenges():

    # Fetching user IDs by username
    demo = User.query.filter(User.username == 'Demo').first()
    marnie = User.query.filter(User.username == 'marnie').first()
    bobbie = User.query.filter(User.username == 'bobbie').first()
    karen = User.query.filter(User.username == 'KarenRuns').first()
    jess = User.query.filter(User.username == 'JessTheBest').first()
    mike = User.query.filter(User.username == 'MikeTheHiker').first()


    challenge1 = Challenge(
        user_id=demo.id,
        title='Run 5K!',
        description='Run 5 kilometers as fast as you can.',
    )
    challenge2 = Challenge(
        user_id=marnie.id,
        title='Your fastest Mile!',
        description='Run 1 mile as fast as you can.',
    )
    challenge3 = Challenge(
        user_id=bobbie.id,
        title='Run 10K',
        description='Run 10 kilometers as fast as you can.',
    )
    challenge4 = Challenge(
        user_id=karen.id,
        title='Bike 20K',
        description='Bike 20 kilometers as fast as you can.',
    )
    challenge5 = Challenge(
        user_id=jess.id,
        title='August Gran Fondo',
        description='Complete a Gran Fondo (100km).',
    )
    challenge6 = Challenge(
        user_id=mike.id,
        title='Virtual Marathon!',
        description='Run a marathon (42km) as fast as you can.',
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
