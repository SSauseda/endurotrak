import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleUser} from '../../store/session';
import './AthletePage.css';


const AthletePage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const user = useSelector((state) => state.session.singleUser);
    const currentUser = useSelector((state) => state.session.user);
    const challenges = useSelector((state) => Object.values(state.challenges));
    console.log("ATHLETEPAGE", challenges)
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentUser && currentUser.id === parseInt(userId)) {
            history.push('/athlete');
            return;
        }
        dispatch(fetchSingleUser(userId));
    }, [dispatch, userId, history, currentUser]);

    if (!user) {
        return <div>Loading...</div>
    }


    return (
        <div className='athlete-page-container'>
            <div className='athlete-image-container'>
                <img className='athlete-picture' src={user.profileImage} alt="profile" />
            </div>
            <h1 className='athlete-name'>{user.firstName} {user.lastName}</h1>
        </div>
    )
}

export default AthletePage;
