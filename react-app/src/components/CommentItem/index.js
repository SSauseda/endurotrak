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
    console.log("COMMENTEDIT", comment.id)

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
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        );
    }

    return (
        <li className='individual-comment'>
            <div className="comment-user">{comment.user_username}</div>
            <div className="comment-text">{comment.text}</div>
            {currentUser && currentUser.id === comment.user_id && (
                <>
                <button onClick={() => setIsEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                </>
            )}
        </li>
    );
}

export default CommentItem;
