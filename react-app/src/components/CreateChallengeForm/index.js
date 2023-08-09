import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChallenge } from '../../store/challenge';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './CreateChallengeForm.css';


const AddChallengeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    // console.log("SESSIONUSER", sessionUser)

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activityType, setActivityType] = useState('running');
    const [goal, setGoal] = useState('');
    const [goalUnit, setGoalUnit] = useState('mi');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rules, setRules] = useState('');
    const [newChallenge, setNewChallenge] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let errorMessages = [];

        const validateImageUrl = (url) => {
            if (url === '') {
                return true;
            }
            return url.match(/\.(jpeg|jpg|png)$/) !== null;
        }


        if (title.length > 100) {
            errorMessages.push('Title must be 100 characters or less');
        }

        if (description.length > 250) {
            errorMessages.push('Description must be 250 characters or less');
        }

        if (isNaN(goal)) {
            errorMessages.push('Goal must be a number');
        }

        if (goal < 0) {
            errorMessages.push('Goal must be a positive number');
        }

        if (!validateImageUrl(imageUrl)) {
            errorMessages.push('Image URL must be a valid image file');
        }


        if (errorMessages.length > 0) {
            setErrors(errorMessages);
            return;
        }


        const challenge = {
            user_id: sessionUser.id,
            title,
            description,
            activity_type: activityType,
            goal,
            goal_unit: goalUnit,
            start_date: startDate,
            end_date: endDate,
            image_url: imageUrl,
            rules
        };
        console.log("CHECKINGTIME", challenge)
        const createChallenge = await dispatch(addChallenge(challenge));
        // console.log("CREATECHALLENGECHALLENGECHALLENGE", createChallenge)
        setNewChallenge(createChallenge);
        if (createChallenge.errors) {
            // console.log("ERRORS", createChallenge.errors)
            setErrors(createChallenge.errors);
        } else {
            history.push('/challenges');
        }
    };

    

    return (
        <form className='create-form' onSubmit={handleSubmit}>
            {errors && errors.map((error, idx) => <p style={{color: 'red'}} key={idx}>{error}</p>)}
            <label className='challenge-form-label'>
                Title
                <input
                    className='challenge-form-input'
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    />
            </label>
            <label className='challenge-form-label'>
                Description
                <textarea
                    className='challenge-form-input'
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    />          
            </label>
            <label className='challenge-form-label'>
                Activity Type
                <select
                    className='challenge-form-select'
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    required
                >
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                    <option disabled value="">--More activites coming soon--</option>
                </select>
            </label>
            <label className='challenge-form-label'>
                Goal
                <input
                    className='challenge-form-input'
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(parseFloat(e.target.value))}
                    placeholder="Goal"
                    required
                />
            </label>
            <label className='challenge-form-label'>
                Goal Unit
                <select
                    className='challenge-form-select'
                    value={goalUnit}
                    onChange={(e) => setGoalUnit(e.target.value)}
                    required
                >
                    <option value="mi">Miles</option>
                    <option value="km">Kilometers</option>
                </select>
                all paces will be converted to km for ranking purposes
            </label>
            <label className='challenge-form-label'>
                Start Date
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </label>
            <label className='challenge-form-label'>
                End Date
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </label>
            <label className='challenge-form-label'>
                Challenge Banner Image
                <div className="image-validation">(must end in .jpeg, .jpg, or .png)</div>
                <input
                    className='challenge-form-input'
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
            </label>
            <label className='challenge-form-label'>
                Rules
                <textarea
                    className='challenge-form-input'
                    type="text"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    placeholder="Rules"
                    required
                />
            </label>
            <button className='challenge-submit' type="submit">Create Challenge</button>
        </form>
    )
}

export default AddChallengeForm;
