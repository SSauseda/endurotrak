import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleUser } from '../../store/session';
import { fetchUserChallenges } from '../../store/challenge';
import './AthletePage.css';


const AthletePage = () => {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((state) => state.session.singleUser);
    const currentUser = useSelector((state) => state.session.user);




    useEffect(() => {
        if (currentUser && currentUser.id === parseInt(userId)) {
            history.push('/athlete');
            return;
        }
        dispatch(fetchSingleUser(userId));
        dispatch(fetchUserChallenges(userId));
    }, [dispatch, userId, history, currentUser]);

    const challenges = useSelector((state) => state.challenges);
    const challengesArray = Object.values(challenges);
    console.log('challenges', challengesArray)

    if (!user) {
        return <div>Loading...</div>
    }


    return (
        <div className='athlete-page-container'>
            <div className='athlete-image-container'>
                <img className='athlete-picture' src={user.profileImage} alt="profile" />
            </div>
            <h1 className='athlete-name'>{user.firstName} {user.lastName}</h1>
            <div className='user-challenge-container'>
                <h2>Participating Challenges</h2>
                <ul>
                    {challengesArray.map(challenge => (
                        <Link to={`/challenges/${challenge.id}`} key={challenge.id}>
                        <div className="card-container">
                            <img 
                                className="card-img" 
                                src={challenge.image_url} 
                                alt="challenge"
                                onError={(e) => {
                                    e.target.onError = null;
                                    e.target.src="https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg"
                                }}
                            />
                            <div className="card-title">{challenge.title}</div>
                        </div>
                    </Link>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default AthletePage;
