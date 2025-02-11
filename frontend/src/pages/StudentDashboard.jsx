import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "../styles/userDashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export function StudentDashboard() {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem('username'); 
        if (!username) {
          console.error('Username not found in localStorage');
          navigate('/login'); 
        }

        const response = await axios.get(`http://localhost:7202/api/auth/get/${username}`);
        console.log('User profile data:', response.data); 
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login'); 
      }
    };

    fetchUserProfile();
  }, [navigate]); 

  const handleLogout = () => {
    localStorage.removeItem('username'); 
  };

  if (!user) {
    return <div className="loading">Loading...</div>; 
  }

  return (
    <div className="dashboard">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TalentBridge</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/jobs">
                 <b>ViewJobs</b> 
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/viewAppliedJobs">
                ViewAppliedJobs
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-danger btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <h1 className="welcome-message">Welcome, {user.firstName || user.userName}!</h1>
        <p className="description">
          You are now logged in. You can browse jobs or check applied jobs.
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/userProfile')}
        >
          Profile
        </button>
      </div>
    </div>
  );
}

export default StudentDashboard;
