import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDeadline from "./pages/AddDeadline";
import DeadlineDetails from "./pages/DeadlineDetails";
import UserProfile from "./pages/UserProfile";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-deadline" element={<AddDeadline />} />
        <Route path="/deadline-details/:id" element={<DeadlineDetails />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
