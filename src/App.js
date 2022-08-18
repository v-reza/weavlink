import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import useAuth from "./hooks/useAuth";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home/Home";
import Layout from "./Theme/Layout";
import { Navigate } from "react-router-dom";
import Register from "./pages/Auth/Register";
import RegisterCompany from "./pages/Auth/Company/Register";
import Navbar from "./components/Navbar/Navbar";
import GoogleSetPassword from "./pages/Auth/GoogleSetPassword";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Notfound from "./pages/Notfound/404";
import LandingPage from "./pages/LandingPage/LandingPage";
import Job from "./pages/Job/Job";
import Loading from "./components/custom/Loading/Loading";
import JobRecommended from "./pages/Job/JobRecommended";
import Example from "./Example";

function App() {
  const { isAuthenticated, isGoogleSetPassword, isNewCompany } = useAuth();
  const [isNotfound, setIsNotfound] = useState(false);
  console.log(isNewCompany);

  return (
    <>
      <Router>
        <Layout>
          {isAuthenticated && !isNewCompany && <Navbar />}
          <Loading />
          <Routes>
            <Route
              path="/"
              element={isAuthenticated ? <Home /> : <LandingPage />}
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
              path="/is-new-company"
              element={
                isNewCompany ? <RegisterCompany /> : <Navigate to="/" replace />
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
            <Route
              path="/job"
              element={isAuthenticated ? <Job /> : <Navigate to="/" replace />}
            />
            <Route
              path="/job/collections/recommended/:id"
              element={
                isAuthenticated ? (
                  <JobRecommended />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path="/404"
              element={<Notfound setIsNotfound={setIsNotfound} />}
            />
            <Route path="/comps" element={<Example />} />
            <Route
              path="*"
              element={<Notfound setIsNotfound={setIsNotfound} />}
            />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
