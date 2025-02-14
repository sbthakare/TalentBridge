import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  // State to hold user data
  const [profile, setProfile] = useState({
    name: "",
    jobRole: "",
    email: "",
    phone: "",
    joiningDate: "",
    profilePhoto: null,
    projects: [],
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // To show loading spinner

  useEffect(() => {
    const userId = localStorage.getItem("userId");
console.log("User ID:", userId); // Check if the value is correct.
if (!userId) {
  setError("User ID not found.");
  return;
}

  }, []);

  const fetchUserProfile = (userId) => {
    axios
      .get(`http://localhost:5119/api/account/profile/${userId}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile data");
      });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, profilePhoto: e.target.files[0] });
  };

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.description) {
      setProfile({ ...profile, projects: [...profile.projects, newProject] });
      setNewProject({ name: "", description: "" });
    } else {
      setError("Please fill in all project fields.");
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");
  
    // Validate data before submitting
    if (!profile.name || !profile.email || !profile.phone) {
      setError("Please fill in all required fields.");
      return;
    }
  
    // Prepare the FormData object
    const formData = new FormData();
    formData.append("name", profile.name);
    formData.append("jobRole", profile.jobRole);
    formData.append("email", profile.email);
    formData.append("phone", profile.phone);
    formData.append("joiningDate", profile.joiningDate);
  
    // Check for the profile photo and add it to FormData if it exists
    if (profile.profilePhoto) {
      formData.append("profilePhoto", profile.profilePhoto);
    }
  
    // Add projects to FormData if there are any projects
    profile.projects.forEach((project, index) => {
      formData.append(`projects[${index}].name`, project.name);
      formData.append(`projects[${index}].description`, project.description);
    });
  
    setLoading(true); // Show loading spinner
    axios
      .put(`http://localhost:5119/api/account/update/${userId}`, formData)
      .then((response) => {
        fetchUserProfile(userId); // Fetch updated data
        setIsEditing(false); // Exit edit mode
        setError(""); // Clear error if any
      })
      .catch((error) => {
        console.error("Error saving profile:", error);
        setError("Failed to save profile. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Hide loading spinner
      });
  };
  
  

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-photo">
          <img
            src={
              profile.profilePhoto
                ? URL.createObjectURL(profile.profilePhoto)
                : "https://via.placeholder.com/100"
            }
            alt="Profile"
            className="profile-photo-img"
          />
          {isEditing && <input type="file" onChange={handleFileChange} />}
        </div>
        <div className="profile-info">
          <h1>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            ) : (
              profile.name
            )}
          </h1>
          <p>
            {isEditing ? (
              <input
                type="text"
                name="jobRole"
                value={profile.jobRole}
                onChange={handleChange}
                placeholder="Enter your job role"
              />
            ) : (
              profile.jobRole
            )}
          </p>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSave} className="profile-form">
        <div className="section">
          <h2>Personal Information</h2>
          <div className="info-fields">
            <div>
              Email:{" "}
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              ) : (
                profile.email
              )}
            </div>
            <div>
              Phone:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              ) : (
                profile.phone
              )}
            </div>
            <div>
              Joining Date:{" "}
              {isEditing ? (
                <input
                  type="date"
                  name="joiningDate"
                  value={profile.joiningDate}
                  onChange={handleChange}
                />
              ) : (
                profile.joiningDate
              )}
            </div>
          </div>
        </div>

        <div className="section">
          <h2>Projects</h2>
          {profile.projects.length === 0 ? (
            <div>No projects added yet. Add a project.</div>
          ) : (
            profile.projects.map((project, index) => (
              <div key={index} className="project">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            ))
          )}

          {isEditing && (
            <div className="project-form">
              <input
                type="text"
                name="name"
                value={newProject.name}
                onChange={handleProjectChange}
                placeholder="Project name"
              />
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleProjectChange}
                placeholder="Project description"
              />
              <button type="button" onClick={handleAddProject}>
                Add Project
              </button>
            </div>
          )}
        </div>

        {isEditing && (
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>

      <button onClick={handleEditToggle}>{isEditing ? "Cancel" : "Edit Profile"}</button>
    </div>
  );
};

export default Profile;
