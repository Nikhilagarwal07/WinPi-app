// pages/LoginPage.jsx
import React from "react";

export default function LoginPage({ onLogin }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="p-10 rounded-2xl bg-white text-gray-900 shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to WinPi</h1>
        <button
          onClick={onLogin}
          className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition"
        >
          Login with Pi
        </button>
      </div>
    </div>
  );
}
