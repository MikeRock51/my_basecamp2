import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setPending(true);
    try {
      const userData = await axios.post(
        "http://127.0.0.1:8000/api/v1/users/auth",
        formData
      );
      sessionStorage.userData = JSON.stringify(userData.data);
      navigate("/projects/dashboard", {
        state: {
          prev: location.pathname,
        },
      });
      setPending(false);
    } catch (err) {
      const error = err.response;
      if (error.status === 404) {
        setError("User does not exist");
      } else {
        setError(error.data?.Error || "An error occurred");
      }
      setPending(false);
    }
  }

  return (
    <Container className="p-5">
      <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-primary">Sign In</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {location.state && location.state.prev && !pending && (
          <Alert variant="success">Account created successfully</Alert>
        )}
        {pending && <Alert variant="info">Signing you in...</Alert>}
        <Form.Group className="mb-3 text-start" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Button className="w-50" variant="primary" type="submit">
          Sign In
        </Button>
      </Form>
      <span className="mt-3">
        Don't have an account <Link to="/sign-up">Sign up</Link>
      </span>
    </Container>
  );
}

export default SignIn;
