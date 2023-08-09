import React, { useEffect } from 'react';
import LoginFormPage from '../LoginFormPage';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selfie from './photos/running-selfie.jpg';
import running from './photos/group-running.jpg';
import cyclist from './photos/group-cyclist.jpg';
import shoe from './photos/running-stock.jpg';
import bike from './photos/cycling-stock.jpg';
import cyclist2 from './photos/group-cyclist2.jpg';
import cyclist3 from './photos/group-cyclist3.jpg';
import running2 from './photos/group-running2.jpg';
import running3 from './photos/group-running3.jpg';
import './Homepage.css';

const Homepage = () => {
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        if (sessionUser) {
            history.push('/athlete');
        }
    }, [sessionUser, history])

    return (
        <div className='homepage-container'>
            <div className='running-images'>
            {/* <img className='running-img1' src={selfie} alt="running" />
            <img className='running-img2' src={running} alt="running" />
            <img className='running-img3' src={shoe} alt="running" />
            <img className='running-img4' src={running2} alt="running" />
            <img className='running-img5' src={running3} alt="running" /> */}
            </div>
            <div>
            </div>
            <LoginFormPage />
            <div className='cycling-images'>
            {/* <img className='cycling-img1' src="https://s3.amazonaws.com/usac-craft-uploads-production/assets/9-Best-Practices-for-Group-Rides.jpg" alt="running" />
            <img className='cycling-img2' src={cyclist} alt="cycling" />
            <img className='cycling-img3' src={cyclist2} alt="cycling" />
            <img className='cycling-img4' src={bike} alt="cycling" />
            <img className='cycling-img5' src={cyclist3} alt="cycling" /> */}
            </div>
        </div>
    )
}

export default Homepage;
