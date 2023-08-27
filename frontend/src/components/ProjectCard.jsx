import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaComments } from "react-icons/fa";

function ProjectCard(props) {
  const navigate = useNavigate();

  return (
    <Card className="project-card mb-3">
      <div className="project-card-header">
        <h5 className="project-title">{props.name}</h5>
        <p className="project-author">
          <strong>Author:</strong> {props.author}
        </p>
      </div>
      <Card.Body>
        <p className="project-description">{props.description}</p>
        {props.members.length > 0 && (
          <p className="project-members">
            <strong className="text-primary">Members:</strong>{" "}
            {props.members.join(", ")}
          </p>
        )}
        <div className="d-flex justify-content-between align-items-center">
          {props.admin && (
            <button
              className="btn btn-link"
              onClick={() => {
                navigate(`/projects/edit/${props.id}`, {
                  state: { projectData: props },
                });
              }}
            >
              <FaEdit size={20} className="edit-icon" />
            </button>
          )}
          <button
            className="btn btn-link"
            onClick={() => {
              navigate(`/projects/${props.id}/discussion`, {
                state: { projectData: props },
              });
            }}
          >
            <FaComments size={20} className="thread-icon" />
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
