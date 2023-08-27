import React, { useEffect, useState } from "react";
import { Container, Alert, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Switch from "react-switch";
import { FaUser, FaTrash } from "react-icons/fa";
import axios from "axios";
import useFetch from "../utils/useFetch";
import SideNav from "../SideNav";

function MembersBoard(props) {
  const location = useLocation();
  const projectData = location.state.projectData;
  const threads = location.state.threads;
  const [error, setError] = useState("");
  const [members, setMembers] = useState([]);
  const isAuthor =
    JSON.parse(sessionStorage.userData).email === projectData.author;

  const { data, err } = useFetch(`/projects/${projectData.id}/members`);
  useEffect(() => {
    data && setMembers(data);
    err && setError(err);
  }, [data, err]);

  async function toggleAdminStatus(index) {
    const updatedMembers = [...members];
    updatedMembers[index].isAdmin = !updatedMembers[index].isAdmin;
    try {
      await axios.put(
        "http://0.0.0.0:8000/api/v1/members",
        updatedMembers[index]
      );
      setMembers(updatedMembers);
    } catch (error) {
      setError(error.response?.data?.Error || "Member update failed!");
    }
    setError("");
  }

  async function removeMember(member) {
    try {
      await axios.delete("http://0.0.0.0:8000/api/v1/members", {
        data: member,
      });
      setMembers(members.filter((memb) => memb !== member));
    } catch (error) {
      setError(error.response?.data?.Error || "Member remove failed!");
    }
    setError("");
  }

  return (
    <Container className="">
      <div className="">
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
                  <div
                    className="text-secondary mb-3 bg-primary-subtle rounded p-3"
                    key={member.id}
                  >
                    <div className="d-flex">
                      <p className="mb-0 fst-italic">
                        <FaUser className="text-primary me-2" />
                        {member.email}
                      </p>
                      {isAuthor && (
                        <Button
                          variant="link"
                          className="p-0 ms-auto text-danger"
                          onClick={() => {
                            removeMember(member);
                          }}
                        >
                          <FaTrash className="" />
                        </Button>
                      )}
                    </div>
                    {!isAuthor && member.isAdmin && <p>Admin</p>}
                    {isAuthor && (
                      <div className="me-2 d-flex">
                        <label className="me-2 fw-bold">Admin:</label>
                        <div className="mt-1">
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
                    )}
                  </div>
                );
              })}
            </Card.Body>
          </Card>
        </div>
        <SideNav projectData={projectData} threads={threads} />
      </div>
    </Container>
  );
}

export default MembersBoard;
