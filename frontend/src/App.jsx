// File: frontend/src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { initPi, loginWithPi } from "./pi";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";

const BACKEND_URL = "http://localhost:5001";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkPi = setInterval(() => {
      if (window.Pi) {
        initPi();
        clearInterval(checkPi);
      }
    }, 500);
    return () => clearInterval(checkPi);
  }, []);

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);
    try {
      const authResult = await loginWithPi();
      const serverResponse = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken: authResult.accessToken }),
      });

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json();
        throw new Error(errorData.message || "Server verification failed.");
      }
      const data = await serverResponse.json();
      if (data.success) {
        localStorage.setItem("id_token", data.token);
        setUser(data.user);
        navigate("/home", { replace: true });
      } else {
        throw new Error(data.message || "Backend verification failed.");
      }
    } catch (err) {
      console.error("Login process failed:", err);
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id_token");
    setUser(null);
    navigate("/");
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          !user ? (
            <LoginPage
              handleLogin={handleLogin}
              isLoading={isLoading}
              error={error}
            />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      />
      <Route
        path="/home"
        element={
          user ? (
            <Layout>
              <Home user={user} handleLogout={handleLogout} />
            </Layout>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}