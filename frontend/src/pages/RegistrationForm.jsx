import React, { useState } from 'react';
import "../styles/register.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm = () => {
  const [fname, setFirstName] = useState("");
  const [lname, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student"); // Default role: Student

  // Handle role selection
  const onOptionChange = (e) => {
    setRole(e.target.value);
  };

  // Handle form submission
  async function SignUp(e) {
    e.preventDefault();

    // Check if all fields are filled
    if (!fname || !lname || !address || !phoneNumber || !email || !username || !password) {
      toast.error("All fields are required!");
      return;
    }

    const userData = {
      firstName: fname,
      lastName: lname,
      address: address,
      phoneNumber: phoneNumber, // Ensure key matches API format
      email: email,
      userName: username,
      password: password,
      role: role.toLowerCase(), // Ensure lowercase for API compatibility
    };

    try {
      const response = await axios.post("http://localhost:7202/api/auth/register", userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Registration Success:", response.data);
      toast.success("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      const errorMessage = error.response?.data?.message || "Registration Failed!";
      toast.error(errorMessage);
    }
  }    

  return (
    <div className="main">
      <ToastContainer position="bottom-center" />
      <div className="register">
        <h2>Register Here</h2>
        <form id="register" onSubmit={SignUp}>
          <label>First Name:</label>
          <input type="text" name="fname" value={fname} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" required />
          <br /><br />

          <label>Last Name:</label>
          <input type="text" name="lname" value={lname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" required />
          <br /><br />

          <label>Address:</label>
          <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
          <br /><br />

          <label>Phone Number:</label>
          <input type="tel" name="phoneNumber" pattern="[0-9]{10}" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="1234567890" required />
          <br /><br />

          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
          <br /><br />

          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" required />
          <br /><br />

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
          <br /><br />

          <label>Select Role:</label>
          <br />
          <input type="radio" name="role" value="Student" id="student" checked={role === "Student"} onChange={onOptionChange} />
          <label htmlFor="student">Student</label>

          <input type="radio" name="role" value="Employee" id="employee" checked={role === "Employee"} onChange={onOptionChange} />
          <label htmlFor="employee">Employee</label>

          <input type="radio" name="role" value="Client" id="client" checked={role === "Client"} onChange={onOptionChange} />
          <label htmlFor="client">Client</label>

          <br /><br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
