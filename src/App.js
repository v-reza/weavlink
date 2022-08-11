import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Notification from "./components/custom/Notifications/Notification";
import Sidebar from "./components/Home/Sidebar/Sidebar";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home/Home";
import Job from "./pages/Job/Job";
import Notfound from "./pages/Notfound/404";


function App() {
  const { isAuthenticated } = useAuth();
  const [isNotfound, setIsNotfound] = useState(false);

  return (
    <>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Notification />
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
          <Route
              path="/404"
              element={<Notfound setIsNotfound={setIsNotfound} />}
            />
            <Route
              path="*"
              element={<Notfound setIsNotfound={setIsNotfound} />}
            />
        </Routes>
      </Router>
    </>
  );
}

export default App;
