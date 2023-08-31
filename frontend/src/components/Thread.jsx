import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FaTrash, FaEdit, FaCommentAlt } from "react-icons/fa";
import axios from "axios";

function Thread(props) {
  const [newMessage, setNewMessage] = useState("");
  const [editedTopic, setEditedTopic] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [editedMessageId, setEditedMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const messageListRef = useRef(null);
  const currentUser =
    sessionStorage.userData && JSON.parse(sessionStorage.userData);
  const [currentThread, setCurrentThread] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://0.0.0.0:8000/api/v1/threads/${props.thread.id}`
        );
        setCurrentThread(response.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "An error occurred");
      }
    }
    fetchData();
  }, [props.render, props.thread.id]);

  async function deleteThread() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/threads/${currentThread.id}`
      );
      sessionStorage.currentThread = null;
      props.setThreads && props.setThreads(
        props.threads.filter((thread) => thread.id !== currentThread.id)
      );
      sessionStorage.currentThread = null;
      setCurrentThread(null);
      sessionStorage.currentThread = null;
      props.setRender(!props.render);
      setError("");
    } catch (error) {
      setError(error.response?.data?.Error);
      console.log(error);
    }
  }

  async function handleDeleteMessage(index, messageID) {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/messages/${currentThread.id}/${messageID}`
      );
      const updatedMessages = currentThread.messages.filter(
        (msg, idx) => idx !== index
      );
      const updatedThread = { ...currentThread, messages: updatedMessages };
      sessionStorage.currentThread = JSON.stringify(updatedThread);
      setCurrentThread(updatedThread);
      props.setRender(!props.render);
      setError("");
    } catch (error) {
      setError(error.response?.data?.Error);
    }
    setError("");
  }

  function handleEditMessage(id, message) {
    setEditedMessageId(id);
    setEditedMessage(message);
  }

  async function handleSaveEditedMessage(messageID) {
    if (editedMessage.trim() !== "") {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/messages/${currentThread.id}/${messageID}`,
          { message: editedMessage }
        );
        const updatedThread = currentThread;
        updatedThread.messages[editedMessageId] = response.data;
        sessionStorage.currentThread = JSON.stringify(updatedThread);
        props.setRender(!props.render);
        setError("");
      } catch (error) {
        setError(error.response?.data?.Error);
      }
      setEditedMessageId(null);
      setEditedMessage("");
    }
  }

  function handleInputChange(e) {
    setNewMessage(e.target.value);
  }

  async function sendMessage() {
    scrollToBottom();
    if (newMessage.trim() !== "") {
      const newMessageObj = {
        sender: props.user,
        message: newMessage,
        threadId: currentThread.id,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/messages",
          newMessageObj
        );
        currentThread.messages.push(response.data);
        setCurrentThread({ ...currentThread });
        sessionStorage.currentThread = JSON.stringify(currentThread);
        props.setRender(!props.render);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "Message not sent");
      }
      setNewMessage("");
    }
  }

  async function handleEditTopic() {
    if (editedTopic.trim() !== "") {
      const editData = {
        topic: editedTopic,
      };
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/threads/${currentThread.id}`,
          editData
        );
        sessionStorage.currentThread = JSON.stringify(response.data);
        setCurrentThread(response.data);
        props.setRender(!props.render);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "Please try again");
      }
    }
    setIsEditing(false);
  }

  function scrollToBottom() {
    if (messageListRef.current) {
      const lastMessage = messageListRef.current.lastElementChild;
      if (lastMessage) {
        lastMessage.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [currentThread]);

  return (
    <div className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}

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
              <h6 className="mb-0">{currentThread && currentThread.topic}</h6>
            )}
          </div>
          <div>
            {isEditing ? (
              <Button variant="link" className="p-0" onClick={handleEditTopic}>
                Save
              </Button>
            ) : (
              currentUser.email === props.project.author && (
                <>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => {
                      setEditedTopic(currentThread.topic);
                      setIsEditing(true);
                    }}
                  >
                    <FaEdit className="text-primary-emphasis me-2" />
                  </Button>
                  <Button variant="link" className="p-0" onClick={deleteThread}>
                    <FaTrash className="text-primary-emphasis" />
                  </Button>
                </>
              )
            )}
          </div>
        </Card.Header>
        <Card.Body className="thread-chat">
          <div className="message-list text-start" ref={messageListRef}>
            {currentThread &&
              currentThread.messages
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((message, index) => (
                  <div key={message.id}>
                    <div className="message-header d-flex">
                      <div className="message-sender text-primary">
                        <FaCommentAlt className="me-2" />
                        {message.sender}
                      </div>
                      {message.sender === props.user && (
                        <div className="message-actions ms-auto">
                          <Button variant="link" className="p-0 text-muted">
                            <FaEdit
                              className="me-2 ms-auto"
                              onClick={() =>
                                handleEditMessage(index, message.message)
                              }
                            />
                          </Button>
                          <Button variant="link" className="p-0 text-muted">
                            <FaTrash
                              className="me-2 ms-auto"
                              onClick={() =>
                                handleDeleteMessage(index, message.id)
                              }
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                    {editedMessageId === index ? (
                      <Form.Control
                        type="text"
                        value={editedMessage}
                        onChange={(e) => setEditedMessage(e.target.value)}
                      />
                    ) : (
                      <p>{message.message}</p>
                    )}
                    {editedMessageId === index && (
                      <Button
                        variant="primary"
                        onClick={() => handleSaveEditedMessage(message.id)}
                      >
                        Save
                      </Button>
                    )}
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
              onKeyDown={(e) => {
                e.key === "Enter" && sendMessage();
              }}
              className="flex-grow-1 me-2"
            />
            <Button variant="primary" onClick={sendMessage}>
              Send
            </Button>
          </Form>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Thread;
