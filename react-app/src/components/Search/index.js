import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { searchUsers } from '../../store/session';
import './Search.css';


const UserSearch = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [query, setQuery] = useState('');

    const searchResults = useSelector(state => state.session.searchResults);

    const handleSearch = async (e) => {
        e.preventDefault();
        await dispatch (searchUsers(query));
    };

    const handleUserClick = (userId) => {
        history.push(`/athlete/${userId}`)
    }

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    className='search-bar' 
                    type="text" 
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                    placeholder="Search for users..." 
                />
                <button className='search-button' type="submit">Search</button>
            </form>
            {searchResults && searchResults.map(user => (
                <div key={user.id} onClick={() => handleUserClick(user.id)}>
                    {user.first_name}
                    </div>
            ))}
        </div>
    )
}

export default UserSearch;
