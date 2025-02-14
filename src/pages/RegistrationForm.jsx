import React, { useState } from 'react';
import "../styles/register.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    address: "",
    phoneNumber: "",
    email: "",
    username: "",
    password: "",
    role: "Student", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^[6-9][0-9]{9}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{4,12}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const validateInputs = async () => {
    const { fname, lname, address, phoneNumber, email, username, password } = formData;
    if (!fname || !lname || !address || !phoneNumber || !email || !username || !password) {
      toast.error("All fields are required!");
      return false;
    }

    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be exactly 10 digits and start with 6, 7, 8, or 9.");
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    if (!usernameRegex.test(username)) {
      toast.error("Username must be 4-12 characters (letters, numbers, or underscores only). ");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters, with 1 uppercase letter, 1 number, and 1 special character.");
      return false;
    }

    try {
      const response = await axios.get(`http://localhost:7144/api/auth/check-email?email=${email}`);
      if (response.data.exists) {
        toast.error("Email is already registered. Try another one.");
        return false;
      }
    } catch (error) {
      toast.error("Error checking email. Try again later.");
      return false;
    }

    return true;
  };

  const SignUp = async (e) => {
    e.preventDefault();
    if (!(await validateInputs())) return;

    try {
      const response = await axios.post("http://localhost:7144/api/auth/register", formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Registration Successful!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration Failed!");
    }
  };

  return (
    <div className="main">
      <ToastContainer position="bottom-center" />
      <div className="register">
        <h2>Register Here</h2>
        <form id="register" onSubmit={SignUp}>
          {Object.entries({ fname: "First Name", lname: "Last Name", address: "Address", phoneNumber: "Phone Number", email: "Email", username: "Username", password: "Password" }).map(([key, label]) => (
            <div key={key}>
              <label>{label}:</label>
              <input type={key === "password" ? "password" : "text"} name={key} value={formData[key]} onChange={handleChange} placeholder={`Enter ${label}`} required />
              <br /><br />
            </div>
          ))}
          <label>Select Role:</label>
          <br />
          {["Student", "Employee", "Client"].map((roleOption) => (
            <div key={roleOption}>
              <input type="radio" name="role" value={roleOption} id={roleOption.toLowerCase()} checked={formData.role === roleOption} onChange={handleChange} />
              <label htmlFor={roleOption.toLowerCase()}>{roleOption}</label>
            </div>
          ))}
          <br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
