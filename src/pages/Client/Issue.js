import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const Issue = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f0f5",
      padding: "20px",
    }}
  >
    <div
      className="section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
            >
     <div class="row">
        <div class="col-md-6">
          <div class="card issue-card">
            <div class="card-body">
              <h5>Delay in Material Delivery</h5>
              <p class="issue-status critical">Critical - Mitigation in progress</p>
              <p>Impact: Project completion may be delayed by 2 weeks.</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card issue-card">
            <div class="card-body">
              <h5>Inspection Approval Pending</h5>
              <p class="issue-status resolved">Resolved</p>
              <p>Impact: No impact on the timeline.</p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
);

export default Issue;
