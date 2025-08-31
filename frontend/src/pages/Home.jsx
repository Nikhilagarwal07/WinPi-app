// pages/Home.jsx
import React from "react";

export default function Home({ user }) {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* 🔹 Top Navigation Bar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-indigo-700">🎮 WinPi</h1>
        <div className="text-gray-700 font-medium">
          {user.username ? `Hello, ${user.username} 👋` : "Guest"}
        </div>
      </header>

      {/* 🔹 Main Content (currently empty, ready for games/dashboard) */}
      <main className="flex-1 flex items-center justify-center">
        {/* You can add dashboard, games list, wallet etc. here */}
      </main>
    </div>
  );
}
