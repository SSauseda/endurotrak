import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createComment } from '../../store/comment';

function CommentForm() {
    const [text, setText] = useState('');
    const [errors, setErrors] = useState([]);
    const [successMessage, setSuccessMessage] = useState([]);
    const dispatch = useDispatch();
    const { challengeId, resultId } = useParams();

    const currentUser = useSelector((state) => state.session.user);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors([]);

        if (!text.trim()) {
            setErrors(['Comment cannot be empty']);
            return;
        }

        const commentData = {
            user_id: currentUser.id,
            result_id: parseInt(resultId),
            text: text,

        };
        const post = await dispatch(createComment(challengeId, resultId, commentData));
        
        if (post && post.success) {
            setText('');
            setSuccessMessage(['Comment posted!']);
            setTimeout(() => setSuccessMessage(''), 3000);
        } else if (post && post.errors) {
            setErrors(post.errors);
        }
    };

    return (
        <div>
            {errors && errors.map((error, idx) => (
                <p key={idx} className="errors">{error}</p>
            ))}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <textarea 
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write your comment..."
                />
                <button className='comment-button' type="submit">Post Comment</button>
            </form>
        </div>
    );
}

export default CommentForm;
