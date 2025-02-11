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

  // Regex Validations
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const phoneRegex = /^[6-9][0-9]{9}$/;
  const usernameRegex = /^[a-zA-Z0-9_]{4,12}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Function to validate inputs
  const validateInputs = async () => {
    if (!fname.trim() || !lname.trim() || !address.trim() || !phoneNumber.trim() || !email.trim() || !username.trim() || !password.trim()) {
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
      toast.error("Username must be 4-12 characters (letters, numbers, or underscores only).");
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters, with 1 uppercase letter, 1 number, and 1 special character.");
      return false;
    }

    // Check if email is already registered
    try {
      const response = await axios.get(`http://localhost:7202/api/auth/check-email?email=${email}`);
      if (response.data.exists) {
        toast.error("Email is already registered. Try another one.");
        return false;
      }
    } catch (error) {
      console.error("Error checking email:", error);
      toast.error("Error checking email. Try again later.");
      return false;
    }

    return true;
  };

  // Handle form submission
  async function SignUp(e) {
    e.preventDefault();

    if (!(await validateInputs())) {
      return;
    }

    const userData = {
      firstName: fname,
      lastName: lname,
      address: address,
      phoneNumber: phoneNumber,
      email: email,
      userName: username,
      password: password,
      role: role.toLowerCase(),
    };

    try {
      const response = await axios.post("http://localhost:7202/api/auth/register", userData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Registration Success:", response.data);
      toast.success("Registration Successful!");
    } catch (error) {
      console.error("Registration failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Registration Failed!");
    }
  }

  return (
    <div className="main">
      <ToastContainer position="bottom-center" />
      <div className="register">
        <h2>Register Here</h2>
        <form id="register" onSubmit={SignUp}>
          <label>First Name:</label>
          <input type="text" value={fname} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter First Name" required />
          <br /><br />

          <label>Last Name:</label>
          <input type="text" value={lname} onChange={(e) => setLastName(e.target.value)} placeholder="Enter Last Name" required />
          <br /><br />

          <label>Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter Address" required />
          <br /><br />

          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="1234567890" required />
          <br /><br />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email" required />
          <br /><br />

          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUserName(e.target.value)} placeholder="Enter Username" required />
          <br /><br />

          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" required />
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
