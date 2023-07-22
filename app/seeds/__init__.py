from flask.cli import AppGroup
from .users import seed_users, undo_users
from .followers import seed_followers, undo_followers
from .challenges import seed_challenges, undo_challenges
from .challenge_participants import seed_challenge_participants, undo_challenge_participants
from .challenge_results import seed_challenge_results, undo_challenge_results
from .bravos import seed_bravos, undo_bravos
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
        undo_bravos()
        undo_challenge_results()
        undo_challenge_participants()
        undo_challenges()
        undo_followers()
        undo_users()
    seed_users()
    seed_followers()
    seed_challenges()
    seed_challenge_participants()
    seed_challenge_results()
    seed_bravos()
    seed_comments()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_comments()
    undo_bravos()
    undo_challenge_results()
    undo_challenge_participants()
    undo_challenges()
    undo_followers()
    undo_users()
    # Add other undo functions here
