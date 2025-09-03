// File: frontend/src/pages/LoginPage.jsx

import React from "react";
import AnimatedShapes from "../components/AnimatedShapes";

export default function LoginPage({ handleLogin, isLoading, error }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4">
      <AnimatedShapes />
      <div className="relative w-full max-w-md p-px rounded-2xl bg-gradient-to-r from-glow-purple-from to-glow-purple-to">
        <div className="relative bg-brand-dark rounded-[15px] p-8 space-y-8 text-center">
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
              className="w-full px-6 py-3 font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
            >
              {isLoading ? "Connecting..." : "Login with Pi"}
            </button>

            {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
        </div>
      </div>
    </div>
  );
}