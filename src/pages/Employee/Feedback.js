import React, { useState } from "react";
import './Feedback.css';

const Feedback = () => {
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5.");
      return;
    }

    const feedbackData = {
      category,
      rating: rating,
      comments,
    };

    console.log('Feedback submitted:', feedbackData);
    setFeedbackSubmitted(true);
    resetForm();
  };

  const resetForm = () => {
    setCategory('');
    setRating(0);
    setComments('');
  };

  return (
    <div className="feedback">
      <h2>Feedback</h2>
      {feedbackSubmitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="Technical issue">Technical issue</option>
              <option value="User experience">User experience</option>
              <option value="Project Working">Project Working</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <input
              type="number"
              id="rating"
              className="input-field"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                // Ensure rating stays within 1-5 range
                if (value >= 1 && value <= 5) {
                  setRating(value);
                } else if (value > 5) {
                  setRating(5); // Optional: snap to 5
                  alert("Rating cannot be greater than 5.");
                }
              }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments:</label>
            <textarea
              id="comments"
              className="input-field"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Feedback;
