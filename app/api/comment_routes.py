from flask import Blueprint, request, jsonify
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

# # CREATE A COMMENT FOR A CHALLENGE RESULT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments', methods=['POST'])
@login_required
def post_comment(challenge_id, result_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate():
        new_comment = Comment(
            user_id=current_user.id,
            result_id=result_id,
            text=form.data['text']
        )
        db.session.add(new_comment)
        db.session.commit()
        return jsonify(new_comment.to_dict()), 201
    else:
        return jsonify(form.errors), 400

# # GET COMMENT BY ID
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['GET'])
@login_required
def get_comment_by_id(challenge_id, result_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        return jsonify(comment.to_dict())
    else:
        abort(404, description="Comment not found.")


# # UPDATE A COMMENT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(challenge_id, result_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        form = CommentForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate():
            if comment.user_id != current_user.id:
                return {'errors': ['You do not have permission to update this comment.']}, 403
            comment.text = form.data['text']
            db.session.commit()
            return jsonify(comment.to_dict())
        else:
            return jsonify(form.errors), 400
    else:
        abort(404, description="Comment not found.")

# # DELETE A COMMENT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(challenge_id, result_id, comment_id):
    comment = Comment.query.get(comment_id)
    if comment:
        if comment.user_id != current_user.id:
            return {'errors': ['You do not have permission to delete this comment.']}, 403
        db.session.delete(comment)
        db.session.commit()
        return jsonify({"message": "Comment deleted successfully"}), 200
    else:
        abort(404, description="Comment not found.")

# # GET ALL COMMENTS FOR A CHALLENGE RESULT
@comment_routes.route('/<int:challenge_id>/results/<int:result_id>/comments', methods=['GET'])
@login_required
def get_all_comments(challenge_id, result_id):
    comments = Comment.query.filter_by(result_id=result_id).order_by(Comment.created_at.desc()).all()
    return jsonify([comment.to_dict() for comment in comments])
