import React from "react";
import { Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/job-item.css";

const JobItem = ({ item }) => {
  const { title, salary, postedDate } = item;
  const navigate = useNavigate();

  // Convert postedDate to display only date
  const formattedPostedDate = new Date(postedDate).toLocaleDateString("en-GB"); // DD/MM/YYYY

  // Function to handle Apply button click
  const handleApply = () => {
    const studentData = JSON.parse(localStorage.getItem("student")); // Get student details

    if (!studentData || studentData.role !== "student") {
      // If not logged in or not a student, redirect to login page
      alert("Please login as a student to apply for jobs.");
      navigate("/login");
      return;
    }

    // Get existing applied jobs from localStorage
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    // Check if the job is already applied
    if (appliedJobs.includes(title)) {
      alert("You have already applied for this job.");
      return;
    }

    // Save the applied job to localStorage
    appliedJobs.push(title);
    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));

    alert("You have successfully applied for this job!");
  };

  return (
    <Col lg="6" md="6" sm="12" className="mb-4">  {/* Ensures two cards per row */}
      <Card className="job__card">
        <CardBody>
          <CardTitle tag="h4" className="text-center job__title">{title}</CardTitle>
          <CardText className="text-center job__salary">
            <strong>₹{salary.toLocaleString()}</strong> <span>/ Year</span>
          </CardText>

          <div className="job__item-info d-flex flex-column align-items-center text-muted">
            <span><i className="ri-calendar-line"></i> Posted: {formattedPostedDate}</span>
          </div>

          <div className="job__buttons d-flex justify-content-between mt-3">
            <Button color="primary" className="job__btn" onClick={handleApply}>
              Apply
            </Button>
            <Button color="warning" className="job__btn">
              <Link to={`/jobs/${title}`} className="job__btn-link">Details</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default JobItem;
