import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateResultModal from '../CreateResultModal';
import { fetchChallenges, fetchOneChallenge } from '../../store/challenge';
import { getAllResults } from '../../store/result';
import { joinChallenge, leaveChallenge } from '../../store/challenge';
import './ChallengePage.css';


const ChallengePage = () => {
    const { challengeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    
    const challenge = useSelector((state) => state.challenges[challengeId]);
    const currentUser = useSelector((state) => state.session.user);
    const isUserParticipant = challenge && challenge.isUserParticipant;
    const results = useSelector((state) => Object.values(state.results));
    const userHasPostedResult = currentUser && results.some(result => result.participant_username === currentUser.username);


    // Fetch the challenge
    useEffect(() => {
        if(!challenge) {
            dispatch(fetchOneChallenge(challengeId));
    }
}, [dispatch, challengeId]);

// Fetch the results
useEffect(() => {
    dispatch(getAllResults(challengeId));
}, [dispatch, challengeId, isUserParticipant]);



    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toUTCString().split(' ').slice(0, 4).join(' ');
    }

    return (
        <div className="challenge-container">
            <h1 className='challenge-page-title'>{challenge && challenge.title}</h1>
            <img
            className="challenge-image" 
            src={challenge && challenge.image_url} 
            alt="challenge"
            onError={(e) => {
                e.target.onError = null;
                e.target.src="https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg"
            }}
            />


            <div className='challenge-info'>
            <p className="challenge-card-title">{challenge && challenge.description}</p>
            <div className="challenge-dates">
                <p className='challenge-card-description'>Start Date: </p>
                <p className='challenge-date'>{challenge && formatDate(challenge.start_date)}</p>
                <p className='challenge-card-description'>End Date:</p>
                <p className='challenge-date'>{challenge && formatDate(challenge.end_date)}</p>
            </div>
            <p className='challenge-card-description'>Activity Type:</p>
            <p className='challenge-card-info'>{challenge && challenge.activity_type}</p>
            <p className='challenge-card-description'>Goal: </p>
            <p className='challenge-card-info'>{challenge && challenge.goal} {challenge && challenge.goal_unit}</p>
            <p className='challenge-card-description'>Rules: </p>
            <p className='challenge-card-info'>{challenge && challenge.rules}</p>
            </div>

            {isUserParticipant && !userHasPostedResult && 
                <OpenModalButton
                    buttonText="Add result"
                    modalComponent={<CreateResultModal  challenge={challenge}/>}
                    className='add-result-button'
                />
            }

            <div className='leaderboard'>
            {results.length > 0 ? (
                <Leaderboard challengeId={challengeId}/>
                ) : (
                    <div className="no-results-message">
                    <p>No results have been posted yet.</p>
                </div>
            )}
            </div>
        </div>
    )
}

export default ChallengePage;
