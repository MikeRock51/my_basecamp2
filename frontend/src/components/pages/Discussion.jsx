import React, { useEffect, useState } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";
import SideNav from "../SideNav";

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
      <div className="">
        <h2 className="text-dark display-5 lh-1">{projectData.name}</h2>
        <p className="mb-4 text-secondary fst-italic">
          <FaUser className="me-2 text-primary" /> {projectData.author}
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
      </div>
      <div className="d-flex">
        <div className="w-75">
          <Card className="mb-3 text-start">
            <Card.Body className="">
              <h6>{projectData.description}</h6>
              <p className="mb-0 text-warning">Members</p>
              {projectData.members.map((member, index) => {
                return (
                  <p className="mb-0 text-secondary fst-italic" key={index}>
                    <FaUser className="text-primary me-2"/>
                    {member}
                  </p>
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
              user={JSON.parse(sessionStorage.userData).email}
              deleteThread={deleteThread}
              thread={currentThread}
              setCurrentThread={setCurrentThread}
            />
          )}
        </div>
        <SideNav projectData={projectData} threads={threads} />
      </div>
    </Container>
  );
}

export default Discussion;
