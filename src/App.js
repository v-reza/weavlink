import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Home/Sidebar/Sidebar";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Job from "./pages/Job/Job";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? <Home /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? <Register /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/job"
            element={isAuthenticated ? <Job /> : <Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
