// File: frontend/src/App.jsx

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { initPi, loginWithPi } from "./pi";
import { UserProvider } from "./context/UserContext";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GameLobbyPage from './pages/GameLobbyPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ClickerGamePage from './pages/ClickerGame/ClickerGamePage';
import QuizPage from './pages/QuizGame/QuizPage';

import Layout from "./components/Layout";

const BACKEND_URL = "http://localhost:5001";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sdkReady, setSdkReady] = useState(false); // New state to track SDK readiness
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://sdk.minepi.com/pi-sdk.js";
    script.async = true;
    script.onload = () => {
      initPi(() => setSdkReady(true)); // Initialize Pi and set sdkReady to true
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const handleLogin = async () => {
    if (!sdkReady) {
      setError("Pi SDK is not ready yet. Please wait a moment.");
      return;
    }
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
      setError(err.message || "Login failed. Please try again.");
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
    <UserProvider user={user}>
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <LoginPage
                handleLogin={handleLogin}
                isLoading={isLoading}
                error={error}
                sdkReady={sdkReady} // Pass the sdkReady state down
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
                <HomePage handleLogout={handleLogout} />
              </Layout>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/games"
          element={user ? <Layout><GameLobbyPage /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/game/clicker"
          element={user ? <Layout><ClickerGamePage /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/game/quiz"
          element={user ? <Layout><QuizPage /></Layout> : <Navigate to="/" />}
        />
        <Route
          path="/leaderboard"
          element={user ? <Layout><LeaderboardPage /></Layout> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </UserProvider>
  );
}