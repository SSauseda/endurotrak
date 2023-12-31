import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchChallenges } from "../../store/challenge";
import ChallengeCard from "../ChallengeCards";
import './Challenges.css'



const Challenge = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const challenges = useSelector((state) => Object.values(state.challenges));

    // const [buttonText, setButtonText] = useState('Challenge Joined');

    // const handleMouseEnter = () => { setButtonText('Leave Challenge') };
    // const handleMouseLeave = () => { setButtonText('Challenge Joined') };
    
    useEffect(() => {
        dispatch(fetchChallenges());
    }, [dispatch]);
    
    const handleButtonClick = () => {
      history.push('/challenges/new-challenge');
    }



    return (
        <div className="all-challenge-container">
          <h1 className="challenge-header">Challenges</h1>
          <button className="challenge-page-button" onClick={handleButtonClick}>Create a challenge</button>
          <div className="challenge-cards">
            {challenges.map(challenge => (
                <ChallengeCard challenge={challenge} isChallengePage={true}/>
            ))}
          </div>
        </div>
    )
}

export default Challenge;
