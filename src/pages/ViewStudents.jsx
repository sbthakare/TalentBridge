import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/viewStudents.css";

const ViewStudents = () => {
  const navigate = useNavigate();
  const { jobId } = useParams(); // Get job ID from URL params
  const [job, setJob] = useState(null);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState({});

  // Fetch job details
  useEffect(() => {
    axios.get(`https://localhost:7144/api/jobs/${jobId}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => {
        console.error("Error fetching job details:", error);
      });
  }, [jobId]);

  // Fetch students
  useEffect(() => {
    axios.get("http://localhost:7202/api/students")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  // Filter students based on job skills
  useEffect(() => {
    if (job) {
      const jobSkillsArray = job.skills.toLowerCase().split(",").map(skill => skill.trim());

      const matchingStudents = students.filter(student =>
        jobSkillsArray.every(skill =>
          student.skills.toLowerCase().split(",").map(s => s.trim()).includes(skill)
        )
      );

      setFilteredStudents(matchingStudents);
    }
  }, [job, students]);

  // Select/Unselect students
  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  return (
    <div className="view-students-container">
      <h2>Candidates</h2>

      {/* Back Button */}
      <button className="btn btn-secondary back-btn" onClick={() => navigate(-1)}>⬅ Back</button>

      {/* Students Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Job Post</th>
            <th>Resume</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.skills}</td>
                <td>{job ? job.title : "N/A"}</td> {/* Job Post Column */}
                <td>
                  <a href={student.resume} target="_blank" rel="noopener noreferrer">
                    View Resume
                  </a>
                </td>
                <td>
                  <button
                    className={`btn ${selectedStudents[student.id] ? "btn-danger" : "btn-success"}`}
                    onClick={() => handleSelectStudent(student.id)}
                  >
                    {selectedStudents[student.id] ? "Unselect" : "Select"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No matching students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
