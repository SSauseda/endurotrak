import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addChallengeResult } from '../../store/result';
import { authenticate } from '../../store/session';
import './ResultModal.css'


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
    const [resultDescriptionErrors, setResultDescriptionErrors] = useState('');
    const [errors, setErrors] = useState([]);
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');
    const [seconds, setSeconds] = useState('');

    useEffect(() => {
        const initialPace = calculatePace(distance, duration, goalUnit);
        setPace(initialPace);
    })

    const handleHoursChange = (e) => {
        setHours(e.target.value);
        updateDuration(e.target.value, minutes, seconds);
    }
    
    const handleMinutesChange = (e) => {
        setMinutes(e.target.value);
        updateDuration(hours, e.target.value, seconds);
    }
    
    const handleSecondsChange = (e) => {
        setSeconds(e.target.value);
        updateDuration(hours, minutes, e.target.value);
    }
    
    const updateDuration = (hours, minutes, seconds) => {
        setDuration(`${hours}:${minutes}:${seconds}`);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessages = [];

        if (resultDescription.length < 10) {
            errorMessages.push('Description must be at least 10 characters');
        }

        if (resultDescription.length > 255) {
            errorMessages.push('Description must be less than 255 characters');
        }

        if (isNaN(distance)) {
            errorMessages.push('Goal must be a number');
        }

        if (distance < 0) {
            errorMessages.push('Goal must be greater than 0');
        }
        if (distance > 200) {
            errorMessages.push('Goal must be less than 200');
        }

        if (errorMessages.length > 0) {
            setErrors(errorMessages);
            return;
        }
        // console.log("CHALLENGEID", challenge.id);

    if (user && Array.isArray(user.challengeParticipants)) {
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
                
                console.log("DURATION", duration);

                const newResult = await dispatch(addChallengeResult(challenge.id, result));
                
                setCreateResult(newResult);
                
                if (newResult && newResult.errors) {
                    setErrors(newResult.errors);
                } else {
                    dispatch(authenticate());
                }
            }
        }
    }
    
        closeModal();
    }

    
    

    const calculatePace = (distance, duration, goalUnit) => {
        if (!distance || !duration) return;
    
        const distanceInKm = goalUnit === 'mi' ? distance * 1.60934 : distance;
    
        const [hours = 0, minutes = 0, seconds = 0] = duration.split(':').map(Number);
        const totalMinutes = (hours * 60) + minutes + (seconds / 60);
    
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
        <>
        <h1 className='result-form-header'> 
            Post your result for 
        </h1>
        <h2 className='result-challenge-header'>
            {challenge.title}
        </h2>
        <form className='result-create-form' onSubmit={handleSubmit}>
        {errors && errors.map((error, idx) => <p style={{color: 'red'}} key={idx}>{error}</p>)}
            <label className='result-form-label'>
                Description
                <textarea
                    className='result-form-textarea'
                    type='text'
                    value={resultDescription}
                    onChange={(e) => setResultDescription(e.target.value)}
                    maxLength="255"
                    placeholder='Tell us about your result'
                    required
                />
            </label>
            <label className='result-form-label'>
                Distance
                <input 
                    className='result-form-input'
                    type='number'
                    value={distance}
                    onChange={handleDistanceChange}
                    placeholder='Distance'
                    required
                />
            </label>
            <label className='result-form-label'>
                Goal Unit
                <select
                    className='result-form-select'
                    value={goalUnit}
                    onChange={handleUnitChange}
                >
                    <option value='mi'>Miles</option>
                    <option value='km'>Kilometers</option>
                </select>
            </label>
            <label className='result-form-label'>
            Duration
            <div className='duration-fields'>
                <input
                    className='result-form-input'
                    type='number'
                    placeholder='HH'
                    value={hours}
                    onChange={handleHoursChange}
                    min="0"
                    required
                />
                :
                <input
                    className='result-form-input'
                    type='number'
                    placeholder='MM'
                    value={minutes}
                    onChange={handleMinutesChange}
                    min="0"
                    max="59"
                    required
                />
                :
                <input
                    className='result-form-input'
                    type='number'
                    placeholder='SS'
                    value={seconds}
                    onChange={handleSecondsChange}
                    min="0"
                    max="59"
                    required
                />
            </div>
        </label>
            <label className='result-form-label'>
                Pace
                <input
                    className='result-form-input'
                    type='number'
                    value={pace}
                    onChange={(e) => setPace(e.target.value)}
                    readOnly
                />
            </label>
            <h3 className='result-form-info'>Results will be reviewed upon submission</h3>
            <button className='result-submit' type='submit'>submit</button>
        </form>
        </>
    )
}

export default CreateResultModal;
