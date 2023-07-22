from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from flask import url_for


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        location='New York', 
        about="I'm a fitness enthusiast who loves challenging myself and setting new personal records. When I'm not running or lifting weights, you'll find me reading up on the latest in nutrition and health science.",
        profile_image=url_for('static', filename='profile_images/demo.jpg')
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io', 
        password='password', 
        location='Los Angeles', 
        about="As an avid traveller, I've hiked, biked, and kayaked in some of the most beautiful places in the world. Now, I'm taking on new challenges to keep my fitness levels high between adventures.",
        profile_image=url_for('static', filename='profile_images/marnie.jpg')
        )
    bobbie = User(
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password', 
        location='Chicago', 
        about="A former couch potato turned fitness junkie. I found my passion for fitness later in life, and now there's no looking back. Every day is a new opportunity to push my boundaries."
        )
    sam = User(
        username='SammyRuns',
        email='sammy@aa.io',
        password='password',
        location='Chicago',
        about="Avid runner and fitness junkie. Constantly pushing my limits and setting new goals.",
        profile_image=url_for('static', filename='profile_images/sam.jpg')
    )
    laura = User(
        username='LauraFitLife',
        email='laura@aa.io',
        password='password',
        location='Boston',
        about="Passionate about fitness, health, and living a balanced life. You can find me at the gym or running by the Charles River.",
        profile_image=url_for('static', filename='profile_images/laura.jpg')
    )
    mike = User(
        username='MikeTheHiker',
        email='mike@aa.io',
        password='password',
        location='Seattle',
        about="Love exploring the outdoors, especially the beautiful Pacific Northwest. I enjoy hiking, biking, and trail running.",
        profile_image=url_for('static', filename='profile_images/mike.jpg')
    )
    jess = User(
        username='JessTheBest',
        email='jess@aa.io',
        password='password',
        location='Austin',
        about="Living a healthy and fit life in Austin. Yoga enthusiast and love trying new fitness challenges.",
        profile_image=url_for('static', filename='profile_images/jess.jpg')
    )
    luke = User(
        username='LukeLifts',
        email='luke@aa.io',
        password='password',
        location='Denver',
        about="Fitness has transformed my life. I especially love weightlifting and constantly learning new techniques.",
        profile_image=url_for('static', filename='profile_images/luke.jpg')
    )
    karen = User(
        username='KarenKeepsFit',
        email='karen@aa.io',
        password='password',
        location='San Diego',
        about="A lifelong fitness devotee. Love running by the beach and trying out new workout classes.",
        profile_image=url_for('static', filename='profile_images/karen.jpg')
    )
    tom = User(
        username='TomTakesOn',
        email='tom@aa.io',
        password='password',
        location='Miami',
        about="Embracing the fit lifestyle in sunny Miami. I'm all about balance, discipline, and pushing the boundaries.",
        profile_image=url_for('static', filename='profile_images/tom.jpg')
    )
    
    users=[demo, marnie, bobbie, sam, laura, mike, jess, luke, karen, tom]
    
    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
