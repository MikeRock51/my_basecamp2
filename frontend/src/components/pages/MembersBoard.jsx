import React, { useEffect, useState } from "react";
import { Container, Alert, Form, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
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

function MembersBoard(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const projectData = location.state.projectData;
    const [error, setError] = useState("");    
  
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
                <p className="mb-0 text-warning">Members</p>
                {projectData.members.map((member) => {
                  return (
                    <p className="mb-0 text-secondary fst-italic"><FaUser className="text-primary me-2" />{member}</p>
                  );
                })}
              </Card.Body>
            </Card>
  
          </div>
          <div className="ms-5 ">
            <Button
              variant="primary"
              type="submit"
              className="mb-2 w-100 d-flex align-items-center mt-auto px-3"
              onClick={() => {
                navigate(`/projects/${projectData.id}/discussion`, {
                state: {
                  projectData: projectData,
                }
              });
              }}
            >
              <FaProjectDiagram className="me-2" />
              Project
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="mb-2 w-100 active d-flex align-items-center mt-auto px-3"
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
  
  export default MembersBoard;
  