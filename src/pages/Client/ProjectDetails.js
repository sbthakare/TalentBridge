import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ProjectDetails = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("https://localhost:7144/api/Project")
            .then((response) => {
                console.log("API Response:", response.data);
                setProjects(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch project data");
                setLoading(false);
            });
    }, []);

    // Function to get badge color based on project status
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "active":
                return "success";
            case "In Progress":
                return "secondary";
            case "pending":
                return "warning";
            case "completed":
                return "primary";
            case "cancelled":
                return "danger";
            default:
                return "secondary";
        }
    };

    if (loading) {
        return <div className="container mt-4"><p>Loading projects...</p></div>;
    }

    if (error) {
        return <div className="container mt-4"><p className="text-danger">{error}</p></div>;
    }

    return (
        <div className="container mt-4">
            <h4 className="mb-3 text-primary">Project Overview</h4>
            <div className="row">
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div className="col-md-6 mb-3" key={index}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <h5 className="card-title">{project.name}</h5>
                                    <p className="card-text">{project.description}</p>
                                    <p className="mb-2">
                                        <strong>Team Members:</strong> {project.members ? project.members.split(",").join(", ") : "No members"}
                                    </p>
                                    <span className={`badge bg-${getStatusColor(project.status)} px-3 py-2`}>
                                        {project.status || "Unknown"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No projects available.</p>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;
