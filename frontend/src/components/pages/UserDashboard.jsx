import React, { useState, useEffect } from "react";
import { Container, Nav, Tab, Row, Col, Alert } from "react-bootstrap";
import ProjectCard from "../ProjectCard";
import useFetch from "../utils/useFetch";

function UserDashboard() {
  const [userProjects, setUserProjects] = useState([]);
  const [sharedProjects, setSharedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const currentUser = JSON.parse(sessionStorage.userData);
  const [error, setError] = useState('');

  // async function fetchProjects() {
  //   try {
  //     const createdByMe = await axios.get(
  //       `https://basecamp.mikerock.tech/api/v1/users/projects/${currentUser.id}`
  //     );
  //     const sharedWithMe = await axios.get(
  //       `https://basecamp.mikerock.tech/api/v1/users/projects/shared/${currentUser.email}`
  //     );
  //     setUserProjects(createdByMe.data);
  //     setSharedProjects(sharedWithMe.data);
  //     setAllProjects([...createdByMe.data, ...sharedWithMe.data]);
  //   } catch (err) {
  //     console.log("An error occurred while fetching projects");
  //   }
  // }
  const {data: created, cError} = useFetch(`/users/projects/${currentUser.id}`)
  const {data: shared, sError} = useFetch(`/users/projects/shared/${currentUser.email}`)

  useEffect(() => {
    // fetchProjects();
    cError && setError(cError);
    sError && setError(sError);
    created && setUserProjects(created);
    shared && setSharedProjects(shared);
    setAllProjects([...created, ...shared])
  }, [created, shared, cError, sError]);

  return (
    <Container fluid>
      {error && <Alert variant="danger">{error}</Alert>}
      <Tab.Container id="dashboard-tabs" defaultActiveKey="allProjects">
        <Row className="">
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
                      id={project.id}
                      admin={
                        project.members.some((member) => {
                          return member.email === currentUser.email && member.isAdmin;
                        })
                      }
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
