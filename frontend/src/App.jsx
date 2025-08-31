// File: frontend/src/App.jsx

import React, { useEffect, useState } from "react";
import { initPi, loginWithPi } from "./pi";
import Home from "./pages/Home";

const BACKEND_URL = "http://localhost:5001";

export default function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if there's a token in localStorage on initial load
    const token = localStorage.getItem('id_token');
    if (token) {
      // In a full app, you'd verify this token with the backend
      // and get user data. For now, we'll just re-prompt login.
      // This part will be upgraded when we add more features.
    }
    
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
    try {
      const authResult = await loginWithPi();

      const serverResponse = await fetch(`${BACKEND_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // We only need to send the accessToken now
        body: JSON.stringify({ accessToken: authResult.accessToken }),
      });

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json();
        throw new Error(errorData.message || "Server verification failed.");
      }

      const data = await serverResponse.json();

      if (data.success) {
        // 🔹 Store the JWT in localStorage
        localStorage.setItem('id_token', data.token);
        // Set user state
        setUser(data.user);
      } else {
        throw new Error(data.message || "Backend verification failed.");
      }
    } catch (err) {
      console.error("Login process failed:", err);
      setError("Login failed. Please try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="p-10 rounded-2xl bg-white text-gray-900 shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to WinPi</h1>
          <button
            onClick={handleLogin}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login with Pi
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    );
  }

  return <Home user={user} />;
}