import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addChallengeResult } from '../../store/result';



const CreateResultModal= ({challenge}) => {

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const user = useSelector((state) => state.session.user);


    const [resultDescription, setResultDescription] = useState('');
    const [distance, setDistance] = useState('');
    const [goalUnit, setGoalUnit] = useState('mi');
    const [duration, setDuration] = useState('');
    const [pace, setPace] = useState('');
    const [createResult, setCreateResult] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("CHALLENGEID", challenge.id)
    
        user.challengeParticipants.forEach(participant => {
            if (participant.user_id === user.id && participant.challenge_id === challenge.id) {
                console.log("PARTICIPANTID", participant.id);
    
                const result = {
                    participant_id: participant.id,
                    challenge_id: challenge.id,
                    result_description: resultDescription,
                    distance: parseFloat(distance),
                    goal_unit: goalUnit,
                    duration,
                    pace: parseFloat(pace),
                }
                const newResult = dispatch(addChallengeResult(challenge.id, result));
                setCreateResult(newResult);
                if (newResult.errors) {
                    console.log("ERRORS", newResult.errors)
                    setErrors(newResult.errors);
                }
            }
        })
        closeModal();
    }
 

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Description
                <textarea
                    value={resultDescription}
                    onChange={(e) => setResultDescription(e.target.value)}
                />
            </label>
            <label>
                Distance
                <input 
                    type='number'
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                />
            </label>
            <label>
                Goal Unit
                <select
                    value={goalUnit}
                    onChange={(e) => setGoalUnit(e.target.value)}
                >
                    <option value='mi'>Miles</option>
                    <option value='km'>Kilometers</option>
                </select>
            </label>
            <label>
                Duration
                <input
                    type='time'
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
            </label>
            <label>
                Pace
                <input
                    type='number'
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                />
            </label>
            <button type='submit'>submit</button>
        </form>
    )
}

export default CreateResultModal;
