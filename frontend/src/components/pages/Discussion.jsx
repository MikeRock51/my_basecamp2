import React, { useEffect, useState } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";

function Discussion(props) {
  const location = useLocation();
  const [newDiscussion, setNewDiscussion] = useState("");
  const projectData = location.state.projectData;
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState("");
  const [currentThread, setCurrentThread] = useState(sessionStorage.currentThread ? JSON.parse(sessionStorage.currentThread) : null);

  const {data, err} = useFetch(`/projects/${projectData.id}/threads`);
  useEffect(() => {
    setThreads(data)
  }, [data]);
  // console.log(threads);
  err && setError(err);

  const handleInputChange = (e) => {
    setNewDiscussion(e.target.value);
  };

  async function createNewDiscussion(e) {
    e.preventDefault();
    const newThreadObj = { 
      topic: newDiscussion,
      projectId: projectData.id,
    };
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/v1/threads', newThreadObj);
      setThreads([...threads, response.data]);
      setCurrentThread(response.data);
      sessionStorage.currentThread = JSON.stringify(response.data);
    } catch(error) {
      setError(error.response?.data?.Error || "Failed to create thread");
    }
    setNewDiscussion("");
  }
  // console.log(current)
  async function deleteThread() {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/v1/threads/${currentThread.id}`);
      setCurrentThread(null);
      delete sessionStorage.currentThread;
    } catch (error) {
      console.log(error.response?.data?.Error);
    }
  }

  return (
    <Container className="">
      {error && <Alert variant="error">{error}</Alert>}
      <h2 className="text-primary">{projectData.name}</h2>
      <p className="mb-4 fst-italic">Created by {projectData.author}</p>
      <Card className="mb-3 text-start w-75">
        <Card.Body>
          <h6>{projectData.description}</h6>
          <p className="mb-0">Members:</p>
          {projectData.members.map((member) => {
            return <p className="mb-0 text-secondary fst-italic">{member}</p>;
          })}
        </Card.Body>
      </Card>
      <Form onSubmit={createNewDiscussion} className="d-flex w-75">
        <Form.Group
          controlId="newDiscussion"
          className="flex-grow-1 me-2 text-start"
        >
          <Form.Label>Start New Discussion</Form.Label>
          <Form.Control
            as="input"
            rows={4}
            value={newDiscussion}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="d-flex align-items-center mt-auto px-3"
        >
          <FaPlus className="me-1" />
          Start Thread
        </Button>
      </Form>{" "}
      {currentThread && <Thread
        topic={currentThread.topic}
        id={currentThread.id}
        messages={currentThread.messages}
        user={JSON.parse(sessionStorage.userData).email}
        deleteThread={deleteThread}
      />}
    </Container>
  );
}

export default Discussion;
