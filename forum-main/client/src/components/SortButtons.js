import React from 'react';
import '../components/SortButtons.css'

const SortButtons = ({ sortByNewest, sortByMostPopular }) => {
    return (
        <div className="sorting-buttons">
            Order by:
            <div className="order-buttons-container">
                <button onClick={sortByNewest} className="order-buttons">Newest</button>
                <button onClick={sortByMostPopular} className="order-buttons">Most Popular</button>
            </div>
        </div>
    );
};

export default SortButtons;