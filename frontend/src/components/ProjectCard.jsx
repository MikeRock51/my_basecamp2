import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

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
            <strong className="text-primary">Members:</strong> {props.members.join(", ")}
          </p>
        )}
        {props.admin === true && <button className="d-flex btn btn-link justify-content-between align-items-center">
          <FaEdit
            size={20}
            className="edit-icon"
            onClick={() => {
              navigate(`/projects/edit/${props.id}`, {
                state: { projectData: props },
              });
            }}
          />
        </button>}
      </Card.Body>
    </Card>
  );
}

export default ProjectCard;
