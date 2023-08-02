import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchChallenges } from '../../store/challenge';
import ChallengeCard from '../ChallengeCards';


const ManageChallenges = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector((state) => state.session.user.id);

    useEffect(() => {
        dispatch(fetchChallenges())
    }, [dispatch]);

    const allChallenges = useSelector((state) => Object.values(state.challenges));

    const myChallenges = allChallenges.filter(challenge => challenge.user_id === userId);


    return (
        <div>
            <h1>Manage Challenges</h1>
            <div className='challenge-cards'>
            {myChallenges.map(challenge => (
                <div key={challenge.id}>
                    <ChallengeCard challenge={challenge} isManagePage={true} isChallengePage={false}/>
                </div>
            ))}
            </div>
        </div> 
    )
    
};

export default ManageChallenges;
