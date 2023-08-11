import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateResultModal from '../CreateResultModal';
import { fetchChallenges } from '../../store/challenge';
import './ChallengePage.css';


const ChallengePage = () => {


    const { challengeId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    

    const challenge = useSelector((state) => state.challenges[challengeId]);
    // console.log("challengepage",challengeId)
    const currentUser = useSelector((state) => state.session.user);

    const isUserParticipant = challenge && challenge.isUserParticipant
    // console.log("BOOLEANBOOLEAN", isUserParticipant)

    const results = useSelector((state) => Object.values(state.results))
    
    useEffect(() => {
        if(!challenge) {
            dispatch(fetchChallenges(challengeId));
        }
    }, [dispatch, challengeId, challenge])
    // console.log("USERRESULT", results)

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
    <Leaderboard challengeId={challengeId}/>
</div>
    )
}

export default ChallengePage;
