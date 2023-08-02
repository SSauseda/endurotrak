import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
// import { joinChallenge, leaveChallenge } from '../../store/participant';
import { fetchChallenges, joinChallenge, leaveChallenge, removeChallenge } from '../../store/challenge';
import ManageChallenges from '../ManageChallenges';
import './ChallengeCards.css';

const ChallengeCard = ({challenge, isManagePage, isChallengePage }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { openModal, closeModal } = useModal();
    const user = useSelector((state) => state.session.user);

    const [buttonText, setButtonText] = useState('Challenge Joined');
    const [isUserParticipant, setIsUserParticipant] = useState(challenge.isUserParticipant);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMouseEnter = () => { setButtonText('Leave Challenge') };
    const handleMouseLeave = () => { setButtonText('Challenge Joined') };

    const joinChallengeHandler = async (e) => {
        e.stopPropagation();
        const join = await dispatch(joinChallenge(challenge.id));
        if (join) {
            setIsUserParticipant(true);
        }
    };

    const leaveChallengeHandler = async (e) => {
        e.stopPropagation();
        const leave = await dispatch(leaveChallenge(challenge.id));
        if (leave) {
            setIsUserParticipant(false);
            setButtonText('Join Challenge');
        }
    }

    const deleteChallengeHandler = async (e) => {
        e.stopPropagation();
        const deleteConfirmation = window.confirm('Are you sure you want to delete this challenge?');
        if (deleteConfirmation) {
            const deleted = await dispatch(removeChallenge(challenge.id));
        }
    }

    const editChallengeHandler = async (e) => {
        e.stopPropagation();
        console.log("EDITEDITEDIT", challenge.id)
        history.push(`/challenges/${challenge.id}/edit`);
    }

    return (
        <>
            <div className='card-container' key={challenge.id}>
                <Link to={`/challenges/${challenge.id}`}>
                    <img className="card-img" src={challenge.image_url} alt="challenge"/>
                    <div className="card-title">{challenge.title}</div>
                    <div className="card-description">{challenge.description}</div>
                    <div className="card-activity">{challenge.activity_type}</div>
                    <div className="card-start">{new Date(challenge.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</div>
                    <div className="card-end">{new Date(challenge.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric'})}</div>
                    <div className="card-participants">{challenge.participants.length}</div>
                </Link>
                {isChallengePage && (
                    challenge.isUserParticipant ? (
                        <button
                            className='leave-challenge-button'
                            onClick={leaveChallengeHandler}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            {buttonText}
                        </button>
                    ) : (
                        <button
                            className="join-challenge-button"
                            onClick={joinChallengeHandler}
                        >
                            Join Challenge
                        </button>
                    )
                )}
                {isManagePage && user.id === challenge.user_id && (
                    <>
                        <button
                            className="delete-challenge-button"
                            onClick={deleteChallengeHandler}
                        >
                            Delete Challenge
                        </button>
                        <button
                            className="edit-challenge-button"
                            onClick={editChallengeHandler}
                        >
                            Edit Challenge
                        </button>
                    </>
                )}
            </div>
        </>
    )
}

export default ChallengeCard;
