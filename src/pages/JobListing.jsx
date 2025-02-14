import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const navigate = useNavigate();

  // Fetch job listings from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://localhost:7144/api/PostJob");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job listings");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    // Load applied jobs from localStorage
    const storedAppliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedAppliedJobs);
  }, []);

  // Function to handle Apply button click
  const handleApply = async (jobId) => {
    const studentData = JSON.parse(localStorage.getItem("student"));

    if (!studentData || studentData.role !== "student") {
      alert("Please login as a student to apply for jobs.");
      navigate("/login");
      return;
    }

    if (appliedJobs.includes(jobId)) {
      alert("You have already applied for this job.");
      return;
    }

    try {
      // Send apply request to backend API
      await axios.post("http://localhost:7202/api/job/apply", { jobId, studentId: studentData.id });

      // Update applied jobs in localStorage
      const updatedAppliedJobs = [...appliedJobs, jobId];
      setAppliedJobs(updatedAppliedJobs);
      localStorage.setItem("appliedJobs", JSON.stringify(updatedAppliedJobs));

      alert("You have successfully applied for this job!");
    } catch (error) {
      alert("Error applying for job. Please try again later.");
      console.error("Apply error:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center job-listing-title">Available Jobs</h2>
      {loading ? (
        <p className="text-center">Loading jobs...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <Row>
          {jobs.map((job) => (
            <Col lg="4" md="6" sm="12" key={job.id}>
              <Card className="job__card">
                <CardBody>
                  <CardTitle tag="h4" className="text-center job__title">{job.title}</CardTitle>
                  <CardText className="text-center job__salary">
                    <strong>₹{job.salary.toLocaleString()}</strong> <span>/ Year</span>
                  </CardText>

                  <div className="job__item-info d-flex flex-column align-items-center text-muted">
                    <span><i className="ri-calendar-line"></i> Posted: {new Date(job.postedDate).toLocaleDateString("en-GB")}</span>
                  </div>

                  <div className="job__buttons d-flex justify-content-between mt-3">
                    <Button
                      color="primary"
                      className="job__btn"
                      onClick={() => handleApply(job.id)}
                      disabled={appliedJobs.includes(job.id)}
                    >
                      {appliedJobs.includes(job.id) ? "Applied" : "Apply"}
                    </Button>
                    <Button color="warning" className="job__btn">
                      <Link to={`/jobs/${job.id}`} className="job__btn-link">Details</Link>
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default JobListing;
