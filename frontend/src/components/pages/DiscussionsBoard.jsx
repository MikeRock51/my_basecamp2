import React, { useEffect, useState } from "react";
import { Container, Alert, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import Thread from "../Thread";
import SideNav from "../SideNav";

function DiscussionsBoard() {
  const location = useLocation();
  const projectData = location.state.projectData;
  const [threads, setThreads] = useState([]);
  const [error, setError] = useState("");
  const user = sessionStorage.userData && JSON.parse(sessionStorage.userData);
  const [render, setRender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://0.0.0.0:8000/api/v1/projects/${projectData.id}/threads`
        );
        setThreads([...response.data]);
        setError("");
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "An error occurred");
      }
    }
    fetchData();
  }, [render]);

  // function setCurrentThread(updatedThread) {
  //   const threadIndex = threads.findIndex(
  //     (thread) => thread.id === updatedThread.id
  //   );

  //   const updatedThreads = [...threads];
  //   updatedThreads[threadIndex] = updatedThread;

  //   setThreads(updatedThreads);
  // }

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
                  <p key={index} className="mb-0 text-secondary fst-italic">
                    <FaUser className="text-primary me-2" />
                    {member}
                  </p>
                );
              })}
            </Card.Body>
          </Card>
          {threads &&
            threads
            .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((thread) => {
              return (
                <Thread
                  key={thread.id}
                  user={user.email}
                  thread={thread}
                  threads={threads}
                  setThreads={setThreads}
                  project={projectData}
                  render={render}
                  setRender={setRender}
                  // setCurrentThread={setCurrentThread}
                />
              );
            })}
        </div>
        <SideNav projectData={projectData} threads={threads} />
      </div>
    </Container>
  );
}

export default DiscussionsBoard;
