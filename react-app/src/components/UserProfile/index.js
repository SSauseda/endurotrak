import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyChallenges } from "../../store/challenge";
import { useHistory, Redirect } from "react-router-dom";
import './UserProfile.css'


const UserProfile = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);

    useEffect(()=> {
        if (!user) {
            history.push("/");
            return;
        }

        dispatch(fetchMyChallenges());
    }, [dispatch, user, history])

    // useEffect(() => {
    //     dispatch(fetchMyChallenges());
    // }, [dispatch]);
    
    const challenges = useSelector((state) => Object.values(state.userChallenges));
    console.log("CHALLENGES", challenges)

    if (!user) return <Redirect to="/" />;

    const maxRunningDistance = 150;
    const maxCyclingDistance = 1000;

    const runningPercentage = (user.totalDistanceRunning / maxRunningDistance) * 100;
    const cyclingPercentage = (user.totalDistanceCycling / maxCyclingDistance) * 100;

    // if (!user) return null;


    return (
        <div className="profile-container">
            <div className="profile-header">
                <img className="profile-picture" src={user.profileImage} alt={`${user.firstName}'s profile`}/>
                <h1>{user.firstName} {user.lastName}</h1>
                <div className="follwers-container">
                    <div>Following {user.followingsCount}</div>
                    <div>Followers {user.followersCount}</div>
                {/* <div>Activity {user.participatingChallengesCount}</div> */}
                </div>
            </div>
            <div className="user-challenges-container">
            {challenges.map(challenge => (
                <div className="card-container" key={challenge.id}>
                    <img className="card-img" src={challenge.image_url} alt="challenge"/>
                    <div className="card-title">{challenge.title}</div>
                </div>
            ))}
            </div>
            <div className="user-distance-container">
                <div className="running-distance">
                    Monthy running distance: {user.totalDistanceRunning} Kilometers / {maxRunningDistance} Kilometers
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${runningPercentage}%`}}></div>
                    </div>
                </div>
                <br>
                </br>
                <div className="cycling-distance"> 
                    Monthly cycling distance: {user.totalDistanceCycling} Kilometers / {maxCyclingDistance} Kilometers
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{width: `${cyclingPercentage}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;
