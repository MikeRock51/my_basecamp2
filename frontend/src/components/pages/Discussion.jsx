import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

function DiscussionPage() {
  const { projectId } = useParams();
  const [newDiscussion, setNewDiscussion] = useState("");

  const handleInputChange = (e) => {
    setNewDiscussion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle submitting the new discussion
    console.log("New discussion:", newDiscussion);
    // Clear the input field
    setNewDiscussion("");
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">Discussion for Project {projectId}</h2>

      <Card className="mb-3">
        <Card.Body>
          <h5>Project Details</h5>
          {/* TODO: Display project details here */}
        </Card.Body>
      </Card>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="newDiscussion">
          <Form.Label>Start a New Discussion</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={newDiscussion}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Post Discussion
        </Button>
      </Form>
    </Container>
  );
}

export default DiscussionPage;
