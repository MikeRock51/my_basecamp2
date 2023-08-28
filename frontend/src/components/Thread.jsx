import React, { useState, useRef, useEffect } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { FaTrash, FaEdit, FaCommentAlt } from "react-icons/fa";
import axios from "axios";
import useFetch from "./utils/useFetch";

function Thread(props) {
  const [newMessage, setNewMessage] = useState("");
  const [editedTopic, setEditedTopic] = useState(props.thread.topic);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [editedMessageId, setEditedMessageId] = useState(null);
  const [editedMessage, setEditedMessage] = useState("");
  const messageListRef = useRef(null);
  const currentUser = sessionStorage.userData && JSON.parse(sessionStorage.userData);
  // const [currentThread, setCurrentThread] = useState(
  //   sessionStorage.currentThread && JSON.parse(sessionStorage.currentThread)
  // );

  // const {data, err} = useFetch(`/threads/${props.thread.id}`);

  // useEffect(() => {
  //   data && setCurrentThread(data);
  //   err && setError(err);
  // }, [data, err]);

  async function deleteThread() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/threads/${props.thread.id}`
      );
      const updatedThreads = props.threads && props.threads.filter((thread) => thread.id !== props.thread.id);
      props.setThreads && props.setThreads([...updatedThreads]);
      // console.log(updatedThreads)
      props.setCurrentThread && props.setCurrentThread(null);
      delete sessionStorage.currentThread;
      setError('');
    } catch (error) {
      setError(error.response?.data?.Error);
      console.log(error);
    }
  }

  async function handleDeleteMessage(index, messageID) {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/messages/${props.thread.id}/${messageID}`
      );
      const updatedMessages = props.thread.messages.filter(
        (msg, idx) => idx !== index
      );
      props.setCurrentThread({...props.thread, messages: updatedMessages});
      setError("");
    } catch (error) {
      setError(error.response?.data?.Error);
    }
  }

  function handleEditMessage(id, message) {
    setEditedMessageId(id);
    setEditedMessage(message);
  }

  async function handleSaveEditedMessage(messageID) {
    if (editedMessage.trim() !== "") {
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/messages/${props.thread.id}/${messageID}`,
          { message: editedMessage }
        );
        const updatedThread = props.thread;
        updatedThread.messages[editedMessageId] = response.data;
        props.setCurrentThread(updatedThread);
        sessionStorage.currentThread = JSON.stringify(updatedThread);
        setError('');
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
        threadId: props.thread.id,
      };
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/v1/messages",
          newMessageObj
        );
        props.thread.messages.push(response.data);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "Message not sent");
      }
      setNewMessage("");
    }
  }

  async function handleSave() {
    if (editedTopic.trim() !== "") {
      const editData = {
        topic: editedTopic,
      };
      try {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/v1/threads/${props.thread.id}`,
          editData
        );
        sessionStorage.currentThread = JSON.stringify(response.data);
      } catch (error) {
        console.log(error.response?.data?.Error);
        setError(error.response?.data?.Error);
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

  // console.log(currentUser.id)
  // console.log(props.project.creatorId);

  useEffect(() => {
    scrollToBottom();
  }, [props.thread.messages]);

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
              <h6 className="mb-0">{editedTopic}</h6>
            )}
          </div>
          <div>
            {isEditing ? (
              <Button variant="link" className="p-0" onClick={handleSave}>
                Save
              </Button>
            ) : currentUser.email === props.project.author && (
              <>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <FaEdit className="text-primary-emphasis me-2" />
                </Button>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={deleteThread}
                >
                  <FaTrash className="text-primary-emphasis" />
                </Button>
              </>
            )}
          </div>
        </Card.Header>
        <Card.Body className="thread-chat" ref={messageListRef}>
          <div className="message-list text-start">
            {props.thread && props.thread.messages && props.thread.messages.map((message, index) => (
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
                          onClick={() => handleDeleteMessage(index, message.id)}
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
