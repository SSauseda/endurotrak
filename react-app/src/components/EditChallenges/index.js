import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { editChallenge } from '../../store/challenge';
import './EditChallenges.css'


const EditChallengeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { challengeId } = useParams();
    const challenge = useSelector((state) => state.challenges[challengeId]);
    // const user = useSelector((state) => state.session.user && state.session.user.id);

    

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activityType, setActivityType] = useState('Running');
    const [goal, setGoal] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rules, setRules] = useState('');
    const [rulesErrors, setRulesErrors] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
      if (challenge) {
        setTitle(challenge.title);
        setDescription(challenge.description);
        setActivityType(challenge.activity_type);
        setGoal(challenge.goal);
        setGoalUnit(challenge.goal_unit);
        const formatDate = (date) => {
            const dateObj = new Date(date);
            return dateObj.toISOString().split('T')[0];
        }
        setStartDate(formatDate(challenge.start_date));
        setEndDate(formatDate(challenge.end_date));
        setImageUrl(challenge.image_url);
        setRules(challenge.rules);
      }
    }, [challenge]);

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

        const updatedChallenge = await dispatch(editChallenge(
            challengeId,
            title,
            description,
            activityType,
            goal,
            goalUnit,
            startDate,
            endDate,
            imageUrl,
            rules
        ));

        if (Array.isArray(updatedChallenge)) {
            setErrors(updatedChallenge);
        } else {
            history.push(`/user/challenges`);
        }
    }

    const handleCancel = () => {
        history.push(`/user/challenges`);
    }

    // if (!user) return <Redirect to="/" />;

    return (
        <>
        <h1 className='challenge-form-header'>Edit your challenge</h1>
        <form className='create-form' onSubmit={handleSubmit}>
            {errors && errors.map((error, idx) => <p key={idx}>{error}</p>)}
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
                {imageUrl && 
                    <img 
                        src={imageUrl} 
                        alt="Preview" 
                        style={{ width: 'auto', height: '100px', border: '2px dotted #333' }} 
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
                />
            </label>
            <div className='button-container'>
            <button className='challenge-edit' type="submit">Edit Challenge Challenge</button>
            <button className='challenge-cancel' type="button" onClick={handleCancel}>Cancel</button>
            </div>
        </form>
        </>
    )

}

export default EditChallengeForm;
