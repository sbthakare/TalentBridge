import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import axios from 'axios';

const API_URL = "https://localhost:7144/api/Messages";

export const getMessages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const sendMessage = async (message) => {
  await axios.post(API_URL, message);
};

const Communication = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
      fetchMessages();
  }, []);

  const fetchMessages = async () => {
      const data = await getMessages();
      setMessages(data);
  };

  const handleSend = async () => {
      if (newMessage.trim()) {
          await sendMessage({ sender: "Client", receiver: "Admin", content: newMessage });
          setNewMessage("");
          fetchMessages();
      }
  };

  return (
    <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f0f5",
      padding: "20px",
    }}
  >
    <div
      className="section"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "800px",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <h5>Message</h5>  <h2>Messenger</h2>
          <div>
              {messages.map((msg, index) => (
                  <p key={index}><b>{msg.sender}:</b> {msg.content}</p>
              ))}
          </div>
          <input 
              type="text" 
              value={newMessage} 
              onChange={(e) => setNewMessage(e.target.value)} 
          />
          <button onClick={handleSend} class="btn btn-primary mt-3">Send</button>
      </div>
    </div>
  </div>
  );
}
export default Communication;
