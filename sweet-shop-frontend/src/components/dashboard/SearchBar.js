import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
    const [filters, setFilters] = useState({
        name: '',
        category: '',
        minPrice: '',
        maxPrice: '',
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchParams = {};

        if (filters.name) searchParams.name = filters.name;
        if (filters.category) searchParams.category = filters.category;
        if (filters.minPrice) searchParams.minPrice = filters.minPrice;
        if (filters.maxPrice) searchParams.maxPrice = filters.maxPrice;

        onSearch(searchParams);
    };

    const handleReset = () => {
        setFilters({ name: '', category: '', minPrice: '', maxPrice: '' });
        onSearch({});
    };

    return (
        <div className="search-bar">
            <h3>Search & Filter Sweets</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={filters.name}
                    onChange={handleChange}
                    placeholder="Search by name..."
                />
                <input
                    type="text"
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    placeholder="Category..."
                />
                <input
                    type="number"
                    name="minPrice"
                    value={filters.minPrice}
                    onChange={handleChange}
                    placeholder="Min Price"
                    step="0.01"
                />
                <input
                    type="number"
                    name="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleChange}
                    placeholder="Max Price"
                    step="0.01"
                />
                <button type="submit" className="btn-search">Search</button>
                <button type="button" className="btn-reset" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
}

export default SearchBar;
