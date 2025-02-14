import React, { useState } from "react";

const AdminJobManagement = () => {
  // Sample data for students with job application statuses
  const [students, setStudents] = useState([  
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      skills: "JavaScript, HTML",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2023",
      appliedJobs: [1, 2],  // List of job IDs the student has applied for
      status: "Pending",  // Default status
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      skills: "Java, Spring Boot",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2024",
      appliedJobs: [2],  // Applied for job ID 2
      status: "Pending",  // Default status
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      skills: "Python, Django",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2022",
      appliedJobs: [],  // Not applied for any jobs
      status: "Pending",  // Default status
    },
    // Add more students as needed
  ]);

  // Sample job posts
  const [jobPosts] = useState([
    { jobId: 1, jobTitle: "Frontend Developer" },
    { jobId: 2, jobTitle: "Backend Developer" },
  ]);

  // State for selected job
  const [selectedJob, setSelectedJob] = useState(1);  // Default to job ID 1

  // Filter students who have applied for the selected job
  const filteredStudents = students.filter(student =>
    student.appliedJobs.includes(selectedJob)
  );

  // Handle select action
  const handleSelectStudent = (studentId) => {
    // Update status of the selected student to 'Selected'
    alert(`Student with ID ${studentId} has been selected! A message is sent to their dashboard.`);
    
    // Remove the selected student from the list
    setStudents(prevStudents => 
      prevStudents.map(student => 
        student.id === studentId ? { ...student, status: "Selected" } : student
      )
    );
  };

  // Handle reject action
  const handleRejectStudent = (studentId) => {
    // Update status of the rejected student to 'Rejected'
    alert(`Student with ID ${studentId} has been rejected! A message is sent to their dashboard.`);
    
    // Remove the rejected student from the table
    setStudents(prevStudents => 
      prevStudents.filter(student => student.id !== studentId)
    );
  };

  return (
    <div className="section container mt-4">
      <h2>View Applied Students for Job Posted jobswise</h2>

      {/* Job selection */}
      <div className="mb-4">
        <select
          className="form-select"
          value={selectedJob}
          onChange={(e) => setSelectedJob(Number(e.target.value))}
        >
          {jobPosts.map((job) => (
            <option key={job.jobId} value={job.jobId}>
              {job.jobTitle}
            </option>
          ))}
        </select>
      </div>

      {/* Students Table */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Name</th>
            <th>Skills</th>
            <th>Passing Year</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td><img src={student.profilePic} alt="Student Image" className="img-fluid" width="50" /></td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.skills}</td>
                <td>{student.passingYear}</td>
                <td>
                  <a href={student.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                </td>
                <td>{student.status}</td>
                <td>
                  <button 
                    className="btn btn-success me-2" 
                    onClick={() => handleSelectStudent(student.id)}
                    disabled={student.status === "Selected"}
                  >
                    Select
                  </button>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleRejectStudent(student.id)}
                    disabled={student.status === "Rejected"}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No students found for this job.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobManagement;
