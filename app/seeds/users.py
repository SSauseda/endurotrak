from app.models import db, User, environment, SCHEMA, Challenge, ChallengeParticipant, ChallengeResult  
from sqlalchemy.sql import text
from flask import url_for


def seed_users():
    demo = User(
        first_name='Demo',
        last_name='User',
        username='Demo', 
        email='demo@aa.io', 
        password='password', 
        location='New York', 
        about="I'm a fitness enthusiast who loves challenging myself and setting new personal records. When I'm not running or lifting weights, you'll find me reading up on the latest in nutrition and health science.",
        profile_image='https://i0.wp.com/marzbandds.com/wp-content/uploads/2011/10/Doing-the-distance-with-fillings-min.jpg',
        banner_image1='static/banner_images/demo_banner1.png',
        banner_image2='static/banner_images/demo_banner2.jpg',
        banner_image3='static/banner_images/demo_banner3.jpg'
        )
    marnie = User(
        first_name='Marnie',
        last_name='Barnes',
        username='marnie',
        email='marnie@aa.io', 
        password='password', 
        location='Los Angeles', 
        about="As an avid traveller, I've hiked, biked, and kayaked in some of the most beautiful places in the world. Now, I'm taking on new challenges to keep my fitness levels high between adventures.",
        profile_image='https://hips.hearstapps.com/hmg-prod/images/image0-5-1602636458.jpeg'
        )
    bobbie = User(
        first_name='Bobbie',
        last_name='Runsalot',
        username='bobbie', 
        email='bobbie@aa.io', 
        password='password', 
        location='Chicago', 
        about="A former couch potato turned fitness junkie. I found my passion for fitness later in life, and now there's no looking back. Every day is a new opportunity to push my boundaries.",
        profile_image='https://s3.amazonaws.com/images.gearjunkie.com/uploads/2020/10/Ricky-Gates-runner-headshot-cWanderingFever-1880x1256.jpg'
        )
    sam = User(
        first_name='Sammy',
        last_name='Speedster',
        username='SammyRuns',
        email='sammy@aa.io',
        password='password',
        location='Chicago',
        about="Avid runner and fitness junkie. Constantly pushing my limits and setting new goals.",
        profile_image='https://herway.net/wp-content/uploads/2019/09/healthy-man-standing-in-the-park-768x513.jpg.webp'
    )
    laura = User(
        first_name='Laura',
        last_name='Liftalot',
        username='LauraFitLife',
        email='laura@aa.io',
        password='password',
        location='Boston',
        about="Passionate about fitness, health, and living a balanced life. You can find me at the gym or running by the Charles River.",
        profile_image='https://images.ctfassets.net/pxcfulgsd9e2/articleImage199201/9aafc21b41dfb32488258600abd6e0e3/How-to-make-running-more-fun-HN3017-iStock-1287421009-Sized.jpg'
    )
    mike = User(
        first_name='Mike',
        last_name='Mountainman',
        username='MikeTheHiker',
        email='mike@aa.io',
        password='password',
        location='Seattle',
        about="Love exploring the outdoors, especially the beautiful Pacific Northwest. I enjoy hiking, biking, and trail running.",
        profile_image='https://hips.hearstapps.com/hmg-prod/images/senior-black-man-racing-on-a-road-bike-royalty-free-image-1655393634.jpg'
    )
    jess = User(
        first_name='Jess',
        last_name='Yogi',
        username='JessTheBest',
        email='jess@aa.io',
        password='password',
        location='Austin',
        about="Living a healthy and fit life in Austin. Yoga enthusiast and love trying new fitness challenges.",
        profile_image='https://i0.wp.com/optionstogrow.com/wp-content/uploads/2022/04/pexels-run-ffwpu-2402777.jpg'
    )
    luke = User(
        first_name='Luke',
        last_name='Liftweights',
        username='LukeLifts',
        email='luke@aa.io',
        password='password',
        location='Denver',
        about="Fitness has transformed my life. I especially love weightlifting and constantly learning new techniques.",
        profile_image='https://dqh479dn9vg99.cloudfront.net/wp-content/uploads/sites/9/2015/12/02120621/rapha_core_jersey-970x546.jpg'
    )
    karen = User(
        first_name='Karen',
        last_name='Kettlebell',
        username='KarenKeepsFit',
        email='karen@aa.io',
        password='password',
        location='San Diego',
        about="A lifelong fitness devotee. Love running by the beach and trying out new workout classes.",
        profile_image='https://i0.wp.com/hospitalsantamonica.com.br/wp-content/uploads/2018/05/saude-mental-e-a-importancia-dela-na-vida-das-pessoas.jpg'
    )
    tom = User(
        first_name='Tom',
        last_name='Treadmill',
        username='TomTakesOn',
        email='tom@aa.io',
        password='password',
        location='Miami',
        about="Embracing the fit lifestyle in sunny Miami. I'm all about balance, discipline, and pushing the boundaries.",
        profile_image='https://link.usps.com/wp-content/uploads/2021/06/WellnessMensHealthWeek_large-story.jpg'
    )
    
    users=[demo, marnie, bobbie, sam, laura, mike, jess, luke, karen, tom]
    
    db.session.add_all(users)
    db.session.commit()

     # Calculate total distances after committing the users to the database
    for user in users:
        # Get all the results associated with this user through ChallengeParticipant relationship
        results = ChallengeResult.query.filter(ChallengeResult.participant.has(user_id=user.id)).all()

        # Iterate over each result
        for result in results:
            # Get the challenge associated with this result
            challenge = Challenge.query.get(result.challenge_id)

            # Update the appropriate total distance field based on the challenge's activity type
            if challenge.activity_type == 'running':
                user.total_distance_running += result.distance
            elif challenge.activity_type == 'cycling':
                user.total_distance_cycling += result.distance

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
