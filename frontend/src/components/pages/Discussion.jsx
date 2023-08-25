import React, { useEffect, useState } from "react";
import { Container, Form, Button, Card, Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";

function Discussion() {
  const location = useLocation();
  const [newDiscussion, setNewDiscussion] = useState("");
  const [threads, setThreads] = useState([]);
  const projectData = location.state.projectData;
  // const [error, setError] = useState("");
  // const [pending, setPending] = useState(false);

  const {data, error} = useFetch(`/projects/${projectData.id}/threads`);
  data && console.log(data);
  error && console.log(error);

  // async function fetchThreads() {
  //   setPending(true);
  //   try {
  //   const response = await axios.get(`http://127.0.0.1:8000/api/v1/projects/${projectData.id}/threads`)
  //   setThreads([...response.data])
  //   } catch (err) {
  //     const error = err.response?.data?.Error;
  //     setError( error|| "An error occurred!");
  //     console.log(error);
  //   }
  //   setPending(false);
  // }

  // useEffect(() => {
  //   fetchThreads();
  //   console.log(threads);
  // }, [])

  const handleInputChange = (e) => {
    setNewDiscussion(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

  function createNewDiscussion(e) {
    e.preventDefault();
    // Create a new thread and add it to the threads array
    const newThread = { content: newDiscussion, replies: [] };
    setThreads([...threads, newThread]);
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
      <Thread />
    </Container>
  );
}

export default Discussion;
