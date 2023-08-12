import React from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './images/endurotrak.png'
import UserSearch from '../Search';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
    const location = useLocation();



	return (
        <div className='navbar-container'>
        <div className='left-items'>
            <NavLink to='/' className='logo-link'>
                <img className='logo' src={logo} alt='logo' />
            </NavLink>
            {sessionUser && <UserSearch />}
        </div>
        <div className='right-items'>
            {sessionUser ? (
                <>
                    <div className='nav-challenge'>
                        <Link to='/challenges'>
                            <button className='nav-challenge-button'>Challenges</button>
                        </Link>
                    </div>
                    <li>
                        <ProfileButton user={sessionUser} />
                    </li>
                </>
            ) : (
                <>
                    {location.pathname === '/' && (
                        <div className='signup-container'>
                            <Link to='/signup'>
                                <button className='signup-button'>Sign Up</button>
                            </Link>
                        </div>
                    )}
                    {location.pathname === '/signup' && (
                        <div className='login-container'>
                            <Link to='/'>
                                <button className='login-button'>Login</button>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    </div>
	);
}

export default Navigation;
