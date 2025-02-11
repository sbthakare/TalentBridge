import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/userDashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Input, Button, Form, Card } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import JobItem from "../components/UI/JobItem";
import jData from "../assets/data/jobData";

export function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jData);
  const [recommendedJobs, setRecommendedJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          console.error("Username not found in localStorage");
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:7202/api/auth/get/${username}`);
        console.log("User profile data:", response.data);
        setUser(response.data);

        // Filter jobs based on user skills
        if (response.data.skills) {
          const userSkills = response.data.skills.toLowerCase().split(", ");
          const matchedJobs = jData.filter((job) =>
            userSkills.some((skill) => job.skills.toLowerCase().includes(skill))
          );
          setRecommendedJobs(matchedJobs);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/logout");
  };

  // Handle job search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredJobs(jData);
    } else {
      const filtered = jData.filter((job) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  if (!user) {
    return <div className="loading text-center mt-5">Loading...</div>;
  }

  return (
    <Helmet title="Student Dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">TalentBridge</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/viewAppliedJobs">
                  ViewAppliedJobs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/jobalert">
                JobAlert
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

      {/* Profile Section */}
      <div className="container mt-4 text-center">
        <h1 className="fw-bold">Welcome, {user.firstName || user.userName}!</h1>
        <p className="text-muted">You are now logged in. Browse jobs or check applied jobs.</p>
        <button className="btn btn-primary btn-lg" onClick={() => navigate("/userProfile")}>
          View Profile
        </button>
      </div>

      {/* Search Job Section */}
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
        <h2 className="text-center fw-bold text-success">Recommended Jobs for You</h2>
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
          <p className="text-center text-muted mt-3">No recommended jobs found based on your skills.</p>
        )}
      </div>

      {/* All Job Listings Section */}
      <div className="container mt-5">
        <h2 className="text-center fw-bold text-primary">All Job Openings</h2>
        <section>
        <Container>
          <Row>
            {jData.map((item) => (
              <JobItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
      </div>
    </Helmet>
  );
}

export default StudentDashboard;
