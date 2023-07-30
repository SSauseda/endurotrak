import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges } from "../../store/challenge";
import ChallengeCard from "../ChallengeCards";
import './Challenges.css'



const Challenge = () => {
    const dispatch = useDispatch();
    const challenges = useSelector((state) => Object.values(state.challenges));
    console.log("CHALLENGES", typeof challenges)

    const [buttonText, setButtonText] = useState('Challenge Joined');

    const handleMouseEnter = () => { setButtonText('Leave Challenge') };
    const handleMouseLeave = () => { setButtonText('Challenge Joined') };
    
    useEffect(() => {
        dispatch(fetchChallenges());
    }, [dispatch]);
    



    return (
        <div className="challenge-container">
          <div className="challenge-cards">
            {challenges.map(challenge => (
                <ChallengeCard challenge={challenge} />
            ))}
          </div>
        </div>
    )
}

export default Challenge;
