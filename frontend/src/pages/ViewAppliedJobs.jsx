import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewAppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const username = localStorage.getItem("username");
        if (!username) {
          alert("User not logged in. Redirecting to login.");
          navigate("/login");
          return;
        }

        const response = await axios.get(`http://localhost:7202/api/jobs/applied/${username}`);
        setAppliedJobs(response.data);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        alert("Failed to fetch applied jobs. Please try again later.");
      }
    };

    fetchAppliedJobs();
  }, [navigate]);

  const handleWithdraw = async (jobId) => {
    try {
      await axios.delete(`http://localhost:7202/api/jobs/withdraw/${jobId}`);
      setAppliedJobs(appliedJobs.filter((job) => job.jobId !== jobId));
      alert("Job withdrawn successfully!");
    } catch (error) {
      console.error("Error withdrawing job:", error);
      alert("Failed to withdraw job.");
    }
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {/* Job Alert Section */}
      <div className={`alert ${appliedJobs.length > 0 ? "alert-success" : "alert-warning"}`} role="alert">
        {appliedJobs.length > 0 ? (
          <strong>You have applied for {appliedJobs.length} jobs!</strong>
        ) : (
          <strong>No job applications found. Start applying today!</strong>
        )}
      </div>

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
              <tr key={job.jobId}>
                <td>{index + 1}</td>
                <td>{job.jobTitle}</td>
                <td>{job.status || "Applied"}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleWithdraw(job.jobId)}>
                    Withdraw
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No jobs applied yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAppliedJobs;
