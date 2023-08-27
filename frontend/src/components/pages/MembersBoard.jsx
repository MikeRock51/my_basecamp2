import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Card } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Switch from "react-switch";
import {
  FaEdit,
  FaUser,
  FaProjectDiagram,
  FaUsers,
  FaComments,
  FaFile,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import useFetch from "../utils/useFetch";

function MembersBoard(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const projectData = location.state.projectData;
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);

  const { data, err } = useFetch(`/projects/${projectData.id}/members`);
  useEffect(() => {
    data && setMembers(data);
    err && setError(err);
  }, [data, err]);

  async function toggleAdminStatus(index) {
    const updatedMembers = [...members];
    updatedMembers[index].isAdmin = !updatedMembers[index].isAdmin;
    try {
        await axios.put('http://0.0.0.0:8000/api/v1/members',
        updatedMembers[index]);
        setMembers(updatedMembers);
    } catch(error) {
        setError(error.response?.data?.Error || "Member update failed!");
    }
  }

  return (
    <Container className="">
      <div className="w-75">
        <h2 className="text-dark display-5 lh-1">{projectData.name}</h2>
        <p className="mb-4 text-secondary fst-italic">
          <FaUser className="me-2 text-primary" /> {projectData.author}
        </p>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-flex">
        <div className="w-75">
          <Card className="mb-3 text-start">
            <Card.Body className="">
              <h6>{projectData.description}</h6>
              <p className="mb-0 text-warning">Members</p>
              {members.map((member, index) => {
                return (
                  <div className="text-secondary mb-3 bg-primary-subtle rounded p-3" key={member.id}>
                    <div className="d-flex">
                    <p className="mb-0 fst-italic">
                      <FaUser className="text-primary me-2" />
                      {member.email}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 ms-auto text-danger"
                    >
                      <FaTrash className="" />
                    </Button>
                    </div>
                    <div className="me-2">
                    <label className="me-2 fw-bold">Admin:</label>
                      <Switch
                        checked={member.isAdmin}
                        onChange={() => toggleAdminStatus(index)}
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={20}
                        // uncheckedIcon={false}
                        // checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={35}
                        className="react-switch"
                      />
                    </div>
                  </div>
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
                },
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
