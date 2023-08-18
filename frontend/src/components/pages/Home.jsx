import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Container className="py-5 text-center">
      <img
        src="data:image/jpeg;base64,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"
        alt="logo"
        className="mb-3"
      />
      <h1 className="display-1 fw-semibold text-primary">COLLABORATE</h1>
      <p>A project management tool for developers</p>
      <div className="my-5">
        <Link to="/sign-up">
          <Button variant="primary" className="mx-3">
            Sign Up
          </Button>
        </Link>
        <Link to="/sign-in">
          <Button variant="primary" className="mx-3">
            Log In
          </Button>
        </Link>
      </div>
      <div>
        <h4 className="">
          Welcome to Basecamp! Discover a new level of collaboration and
          organization Basecamp.
        </h4>
        <p className="text-start">
          Whether you're managing a team, planning a project, or coordinating
          tasks, our platform empowers you to streamline your efforts and
          achieve your goals, all in one place. Key Features: 🚀 Effortless
          Communication: Say goodbye to cluttered inboxes. Communicate
          seamlessly with your team through real-time messaging, discussions,
          and direct messages. Stay in the loop and keep everyone on
        </p>
        <h4>Contributors</h4>
        <ul className="text-start fw-bold">
          <li>
            Michael Adebayo ={'>'} <a href="https://github.com/MikeRock51">Github</a>,{" "}
            <a href="https://twitter.com/Mike_Rock1">Twitter</a>,{" "}
            <a href="https://www.linkedin.com/in/michael-adebayo-637507251/">
              LinkedIn
            </a>{" "}
            <a href="mailto:mikerockmusic51@gmail.com">Email</a>
          </li>
          <li>
            Sunkanmi Adebiyi ={'>'}{" "}
            <a href="https://github.com/Digiprog1">Github</a>,{" "}
            <a href="https://twitter.com/SunkanmiADS">Twitter</a>,
            <a href="https://www.linkedin.com/in/sunkanmi-adebiyi-708a8727/">
              LinkedIn, <a href="mailto:adebiyiolasunkanmi@gmail.com">Email</a>
            </a>
          </li>
        </ul>
      </div>
    </Container>
  );
}

export default Home;
