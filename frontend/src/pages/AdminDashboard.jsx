import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
//import "../styles/adminDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, Table, Card } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";

export function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
    fetchEmployees();
    fetchProjects();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:7202/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:7202/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:7202/api/projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <Helmet title="Admin Dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">Admin Panel</a>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h1 className="text-center">Welcome, Admin!</h1>
      </div>

      {/* Job Management */}
      <Container className="mt-5">
        <h2>Manage Job Posts</h2>
        <Button color="primary" onClick={() => navigate("/addJob")}>Post New Job</Button>
        <Table striped className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>
                  <Button color="warning" onClick={() => navigate(`/editJob/${job.id}`)}>Edit</Button>
                  <Button color="danger" className="ms-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Employee Management */}
      <Container className="mt-5">
        <h2>Manage Employees</h2>
        <Table striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>
                  <Button color="warning">Edit</Button>
                  <Button color="danger" className="ms-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {/* Project Management */}
      <Container className="mt-5">
        <h2>Manage Projects</h2>
        <Button color="primary" onClick={() => navigate("/addProject")}>Create Project</Button>
        <Table striped className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Project Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => (
              <tr key={proj.id}>
                <td>{proj.id}</td>
                <td>{proj.name}</td>
                <td>{proj.status}</td>
                <td>
                  <Button color="warning">Edit</Button>
                  <Button color="danger" className="ms-2">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </Helmet>
  );
}

export default AdminDashboard;
