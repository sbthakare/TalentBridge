import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for modal
import "../styles/emp-login.css"; // Keeping the existing CSS
import ForgotPassword from "./ForgotPassword"; // Import Forgot Password Component

export const EmployeeLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'Employee', // Default role set to Employee
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
      const response = await axios.post('https://localhost:7144/api/auth/login', formData);
      console.log('Login Success:', response.data);

      const userRole = response.data.role; // Get role from API response

      if (userRole === 'employee') {
        toast.success(' Login Successful!', { className: 'custom-toast-success' });

        // Store username in localStorage
        localStorage.setItem('username', formData.username);

        // Delay navigation to ensure toast message is visible
        setTimeout(() => {
          navigate('/empdashboard');
        }, 1500);
      } else {
        toast.warning("⚠️ Access Denied! Only employees can log in.", { className: 'custom-toast-warning' });
      }
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response) {
        // Show specific error message from API response
        const errorMessage = error.response.data.message || '❌ Invalid username or password!';
        toast.error(errorMessage, { className: 'custom-toast-error' });
      } else {
        // General error handling for network issues
        toast.error('❌ Server error! Please try again later.', { className: 'custom-toast-error' });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Employee Login</h2>
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
            className="form-control"
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
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <div className="login-links text-center mt-3">
        <p>
          Forgot password?{' '}
          <span onClick={() => setShowForgotPassword(true)} className="forgot-link">
            Click here
          </span>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Forgot Password</h5>
                <button type="button" className="btn-close" onClick={() => setShowForgotPassword(false)}></button>
              </div>
              <div className="modal-body">
                <ForgotPassword />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
