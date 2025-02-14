import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/admin-login.css";
import ForgotPassword from "./ForgotPassword";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      const response = await axios.post("https://localhost:7144/api/auth/login", formData);
      const { token, role, username } = response.data; // Extract response data

      if (role === "Admin") {
        toast.success("✅ Login Successful!", { className: "custom-toast-success" });

        // Store token & username in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);

        // Redirect to Admin Dashboard
        setTimeout(() => {
          navigate("/admindashboard");
        }, 1500);
      } else {
        toast.warning("⚠️ You are not authorized as an admin.", { className: "custom-toast-warning" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "❌ Login Failed! Please try again.";
      toast.error(errorMessage, { className: "custom-toast-error" });
    }
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
          Forgot password?{" "}
          <span onClick={() => setShowForgotPassword(true)} className="forgot-link">
            Click here
          </span>
        </p>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="modal-overlay">
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

export default AdminLogin;
