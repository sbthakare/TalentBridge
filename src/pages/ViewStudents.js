import React, { useState } from "react";


const ViewStudents = () => {
  const [students] = useState([  
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      skills: "JavaScript, HTML",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2023",
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      skills: "Java, Spring Boot",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2024",
    },
    {
      id: 3,
      firstName: "Alice",
      lastName: "Johnson",
      skills: "Python, Django",
      profilePic: "placeholder.png",
      resume: "resume-link.pdf",
      passingYear: "2022",
    },
    // Add more students as needed
  ]);

  const [searchSkill, setSearchSkill] = useState("");  
  const [filteredStudents, setFilteredStudents] = useState(students);  

  const searchCandidates = () => {
    if (searchSkill.trim() === "") {
      setFilteredStudents(students);
    } else {
      const searchSkillsArray = searchSkill.toLowerCase().split(",").map(skill => skill.trim());
      const matches = students.filter((student) =>
        searchSkillsArray.every(skill =>
          student.skills.toLowerCase().split(",").map(s => s.trim()).includes(skill)
        )
      );
      setFilteredStudents(matches);  
    }
  };

  const handleSelectStudent = (studentId) => {
    alert(`Student with ID ${studentId} has been selected! A message is sent to their dashboard.`);
  };

  return (
    <div className="section container mt-4">
      <h2>Find the Matches Candidate </h2>

      {/* Candidate Search */}
      <div className="candidate-search mb-4">
        <div className="input-group">
          <input
            type="text"
            id="searchSkill"
            className="form-control"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            placeholder="Search by skill (comma separated)"
          />
          <button className="btn btn-primary" onClick={searchCandidates}>Search</button>
        </div>
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
                <td>
                  <button className="btn btn-success" onClick={() => handleSelectStudent(student.id)}>Select</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No matching students found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewStudents;
