import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/jobPost.css";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table, FormFeedback } from "reactstrap";

const JobPost = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    skills: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("https://localhost:7144/api/PostJob");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error.response?.data || error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Remove error message when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: false,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!jobData.title.trim()) newErrors.title = "Job title is required.";
    if (!jobData.description.trim()) newErrors.description = "Job description is required.";
    if (!jobData.skills.trim()) newErrors.skills = "Skills are required.";
    if (!jobData.salary || isNaN(Number(jobData.salary)) || Number(jobData.salary) <= 0)
      newErrors.salary = "Enter a valid positive salary.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    try {
      const requestData = {
        title: jobData.title,
        description: jobData.description,
        skills: jobData.skills,
        salary: Number(jobData.salary),
      };

      console.log("Submitting job data:", requestData); // Debugging

      if (isEditing) {
        await axios.put(`http://localhost:7202/api/job/update/${editingJobId}`, requestData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Job updated successfully!");
      } else {
        await axios.post(`http://localhost:7202/api/job/post`, requestData, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Job posted successfully!");
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      console.error("Error submitting job:", error.response?.data || error.message);
      alert("Failed to save job.");
    }
  };

  const handleEdit = (job) => {
    setJobData({
      title: job.title,
      description: job.description,
      skills: job.skills,
      salary: job.salary.toString(),
    });
    setIsEditing(true);
    setEditingJobId(job.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`http://localhost:7202/api/job/delete/${id}`);
        alert("Job deleted successfully!");
        fetchJobs();
      } catch (error) {
        console.error("Error deleting job:", error.response?.data || error.message);
        alert("Failed to delete job.");
      }
    }
  };

  const resetForm = () => {
    setJobData({ title: "", description: "", skills: "", salary: "" });
    setIsEditing(false);
    setEditingJobId(null);
    setErrors({});
  };

  return (
    <Container className="jobpost-container mt-4">
      <Button color="secondary" onClick={() => navigate(-1)}>⬅ Back</Button>
      <h1 className="text-center text-primary fw-bold">{isEditing ? "Edit Job" : "Post Job"}</h1>

      <Form className="jobpost-form mt-4">
        <Row>
          <Col md="6">
            <FormGroup>
              <Label>Job Title *</Label>
              <Input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                invalid={!!errors.title}
              />
              <FormFeedback>{errors.title}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label>Required Skills *</Label>
              <Input
                type="text"
                name="skills"
                value={jobData.skills}
                onChange={handleChange}
                invalid={!!errors.skills}
              />
              <FormFeedback>{errors.skills}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label>Job Description *</Label>
          <Input
            type="textarea"
            name="description"
            value={jobData.description}
            onChange={handleChange}
            invalid={!!errors.description}
          />
          <FormFeedback>{errors.description}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label>Annual Salary *</Label>
          <Input
            type="number"
            name="salary"
            value={jobData.salary}
            onChange={handleChange}
            invalid={!!errors.salary}
            min="1"
          />
          <FormFeedback>{errors.salary}</FormFeedback>
        </FormGroup>

        <div className="d-flex justify-content-between mt-3">
          <Button color="success" onClick={handleSubmit}>
            {isEditing ? "Update Job" : "Post Job"}
          </Button>
          {isEditing && (
            <Button color="secondary" onClick={resetForm}>
              Cancel Edit
            </Button>
          )}
        </div>
      </Form>

      <h2 className="mt-5 text-center text-primary">All Posted Jobs</h2>
      <Table bordered hover className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Skills</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.skills}</td>
                <td>₹{job.salary} LPA</td>
                <td>
                  <Button color="warning" size="sm" className="me-2" onClick={() => handleEdit(job)}>Edit</Button>
                  <Button color="danger" size="sm" onClick={() => handleDelete(job.id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No jobs posted yet.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default JobPost;
