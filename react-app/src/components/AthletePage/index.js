import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { fetchSingleUser} from '../../store/session';


const AthletePage = () => {
    const { userId } = useParams();
    const history = useHistory();

    const user = useSelector((state) => state.session.singleUser);
    const currentUser = useSelector((state) => state.session.user);
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
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
        </div>
    )
}

export default AthletePage;
