// src/components/Admin/AdminCalendar.js
import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeCalendar = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    type: "Meeting", // default type to meeting
  });

  const handleDateClick = (info) => {
    setShowEventForm(true);
    setNewEvent({ ...newEvent, date: info.dateStr });
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.description) {
      alert("Please fill in the event details.");
      return;
    }

    const event = {
      id: Date.now(),
      title: newEvent.title,
      description: newEvent.description,
      start: newEvent.date,
      allDay: true,
      type: newEvent.type,
    };

    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];
    existingEvents.push(event);
    localStorage.setItem("events", JSON.stringify(existingEvents));

    alert("Event added successfully!");
    setShowEventForm(false);
    setNewEvent({ title: "", description: "", date: "", type: "Meeting" });
  };

  return (
    <div className="calendar-container mt-5">
      <h2 className="text-center mb-4">Admin Calendar</h2>
      <div className="calendar card p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          dateClick={handleDateClick}
          events={[]} // Events will be dynamically loaded from localStorage
        />
      </div>

      {showEventForm && (
        <div className="modal d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Event</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEventForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Title:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEvent.title}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, title: e.target.value })
                    }
                    placeholder="Enter event title"
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Description:</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={newEvent.description}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, description: e.target.value })
                    }
                    placeholder="Enter event description"
                  ></textarea>
                </div>
                <div className="form-group mb-3">
                  <label>Event Type:</label>
                  <select
                    className="form-control"
                    value={newEvent.type}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, type: e.target.value })
                    }
                  >
                    <option value="Meeting">Meeting</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEventForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddEvent}
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCalendar;
