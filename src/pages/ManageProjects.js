import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "https://localhost:7144/Submit";
const EMPLOYEE_API_URL = "https://localhost:7144/Employess";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newProject, setNewProject] = useState({
    name: "",
    startDate: "",
    endDate: "",
    status: "Pending",
    budget: "",
    manager: "",
    employees: [],
  });

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(API_URL);
      setProjects(response.data);
    } catch (error) {
      setError("Failed to fetch projects");
      console.error("Fetch Projects Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(EMPLOYEE_API_URL);
      setEmployees(response.data || []);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setEmployees([]);
    }
  };

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleEmployeeSelect = (e) => {
    const selectedEmployees = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value, 10)
    );
    setNewProject({ ...newProject, employees: selectedEmployees });
  };

  const addProject = async () => {
    if (!newProject.name || !newProject.startDate || !newProject.endDate || !newProject.budget || !newProject.manager) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const payload = {
        name: newProject.name,
        startDate: newProject.startDate,
        endDate: newProject.endDate,
        status: newProject.status,
        budget: parseFloat(newProject.budget),
        manager: newProject.manager,
        employees: newProject.employees.map((id) => ({ id })),
      };

      const response = await axios.post(API_URL, payload, {
        headers: { "Content-Type": "application/json" },
      });

      setProjects([...projects, response.data]);
      setNewProject({
        name: "",
        startDate: "",
        endDate: "",
        status: "Pending",
        budget: "",
        manager: "",
        employees: [],
      });
    } catch (error) {
      alert("Error adding project: " + (error.response?.data?.message || "Unknown error"));
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      alert("Error deleting project");
    }
  };

  return (
    <div className="p-6 font-sans bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 border border-gray-200">
        <h2 className="text-3xl font-semibold mb-4 text-gray-700">Manage Projects</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4">
          <input name="name" placeholder="Project Name" value={newProject.name} onChange={handleChange} className="p-3 border rounded-md w-full" />
          <input name="startDate" type="date" value={newProject.startDate} onChange={handleChange} className="p-3 border rounded-md w-full" />
          <input name="endDate" type="date" value={newProject.endDate} onChange={handleChange} className="p-3 border rounded-md w-full" />
          <input name="budget" placeholder="Budget" value={newProject.budget} onChange={handleChange} className="p-3 border rounded-md w-full" />
          <input name="manager" placeholder="Project Manager" value={newProject.manager} onChange={handleChange} className="p-3 border rounded-md w-full" />
          <select name="status" value={newProject.status} onChange={handleChange} className="p-3 border rounded-md w-full">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select multiple name="employees" onChange={handleEmployeeSelect} className="p-3 border rounded-md w-full">
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
          <button onClick={addProject} className="p-3 bg-blue-500 text-white rounded-md">Add Project</button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        {loading ? <p>Loading projects...</p> : (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-4">Name</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">End Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Manager</th>
                <th className="p-4">Employees</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-t">
                  <td className="p-4">{project.name}</td>
                  <td className="p-4">{project.startDate}</td>
                  <td className="p-4">{project.endDate}</td>
                  <td className="p-4">{project.status}</td>
                  <td className="p-4">{project.budget}</td>
                  <td className="p-4">{project.manager}</td>
                  <td className="p-4">{Array.isArray(project.employees) ? project.employees.map(emp => emp.name).join(", ") : "No Employees"}</td>
                  <td className="p-4">
                    <button onClick={() => deleteProject(project.id)} className="p-2 bg-red-500 text-white rounded-md">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageProjects;
