import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/userProfile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState(null);
  const [formData, setFormData] = useState({});
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`https://localhost:7144/api/profile/get/${username}`);
        setUser(response.data);
        setFormData(response.data || {}); // Ensure formData is always an object
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [username]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "educationStream"];
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill in the required field: ${field}`);
        return false;
      }
    }
    return true;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  // Upload Resume
  const handleFileUpload = async () => {
    if (!resume) {
      alert("Please select a file before uploading.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("resume", resume);
    formDataToSend.append("username", username);

    try {
      const response = await axios.post(`http://localhost:7202/api/profile/uploadResume`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Resume uploaded successfully!");
        // Update resume path in state
        setUser((prevUser) => ({ ...prevUser, resumePath: response.data.filePath }));
      } else {
        alert("Failed to upload resume. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to upload resume.");
    }
  };

  // Save updated profile
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(`http://localhost:7202/api/profile/update`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setUser(formData);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  // Delete profile
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      try {
        await axios.delete(`http://localhost:7202/api/profile/delete/${username}`);
        localStorage.removeItem("username");
        setUser(null);
        alert("Profile deleted successfully.");
        navigate("/"); // Redirect after deletion
      } catch (error) {
        console.error("Error deleting profile:", error);
        alert("Failed to delete profile.");
      }
    }
  };

  return (
    <Container className="profile-container mt-4">
      <Button color="secondary" className="mb-3" onClick={() => navigate(-1)}>
        ⬅ Back
      </Button>

      <h1 className="text-center text-primary fw-bold">Student Profile</h1>

      <div className="text-end">
        <Button color="warning" className="me-2" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
        <Button color="danger" onClick={handleDelete}>Delete Profile</Button>
      </div>

      <Form className="profile-form mt-4">
        <h3 className="section-title">Personal Information</h3>
        <Row>
          <Col md="6">
            <FormGroup>
              <Label>First Name *</Label>
              <Input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} disabled={!isEditing} required />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label>Last Name *</Label>
              <Input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} disabled={!isEditing} required />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col md="6">
            <FormGroup>
              <Label>Place</Label>
              <Input type="text" name="place" value={formData.place || ""} onChange={handleChange} disabled={!isEditing} />
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label>Date of Birth</Label>
              <Input type="date" name="dob" value={formData.dob || ""} onChange={handleChange} disabled={!isEditing} />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label>Gender</Label>
          <Input type="select" name="gender" value={formData.gender || ""} onChange={handleChange} disabled={!isEditing}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </Input>
        </FormGroup>

        <h3 className="section-title">Education</h3>
        <FormGroup>
          <Label>Stream *</Label>
          <Input type="text" name="educationStream" value={formData.educationStream || ""} onChange={handleChange} disabled={!isEditing} required />
        </FormGroup>
        <FormGroup>
          <Label>Institute</Label>
          <Input type="text" name="educationInstitute" value={formData.educationInstitute || ""} onChange={handleChange} disabled={!isEditing} />
        </FormGroup>

        <h3 className="section-title">Upload Resume</h3>
        <FormGroup>
          <Label>Resume (PDF only)</Label>
          <Input type="file" accept=".pdf" onChange={handleFileChange} disabled={!isEditing} />
        </FormGroup>
        {isEditing && (
          <Button color="info" className="mt-2" onClick={handleFileUpload}>
            Upload Resume
          </Button>
        )}

        {isEditing && (
          <Button color="success" className="mt-3" onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </Form>
    </Container>
  );
};

export default UserProfile;
