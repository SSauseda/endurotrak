import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchParticipatingChallenges } from "../../store/session";


const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const participatingChallenges = useSelector((state) => state.session.user.participatingChallenges);

    useEffect(() => {
        if (user) {
            dispatch(fetchParticipatingChallenges(user.id));
        }
    }, [dispatch, user])

    if (!user || !participatingChallenges) return null;


    return (
        <div>
            <h1>{user.firstName}'s Profile</h1>
            {user.participatingChallenges.map(challenge => (
                <div className="card-container" key={challenge.id}>
                    <img className="card-img" src={challenge.image_url} alt="challenge"/>
                    {challenge.title}
                </div>
            ))}
        </div>
    )
}

export default UserProfile;
