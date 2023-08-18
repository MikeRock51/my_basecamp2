import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setError("");
    setPending(true);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/v1/users",
        formData
      );
      console.log("Account created successfully");
      setError("");
      setPending(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/sign-in", {
        state: {
          prev: location.pathname,
        },
      });
    } catch (error) {
      setError(error.response?.data?.Error || "An error occurred");
      setPending(false);
    }
  };

  return (
    <Container className="p-5">
      <Form className="w-75 mx-auto" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-primary">Sign Up</h2>

        {error && <Alert variant="danger">{error}</Alert>}
        {pending && <Alert variant="info">Creating your account...</Alert>}

        <Form.Group className="mb-3 text-start" controlId="name">
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
        <Form.Group className="mb-3 text-start" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            style={{ border: "1.5px solid" }}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-50">
          {pending ? "Signing up..." : "Sign Up"}
        </Button>
      </Form>
      <span className="mt-3">
        Already have an account? <Link to="/sign-in">Sign in</Link>
      </span>
    </Container>
  );
}

export default SignUp;
