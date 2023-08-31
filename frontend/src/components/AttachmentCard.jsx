import axios from "axios";
import React from "react";
import { Card, Button } from "react-bootstrap";
import {
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaDownload,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import useFetch from "./utils/useFetch";

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function renderFileTypeIcon(type) {
  const images = ["png", "jpg"];
  if (type === "pdf") {
    return <FaFilePdf className="text-danger" />;
  } else if (images.includes(type)) {
    return <FaFileImage className="text-primary"/>;
  } else {
    return <FaFile className="text-secondary"/>;
  }
}

const AttachmentCard = (props) => {
  const attachment = props.attachment;
  const type = getFileExtension(attachment.name);
  const currentUser =
    sessionStorage.userData && JSON.parse(sessionStorage.userData);
  const {data: author} = useFetch(`/users/${attachment.authorId}`);

  function downloadAttachment() {
    try {
      window.location.href = `http://0.0.0.0:8000/api/v1/attachments/${attachment.id}/file`;
      props.setSuccess(`File ${attachment.name} downloaded successfully`);
      props.setError("");
    } catch (error) {
      console.log(error);
      props.setError("Error downloading file");
      props.setSuccess("");
    }
  }

  async function deleteAttachment() {
    try {
      await axios.delete(
        `http://0.0.0.0:8000/api/v1/attachments/${attachment.id}`
      );
      props.setSuccess(`File ${attachment.name} deleted successfully`);
      props.setError("");
      props.setRender(!props.render);
    } catch (error) {
      console.log(error);
      props.setError("File deletion failed");
      props.setSuccess("");
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="me-3 d-flex text-start">
            {renderFileTypeIcon(type)}
            <div>
            <h6 className="mb-0 ms-2">{attachment.name}</h6>
            <p><FaUser/> {author && author.email}</p>
          </div>
          </div>
        </div>
        <div className="d-flex mt-3">
          {props.projectData.authorId === currentUser.id ||
            (attachment.authorId === currentUser.id && (
              <Button
                variant="danger"
                className="text-start me-auto"
                onClick={() => {
                  deleteAttachment();
                }}
              >
                <FaTrash />
              </Button>
            ))}
          <Button
            variant="primary"
            download={attachment.name}
            className="text-start"
            onClick={() => {
              downloadAttachment();
            }}
          >
            <FaDownload />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AttachmentCard;
