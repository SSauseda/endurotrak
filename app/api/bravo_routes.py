from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Bravo
from app.forms import BravoForm

bravo_routes = Blueprint('bravos', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# GET ALL BRAVOS
# @bravo_routes.route('/')
# def get_bravos():
#     """
#     Query for all bravos and returns them in a list of bravo dictionaries
#     """
#     bravos = Bravo.query.all()
#     return {'bravos': [bravo.to_dict() for bravo in bravos]}

# GET BRAVOS BASED ON RESULT ID
@bravo_routes.route('/challenges/<int:challenge_id>/results/<int:result_id>/bravos')
def get_bravos_by_result(challenge_id, result_id):

    bravos = Bravo.query.filter_by(result_id=result_id).all()
    return {'bravos': [bravo.to_dict() for bravo in bravos]}

# CREATE A BRAVO FOR A CHALLENGE RESULT
@bravo_routes.route('/challenges/<int:challenge_id>/results/<int:result_id>/bravos', methods=['POST'])
@login_required
def post_bravo(challenge_id, result_id):
    """
    Logged in User gives Bravo to another User for a Challenge Result
    """
    form = BravoForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Check if a bravo already exists for this user, recipient, and result
        existing_bravo = Bravo.query.filter_by(
            user_id = current_user.id,
            recipient_id = form.data['recipient_id'],
            result_id = form.data['result_id']
        ).first()
        if existing_bravo is not None:
            # If bravo exisits, return an error
            return {'errors': ['Bravo already exists']}, 400
        
        bravo = Bravo(
            user_id = current_user.id,
            recipient_id = form.data['recipient_id'],
            result_id = form.data['result_id']
        )
        db.session.add(bravo)
        db.session.commit()
        print('BRAVO ADDED!')
        return bravo.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


