import React, { useState, useEffect } from "react";
import axios from "axios";

const TaskTracker = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const userId = localStorage.getItem("userId");  // Get userId from localStorage

      if (!userId) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      try {
        // Fetch tasks for the logged-in user
        const response = await axios.get(`http://localhost:5000/api/tasks/employee/${userId}`);
        
        console.log("API Response:", response);  // Log the response for debugging
        setTasks(response.data);  // Set the tasks in state
      } catch (err) {
        console.error("Error fetching tasks:", err);  // Log the error
        setError("Error fetching tasks.");
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchTasks();  // Run the fetch function on component mount
  }, []);  // Empty dependency array so this runs only once when the component mounts

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskTracker;
