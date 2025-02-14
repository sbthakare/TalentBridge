import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Project = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const [title, setTitle] = useState("");
    const [purpose, setPurpose] = useState("");
    const [deadline, setDeadline] = useState("");
    const [description, setDescription] = useState("");
    const [features, setFeatures] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7144/api/Client", {
                title: title,
                purpose: purpose,
                deadline: deadline,
                descrption: description, // Matches API model
                features: features,
            });

            alert(response.data.message);
            navigate("/success"); // Navigate after successful submission
        } catch (error) {
            setError("Failed to register the project. Please try again.");
        }
    };

    return (
        <div className="container project-form mt-4">
            <h2 className="text-center mb-4">Project Details Form</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="purpose">Project Purpose:</label>
                    <textarea
                        className="form-control"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="deadline">Project Deadline:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="description">Project Description:</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="features">Required Features:</label>
                    <textarea
                        className="form-control"
                        value={features}
                        onChange={(e) => setFeatures(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Submit Project Details
                </button>
            </form>
        </div>
    );
};

export default Project;
