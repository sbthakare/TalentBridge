import React, { useState } from "react";
import Profile from "./Profile";
import TaskTracker from "./TaskTracker";
import Calendar from "./schedule";
import Schedule from "./Calender";
import Feedback from "./Feedback";

import './EmployeeDashboard.css';

const EmployeeDashboard = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    position: "",
  });

  const logout = () => {
    localStorage.clear();  // Clear all items in localStorage
    alert("You have been logged out!");
    window.location.href = "/login";  // Redirect to the login page after logout
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = () => {
    const { name, email, position } = profile;
    if (name && email && position) {
      alert(
        `Profile saved:\nName: ${name}\nEmail: ${email}\nPosition: ${position}`
      );
    } else {
      alert("Please fill out all fields.");
    }
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h3>Employee Dashboard</h3>
        <ul>
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </li>
          <li
            className={activeSection === "taskTracker" ? "active" : ""}
            onClick={() => setActiveSection("taskTracker")}
          >
            Task Tracker
          </li>
          <li
            className={activeSection === "calendar" ? "active" : ""}
            onClick={() => setActiveSection("calendar")}
          >
            Calendar
          </li>
          <li
            className={activeSection === "schedule" ? "active" : ""}
            onClick={() => setActiveSection("schedule")}
          >
            Schedule
          </li>
          <li
            className={activeSection === "feedback" ? "active" : ""}
            onClick={() => setActiveSection("feedback")}
          >
            Feedback
          </li>
        </ul>
        <button className="btn btn-secondary logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Content Area */}
      <div className="content">
        {activeSection === "profile" && (
          <Profile
            profile={profile}
            onProfileChange={handleProfileChange}
            saveProfile={saveProfile}
          />
        )}
        {activeSection === "taskTracker" && <TaskTracker />} {/* Task Tracker */}
        {activeSection === "calendar" && <Calendar />}
        {activeSection === "schedule" && <Schedule />}
        {activeSection === "feedback" && <Feedback />}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
