import axios from "axios";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaProjectDiagram, FaInfoCircle, FaUsers,
  FaCheckCircle, FaSearch, FaFilter, FaListUl, FaChartPie
} from "react-icons/fa";

const DashboardStats = ({ projects }) => {
  const totalProjects = projects.length;
  const completedProjects = projects.filter(p => p.status === "Completed").length;
  const pendingProjects = projects.filter(p => p.status === "Pending").length;

  return (
    <div className="card p-3 mb-3 text-center" style={{ width: "400px" }}>
      <h4><FaChartPie /> Dashboard Statistics</h4>
      <p>Total Projects: <strong>{totalProjects}</strong></p>
      <p>Completed: <strong className="text-success">{completedProjects}</strong></p>
      <p>Pending: <strong className="text-warning">{pendingProjects}</strong></p>
    </div>
  );
};

const ProjectList = ({ projects }) => (
  <div className="card p-3 mb-3" style={{ width: "500px" }}>
    <h4><FaListUl /> Project List</h4>
    <ul className="list-group">
      {projects.map((project, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <strong>{project.name}</strong>
          <span className={`badge ${project.status === "Completed" ? "bg-success" : "bg-warning"}`}>
            {project.status}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const ProjectAllot = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("https://localhost:7144/CompanyProject");
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("https://localhost:7144/Employess");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchProjects();
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !description || !status || !selectedEmployee) {
      alert("Please fill out all fields.");
      return;
    }
  
    const newProject = { name, description, status, employeeId: selectedEmployee };
  
    try {
      const response = await axios.post("https://localhost:7144/api/CompanyProject", newProject, {
        headers: { "Content-Type": "application/json" }
      });
  
      setProjects([...projects, response.data]);
      setName("");
      setDescription("");
      setSelectedEmployee("");
      setStatus("");
  
      alert("Project Registered Successfully!");
    } catch (error) {
      alert("Failed to register project. Please check the input values.");
    }
  };
  

  const filteredProjects = projects
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (statusFilter ? p.status === statusFilter : true));

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search Project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-6 col-sm-12">
          <select className="form-control" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <DashboardStats projects={projects} />
        </div>
        <div className="col-md-6 col-sm-12">
          <ProjectList projects={filteredProjects} />
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card p-3 mb-3" style={{ width: "100%" }}>  
            <h2 className="text-center mb-4"><FaProjectDiagram /> Project Allocation</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="projectName" className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="projectName"
                  placeholder="Project Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employeeSelect" className="form-label">Employee</label>
                <select
                  className="form-control"
                  id="employeeSelect"
                  value={selectedEmployee}
                  onChange={(e) => setSelectedEmployee(e.target.value)}
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="statusSelect" className="form-label">Status</label>
                <select
                  className="form-control"
                  id="statusSelect"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Canceled">Canceled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100">Submit Project</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAllot;
