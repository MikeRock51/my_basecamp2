import React, { useState, useEffect } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import SideNav from "../SideNav";

function Discussion(props) {
  const location = useLocation();
  const [newDiscussion, setNewDiscussion] = useState("");
  const projectData = location.state.projectData;
  const [error, setError] = useState("");
  const [currentThread, setCurrentThread] = useState(
    sessionStorage.currentThread && JSON.parse(sessionStorage.currentThread)
  );
  const [render, setRender] = useState(false);
  

  useEffect(() => {
    setCurrentThread(sessionStorage.currentThread && JSON.parse(sessionStorage.currentThread))
  }, [render]);

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
      setCurrentThread(response.data);
      setError("");
    } catch (error) {
      setError(error.response?.data?.Error || "Failed to create thread");
    }
    setNewDiscussion("");
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
                    <FaUser className="text-primary me-2" />
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
              thread={currentThread}
              setCurrentThread={setCurrentThread}
              project={projectData}
              render={render}
              setRender={setRender}
            />
          )}
        </div>
        <SideNav projectData={projectData} />
      </div>
    </Container>
  );
}

export default Discussion;
