import React, { useState } from "react";
import { Container, Form, Button} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state.userData;

  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }


  async function handleUpdate(e) {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.put(
        `http://13.48.5.194:8000/api/v1/users/${userData.id}`,
        formData
      );
      navigate('/projects/dashboard', {
        state: {
            prev: location.pathname,
            action: "Update"
        }
      });
    } catch (error) {
        console.log(error.response?.data?.Error || "An error occurred!");
    }
  }

  async function handleDelete() {
    try {
    await axios.delete(`http://13.48.5.194:8000/api/v1/users/${userData.id}`)
    console.log(`user ${userData.name} deleted successfully`);
    sessionStorage.clear();
    navigate('/sign-in');
    } catch (error) {
      console.log(error.response?.data?.Error || "An error occurred!!");
    }
  }

  return (
    <Container className="py-5 position-relative">
      <div
        className="position-absolute top-0 end-0 m-3 text-danger"
        style={{ cursor: "pointer" }}
      >
        <FaTrash
          size={20}
          onClick={handleDelete}
        />
        <p>Delete Profile</p>
      </div>
      <h2 className="mb-4 text-primary">Edit Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group className="text-start mb-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Form.Group className="text-start mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
    </Container>
  );
}

export default EditUser;
