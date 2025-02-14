import React, { useState } from "react";
import Communication from "./Communication";
import ProjectDocument from "./ProjectDocument";
import ProjectDetails from "./ProjectDetails";
import Issue from "./Issue";
import Project from "./Project";
import "./ClientDashboard.css";

const ClientDashboard = () => {
  const [activeSection, setActiveSection] = useState("Communication");

  const showSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  const logout = () => {
    localStorage.clear();
    alert("You have been logged out!");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="dashboard-title">Client Dashboard</h3>
        <ul className="menu-list">
          <li onClick={() => showSection("Communication")}>Communication</li>
          <li onClick={() => showSection("ProjectDocument")}>Project Document</li>
          <li onClick={() => showSection("ProjectDetails")}>Project Details</li>
          <li onClick={() => showSection("Issue")}>Issue</li>
          <li onClick={() => showSection("Project")}>Project</li>
        </ul>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      {/* Content Area */}
      <div className="content">
        {activeSection === "Communication" && <Communication />}
        {activeSection === "ProjectDocument" && <ProjectDocument />}
        {activeSection === "ProjectDetails" && <ProjectDetails />}
        {activeSection === "Issue" && <Issue />}
        {activeSection === "Project" && <Project />}
      </div>
    </div>
  );
};

export default ClientDashboard;
