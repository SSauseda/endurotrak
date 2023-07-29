import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges } from "../../store/challenge";
import './Challenges.css'


const Challenge = () => {
    const dispatch = useDispatch();

    const challenges = useSelector((state) => Object.values(state.challenges));
    console.log("CHALLENGES", typeof challenges)
    
    useEffect(() => {
        dispatch(fetchChallenges());
    }, [dispatch]);
    



    return (
        <div>
      {challenges.map(challenge => (
        <div key={challenge.id}>
          <h2>{challenge.title}</h2>
          <p>{challenge.description}</p>
        </div>
      ))}
    </div>
    )
}

export default Challenge;
