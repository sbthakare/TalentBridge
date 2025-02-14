import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/adminDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaHome, FaBriefcase, FaProjectDiagram, FaUserGraduate, FaUsers, FaCalendarAlt, FaUserShield, FaBell } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import PostJob from "../pages/PostJob";
import ViewStudents from "../pages/ViewStudents";
import ViewEmployees from "../pages/ViewEmployees";
import EmployeeCalendar from "../pages/EmployeeCalendar";
import AdminJobManagement from "../pages/AdminJobManagement";
import ProjectAllot from "../pages/ProjectAllot";
import ManageProjects from "../pages/ManageProjects";
import Notifications from "../pages/Notifications";

Chart.register(...registerables);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(localStorage.getItem("activeSection") || "dashboard");
  const [projectData, setProjectData] = useState({ completed: 0, inProgress: 0, pending: 0 });

  const iconMapping = {
    dashboard: <FaHome />,
    postJob: <FaBriefcase />,
    projectAllot: <FaProjectDiagram />,
    viewStudents: <FaUserGraduate />,
    viewEmployees: <FaUsers />,
    employeeCalendar: <FaCalendarAlt />,
    adminJobManage: <FaBriefcase />,
    manageProjects: <FaProjectDiagram />,
    roleAccess: <FaUserShield />,
    notifications: <FaBell />,
  };

  const sections = [
    { id: "dashboard", label: "Dashboard Overview" },
    { id: "postJob", label: "Post Job" },
    { id: "projectAllot", label: "Project Allocation" },
    { id: "viewStudents", label: "View Students" },
    { id: "viewEmployees", label: "Employee Management" },
    { id: "employeeCalendar", label: "Employee Calendar" },
    { id: "adminJobManage", label: "Job Management" },
    { id: "manageProjects", label: "Manage Projects" },
    { id: "notifications", label: "Notifications" },
  ];

  useEffect(() => {
    fetchProjectData();
  }, []);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get("https://localhost:7144/CompanyProject");
      const data = response.data;
      const completed = data.filter(project => project.status === "Completed").length;
      const inProgress = data.filter(project => project.status === "In Progress").length;
      const pending = data.filter(project => project.status === "Pending").length;
      setProjectData({ completed, inProgress, pending });
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out!");
    navigate("/adminLogin");
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
    localStorage.setItem("activeSection", sectionId);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">TalentBridge</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button className="nav-link btn btn-danger btn-link" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Dashboard Layout */}
      <div className="dashboard d-flex">
        {/* Sidebar */}
        <div className="sidebar bg-dark text-light p-3" style={{ width: "250px", minHeight: "100vh" }}>
          <h3 className="mb-4">Admin Dashboard</h3>
          <ul className="list-unstyled">
            {sections.map((section) => (
              <li
                key={section.id}
                className={`p-2 d-flex align-items-center ${activeSection === section.id ? "bg-primary text-white fw-bold" : ""}`}
                onClick={() => handleSectionChange(section.id)}
                style={{ cursor: "pointer", borderRadius: "5px" }}
              >
                <span className="me-2">{iconMapping[section.id]}</span> {section.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="content flex-grow-1 p-4">
          {activeSection === "dashboard" && (
            <div>
              <h2>Dashboard Overview</h2>
              <div className="row">
                <div className="col-lg-6 col-md-12 mb-4">
                  <h5>Project Status</h5>
                  <Bar 
                    data={{ 
                      labels: ["Completed", "In Progress", "Pending"], 
                      datasets: [{ 
                        label: "Project Status", 
                        data: [projectData.completed, projectData.inProgress, projectData.pending], 
                        backgroundColor: ["#28a745", "#ffc107", "#dc3545"] 
                      }] 
                    }} 
                  />
                </div>
                <div className="col-lg-6 col-md-12 mb-4">
                  <h5>Ongoing Project Status</h5>
                  <Pie 
                    data={{ 
                      labels: ["Ongoing", "Completed", "Not Started"], 
                      datasets: [{ 
                        label: "Ongoing Project Status", 
                        data: [projectData.inProgress, projectData.completed, projectData.pending], 
                        backgroundColor: ["#17a2b8", "#28a745", "#ffc107"] 
                      }] 
                    }} 
                  />
                </div>
              </div>
            </div>
          )}
          {activeSection === "postJob" && <PostJob />}
          {activeSection === "projectAllot" && <ProjectAllot />}
          {activeSection === "viewStudents" && <ViewStudents />}
          {activeSection === "viewEmployees" && <ViewEmployees />}
          {activeSection === "employeeCalendar" && <EmployeeCalendar />}
          {activeSection === "adminJobManage" && <AdminJobManagement />}
          {activeSection === "manageProjects" && <ManageProjects />}
          {activeSection === "notifications" && <Notifications />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
