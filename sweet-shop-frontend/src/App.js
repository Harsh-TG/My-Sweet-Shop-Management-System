import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import AdminPanel from './components/admin/AdminPanel';
import Navbar from './components/common/Navbar';
import authService from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />
          } />
          <Route path="/register" element={
            user ? <Navigate to="/dashboard" /> : <Register setUser={setUser} />
          } />
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />
          <Route path="/admin" element={
            user && user.role === 'ADMIN' ?
              <AdminPanel user={user} /> :
              <Navigate to="/dashboard" />
          } />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
