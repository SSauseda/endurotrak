const SET_COMMENT = 'comments/SET_COMMENT';
const ADD_COMMENT = 'comments/ADD_COMMENT';
const UPDATE_COMMENT = 'comments/UPDATE_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';
const SET_COMMENTS = 'comments/SET_COMMENTS';


const setComment = (comment) => ({
    type: SET_COMMENT,
    comment,
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment,
});

const updateCommentData = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId,
});

const setComments = (comments) => ({
    type: SET_COMMENTS,
    comments,
});


export const getAllComments = (challengeId, resultId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments`);
    

    if (response.ok) {
        const data = await response.json();
        dispatch(setComments(data.comments));
    } else {
        console.error('Error fetching comments')
    }
};

export const getCommentById = (challengeId, resultId, commentId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`);

    if (response.ok) {
        const comment = await response.json();
        dispatch(setComment(comment));
    } else {
        console.error('Error fetching comment')
    }
}


export const postComment = (challengeId, resultId, text) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(text)
    });
    if (response.ok) {
        const comment = await response.json();
        dispatch(addComment(comment));
        return;
    } else {
        const errorData = await response.json();
        return errorData.errors;
    }
};

export const updateCommentById = (challengeId, resultId, commentId, text) => async dispatch => {
    try {
        const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(text)
        });
        if (response.ok) {
            const comment = await response.json();
            dispatch(updateCommentData(comment));
            return comment;
        } else {
            const errorData = await response.json();
            console.error('Error updating comment:', errorData.message);
        }
    } catch (error) {
        console.error('Error updating comment:', error.message);
    }
};

export const deleteCommentById = (challengeId, resultId, commentId) => async dispatch => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteComment(commentId));
    } else {
        console.error('Error deleting comment')
    }
}


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case SET_COMMENTS:
            return action.comments;
        case SET_COMMENT:
            newState = { ...state, [action.comment.id]: action.comment };
            return newState;
        case ADD_COMMENT:
            newState = { ...state, [action.comment.id]: action.comment };
            return newState;
        case UPDATE_COMMENT:
            newState = { ...state, [action.comment.id]: action.comment };
            return newState;
        case DELETE_COMMENT:
            newState = { ...state };
            delete newState[action.commentId];
            return newState;
        default:
            return state;
    }
}

export default commentReducer;
