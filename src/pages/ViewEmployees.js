import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ITDesignations = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Cloud Engineer",
  "Database Administrator",
  "System Administrator",
  "Cyber Security Analyst",
  "AI Engineer",
  "Mobile App Developer",
  "QA Engineer",
  "Software Architect",
  "Technical Lead",
  "Product Manager",
  "Scrum Master",
  "UI/UX Designer",
  "Business Analyst",
  "IT Support Engineer",
  "Network Engineer",
  "Embedded Systems Engineer",
  "Game Developer",
  "Blockchain Developer",
  "AR/VR Developer",
  "IoT Engineer",
  "Site Reliability Engineer",
  "IT Consultant",
  "Chief Technology Officer (CTO)"
];

const ViewEmployees = () => {
  const [employee, setEmployee] = useState({
    name: "",
    designation: "",
    joiningDate: "",
    email: "",
    profilePhoto: null,
  });

  const [employees, setEmployees] = useState([]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  // Handle file input
  const handleFileChange = (e) => {
    setEmployee({ ...employee, profilePhoto: e.target.files[0] });
  };

  // Generate username & password
  const generateCredentials = () => {
    const username = `${employee.name.toLowerCase().replace(" ", "")}_${Date.now()}`;
    const password = Math.random().toString(36).slice(-8);
    return { username, password };
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employee.name || !employee.designation || !employee.joiningDate || !employee.email) {
      alert("Please fill in all the details.");
      return;
    }

    const { username, password } = generateCredentials();

    try {
      const response = await axios.post("https://localhost:7144/api/Employee", {
        Name: employee.name,
        Designation: employee.designation,
        Joiningdate: employee.joiningDate,
        Email: employee.email,
        Username: username,
        Password: password,
      });

      alert(response.data.message || "Employee created successfully!");

      // Add new employee to the list
      setEmployees([
        ...employees,
        {
          ...employee,
          username,
          password,
          profilePhoto: employee.profilePhoto ? URL.createObjectURL(employee.profilePhoto) : null,
        },
      ]);

      // Reset form
      setEmployee({
        name: "",
        designation: "",
        joiningDate: "",
        email: "",
        profilePhoto: null,
      });
    } catch (error) {
      console.error("Error creating employee:", error);
      alert("Failed to create employee");
    }
  };

  useEffect(() => {
    axios
      .get("https://localhost:7144/Employess")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <div className="admin-dashboard mb-5">
        <h2 className="text-center">Create Employee Profile</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter name"
              value={employee.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <select
              name="designation"
              className="form-control"
              value={employee.designation}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Designation</option>
              {ITDesignations.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              name="joiningDate"
              className="form-control"
              value={employee.joiningDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter email"
              value={employee.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Photo</label>
            <input
              type="file"
              className="form-control-file"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Create Profile</button>
        </form>
      </div>
    </div>
  );
};

export default ViewEmployees;
