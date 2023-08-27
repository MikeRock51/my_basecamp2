import React, { useEffect, useState } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaProjectDiagram,
  FaUsers,
  FaComments,
  FaFile,
} from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";
import SideNav from "../SideNav";

function DiscussionsBoard() {
  const location = useLocation();
  const navigate = useNavigate();
  const projectData = location.state.projectData;
  const threads = location.state.threads;
  const [error, setError] = useState("");
  const user = sessionStorage.userData && JSON.parse(sessionStorage.userData);

  
  async function deleteThread() {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/v1/threads/${''}`
      );
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
        {error && <Alert variant="error">{error}</Alert>}
      </div>
      <div className="d-flex">
        <div className="w-75">
          <Card className="mb-3 text-start">
            <Card.Body className="">
              <h6>{projectData.description}</h6>
              <p className="mb-0 text-warning">Members</p>
                {projectData.members.map((member) => {
                  return (
                    <p className="mb-0 text-secondary fst-italic"><FaUser className="text-primary me-2" />{member}</p>
                  );
              })}
            </Card.Body>
          </Card>
          {threads && threads.map((thread) => {
            return <Thread key={thread.id} thread={thread} user={user.email} project={projectData}/>
          })}
        </div>
        <SideNav projectData={projectData} threads={threads} />
      </div>
    </Container>
  );
}

export default DiscussionsBoard;
