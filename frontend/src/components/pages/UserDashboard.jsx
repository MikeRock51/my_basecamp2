import React, { useState, useEffect } from "react";
import { Container, Nav, Navbar, Tab, Row, Col } from "react-bootstrap";
import ProjectCard from "../ProjectCard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserDashboard() {
  const [userProjects, setUserProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const currentUser = JSON.parse(sessionStorage.userData);

  async function fetchProjects() {
    try {
      const createdByMe = await axios.get(
        `http://127.0.0.1:8000/api/v1/users/projects/${currentUser.id}`
      );
      const sharedWithMe = await axios.get(
        `http://127.0.0.1:8000/api/v1/users/projects/shared/${currentUser.email}`
      );
      setUserProjects(createdByMe.data);
      setSharedProjects(sharedWithMe.data);
      setAllProjects([...createdByMe.data, ...sharedWithMe.data]);
    } catch (err) {
      console.log("An error occurred while fetching projects");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Container fluid>
      <Navbar className="m-0 p-3" bg="primary-subtle" expand="lg">
        <Navbar.Brand className="px-4">Project Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="my-1">
          <Nav className="ml-auto ms-auto pe-4">
            <Nav.Link
              onClick={() => {
                navigate("/projects/new");
              }}
            >
              Add Project
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate(`/users/edit/${currentUser.id}`, {
                  state: { userData: currentUser },
                });
              }}
            >
              Edit Profile
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                sessionStorage.clear();
                navigate("/sign-in");
              }}
            >
              Log Out
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Tab.Container id="dashboard-tabs" defaultActiveKey="allProjects">
        <Row className="mt-4">
          <Col md={2}>
            <Nav variant="pills" className="flex-column mb-3">
              <Nav.Item>
                <Nav.Link eventKey="allProjects">All Projects</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="createdByMe">Created by Me</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="sharedWithMe">Shared with Me</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col md={10}>
            <Tab.Content>
              <Tab.Pane eventKey="allProjects">
                {allProjects &&
                  allProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      author={project.author}
                      id={project.id}
                      members={project.members.map((member) => member.email)}
                      admin={
                        project.creatorId === currentUser.id ||
                        project.members.some((member) => {
                          return (
                            member.email === currentUser.email && member.isAdmin
                          );
                        })
                      }
                    />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="createdByMe">
                {userProjects &&
                  userProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      author={project.author}
                      members={project.members.map((member) => member.email)}
                      admin={true}
                      id={project.id}
                    />
                  ))}
              </Tab.Pane>
              <Tab.Pane eventKey="sharedWithMe">
                {sharedProjects &&
                  sharedProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      name={project.name}
                      description={project.description}
                      author={project.author}
                      members={project.members.map((member) => member.email)}
                      admin={project.members.map((member) => member.isAdmin)[0]}
                      id={project.id}
                    />
                  ))}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default UserDashboard;
