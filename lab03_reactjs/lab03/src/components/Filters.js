import React, { useState } from 'react';

function Filters({ onFilter, onSort }) {
    const [albumFilter, setAlbumFilter] = useState('');
    const [titleFilter, setTitleFilter] = useState('');
    const [sortType, setSortType] = useState('id');

    const handleAlbumFilterChange = (e) => {
        setAlbumFilter(e.target.value);
        onFilter(e.target.value, titleFilter);
    };

    const handleTitleFilterChange = (e) => {
        setTitleFilter(e.target.value);
        onFilter(albumFilter, e.target.value);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
        onSort(e.target.value);
    };

    return (
        <div>
            <label>Filter by Album:</label>
            <input type="text" value={albumFilter} onChange={handleAlbumFilterChange} />
            <label>Filter by Title:</label>
            <input type="text" value={titleFilter} onChange={handleTitleFilterChange} />
            <label>Sort by:</label>
            <select value={sortType} onChange={handleSortChange}>
                <option value="id">ID</option>
                <option value="title">Title</option>
                {/* Додайте додаткові опції сортування, якщо необхідно */}
            </select>
        </div>
    );
}

export default Filters;
