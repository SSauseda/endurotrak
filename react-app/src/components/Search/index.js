import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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


    return (
        <div>
            <div className="search-section">
                <form onSubmit={handleSearch}>
                    <input
                        className='search-bar' 
                        type="text" 
                        value={query} 
                        onChange={e => setQuery(e.target.value)} 
                        placeholder="Search feature coming soon.."
                        disabled 
                    />
                    <button className='search-button' type="submit" disabled>Search</button>
                </form>
            </div>
            
            <div className="results-section">
                {searchResults && searchResults.map(user => (
                    <div 
                        key={user.id} 
                        onClick={() => handleUserClick(user.id)}
                    >
                        {user.first_name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserSearch;
