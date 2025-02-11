import React from "react";
import { Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/job-item.css";

const JobItem = (props) => {
  const { imgUrl, title, salary, jobType, postedDate, applyBeforeDate } = props.item;

  return (
    <Col lg="4" md="6" sm="12" className="mb-4">
      <Card className="job__card">
        {/* Reduced image size */}
        <CardImg top src={imgUrl} alt={title} className="job__img" />
        <CardBody>
          <CardTitle tag="h4" className="text-center job__title">{title}</CardTitle>
          <CardText className="text-center job__salary">
            <strong>₹{salary}</strong> <span>/ Year</span>
          </CardText>

          <div className="job__item-info d-flex flex-column align-items-center text-muted">
            <span><i className="ri-briefcase-line"></i> {jobType}</span>
            <span><i className="ri-calendar-line"></i> Posted: {postedDate}</span>
            <span><i className="ri-calendar-check-line"></i> Apply before: {applyBeforeDate}</span>
          </div>

          <div className="job__buttons d-flex justify-content-between mt-3">
            <Button color="primary" className="job__btn">
              <Link to={`/login`} className="job__btn-link">Apply</Link>
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
