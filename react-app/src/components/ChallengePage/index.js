import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector } from 'react-redux';
import OpenModalButton from '../OpenModalButton';
import CreateResultModal from '../CreateResultModal';

const ChallengePage = () => {

    const { challengeId } = useParams();
    const history = useHistory();

    const challenge = useSelector((state) => state.challenges[challengeId]);
    // console.log("challengepage",challengeId)
    const currentUser = useSelector((state) => state.session.user);

    const isUserParticipant = challenge && challenge.isUserParticipant
    // console.log("BOOLEANBOOLEAN", isUserParticipant)

    const results = useSelector((state) => Object.values(state.results))

    // console.log("USERRESULT", results)

    return (
        <div>
            <h1>Challenge Page</h1>
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
