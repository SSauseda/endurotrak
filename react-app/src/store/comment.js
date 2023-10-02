const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENT = 'GET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const EDIT_COMMENT = 'EDIT_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
  });
  
const getComment = (comment) => ({
    type: GET_COMMENT,
    comment
  });
  
const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
  });
  
const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
  });
  
const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
  });



export const fetchComments = (challengeId, resultId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments`);
        const data = await response.json();
        dispatch(getComments(data));
    } catch (err) {
        console.error('Failed to fetch comments', err);
    }
};


export const fetchComment = (challengeId, resultId, commentId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`);
        const data = await response.json();
        dispatch(getComment(data));
    } catch (err) {
        console.error(`Failed to fetch comment ${commentId}`, err);
    }
};

export const createComment = (challengeId, resultId, commentData) => async (dispatch) => {
    const payload = JSON.stringify(commentData);
    try {
        const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload
        });

        const data = await response.json();
        dispatch(addComment(data));
        return { success: true };
    } catch (err) {
        console.error('Failed to create comment', err);
    }
};

export const updateComment = (challengeId, resultId, commentId, text) => async (dispatch) => {
    try {
        const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(text)
        });
        const data = await response.json();
        dispatch(editComment(data));
    } catch (err) {
        console.error(`Failed to update comment ${commentId}`, err);
    }
};

export const removeComment = (challengeId, resultId, commentId) => async (dispatch) => {
    try {
        await fetch(`/api/challenges/${challengeId}/results/${resultId}/comments/${commentId}`, {
            method: 'DELETE'
        });
        dispatch(deleteComment(commentId));
    } catch (err) {
        console.error(`Failed to delete comment ${commentId}`, err);
    }
};


const initialState = [];

const commentReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return action.comments;
        case GET_COMMENT:
            return [...state, action.comment];
        case ADD_COMMENT:
            return [
                action.comment,
                ...state
            ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case EDIT_COMMENT:
            return state.map((comment) => comment.id === action.comment.id ? action.comment : comment);
        case DELETE_COMMENT:
            return state.filter((comment) => comment.id !== action.commentId);
        default:
            return state;
        }
};

export default commentReducer;
