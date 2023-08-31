import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AttachmentCard from "../AttachmentCard";
import axios from "axios";
import { Container, Card, Alert } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import SideNav from "../SideNav";

function Attachments() {
  const [attachments, setAttachments] = useState(null);
  const location = useLocation();
  const projectData = location.state.projectData;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchAttachments() {
      try {
        const response = await axios.get(
          `http://0.0.0.0:8000/api/v1/attachments`
        );
        setAttachments(response.data);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.Error || "Error fetching attachments");
      }
    }
    fetchAttachments();
  }, []);

  return (
    <Container className="">
      <div className="">
        <h2 className="text-dark display-5 lh-1">{projectData.name}</h2>
        <p className="mb-4 text-secondary fst-italic">
          <FaUser className="me-2 text-primary" /> {projectData.author}
        </p>
        {error && (
          <Alert variant="danger" dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" dismissible>
            {success}
          </Alert>
        )}
      </div>
      <div className="d-flex">
        <div className="w-75">
          <Card className="mb-3 text-start">
            <Card.Body className="">
              <h6>{projectData.description}</h6>
              <p className="mb-0 text-warning">Members</p>
              {projectData.members.map((member, index) => {
                return (
                  <p className="mb-0 text-secondary fst-italic" key={index}>
                    <FaUser className="text-primary me-2" />
                    {member}
                  </p>
                );
              })}
            </Card.Body>
          </Card>
          {attachments &&
            attachments.map((attachment) => {
              return (
                <AttachmentCard
                  attachment={attachment}
                  key={attachment.id}
                  setSuccess={setSuccess}
                  setError={setError}
                />
              );
            })}
        </div>
        <SideNav projectData={projectData} />
      </div>
    </Container>
  );
}

export default Attachments;
