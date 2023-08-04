import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editChallenge } from '../../store/challenge';


const EditChallengeForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { challengeId } = useParams();
    const challenge = useSelector((state) => state.challenges[challengeId]);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [activityType, setActivityType] = useState('');
    const [goal, setGoal] = useState('');
    const [goalUnit, setGoalUnit] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [rules, setRules] = useState('');
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        console.log("EDITEDITEDIT2", challengeId)
      if (challenge) {
        setTitle(challenge.title);
        setDescription(challenge.description);
        setActivityType(challenge.activity_type);
        setGoal(challenge.goal);
        setGoalUnit(challenge.goal_unit);
        setStartDate(challenge.start_date);
        setEndDate(challenge.end_date);
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

        console.log("EDITEDITEDIT3", challengeId)
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

    return (
        <form onSubmit={handleSubmit}>
            {errors && errors.map((error, idx) => <p key={idx}>{error}</p>)}
            <label>
                Title
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                    />
            </label>
            <label>
                Description
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                    />          
            </label>
            <label>
                Activity Type
                <select
                    value={activityType}
                    onChange={(e) => setActivityType(e.target.value)}
                    required
                >
                    <option value="running">Running</option>
                    <option value="cycling">Cycling</option>
                    <option disabled value="">--More activites coming soon--</option>
                </select>
            </label>
            <label>
                Goal
                <input
                    type="number"
                    value={goal}
                    onChange={(e) => setGoal(parseFloat(e.target.value))}
                    placeholder="Goal"
                    required
                />
            </label>
            <label>
                Goal Unit
                <select
                    value={goalUnit}
                    onChange={(e) => setGoalUnit(e.target.value)}
                    required
                >
                    <option value="mi">Miles</option>
                    <option value="km">Kilometers</option>
                </select>
                all paces will be converted to km for ranking purposes
            </label>
            <label>
                Start Date
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                />
            </label>
            <label>
                End Date
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Challenge Banner Image
                <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Image URL"
                />
            </label>
            <label>
                Rules
                <textarea
                    type="text"
                    value={rules}
                    onChange={(e) => setRules(e.target.value)}
                    placeholder="Rules"
                    required
                />
            </label>
            <button type="submit">Edit Challenge Challenge</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
    )

}

export default EditChallengeForm;