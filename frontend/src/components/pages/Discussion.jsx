import React, { useEffect, useState } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  FaPlus,
  FaUser,
  FaProjectDiagram,
  FaUsers,
  FaComments,
  FaFile,
} from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";

function Discussion(props) {
  const location = useLocation();
  const [newDiscussion, setNewDiscussion] = useState("");
  const projectData = location.state.projectData;
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState("");
  const [currentThread, setCurrentThread] = useState(
    sessionStorage.currentThread
      ? JSON.parse(sessionStorage.currentThread)
      : null
  );

  const { data, err } = useFetch(`/projects/${projectData.id}/threads`);
  useEffect(() => {
    setThreads(data);
  }, [data]);
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
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/threads",
        newThreadObj
      );
      setThreads([...threads, response.data]);
      setCurrentThread(response.data);
      sessionStorage.currentThread = JSON.stringify(response.data);
    } catch (error) {
      setError(error.response?.data?.Error || "Failed to create thread");
    }
    setNewDiscussion("");
  }
  
  async function deleteThread() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/threads/${currentThread.id}`
      );
      setCurrentThread(null);
      delete sessionStorage.currentThread;
    } catch (error) {
      console.log(error.response?.data?.Error);
    }
  }

  return (
    <Container className="">
      <div className="w-75">
        <h2 className="text-dark display-5 lh-1">{projectData.name}</h2>
        <p className="mb-4 text-secondary fst-italic">
          <FaUser className="me-2 text-primary" /> {projectData.author}
        </p>
        {error && <Alert variant="error">{error}</Alert>}
      </div>
      <div className="d-flex">
        <div className="w-75">
          <Card className="mb-3 text-start">
            <Card.Body className="">
              <h6>{projectData.description}</h6>
              <p className="mb-0">Members:</p>
              {projectData.members.map((member) => {
                return (
                  <p className="mb-0 text-secondary fst-italic">{member}</p>
                );
              })}
            </Card.Body>
          </Card>
          <Form onSubmit={createNewDiscussion} className="d-flex">
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
          {currentThread && (
            <Thread
              topic={currentThread.topic}
              id={currentThread.id}
              messages={currentThread.messages}
              user={JSON.parse(sessionStorage.userData).email}
              deleteThread={deleteThread}
              setCurrentThread={setCurrentThread}
            />
          )}
        </div>
        <div className="ms-5 ">
          <Button
            variant="primary"
            type="submit"
            className="mb-2 w-100 active d-flex align-items-center mt-auto px-3"
          >
            <FaProjectDiagram className="me-2" />
            Project
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="mb-2 w-100 d-flex align-items-center mt-auto px-3"
          >
            <FaUsers className="me-2" />
            Members
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="mb-2 w-100 d-flex align-items-center mt-auto px-3"
          >
            <FaComments className="me-2" />
            Discussions
          </Button>
          <Button
            variant="primary"
            type="submit"
            className="mb-2 w-100 d-flex align-items-center mt-auto px-3"
          >
            <FaFile className="me-2" />
            Attachments
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default Discussion;
