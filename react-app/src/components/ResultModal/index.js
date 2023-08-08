import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEachResult } from '../../store/result';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import Comments from '../Comments';


const ResultModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const { challengeId, resultId } = useParams();

    useEffect(() => {
        if (resultId) {
            dispatch(getEachResult(challengeId, resultId));
        }
    }, [dispatch, challengeId, resultId])

    const result = useSelector((state) => state.results[resultId]);

    if (!result) {
        return <div>Loading...</div>;
    }


    return (
        <div>
            <h2>Challenge Result</h2>
            <p><strong>Description:</strong> {result.result_description}</p>
            <p><strong>Distance:</strong> {result.distance} {result.goal_unit}</p>
            <p><strong>Duration:</strong> {result.duration}</p>
            <p><strong>Pace:</strong> {result.pace}</p>
            <div>
                <Comments />
            </div>
            <button onClick={() => history.push(`/challenges/${challengeId}`)}>Return</button>
        </div>
    )
}

export default ResultModal;
