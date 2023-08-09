import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector, useDispatch } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateResultModal from '../CreateResultModal';
import { fetchChallenges } from '../../store/challenge';


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
        <div>
            <h1>Challenge Page</h1>
            <div>
                {challenge && formatDate(challenge.start_date)}
            </div>
            <div>
                {challenge && formatDate(challenge.end_date)}
            </div>
            <div>
                {isUserParticipant &&
                    <OpenModalButton
                    buttonText="Add result"
                    modalComponent={<CreateResultModal  challenge={challenge}/>}
                  />
                 }
                <Leaderboard challengeId={challengeId}/>
            </div>
        </div>
    )
}

export default ChallengePage;
