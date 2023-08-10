const SET_BRAVOS = 'SET_BRAVOS';
const ADD_BRAVO = 'ADD_BRAVO';


const setBravos = (bravos) => ({
    type: SET_BRAVOS,
    bravos
});

const addBravo = (bravo) => ({
    type: ADD_BRAVO,
    bravo
});

export const fetchBravos = (challengeId, resultId) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/bravos`);

    if (response.ok) {
        const bravos = await response.json();
        console.log("Fetched bravos:", bravos.bravos);
        dispatch(setBravos(bravos.bravos));
    }
};

export const createBravo = (challengeId, resultId, bravoData) => async (dispatch) => {
    const response = await fetch(`/api/challenges/${challengeId}/results/${resultId}/bravos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bravoData)
    });

    if (response.ok) {
    const bravo = await response.json();
        console.log("BRAVOTHUNK", bravo.bravo)
        dispatch(addBravo(bravo));
        return null;
    } else {
        // console.log("TEXT", await response.text())
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }
    }
}

const initialState = [];

const bravoReducer = (state = initialState, action) => {
    console.log("Current state:", state);
    console.log("Action:", action);
    
    switch (action.type) {
        case SET_BRAVOS:
            // console.log('setbravos', action.bravos)
            return action.bravos;
        case ADD_BRAVO:
            return [...state, action.bravo];
        default:
            return state;
    }
}

export default bravoReducer;
