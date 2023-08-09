const SET_BRAVOS = 'bravos/SET_BRAVOS';
const ADD_BRAVO = 'bravos/ADD_BRAVO';


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
        dispatch(setBravos(bravos));
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
    switch (action.type) {
        case SET_BRAVOS:
            return action.bravos;
        case ADD_BRAVO:
            return [...state, action.bravo];
        default:
            return state;
    }
}

export default bravoReducer;
