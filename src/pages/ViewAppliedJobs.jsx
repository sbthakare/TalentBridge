import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve applied jobs from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);
  }, []);

  const handleWithdraw = (jobId) => {
    // Remove the job from applied jobs list
    const updatedJobs = appliedJobs.filter((job) => job.id !== jobId);
    setAppliedJobs(updatedJobs);

    // Update localStorage
    localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs));
    alert("Job withdrawn successfully!");
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="text-center mb-4">Applied Jobs</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Job Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((job, index) => (
              <tr key={job.id}>
                <td>{index + 1}</td>
                <td>{job.title}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleWithdraw(job.id)}
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No jobs applied yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppliedJobs;
