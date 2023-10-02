import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChallenge } from '../../store/challenge';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './CreateChallengeForm.css';


const AddChallengeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(()=> {
        if (!sessionUser) {
            history.push("/");
            return;
        }})

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activityType, setActivityType] = useState('Running');
    const [goal, setGoal] = useState('');
    const [goalUnit, setGoalUnit] = useState('mi');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rules, setRules] = useState('');
    const [newChallenge, setNewChallenge] = useState(null);
    const [titleErrors, setTitleErrors] = useState('');
    const [descriptionErrors, setDescriptionErrors] = useState('');
    const [rulesErrors, setRulesErrors] = useState('');
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

        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);

        if (startDateObj > endDateObj) {
            errorMessages.push('Start date must be before end date');
        }

        if (title.length > 100) {
            errorMessages.push('Title must be 100 characters or less');
        }

        if (description.length > 255) {
            errorMessages.push('Description must be 250 characters or less');
        }

        if (isNaN(goal)) {
            errorMessages.push('Goal must be a number');
        }

        if (goal < 0) {
            errorMessages.push('Goal must be a positive number');
        }

        if (rules.length > 255) {
            errorMessages.push('Rules must be 255 characters or less');
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

        const createChallenge = await dispatch(addChallenge(challenge));

        if (createChallenge.errors) {
            setErrors(createChallenge.errors);
        } else {
            history.push('/challenges');
        }
    };

    const handleReturn = () => {
        history.goBack();
    };

    

    return (
        <>
        <h1 className='challenge-form-header'>
            Create a Challenge
        </h1>
        <form className='create-form' onSubmit={handleSubmit}>
            {errors && errors.map((error, idx) => <p style={{color: 'red'}} key={idx}>{error}</p>)}
            <label className='challenge-form-label'>
                Title
                <input
                    className='challenge-form-input'
                    style={{ 
                        color: titleErrors ? 'red' : 'initial',
                    }}
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onInput={(e) => {
                        if (e.target.value.length >= 100) {
                            setTitleErrors('Title must be 100 characters or less');
                        } else {
                            setTitleErrors('');
                        }
                    }}
                    placeholder="Title"
                    required
                    maxLength="100"
                    />
                    {titleErrors && <div className='input-error'>Error: {titleErrors}</div>}
            </label>
            <label className='challenge-form-label'>
                Description
                <textarea
                    className='challenge-form-input'
                    style={{ 
                        color: titleErrors ? 'red' : 'initial',
                    }}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    onInput={(e) => {
                        if (e.target.value.length >= 250) {
                            setDescriptionErrors('Description must be 250 characters or less');
                        } else {
                            setDescriptionErrors('');
                        }
                    }}
                    placeholder="Description"
                    required
                    maxLength="250"
                    />
                    {descriptionErrors && <div className='input-error'>Error: {descriptionErrors}</div>}          
            </label>
            <label className='challenge-form-label'>
                Activity Type
                <select
                    className='challenge-form-select'
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    required
                >
                    <option value="Running">Running</option>
                    <option value="Cycling">Cycling</option>
                    <option disabled value="">--More activites coming soon--</option>
                </select>
            </label>
            <label className='challenge-form-label'>
                Goal
                
                <input
                    className='challenge-form-input'
                    type="number"
                    value={goal}
                    onChange={(e) => {
                        let value = parseFloat(e.target.value);
                        if (value < 0) value = 0;
                        if (value > 500) value = 500;
                        setGoal(value);
                    }}
                    placeholder="Goal"
                    required
                    min="0"
                    max="500"
                />
                <div className='sub-label'>(Max 500)</div>
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
                <div className='sub-label'>All paces will be converted to km for ranking purposes</div>
            </label>
            <div className='date-container'>
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
            </div>
            <label className='challenge-form-label'>
                Challenge Banner Image
                <input
                    className='challenge-form-input'
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
                {/* <div className="sub-label">(Must end in .jpeg, .jpg, or .png)</div> */}
                {imageUrl && 
                    <img 
                        src={imageUrl} 
                        alt="Preview" 
                        style={{ width: '100px', height: '100px' }} 
                        onError={(e) => {
                            e.target.onError = null;
                            setImageUrl("https://t3.ftcdn.net/jpg/02/71/81/32/360_F_271813264_3GVBtWySh8y6ZgRoj8iWc9hXNcOMmzWf.jpg")
                        }}
                    />}
            </label>
            <label className='challenge-form-label'>
                Rules
                <textarea
                    className='challenge-form-input'
                    type="text"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    onInput={(e) => {
                        if (e.target.value.length >= 255) {
                            setRulesErrors('Rules must be 255 characters or less');
                        } else {
                            setRulesErrors('');
                        }
                    }}
                    placeholder="Rules"
                    required
                    maxLength="255"
                />
                {rulesErrors && <div className='input-error'>{rulesErrors}</div>}
            </label>
            <button className='challenge-submit' type="submit">Create Challenge</button>
            <button className='return-btn' onClick={handleReturn}>Return to Challenges</button>
        </form>
        </>
    )
}

export default AddChallengeForm;
