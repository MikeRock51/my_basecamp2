import { Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const currentUser =
    sessionStorage.userData && JSON.parse(sessionStorage.userData);

  return (
    <Navbar className="m-0 mb-4 p-3" bg="primary-subtle" expand="lg">
      <Navbar.Brand className="px-4 text-primary-emphasis">
        {currentUser ? (
          <Nav.Link
            onClick={() => {
              navigate("/projects/dashboard");
            }}
          >
            <h4>Project Dashboard</h4>
          </Nav.Link>
        ) : (
          <h4>Basecamp 2.0</h4>
        )}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="my-1">
        <Nav className="ml-auto ms-auto pe-4">
          <Nav.Link
            onClick={() => {
              navigate("/projects/new");
            }}
          >
            Add Project
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              navigate(`/users/edit/${currentUser.id}`, {
                state: { userData: currentUser },
              });
            }}
          >
            Edit Profile
          </Nav.Link>
          <Nav.Link
            onClick={() => {
              sessionStorage.clear();
              navigate("/sign-in");
            }}
          >
            Log Out
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
