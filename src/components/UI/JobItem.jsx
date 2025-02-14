import React from "react";
import { Col, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/job-item.css";

const JobItem = ({ item }) => {
  const { id, title, salary, postedDate } = item;
  const navigate = useNavigate();

  // Format posted date
  const formattedPostedDate = new Date(postedDate).toLocaleDateString("en-GB"); // DD/MM/YYYY

  // Function to handle Apply button click
  const handleApply = () => {
    const student = JSON.parse(localStorage.getItem("student")); // Ensure student is logged in

    
    // Retrieve applied jobs from localStorage
    const appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    // Check if the job is already applied
    if (appliedJobs.some((job) => job.id === id)) {
      alert("You have already applied for this job.");
      return;
    }

    // Save the applied job to localStorage
    const newAppliedJobs = [...appliedJobs, { id, title }];
    localStorage.setItem("appliedJobs", JSON.stringify(newAppliedJobs));

    alert("You have successfully applied for this job!");
  };

  return (
    <Col lg="6" md="6" sm="12" className="mb-4"> {/* Two cards per row */}
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
              <Link to={`/jobs/${id}`} className="job__btn-link">Details</Link>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default JobItem;
