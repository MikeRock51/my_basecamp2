import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function Discussion() {
  const location = useLocation();
  const [newDiscussion, setNewDiscussion] = useState("");
  const projectData = location.state.projectData;

  const handleInputChange = (e) => {
    setNewDiscussion(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    
  };

  function createNewDiscussion(e) {
    e.preventDefault();
    // TODO: Handle submitting the new discussion
    console.log("New discussion:", newDiscussion);
    // Clear the input field
    setNewDiscussion("");
  }

  return (
    <Container className="">
      <h2 className="text-primary">{projectData.name}</h2>
      <p className="mb-4 fst-italic">Created by {projectData.author}</p>

      <Card className="mb-3 text-start w-75">
        <Card.Body>
          <h6>{projectData.description}</h6>
          <p className="mb-0">Members:</p>
          {projectData.members.map((member) => {
            return <p className="mb-0 text-secondary fst-italic">{member}</p>
          })}
        </Card.Body>
      </Card>

      <Form onSubmit={createNewDiscussion}>
        <Form.Group controlId="newDiscussion" className="w-50">
          <Form.Label>Start New Discussion</Form.Label>
          <Form.Control
            as="input"
            rows={4}
            value={newDiscussion}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Start Discussion
        </Button>
      </Form>
    </Container>
  );
}

export default Discussion;
