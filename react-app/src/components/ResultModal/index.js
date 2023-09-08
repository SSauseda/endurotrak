import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEachResult } from '../../store/result';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import Comments from '../Comments';
import { fetchBravos, createBravo } from '../../store/bravo';
import logo from '../LoginFormPage/LoginImages/image4.jpg'
import './ResultModal.css';


const ResultModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const { challengeId, resultId } = useParams();

    const user = useSelector((state) => state.session.user);
    console.log("USER", user)
    const result = useSelector((state) => state.results[resultId]);
    const results = useSelector((state) => Object.values(state.results));
  
    
    useEffect(() => {
        if (resultId) {
            dispatch(getEachResult(challengeId, resultId));
        }
    }, [dispatch, challengeId, resultId])
    
    useEffect(() => {
        dispatch(fetchBravos(challengeId, resultId));
    }, [dispatch])
    
    const bravos = useSelector((state) => state.bravos);
    console.log("BRAVOLENGTH", bravos.length)
    // const bravosForCurrentResult = bravos.flat().filter(bravo => bravo.result_id === parseInt(resultId));

    const hasGivenBravo = user && Boolean(bravos.find(bravo => bravo.user_id === user.id))
    console.log(hasGivenBravo)

    if (!result) {
        return <div>Loading...</div>;
    }

    const handleBravoClick = async () => {
        const bravoData = {
            user_id: user.id,
            participant_id: results[0].participant_id,
            result_id: resultId
        };

        const errors = await dispatch(createBravo(challengeId, resultId, bravoData));
        if (errors) {
            console.error(errors);
        }
    }

    console.log('USER RESULT', result.participant_user_id)
    const handleImageClick = () => {
        history.push(`/athlete/${result.participant_user_id}`)
    }


    return (
        <div className='result-background' style={{ backgroundImage: `url(${logo})`, backgroundSize: 'cover' }}>
        <div className="result-modal">
            <div className='image-container' onClick={handleImageClick}>
            <img className="result-image" src={result.participant_image} alt="result" />
            </div>
            <h2 className="result-title">{result.participant_username}'s Challenge Result</h2>
            <div className="result-details">
                {/* <p className='result-description'>Description:</p> */}
                <p className='result-user-post'>{result.result_description}</p>
                <div className='section-one'>
                <p className='result-description'>Distance</p>
                <p className='result-information'>{result.distance} {result.goal_unit}</p>
                </div>
                <div className='section-two'>
                <p className='result-description'>Duration</p>
                <p className='result-information'>{result.duration}</p>
                </div>
                <div className='section-three'>
                <p className='result-description'>Pace</p>
                <p className='result-information'>{result.pace} min/km</p>
                </div>
            </div>
            <div className="bravos-count">
                {bravos.length} {bravos.length === 1 ? 'bravo' : 'bravos'}
            </div>
            {/* <button className="bravo-button" 
            onClick={handleBravoClick}
            disabled={hasGivenBravo}
            >
                Give Bravo
                </button> */}
            <div className='bravo-icon-container'>
                <i
                    className={`fa-solid fa-hands-clapping bravo-icon ${hasGivenBravo ? 'bravo-disabled' : ''}`}
                    onClick={handleBravoClick}
                    title="Give Bravo"
                    >
                </i>
            </div>
            <div className="comments-section">
                <Comments />
            </div>
            <button className="return-button" onClick={() => history.push(`/challenges/${challengeId}`)}>Return</button>
        </div> 
        </div>
    )
}

export default ResultModal;
