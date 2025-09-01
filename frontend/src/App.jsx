// File: frontend/src/App.jsx

import React, { useEffect, useState } from "react";
import { initPi, loginWithPi } from "./pi";
import Home from "./pages/Home";
import Layout from "./components/Layout";

const BACKEND_URL = "http://localhost:5001";

const AnimatedShapes = () => (
    <div className="shapes-background">
      <div className="shape square s1" style={{width: 80, height: 80}}></div>
      <div className="shape circle s2" style={{width: 20, height: 20}}></div>
      <div className="shape triangle s3" style={{width: 0, height: 0}}></div>
      <div className="shape cross s4" style={{width: 60, height: 60}}></div>
      <div className="shape circle s5" style={{width: 20, height: 20}}></div>
      <div className="shape square s6" style={{width: 110, height: 110}}></div>
      <div className="shape triangle s7" style={{width: 0, height: 0, borderLeftWidth: 75, borderRightWidth: 75, borderBottomWidth: 150}}></div>
      <div className="shape cross s8" style={{width: 25, height: 25}}></div>
    </div>
);

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        localStorage.setItem('id_token', data.token);
        setUser(data.user);
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
  
  if (!user) {
    return (
      <div className="relative min-h-screen w-full flex items-center justify-center p-4">
        <AnimatedShapes />
        <div className="relative w-full max-w-md p-8 space-y-8 bg-brand-card/80 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl text-center">
          <div>
            <h1 className="text-4xl font-extrabold text-white">
              win<span className="text-brand-primary">Pi</span>
            </h1>
            <p className="mt-2 text-brand-subtext">Welcome Back, Gamer!</p>
          </div>
          <div className="py-4">
            <p className="text-lg text-brand-text">Ready to dominate the leaderboards?</p>
          </div>
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Connecting..." : "Login with Pi"}
          </button>
          {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <Home user={user} />
    </Layout>
  );
}