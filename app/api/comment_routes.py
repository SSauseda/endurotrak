from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# CREATE A COMMENT FOR A CHALLENGE RESULT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments', methods=['POST'])
@login_required
def post_comment(challenge_id, result_id):
    """
    Logged in User creates a comment for a challenge result
    """
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment(
            user_id = current_user.id,
            result_id = form.data['result_id'],
            text = form.data['text']
        )
        db.session.add(comment)
        db.session.commit()
        print('COMMENT ADDED!')
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# GET COMMENT BY ID
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['GET'])
@login_required
def get_comment(challenge_id, result_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        return comment.to_dict()
    else:
        return {'errors': ['Comment not found']}, 404

# UPDATE A COMMENT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(challenge_id, result_id, comment_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment.query.get(comment_id)
        if comment.user_id != current_user.id:
            return {'errors': ['You do not have permission to update this comment.']}, 403
        comment.text = form.data['text']
        db.session.commit()
        return comment.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# DELETE A COMMENT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(challenge_id, result_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment.user_id != current_user.id:
        return {'errors': ['You do not have permission to delete this comment.']}, 403
    db.session.delete(comment)
    db.session.commit()
    return {'message': 'Comment deleted'}

# GET ALL COMMENTS FOR A CHALLENGE RESULT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments', methods=['GET'])
@login_required
def get_comments_for_result(challenge_id, result_id):
    comments = Comment.query.filter_by(result_id=result_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}

