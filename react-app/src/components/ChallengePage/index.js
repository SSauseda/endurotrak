import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateResultModal from '../CreateResultModal';
import { fetchChallenges } from '../../store/challenge';
import { getAllResults } from '../../store/result';
import './ChallengePage.css';


const ChallengePage = () => {
    const { challengeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const challenge = useSelector((state) => state.challenges[challengeId]);
    const currentUser = useSelector((state) => state.session.user);
    const isUserParticipant = challenge && challenge.isUserParticipant
    const results = useSelector((state) => Object.values(state.results))

    
    useEffect(() => {
        if(!challenge) {
            dispatch(fetchChallenges(challengeId));
        }
        dispatch(getAllResults(challengeId));
    }, [dispatch, challengeId, challenge])


    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toUTCString().split(' ').slice(0, 4).join(' ');
    }

    return (
        <div className="challenge-container">
            <h1>{challenge && challenge.title}</h1>
            <img src={challenge && challenge.image_url} alt="Challenge" className="challenge-image"/>
            <p className="challenge-description">{challenge && challenge.description}</p>
            <div className="challenge-dates">
                <span>Start Date: {challenge && formatDate(challenge.start_date)}</span>
                <span>End Date: {challenge && formatDate(challenge.end_date)}</span>
            </div>
            <p>Activity Type: {challenge && challenge.activity_type}</p>
            <p>Goal: {challenge && challenge.goal} {challenge && challenge.goal_unit}</p>
            <p>Rules: {challenge && challenge.rules}</p>

            {isUserParticipant &&
                <OpenModalButton
                    buttonText="Add result"
                    modalComponent={<CreateResultModal  challenge={challenge}/>}
                    className='add-result-button'
                />
            }

            {results.length > 0 ? (
                <Leaderboard challengeId={challengeId}/>
            ) : (
                <div className="no-results-message">
                    <p>No results have been posted yet.</p>
                </div>
            )}
        </div>
    )
}

export default ChallengePage;
