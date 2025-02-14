import React, { useState } from "react";
import "../styles/studentLogin.css"; // Keeping the existing CSS
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import ForgotPassword from "./ForgotPassword"; // Import Forgot Password Component

export const StudentLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "Student",
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:7144/api/auth/login", formData);
      console.log("Login Success:", response.data);

      const userRole = response.data.role;

      if (userRole === "student") {
        localStorage.setItem("username", formData.username);
        toast.success("Login Successful!", { className: "custom-toast-success" });

        setTimeout(() => {
          navigate("/StudentDashboard");
        }, 1500);
      } else {
        toast.warning("Access Denied! Only students can log in.", { className: "custom-toast-warning" });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Invalid username or password!";
      toast.error(errorMessage, { className: "custom-toast-error" });
    }
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
          Forgot password?{" "}
          <span onClick={() => setShowForgotPassword(true)} className="forgot-link">
            Click here
          </span>
        </p>
      </div>

      {showForgotPassword && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
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
