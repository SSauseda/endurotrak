import React from 'react';
import { useParams } from 'react-router-dom';
import Leaderboard from '../Leaderboard';
import { useSelector } from 'react-redux';

const ChallengePage = () => {

    const { challengeId } = useParams();

    const challenge = useSelector((state) => state.challenges[challengeId]);
    const currentUser = useSelector((state) => state.session.user);

    const isUserParticipant = challenge && challenge.isUserParticipant
    console.log("BOOLEANBOOLEAN", isUserParticipant)

    return (
        <div>
            <h1>Challenge Page</h1>
            <div>
                {isUserParticipant && <button>Add your result</button>}
                <Leaderboard challengeId={challengeId}/>
            </div>
        </div>
    )
}

export default ChallengePage;
