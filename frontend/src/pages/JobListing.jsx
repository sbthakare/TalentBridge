import React from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import JobItem from "../components/UI/JobItem"; 
import jData from "../assets/data/jobData";


const JobListing = () => {
  return (
    <Helmet title="jobs">
      <CommonSection title="Jobs Listing" />

      <section>
        <Container>
          <Row>
            {jData.map((item) => (
              <JobItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default JobListing;
