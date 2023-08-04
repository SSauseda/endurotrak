import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addChallengeResult } from '../../store/result';



const CreateResultModal= ({challenge}) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);
    console.log("USER", user.id)

    const [resultDescription, setResultDescription] = useState('');
    const [distance, setDistance] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [duration, setDuration] = useState('');
    const [pace, setPace] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        user.challengeParticipants.forEach(participant => {
            if (participant.user_id === user.id) {
                console.log("PARTICIPANT", participant.id)
                const result = {
                    participantId: participant.id,
                    challengeId: challenge.id,
                    resultDescription,
                    distance,
                    goalUnit,
                    duration,
                    pace,
                }
                dispatch(addChallengeResult(challenge.id, result));
            }
        })

    }
 

    return (
        <form onClick={handleSubmit}>
            <label>
                Description
                <input type="text" name="title" />
            </label>
            <button type='submit'>submit</button>
        </form>
    )
}

export default CreateResultModal;
