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
        console.log("CHALLENGEID", challenge.id);
    
        for (const participant of user.challengeParticipants) {
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
                };
                

                const newResult = await dispatch(addChallengeResult(challenge.id, result));
                
                console.log("CREATERESULT", newResult);
                
                setCreateResult(newResult);
                
                if (newResult && newResult.errors) {
                    console.log("ERRORS", newResult.errors);
                    setErrors(newResult.errors);
                }
            }
        }
    
        closeModal();
    }
    

    const calculatePace = (distance, duration, goalUnit) => {
        if (!distance || !duration) return;

        const distanceInKm = goalUnit === 'mi' ? distance * 1.60934 : distance;

        const [hours, mintues] = duration.split(':').map(Number);
        const totalMinutes = (hours * 60) + mintues;

        return (totalMinutes / distanceInKm).toFixed(2);
    }

    const handleDistanceChange = (e) => {
        setDistance(e.target.value);
        const updatedPace = calculatePace(e.target.value, duration, goalUnit);
        setPace(updatedPace);
    }

    const handleDurationChange = (e) => {
        setDuration(e.target.value);
        const updatedPace = calculatePace(distance, e.target.value, goalUnit);
        setPace(updatedPace);
    }

    const handleUnitChange = (e) => {
        setGoalUnit(e.target.value);
        const updatedPace = calculatePace(distance, duration, e.target.value);
        setPace(updatedPace);
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
                    onChange={handleDistanceChange}
                />
            </label>
            <label>
                Goal Unit
                <select
                    value={goalUnit}
                    onChange={handleUnitChange}
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
                    onChange={handleDurationChange}
                />
            </label>
            <label>
                Pace
                <input
                    type='number'
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    readOnly
                />
            </label>
            <button type='submit'>submit</button>
        </form>
    )
}

export default CreateResultModal;
