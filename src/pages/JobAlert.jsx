import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JobAlert = () => {
  const [jobAlerts, setJobAlerts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("https://localhost:7144/api/jobs/recent");
        const allJobs = response.data;

        const twoDaysAgo = Date.now() - 48 * 60 * 60 * 1000; // Last 48 hours

        // Filter jobs posted within the last 48 hours
        const recentJobs = allJobs.filter((job) => new Date(job.postedDate).getTime() >= twoDaysAgo);

        setJobAlerts(recentJobs.reverse());
      } catch (error) {
        console.error("Error fetching job alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  const formatRelativeTime = (postedDate) => {
    const timeElapsed = Date.now() - new Date(postedDate).getTime();
    const hoursElapsed = Math.floor(timeElapsed / (1000 * 60 * 60));

    if (hoursElapsed === 0) return "Just posted";
    if (hoursElapsed === 1) return "1 hour ago";
    if (hoursElapsed < 24) return `${hoursElapsed} hours ago`;
    return "1 day ago";
  };

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="text-center mb-4">Job Alerts</h2>

      {jobAlerts.length === 0 ? (
        <p className="text-center">No new job alerts.</p>
      ) : (
        <div className="row">
          {jobAlerts.map((alert, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{alert.jobTitle}</h5>
                  <p><strong>Salary:</strong> ₹{alert.salary} LPA</p>
                  <p><strong>Type:</strong> {alert.jobType}</p>
                  <p><strong>Posted:</strong> {formatRelativeTime(alert.postedDate)}</p>
                  <p><strong>Apply before:</strong> {new Date(alert.deadline).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobAlert;
