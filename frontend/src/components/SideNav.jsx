import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaUsers, FaComments, FaFile } from "react-icons/fa";

function SideNav(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const projectPath = `/projects/${props.projectData.id}/discussion`;
  const membersPath = `/projects/${props.projectData.id}/members`;
  const attachmentPath = `/projects/${props.projectData.id}/attachments`;
  const topicsPath = `/projects/${props.projectData.id}/topics`;

  return (
    <div className="ms-5 ">
      <Button
        variant="primary"
        type="submit"
        className={`mb-2 w-100 d-flex align-items-center mt-auto px-3 ${
          currentPath === projectPath ? "active" : ""
        }`}
        onClick={() => {
          navigate(`/projects/${props.projectData.id}/discussion`, {
            state: {
              projectData: props.projectData,
              threads: props.threads,
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
        className={`mb-2 w-100 d-flex align-items-center mt-auto px-3 ${
          currentPath === membersPath ? "active" : ""
        }`}
        onClick={() => {
          navigate(`/projects/${props.projectData.id}/members`, {
            state: {
              projectData: props.projectData,
              threads: props.threads,
            },
          });
        }}
      >
        <FaUsers className="me-2" />
        Members
      </Button>
      <Button
        variant="primary"
        type="submit"
        className={`mb-2 w-100 d-flex align-items-center mt-auto px-3 ${
          currentPath === topicsPath ? "active" : ""
        }`}
        onClick={() => {
          navigate(`/projects/${props.projectData.id}/topics`, {
            state: {
              projectData: props.projectData,
              threads: props.threads,
            },
          });
        }}
      >
        <FaComments className="me-2" />
        Topics
      </Button>
      <Button
        variant="primary"
        type="submit"
        className={`mb-2 w-100 d-flex align-items-center mt-auto px-3 ${
          currentPath === attachmentPath ? "active" : ""
        }`}
        onClick={() => {
          navigate(`/projects/${props.projectData.id}/attachments`, {
            state: {
              projectData: props.projectData,
              threads: props.threads,
            },
          });
        }}
      >
        <FaFile className="me-2" />
        Attachments
      </Button>
    </div>
  );
}

export default SideNav;
