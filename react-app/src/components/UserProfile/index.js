import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyChallenges } from "../../store/challenge";


const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        dispatch(fetchMyChallenges());
    }, [dispatch]);
    
    const challenges = useSelector((state) => Object.values(state.userChallenges));
    console.log("CHALLENGES", challenges)


    return (
        <div>
            <h1>{user.firstName}'s Profile</h1>
            {challenges.map(challenge => (
                <div className="card-container" key={challenge.id}>
                    <img className="card-img" src={challenge.image_url} alt="challenge"/>
                    {challenge.title}
                </div>
            ))}
        </div>
    )
}

export default UserProfile;
