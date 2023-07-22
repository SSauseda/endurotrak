from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():

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
    result7 = ChallengeResult.query.get(7)

    comment1 = Comment(user_id=user2.id, result_id=result1.id, text="Great job on this challenge!")
    comment2 = Comment(user_id=user3.id, result_id=result1.id, text="Impressive time!")
    comment3 = Comment(user_id=user3.id, result_id=result2.id, text="Keep up the good work!")
    comment4 = Comment(user_id=user4.id, result_id=result2.id, text="Nice pace!")
    comment5 = Comment(user_id=user7.id, result_id=result3.id, text="Way to go!")
    comment6 = Comment(user_id=user9.id, result_id=result3.id, text="Good job!")
    comment7 = Comment(user_id=user8.id, result_id=result4.id, text="Amazing result!")
    comment8 = Comment(user_id=user5.id, result_id=result4.id, text="Keep pushing!")
    comment9 = Comment(user_id=user10.id, result_id=result5.id, text="Incredible effort!")
    comment10 = Comment(user_id=user2.id, result_id=result5.id, text="You're doing great!")
    comment11 = Comment(user_id=user5.id, result_id=result6.id, text="Fantastic result!")
    comment12 = Comment(user_id=user4.id, result_id=result6.id, text="Keep up the good pace!")

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)
    db.session.add(comment6)
    db.session.add(comment7)
    db.session.add(comment8)
    db.session.add(comment9)
    db.session.add(comment10)
    db.session.add(comment11)
    db.session.add(comment12)

    db.session.commit()

    def undo_comments():
        if environment == "production":
            db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        else:
            db.session.execute(text("DELETE FROM comments"))
        db.session.commit()


