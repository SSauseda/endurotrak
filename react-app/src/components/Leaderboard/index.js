import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllResults, clearChallengeResults, removeChallengeResult } from '../../store/result';
import './Leaderboard.css';


const Leaderboard = ({ challengeId }) => {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);
    // console.log("USERPARTICIPANTS", currentUser.challengeParticipants.id)

    useEffect(() => {
        dispatch(getAllResults(challengeId));
        return () => dispatch(clearChallengeResults());
    }, [dispatch, challengeId])

    const results = useSelector((state) => Object.values(state.results))
    // console.log("RESULTS LEADERBOARD", results)

    const handleDelete = (challengeId, resultId) => {
        dispatch(removeChallengeResult(challengeId, resultId));
    }

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
                <div className='result-card' key={result.id}>
                    <img className='profile-img' src={result.participant_image} alt='participantImage'/>
                    <div className='result-name'>{result.participant_username}</div>
                    <div className='result-distance'>{result.distance}{result.goal_unit}</div>
                    <div className='result-duration'>{result.duration}</div>
                    <div className='result-pace'>{result.pace}km/hr</div>
                    {currentUser.challengeParticipants.find(cp => cp.id === result.participant_id) && 
                        <button onClick={() => handleDelete(challengeId, result.id)}>Delete</button>}
                </div>
            )) : <p>Loading ...</p>}
            </div>
        </div>
    )
}

export default Leaderboard;
