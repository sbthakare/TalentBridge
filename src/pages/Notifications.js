import React, { useState } from "react";
import { Button, Form, Alert, Container, Row, Col, ListGroup } from "react-bootstrap";

const NotificationManagement = () => {
  // State for handling notification inputs
  const [notificationType, setNotificationType] = useState("");
  const [message, setMessage] = useState("");
  const [bulkRecipients, setBulkRecipients] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  // Function to handle notification submission
  const handleSendNotification = () => {
    if (message === "" || notificationType === "") {
      setError("Please provide message and select a notification type.");
      return;
    }
    setError("");
    
    const newNotification = {
      id: notifications.length + 1,
      message: message,
      type: notificationType,
      date: new Date().toLocaleString(),
    };
    setNotifications([...notifications, newNotification]);

    // Clear form fields
    setMessage("");
    setNotificationType("");
  };

  // Function to handle sending bulk notifications
  const handleSendBulkNotification = () => {
    if (bulkRecipients === "" || message === "") {
      setError("Please provide message and recipient list.");
      return;
    }
    setError("");
    const recipients = bulkRecipients.split(",");
    const bulkNotifications = recipients.map((recipient, index) => ({
      id: notifications.length + index + 1,
      message: `To ${recipient.trim()}: ${message}`,
      type: notificationType,
      date: new Date().toLocaleString(),
    }));
    
    setNotifications([...notifications, ...bulkNotifications]);
    
    // Clear fields
    setBulkRecipients("");
    setMessage("");
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h3>Notification Management</h3>

          {/* Error alert */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Notification Settings Form */}
          <Form>
            <Form.Group controlId="notificationType">
              <Form.Label>Notification Type</Form.Label>
              <Form.Control
                as="select"
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSendNotification}>Send Notification</Button>
          </Form>

          <hr />

          {/* Bulk Notification Form */}
          <Form>
            <Form.Group controlId="bulkRecipients">
              <Form.Label>Recipients (comma-separated)</Form.Label>
              <Form.Control
                type="text"
                value={bulkRecipients}
                onChange={(e) => setBulkRecipients(e.target.value)}
                placeholder="Enter recipient emails or names"
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSendBulkNotification}>Send Bulk Notification</Button>
          </Form>

          <hr />

          {/* Notifications List */}
          <h4>Recent Notifications</h4>
          <ListGroup>
            {notifications.map((notif) => (
              <ListGroup.Item key={notif.id}>
                <strong>{notif.type}:</strong> {notif.message} <br />
                <small>{notif.date}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationManagement;
