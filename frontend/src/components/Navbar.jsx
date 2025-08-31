import React from "react";

export default function Navbar({ user }) {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-primary">Pi App</h1>
      <span className="text-sm text-gray-300">Hi, {user?.username}</span>
    </nav>
  );
}
