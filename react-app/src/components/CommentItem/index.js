import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateComment, removeComment } from '../../store/comment';
import { useParams } from 'react-router-dom';


function CommentItem({ comment }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(comment.text);
    const dispatch = useDispatch();
    const { challengeId, resultId } = useParams();
    const currentUser = useSelector((state) => state.session.user);

    const handleSave = () => {

        dispatch(updateComment(challengeId, resultId, comment.id, { 
            user_id: currentUser.id,
            result_id: resultId,
            text: editedText 
        }));
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(removeComment(challengeId, resultId, comment.id));
    };

    if (isEditing) {
        return (
            <div>
                <textarea value={editedText} onChange={e => setEditedText(e.target.value)} />
                <button className='edit-comment-button' onClick={handleSave}>Save</button>
                <button className='delete-comment-button' onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <li className='individual-comment'>
            <div className='comment-content'>
            <div></div>
            <div className="comment-user">{comment.user_username}</div>
            <div className="comment-text">{comment.text}</div>
            </div>
            {currentUser && currentUser.id === comment.user_id && (
                <div className='comment-actions'>
                <button className='edit-comment-button' onClick={() => setIsEditing(true)}>
                <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button className='delete-comment-button' onClick={handleDelete}>
                <i class="fa-solid fa-trash-can"></i>
                </button>
                </div>
            )}
        </li>
    );
}

export default CommentItem;
