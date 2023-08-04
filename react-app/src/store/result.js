const GET_CHALLENGE_RESULTS = 'challengeResults/GET_CHALLENGE_RESULTS';
const GET_INDIVIDUAL_RESULT = 'challengeResults/GET_INDIVIDUAL_RESULT';
const CREATE_CHALLENGE_RESULT = 'challengeResults/CREATE_CHALLENGE_RESULT';
const DELETE_CHALLENGE_RESULT = 'challengeResults/DELETE_CHALLENGE_RESULT';
const CLEAR_CHALLENGE_RESULTS = 'challengeResults/CLEAR_CHALLENGE_RESULTS';


const getChallengeResults = (results) => ({
    type: GET_CHALLENGE_RESULTS,
    payload: results,
});

const getIndividualResult = (result) => ({
    type: GET_INDIVIDUAL_RESULT,
    payload: result,
});

const createChallengeResult = (result) => ({
    type: CREATE_CHALLENGE_RESULT,
    payload: result,
});

const deleteChallengeResult = (resultId) => ({
    type: DELETE_CHALLENGE_RESULT,
    payload: resultId,
});

export const clearChallengeResults = () => ({
    type: CLEAR_CHALLENGE_RESULTS,
});


export const getAllResults = (challengeId) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${challengeId}/results`);

    if (response.ok) {
        const results = await response.json();
        console.log("IN RESULT THUNK", results)
        dispatch(getChallengeResults(results));
    } else {
        console.error('Error fetching results')
    }
};

export const getEachResult = (challengeId, resultId) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}`);

    if (response.ok) {
        const result = await response.json();
        dispatch(getIndividualResult(result));
    } else {
        console.error('Error fetching result')
    }
};

export const addChallengeResult = (challengeId, result) => async (dispatch) => {
    try {
        console.log(JSON.stringify(result)); // Here
        const response = await fetch(`/api/challenges/${challengeId}/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result),
        });

        if (response.ok) {
            const result = await response.json();
            dispatch(createChallengeResult(result));
        } else {
            console.error('Error creating result', response.status, response.statusText)
        }
    } catch (err) {
        console.error(err);
    }
}


export const removeChallengeResult = (challengeId, resultId) => async (dispatch) => {
    console.log("THUNK", challengeId)
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        dispatch(deleteChallengeResult(resultId));
    } else {
        console.error('Error deleting result')
    }
}

const initialState = {};

const resultReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_CHALLENGE_RESULTS:
            newState = { ...state };
            action.payload.results.forEach(result => {
                newState[result.id] = result;
            });
            return newState;
        case GET_INDIVIDUAL_RESULT:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case CREATE_CHALLENGE_RESULT:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
        case DELETE_CHALLENGE_RESULT:
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        case CLEAR_CHALLENGE_RESULTS:
            return initialState;
        default:
            return state;
    }
};

export default resultReducer;

