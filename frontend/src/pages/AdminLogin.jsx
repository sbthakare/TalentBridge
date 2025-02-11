import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/admin-login.css"; // Keeping the existing CSS

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Admin', // Default role is set to Admin
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

      if (formData.role === 'Admin') {
        toast.success('Login Successful!', { className: 'custom-toast-success' });

        // Delay navigation to ensure toast message is visible
        setTimeout(() => {
          navigate('/admindashboard');
        }, 1500);
      } else {
        toast.warning("You are not authorized as an admin", { className: 'custom-toast-warning' });
      }
    } catch (error) {
      const errorMessage = error.response?.data || 'Login Failed! Please try again.';
      console.error('Login failed:', error);
      toast.error(errorMessage, { className: 'custom-toast-error' });
    }
  };

  // Handle forgot password submission
  const handleForgotPassword = (event) => {
    event.preventDefault();
    console.log("Forgot password for username:", formData.username);
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
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
