import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/userDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Input, Button, Form, Card } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import JobItem from "../components/UI/JobItem";

export function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allJobs, setAllJobs] = useState([]);
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) return;

        const [userResponse, jobsResponse] = await Promise.all([
          fetch(`https://localhost:7144/api/auth/get/${username}`),
          fetch("https://localhost:7144/api/job/list"),
        ]);

        if (!userResponse.ok) throw new Error("Failed to fetch user data");
        if (!jobsResponse.ok) throw new Error("Failed to fetch jobs");

        const userData = await userResponse.json();
        const jobsData = await jobsResponse.json();

        setUser(userData);
        setAllJobs(jobsData);

        // Filter jobs based on user skills
        if (userData.skills) {
          const userSkills = userData.skills.toLowerCase().split(", ");
          const matchedJobs = jobsData.filter((job) =>
            userSkills.some((skill) => job.skills.toLowerCase().includes(skill))
          );
          setRecommendedJobs(matchedJobs);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/logout");
    navigate("/home");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredJobs = searchTerm
    ? allJobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allJobs;

  if (!user) {
    return <div className="loading text-center mt-5">Loading...</div>;
  }

  return (
    <Helmet title="Student Dashboard">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            TalentBridge
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/viewAppliedJobs">
                  View Applied Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/jobalert">
                  Job Alerts
                </Link>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4 text-center">
        <h1 className="fw-bold">
          Welcome, {user.firstName || user.userName}!
        </h1>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/userProfile")}
        >
          View Profile
        </button>
      </div>

      {/* Job Search Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold">Search Jobs</h2>
        <Form className="d-flex justify-content-center mt-3">
          <Input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control w-50 me-2"
          />
          <Button color="primary">Search</Button>
        </Form>
      </div>

      {/* Recommended Jobs Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold text-success">
          Recommended Jobs for You
        </h2>
        {recommendedJobs.length > 0 ? (
          <Row className="mt-4">
            {recommendedJobs.map((item) => (
              <Col lg="4" md="6" sm="12" key={item.id} className="mb-4">
                <Card className="job-card">
                  <JobItem item={item} />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="text-center text-muted mt-3">
            No recommended jobs found based on your skills.
          </p>
        )}
      </div>

      {/* All Job Openings Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold text-primary">All Job Openings</h2>
        <Container>
          <Row>
            {filteredJobs.map((item) => (
              <Col lg="4" md="6" sm="12" key={item.id} className="mb-4">
                <Card className="job-card">
                  <JobItem item={item} />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </Helmet>
  );
}

export default StudentDashboard;
