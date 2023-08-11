import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEachResult } from '../../store/result';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import Comments from '../Comments';
import { fetchBravos, createBravo } from '../../store/bravo';
import './ResultModal.css';


const ResultModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const { challengeId, resultId } = useParams();

    const user = useSelector((state) => state.session.user);
    const result = useSelector((state) => state.results[resultId]);
    const results = useSelector((state) => Object.values(state.results));
  
    
    useEffect(() => {
        if (resultId) {
            dispatch(getEachResult(challengeId, resultId));
        }
    }, [dispatch, challengeId, resultId])
    
    useEffect(() => {
        dispatch(fetchBravos(challengeId, resultId));
    }, [dispatch])
    
    const bravos = useSelector((state) => state.bravos);
    console.log("BRAVOLENGTH", bravos.length)
    // const bravosForCurrentResult = bravos.flat().filter(bravo => bravo.result_id === parseInt(resultId));

    const hasGivenBravo = Boolean(bravos.find(bravo => bravo.user_id === user.id))
    console.log(hasGivenBravo)

    if (!result) {
        return <div>Loading...</div>;
    }

    const handleBravoClick = async () => {
        const bravoData = {
            user_id: user.id,
            participant_id: results[0].participant_id,
            result_id: resultId
        };

        const errors = await dispatch(createBravo(challengeId, resultId, bravoData));
        if (errors) {
            console.error(errors);
        }
    }


    return (
        <div className="result-modal">
            <h2 className="result-title">Challenge Result</h2>
            <div className="result-details">
                <p><strong>Description:</strong> {result.result_description}</p>
                <p><strong>Distance:</strong> {result.distance} {result.goal_unit}</p>
                <p><strong>Duration:</strong> {result.duration}</p>
                <p><strong>Pace:</strong> {result.pace}</p>
            </div>
            <div className="bravos-count">
                {bravos.length} {bravos.length === 1 ? 'bravo' : 'bravos'}
            </div>
            <button className="bravo-button" 
            onClick={handleBravoClick}
            disabled={hasGivenBravo}
            >
                Give Bravo
                </button>
            <div className="comments-section">
                <Comments />
            </div>
            <button className="return-button" onClick={() => history.push(`/challenges/${challengeId}`)}>Return</button>
        </div>
    )
}

export default ResultModal;
