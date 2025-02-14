import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import ApplicationForm from "../components/UI/ApplicationForm";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7144/api/PostJob`);
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Helmet title={job?.title || "Job Details"}>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="job__info">
                <h2 className="section__title">{job.title}</h2>
                <p className="section__description">{job.description}</p>

                <div className="job__details mt-3">
                  <span>
                    <i className="ri-money-dollar-circle-line"></i> ₹
                    {job.salary?.toLocaleString() || "Not specified"} / year
                  </span>
                  <span>
                    <i className="ri-calendar-line"></i> Posted on:{" "}
                    {job.postedDate
                      ? new Date(job.postedDate).toLocaleDateString()
                      : "Not available"}
                  </span>
                  <span>
                    <i className="ri-tools-line"></i> Required Skills:{" "}
                    {job.skills || "Not specified"}
                  </span>
                </div>
              </div>
            </Col>

            <Col lg="4" className="mt-5">
              <div className="application-info mt-5">
                <ApplicationForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default JobDetails;
