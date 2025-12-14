import React, { useState, useEffect } from 'react';
import sweetService from '../../services/sweetService';
import SweetCard from './SweetCard';
import SearchBar from './SearchBar';
import './Dashboard.css';

function Dashboard({ user }) {
    const [sweets, setSweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadSweets();
    }, []);

    const loadSweets = async () => {
        try {
            const data = await sweetService.getAllSweets();
            setSweets(data);
        } catch (err) {
            setError('Failed to load sweets');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (searchParams) => {
        try {
            setLoading(true);
            const data = await sweetService.searchSweets(searchParams);
            setSweets(data);
        } catch (err) {
            setError('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = async (id, quantity) => {
        try {
            await sweetService.purchaseSweet(id, quantity);
            loadSweets();
            alert('Purchase successful!');
        } catch (err) {
            alert(err.response?.data?.error || 'Purchase failed');
        }
    };

    return (
        <div className="dashboard">
            {/* Hero Section */}
            <div className="dashboard-hero">
                <div>
                    <h1>Sweet Store Dashboard</h1>
                    <p className="subtitle">
                        Manage sweets, inventory & purchases in one place
                    </p>
                </div>
                <div className="user-badge">
                    Logged in as <strong>{user.username}</strong>
                </div>
            </div>

            {/* Search */}
            <div className="dashboard-search">
                <SearchBar onSearch={handleSearch} />
            </div>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Fetching available sweets...</div>
            ) : (
                <div className="dashboard-content">
                    {sweets.length === 0 ? (
                        <p className="empty-text">No sweets found</p>
                    ) : (
                        <div className="sweets-grid">
                            {sweets.map((sweet) => (
                                <SweetCard
                                    key={sweet.id}
                                    sweet={sweet}
                                    onPurchase={handlePurchase}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Dashboard;
