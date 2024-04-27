import React, { useState } from 'react';
import '../components/SearchBar.css'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <form>
            <input
                type="text"
                className="search-bar"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search SportsTalk"
            />
        </form>
    );
};

export default SearchBar;