import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchChallenges } from '../../store/challenge';
import ChallengeCard from '../ChallengeCards';
import { removeChallenge } from '../../store/challenge';


const ManageChallenges = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.user);
    const userId = user ? user.id : null;


    useEffect(() => {
        dispatch(fetchChallenges())
    }, [dispatch]);

    const allChallenges = useSelector((state) => Object.values(state.challenges));

    const myChallenges = allChallenges.filter(challenge => challenge.user_id === userId);

    useEffect(() => {
        if (!user) {
            history.push('/');
        }
    }, [user, history])


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
