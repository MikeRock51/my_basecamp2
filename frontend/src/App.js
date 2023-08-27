import {
  BrowserRouter as Router,
  Route,
  Routes,
  // useNavigate,
} from "react-router-dom";
import "./App.css";
import SignIn from "./components/pages/SignIn";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import CreateProject from "./components/pages/CreateProject";
import UserDashboard from "./components/pages/UserDashboard";
import EditProject from "./components/pages/EditProject";
import EditUser from "./components/pages/EditUser";
import Discussion from "./components/pages/Discussion";
import MembersBoard from "./components/pages/MembersBoard";

function App() {
  return (
    <Router>
      <div className="App position-relative pb-5 pt-2 px-2">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/projects/new" element={<CreateProject />} />
          <Route path="/projects/dashboard" element={<UserDashboard />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/projects/edit/:id" element={<EditProject />} />
          <Route path="/projects/:projectId/discussion" element={<Discussion />} />
          <Route path="/projects/:projectId/members" element={<MembersBoard />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
