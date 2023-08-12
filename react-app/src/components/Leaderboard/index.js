import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllResults, clearChallengeResults, removeChallengeResult, getEachResult } from '../../store/result';
import ResultModal from '../ResultModal';
import OpenModalButton from '../OpenModalButton';
import './Leaderboard.css';


const Leaderboard = ({ challengeId }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const currentUser = useSelector((state) => state.session.user);
    // console.log("USERPARTICIPANTS", currentUser.challengeParticipants.id)

    const [selectedResult, setSelectedResult] = useState(null);

    


    useEffect(() => {
        dispatch(getAllResults(challengeId));
        return () => dispatch(clearChallengeResults());
    }, [dispatch, challengeId])

    const results = useSelector((state) => Object.values(state.results))
    const result = useSelector((state) => state.results[selectedResult]);
    console.log("RESULTS LEADERBOARD", results)

    const handleDelete = (e, challengeId, resultId) => {
        e.stopPropagation();
        dispatch(removeChallengeResult(challengeId, resultId));
        history.push(`/challenges/${challengeId}`)
    }

    const handleOpenModal = (challengeId, resultId) => {
        dispatch(getEachResult(challengeId, resultId));
        setSelectedResult(resultId);
        history.push(`/challenges/${challengeId}/results/${resultId}`);
    }
    
    if (!currentUser) return null;

    
    return (
        <div className='leaderboard-container'>
            <h1 className='leaderboard-header'>Leaderboard</h1>
            <div className='result-container'>
                <div className='result-card header'>
                    <div>Participant</div>
                    <div>Distance</div>
                    <div>Duration</div>
                    <div>Pace</div>
                </div>
            {results ? results.map(result => (
                <div 
                    className='result-card'
                    key={result.id}
                    onClick={() => handleOpenModal(challengeId, result.id)}
                 >
                    <img className='profile-img' src={result.participant_image} alt='participantImage'/>
                    <div className='result-name'>{result.participant_username}</div>
                    <div className='result-distance'>{result.distance}{result.goal_unit}</div>
                    <div className='result-duration'>{result.duration}</div>
                    <div className='result-pace'>{result.pace}min/km</div>
                    {currentUser && currentUser.challengeParticipants.find(cp => cp.id === result.participant_id) && 
                        <button 
                        className='result-delete-button' 
                        onClick={(e) => handleDelete(e, challengeId, result.id)}
                        >
                            Delete
                        </button>
                    }
                </div>
            )) : <p>Loading ...</p>}
            </div>
        </div>
    )
}

export default Leaderboard;
