import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEachResult } from '../../store/result';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import Comments from '../Comments';
import { fetchBravos, createBravo } from '../../store/bravo';


const ResultModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const { challengeId, resultId } = useParams();

    const user = useSelector((state) => state.session.user);
    const result = useSelector((state) => state.results[resultId]);
  
    
    useEffect(() => {
        if (resultId) {
            dispatch(getEachResult(challengeId, resultId));
        }
    }, [dispatch, challengeId, resultId])
    
    useEffect(() => {
        dispatch(fetchBravos(challengeId, resultId));
    }, [dispatch])
    
    const bravos = useSelector((state) => Object.values(state.bravos));
    const bravosForCurrentResult = bravos.flat().filter(bravo => bravo.result_id === parseInt(resultId));
    console.log("BRAVOS", bravosForCurrentResult)

    if (!result) {
        return <div>Loading...</div>;
    }

    const handleBravoClick = async () => {
        const bravoData = {
            user_id: user.id,
            recipient_id: result.user_id,
            result_id: resultId
        };

        const errors = await dispatch(createBravo(challengeId, resultId, bravoData));
        if (errors) {
            console.error(errors);
        }
    }


    return (
        <div>
            <h2>Challenge Result</h2>
            <p><strong>Description:</strong> {result.result_description}</p>
            <p><strong>Distance:</strong> {result.distance} {result.goal_unit}</p>
            <p><strong>Duration:</strong> {result.duration}</p>
            <p><strong>Pace:</strong> {result.pace}</p>
            <div>
                {bravosForCurrentResult.length} {bravosForCurrentResult.length === 1 ? 'bravo' : 'bravos'}
                {/* {bravosForCurrentResult.length > 0 && 
            `${bravosForCurrentResult.length} ${bravosForCurrentResult.length === 1 ? 'bravo' : 'bravos'}`} */}
            </div>
            <button onClick={handleBravoClick}>Give Bravo</button>
            <div>
                <Comments />
            </div>
            <button onClick={() => history.push(`/challenges/${challengeId}`)}>Return</button>
        </div>
    )
}

export default ResultModal;
