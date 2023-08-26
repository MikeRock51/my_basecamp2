import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FaTrash, FaEdit, FaCommentAlt } from "react-icons/fa";
import axios from "axios";

function Thread(props) {
  const [newMessage, setNewMessage] = useState("");
  const [editedTopic, setEditedTopic] = useState(props.topic);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");

  function handleInputChange(e) {
    setNewMessage(e.target.value);
  }

  async function sendMessage() {
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        sender: props.user,
        message: newMessage,
        threadId: props.id,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/messages",
          newMessageObj
        );
        props.messages.push(response.data);
      } catch (error) {
        setError(error.response?.data?.Error || "Message not sent");
      }
      setNewMessage("");
      setError("");
    }
  }

  async function handleSave() {
    if (editedTopic.trim() !== "") {
      const editData = {
        topic: editedTopic,
      };
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/threads/${props.id}`,
          editData
        );
        sessionStorage.currentThread = JSON.stringify(response.data);
      } catch (error) {
        console.log(error.response?.data?.Error);
        setError(error.response?.data?.Error);
      }
    }

    setIsEditing(false); // Exit edit mode
  }

  return (
    <Card className="my-3">
      <Card.Header className="bg-primary-subtle d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <FaCommentAlt className="me-2 text-primary" />
          {isEditing ? (
            <Form.Control
              type="text"
              value={editedTopic}
              onChange={(e) => setEditedTopic(e.target.value)}
            />
          ) : (
            <h6 className="mb-0">{editedTopic}</h6>
          )}
        </div>
        <div>
          {isEditing ? (
            <Button variant="link" className="p-0" onClick={handleSave}>
              Save
            </Button>
          ) : (
            <>
              <Button
                variant="link"
                className="p-0"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                <FaEdit className="text-muted me-2" />
              </Button>
              <Button
                variant="link"
                className="p-0"
                onClick={props.deleteThread}
              >
                <FaTrash className="text-muted" />
              </Button>
            </>
          )}
        </div>
      </Card.Header>
      <Card.Body className="thread-chat">
        <div className="message-list text-start">
          {props.messages.map((message, index) => (
            <div key={index}>
              <div className="message-header d-flex">
                <div className="message-sender text-primary-emphasis">
                  <FaCommentAlt className="me-2" />
                  {message.sender}
                </div>
                {message.sender === props.user && (
                  <div className="message-actions text-muted ms-auto">
                    <FaEdit className="me-2 ms-auto" />
                    <FaTrash />
                  </div>
                )}
              </div>
              <p>{message.message}</p>
              {error && <Alert variant="error">{error}</Alert>}
            </div>
          ))}
        </div>
      </Card.Body>
      <Card.Footer className="bg-primary-subtle">
        <Form
          className="d-flex align-items-center message-input"
          onSubmit={(e) => e.preventDefault()}
        >
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
      </Card.Footer>
    </Card>
  );
}

export default Thread;
