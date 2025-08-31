// App.js
import React, { useEffect, useState } from "react";
import { initPi, loginWithPi } from "./pi";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);

  // 🔹 Init Pi SDK on load
  useEffect(() => {
    const checkPi = setInterval(() => {
      if (window.Pi) {
        initPi();
        clearInterval(checkPi);
      } else {
        console.log("⏳ Waiting for Pi SDK...");
      }
    }, 500);
    return () => clearInterval(checkPi);
  }, []);

  // 🔹 Handle login
  const handleLogin = async () => {
    try {
      const userData = await loginWithPi();
      setUser(userData);
    } catch (err) {
      alert("Login failed. Check console.");
    }
  };

  // 🔹 If user not logged in → show login page
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
        </div>
      </div>
    );
  }

  // 🔹 If logged in → show Home Page
  return <Home user={user} />;
}
