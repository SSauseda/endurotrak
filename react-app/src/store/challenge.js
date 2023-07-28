// Action Types
const GET_CHALLENGES = 'challenges/GET_CHALLENGES';
const CREATE_CHALLENGE = 'challenges/CREATE_CHALLENGE';
const UPDATE_CHALLENGE = 'challenges/UPDATE_CHALLENGE';
const DELETE_CHALLENGE = 'challenges/DELETE_CHALLENGE';


// Action Creators
const getChallenges = (challenges) => ({
    type: GET_CHALLENGES,
    payload: challenges
});

const createChallenge = (challenge) => ({
    type: CREATE_CHALLENGE,
    payload: challenge
});

const updateChallenge = (challenge) => ({
    type: UPDATE_CHALLENGE,
    payload: challenge
});

const deleteChallenge = (challengeId) => ({
    type: DELETE_CHALLENGE,
    payload: challengeId
})

// Thunks
export const fetchChallenges = () => async (dispatch) => {
    const response = await fetch('/api/challenges');

    if (response.ok) {
        const challenges = await response.json();
        dispatch(getChallenges(challenges));
        return challenges;
    }
};


export const addChallenge = (
    userId,
    title,
    description,
    activityType
    ) => async (dispatch) => {
    const response = await fetch ('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            user_id: userId,
            title,
            description,
            activity_type: activityType,
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createChallenge(data));
        return data;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}


// Reducer
const initialState = {};

const challengeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHALLENGES:
            newState = { ...state };
            action.payload.forEach(challenge => {
                newState[challenge.id] = challenge;
            });
            return newState;
        case CREATE_CHALLENGE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        default:
            return state;
    }
}

export default challengeReducer;
