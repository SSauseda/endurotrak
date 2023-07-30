import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import logo from './images/endurotrak.png'
import UserSearch from '../Search';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);



	return (
		<div className='navbar-container'>
			<div className='left-items'>
				<NavLink to='/' className='logo-link'>
					<img className='logo' src={logo} alt='logo' />
				</NavLink>
				{sessionUser && <UserSearch />}
			</div>
			<div className='right-items'>
				<div className='nav-challenge'>
					<Link to='/challenges'>
						<button className='nav-challenge-button'>Challenges</button>
					</Link>
				</div>
				{isLoaded && (
					<li>
						<ProfileButton user={sessionUser} />
					</li>
				)}
			</div>
		</div>
	);
}

export default Navigation;
