import React, { useState } from "react";

const Calendar = () => {
  const [events, setEvents] = useState([
    { title: "Team Meeting", date: "2024-12-28", time: "10:00 AM" },
    { title: "Project Deadline", date: "2024-12-30", time: "5:00 PM" },
  ]);

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendar / Events</h2>
      <ul className="events-list">
        {events.map((event, index) => (
          <li key={index} className="event-item hover-effect">
            <strong>{event.title}</strong> - {event.date} at {event.time}
          </li>
        ))}
      </ul>
      <p className="integration-info">
        *Integration with Google Calendar or Outlook coming soon.
      </p>
    </div>
  );
};

export default Calendar;
