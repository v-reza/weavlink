import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Layout from "./Theme/Layout";
import { Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import GoogleSetPassword from "./pages/Auth/GoogleSetPassword";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";

function App() {
  const { isAuthenticated, isGoogleSetPassword } = useAuth();

  return (
    <>
      <Router>
        <Layout>
          {isAuthenticated && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? <Home /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/google-set-password"
              element={
                isGoogleSetPassword ? (
                  <GoogleSetPassword />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/profile/:username"
              element={
                isAuthenticated ? <Profile /> : <Navigate to="/" replace />
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? <Settings /> : <Navigate to="/" replace />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
