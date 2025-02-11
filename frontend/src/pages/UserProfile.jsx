import React, { useState, useEffect } from 'react';
import '../styles/userProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Place:</strong> {user.place || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {user.dob || 'N/A'}</p>
        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
        <p><strong>Aadhar No:</strong> {user.adharNo || 'N/A'}</p>
        <p><strong>LinkedIn:</strong> 
          {user.linkedin ? <a href={user.linkedin} target="_blank" rel="noopener noreferrer"> View Profile</a> : 'N/A'}
        </p>

        <h2>Education</h2>
        <p><strong>Stream:</strong> {user.educationStream || 'N/A'}</p>
        <p><strong>Institute:</strong> {user.educationInstitute || 'N/A'}</p>
        <p><strong>Board:</strong> {user.educationBoard || 'N/A'}</p>
        <p><strong>Admission Year:</strong> {user.educationAdmissionYear || 'N/A'}</p>
        <p><strong>Passing Year:</strong> {user.educationPassingYear || 'N/A'}</p>
        <p><strong>Percentage:</strong> {user.educationPercentage || 'N/A'}%</p>

        <h2>Project Details</h2>
        <p><strong>Title:</strong> {user.projectTitle || 'N/A'}</p>
        <p><strong>Platform:</strong> {user.projectPlatform || 'N/A'}</p>
        <p><strong>Description:</strong> {user.projectDescription || 'N/A'}</p>
        <p><strong>Project Link:</strong> 
          {user.projectLink ? <a href={user.projectLink} target="_blank" rel="noopener noreferrer"> View Project</a> : 'N/A'}
        </p>

        <h2>Other Details</h2>
        <p><strong>Skills:</strong> {user.Skill || 'N/A'}</p>
        <p><strong>Certifications:</strong> {user.certifications || 'N/A'}</p>
        <p><strong>Hobbies:</strong> {user.hobbies || 'N/A'}</p>

        {user.resume && (
          <p><strong>Resume:</strong> <a href={user.resume} target="_blank" rel="noopener noreferrer">Download Resume</a></p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
