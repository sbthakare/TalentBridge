import React, { useState } from 'react';
import "../styles/studentLogin.css"; // Keeping the existing CSS
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StudentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Student', // Default role set to Student
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login submission
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:7202/api/auth/login', formData);
      console.log('Login Success:', response.data);

      const userRole = response.data.role; // Get role from API response

      if (userRole === 'student') {
        // Store username in localStorage after successful login
        localStorage.setItem('username', formData.username);

        toast.success('Login Successful!', { className: 'custom-toast-success' });

        // Delay redirection to ensure the toast is visible
        setTimeout(() => {
          navigate('/StudentDashboard');
        }, 1500);
      } else {
        toast.warning("Access Denied! Only students can log in.", { className: 'custom-toast-warning' });
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response) {
        // Show specific error message from API response
        const errorMessage = error.response.data.message || 'Invalid username or password!';
        toast.error(errorMessage, { className: 'custom-toast-error' });
      } else {
        // General error handling for network issues
        toast.error('Server error! Please try again later.', { className: 'custom-toast-error' });
      }
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = (event) => {
    event.preventDefault();
    console.log("Forgot password for username:", formData.username);
  };

  return (
    <div className="login-container">
      <h2>Student Login</h2>
      <ToastContainer position="bottom-center" />

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="login-links">
        <p>
          Forgot password?{' '}
          <span onClick={() => setShowForgotPassword(true)} className="forgot-link">
            Click here
          </span>
        </p>
      </div>

      {showForgotPassword && (
        <div className="forgot-password-form">
          <h2>Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      )}
    </div>
  );
};
