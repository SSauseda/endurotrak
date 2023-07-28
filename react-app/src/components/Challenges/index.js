import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChallenges } from "../../store/challenge";
import './Challenges.css'


const Challenge = () => {
    const dispatch = useDispatch();

    // const challenges = useSelector((state) => Object.values(state.challenges));
    const challenges = useSelector((state) => state.challenges);
    const challengeValues = Object.values(challenges)

    useEffect(() => {
        dispatch(fetchChallenges());
    }, [dispatch]);

    console.log("CHALLENGES", challengeValues)



    return (
        <div>
            {challengeValues[0].map((challenge) => (
                <div key={challenge.id} className="challenge-tile">
                    <h2>{challenge.title}</h2>
                    <p>{challenge.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Challenge;
