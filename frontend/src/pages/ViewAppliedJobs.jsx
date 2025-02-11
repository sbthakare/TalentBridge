import React, { useState, useEffect } from "react";

const ViewAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  // Load jobs from localStorage on component mount
  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);
  }, []);

  // Handle withdraw action
  const handleWithdraw = (index) => {
    const updatedJobs = appliedJobs.filter((_, i) => i !== index);
    setAppliedJobs(updatedJobs);
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Applied Jobs</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Job Title</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>{job.status || "Applied"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleWithdraw(index)}
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No jobs applied yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppliedJobs;
