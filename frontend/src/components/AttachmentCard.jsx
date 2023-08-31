import React from "react";
import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import {
  FaFilePdf,
  FaFileImage,
  FaFile,
  FaDownload,
  FaTrash,
} from "react-icons/fa";
import axios from "axios";

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

function renderFileTypeIcon(type) {
  const images = ["png", "jpg"];
  if (type === "application/pdf") {
    return <FaFilePdf />;
  } else if (images.includes(type)) {
    return <FaFileImage />;
  } else {
    return <FaFile />;
  }
}

const AttachmentCard = (props) => {
  const attachment = props.attachment;
  const type = getFileExtension(attachment.name);

  function downloadAttachment() {
    try {
      window.location.href = `http://0.0.0.0:8000/api/v1/attachments/${attachment.id}/file`;
      props.setSuccess(`File ${attachment.name} downloaded Successfully`);
      props.setError("");
    } catch (error) {
      console.log(error);
      props.setError("Error downloading file");
      props.setSuccess("");
    }
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex align-items-center">
          <div className="me-3 d-flex">
            {renderFileTypeIcon(type)}
            <h6 className="mb-0 ms-2">{attachment.name}</h6>
          </div>
          <div></div>
        </div>
        <div className="d-flex mt-3">
          <Button
            variant="danger"
            className="text-start me-auto"
          >
            <FaTrash />
          </Button>
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
