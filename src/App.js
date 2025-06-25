import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDeadline from "./pages/AddDeadline";
import DeadlineDetails from "./pages/DeadlineDetails";
import UserProfile from "./pages/UserProfile";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsAndConditions";
import ErrorPage from "./pages/ErrorPage";
import CookiePolicy from "./pages/CookiePolicy";
import Unsubscribe from "./pages/Unsubscribe";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-deadline"
          element={
            <ProtectedRoute>
              <AddDeadline />
            </ProtectedRoute>
          }
        />
        <Route
          path="/deadline-details/:id"
          element={
            <ProtectedRoute>
              <DeadlineDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
