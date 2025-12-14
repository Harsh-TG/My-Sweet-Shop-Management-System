import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/"> Smart Sweet Shop</Link>
            </div>

            {user && (
                <div className="navbar-menu">
                    <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    {user.role === 'ADMIN' && (
                        <Link to="/admin" className="nav-link">Admin Panel</Link>
                    )}
                    <span className="user-info">Hello, {user.username}</span>
                    <button className="btn-logout" onClick={onLogout}>Logout</button>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
