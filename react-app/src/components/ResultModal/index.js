import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { addChallengeResult } from '../../store/results';


const CreateResultForm = ({challenge}) => {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.session.user);

    const [resultDescription, setResultDescription] = useState('');
    const [distance, setDistance] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [duration, setDuration] = useState('');
    const [pace, setPace] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = {
        }


    }
 

    return (
        <form>
            <label>
                <input type="text" name="title" />
            </label>
        </form>
    )
}
