from flask.cli import AppGroup
from .users import seed_users, undo_users
from .challenges import seed_challenges, undo_challenges
from .challenge_results import seed_challenge_results, undo_challenge_results
from .comments import seed_comments, undo_comments

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_comments()
        undo_challenge_results()
        undo_challenges()
        undo_users()
    seed_users()
    seed_challenges()
    seed_challenge_results()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_challenges()
    undo_challenge_results()
    # Add other undo functions here
