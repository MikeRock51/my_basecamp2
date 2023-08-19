import React, { useState } from "react";
import { Card, Form, Button, Collapse } from "react-bootstrap";

function Thread(props) {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  return (
    <Card className="mb-3">
      <Card.Header>
        <h5 className="mb-0">Thread Topic</h5>
        <Button
          variant="link"
          onClick={handleChatToggle}
          className="p-0"
          aria-expanded={isChatOpen}
        >
          {isChatOpen ? "Hide Chat" : "Show Chat"}
        </Button>
      </Card.Header>
      <Collapse in={isChatOpen}>
        <Card.Body className="thread-chat">
          <div className="message-list">
            {messages.map((message, index) => (
              <div key={index} className="message">
                <strong>Sender:</strong> User
                <p>{message}</p>
              </div>
            ))}
          </div>
          <Form className="d-flex align-items-center message-input" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
              className="flex-grow-1 me-2"
            />
            <Button variant="primary" onClick={sendMessage}>
              Send
            </Button>
          </Form>
        </Card.Body>
      </Collapse>
    </Card>
  );
}

export default Thread;
