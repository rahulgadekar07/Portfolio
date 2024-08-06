import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/ShowMessages.css';

const ShowMessages = () => {
  const [messages, setMessages] = useState([]);
  const [replyData, setReplyData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [showReplyModal, setShowReplyModal] = useState(false);
  const apiUrl=process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get(`${apiUrl}api/contact`);
      setMessages(response.data);
    };
    fetchMessages();
  }, []);

  const handleReply = (email) => {
    setReplyData({ ...replyData, email });
    setShowReplyModal(true);
  };

  const handleChange = (e) => {
    setReplyData({ ...replyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}api/send-reply`, replyData);
      setShowReplyModal(false);
      setReplyData({ email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  return (
    <div className="show-messages">
      <h2>Contact Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.message}</td>
              <td>
                <button onClick={() => handleReply(msg.email)}>Reply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showReplyModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowReplyModal(false)}>
              &times;
            </span>
            <h2>Reply to Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" value={replyData.email} readOnly />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" value={replyData.subject} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" value={replyData.message} onChange={handleChange}></textarea>
              </div>
              <button type="submit">Send Reply</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMessages;
