import { REMOVE_USER } from "./session";

// Action Types
const GET_CHALLENGES = 'challenges/GET_CHALLENGES';
const CREATE_CHALLENGE = 'challenges/CREATE_CHALLENGE';
const UPDATE_CHALLENGE = 'challenges/UPDATE_CHALLENGE';
const DELETE_CHALLENGE = 'challenges/DELETE_CHALLENGE';
const JOIN_CHALLENGE = 'challenges/JOIN_CHALLENGE';
const LEAVE_CHALLENGE = 'challenges/LEAVE_CHALLENGE';
const GET_MY_CHALLENGES = 'challenges/GET_MY_CHALLENGES';
const GET_USER_CHALLENGES = 'challenges/GET_USER_CHALLENGES';



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
});

const participateChallenge = (challengeId, userId) => ({
    type: JOIN_CHALLENGE,
    payload: { challengeId, userId }
});

const unparticipateChallenge = (challengeId, userId) => ({
    type: LEAVE_CHALLENGE,
    payload: { challengeId, userId }
});

const getMyChallenges = (challenges) => ({
    type: GET_MY_CHALLENGES,
    payload: challenges
})

const getUserChallenges = (challenges) => ({
    type: GET_USER_CHALLENGES,
    payload: challenges
})


// Thunks
export const fetchChallenges = () => async (dispatch) => {
    const response = await fetch('/api/challenges/');

    if (response.ok) {
        const { challenges } = await response.json();
        console.log("FETCHFETCHFETCH", challenges)
        dispatch(getChallenges(challenges));
    } else {
        console.error('Error fetching challenges')
    }

    // if (response.ok) {
    //     const challengesData = await response.json();
    //     const challenges = Object.values(challengesData)
    //     dispatch(getChallenges(challenges));
    //     return challenges;
    // }
};


export const addChallenge = (challenge) => async (dispatch) => {
    const response = await fetch ('/api/challenges/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challenge),
    });

    if (response.ok) {
        const newChallenge = await response.json();
        dispatch(createChallenge(newChallenge));
        return newChallenge;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const editChallenge = (
    challengeId,
    title,
    description,
    activityType,
    goal,
    goalUnit,
    startDate,
    endDate,
    imageUrl,
    rules
) => async (dispatch) => {
    console.log("EDIT", challengeId)
    const response = await fetch(`/api/challenges/${challengeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            title,
            description,
            activity_type: activityType,
            goal,
            goal_unit: goalUnit,
            start_date: startDate,
            end_date: endDate,
            image_url: imageUrl,
            rules
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(updateChallenge(data));
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

export const removeChallenge = (challengeId) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${challengeId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteChallenge(challengeId));
        return response;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}

export const joinChallenge = (challengeId) => async (dispatch, getState) => {
    const state = getState();
    const userId = state.session.user.id;

    const response = await fetch(`/api/challenges/${challengeId}/participants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(participateChallenge(challengeId, data));
        dispatch(fetchChallenges());
        return null;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
};

export const leaveChallenge = (challengeId, userId) => async (dispatch, getState) => {
    const state = getState();
    const userId = state.session.user.id;

    const response = await fetch(`/api/challenges/${challengeId}/participants`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    });

    if (response.ok) {
        console.log("LEAVELEAVELAVEEALEAVE", getChallenges());
        dispatch(unparticipateChallenge({ challengeId, userId }));
        dispatch(fetchChallenges());
        // dispatch(fetchMyChallenges());
        return null;
    } else {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        } else {
            return ['An error occurred. Please try again.'];
        }
    }
}

export const fetchMyChallenges = () => async (dispatch) => {
    const response = await fetch('/api/challenges/my-challenges');

    if (response.ok) {
        const challenges = await response.json();
        // console.log("INSIDE THUNK", challenges)
        dispatch(getMyChallenges(challenges));
    } else {
        console.error('Error fetching challenges')
    }
};

export const fetchUserChallenges = (userId) => async (dispatch) => {
    const response = await fetch(`/api/challenges/user-challenges/${userId}`);

    if (response.ok) {
        const challenges = await response.json();
        dispatch(getUserChallenges(challenges));
    } else {
        console.error('Error fetching challenges', userId)
    }
};


// Reducer
const initialState = {};

const challengeReducer = (state = initialState, action, getState) => {
    let newState;
    switch (action.type) {
        case GET_CHALLENGES:
            newState = { ...state };
            action.payload.forEach(challenge => {
                newState[challenge.id] = challenge;
            });
            return newState;
        case CREATE_CHALLENGE:
            console.log('payload:' , action.payload)
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case UPDATE_CHALLENGE:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CHALLENGE:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        case JOIN_CHALLENGE:
            newState = { ...state };
            newState[action.payload.challengeId].participants.push(action.payload.userId);
            return newState;
        case LEAVE_CHALLENGE:
            newState = { ...state };
            if (newState[action.payload.challengeId]) {
                newState[action.payload.challengeId].participants = newState[action.payload.challengeId].participants.filter(userId => userId !== action.payload.userId);
            }
            return newState;
        case GET_MY_CHALLENGES:
            console.log('payload:' , action.payload)
            newState = { ...state };
            Object.values(action.payload).forEach(challenge => {
                newState[challenge.id] = challenge;
            });
            return newState;
        case GET_USER_CHALLENGES:
            newState = { ...state };
            Object.values(action.payload).forEach(challenge => {
                // console.log("CHALLENGE", challenge)
                newState[challenge.id] = challenge;
            });
            return newState;
        case REMOVE_USER:
            return initialState;
        default:
            return state;
    }
}

const userChallengeReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_MY_CHALLENGES:
            console.log('payload:' , action.payload)
            newState = { ...state };
            Object.values(action.payload).forEach(challenge => {
                newState[challenge.id] = challenge;
            });
            return newState;
        case REMOVE_USER:
            return initialState;
        default:
            return state;
    }
}

export { challengeReducer, userChallengeReducer};
