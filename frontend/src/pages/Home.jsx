// File: frontend/src/pages/Home.jsx

import React, { useState, useEffect } from "react";
import GlassCard from "../components/GlassCard";
import StatCard from "../components/StatCard";
import QuickActionButton from "../components/QuickActionButton";

const Header = ({ username }) => (
  <header className="p-4 flex items-center justify-between">
    <div>
      <h1 className="text-xl font-bold text-white">Welcome Back,</h1>
      <p className="text-lg text-brand-primary font-semibold -mt-1">
        {username}!
      </p>
    </div>
    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
      {username.charAt(0).toUpperCase()}
    </div>
    <button
      onClick={handleLogout}
      className="text-brand-subtext hover:text-white transition-colors"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    </button>
  </header>
);

export default function Home({ user }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("id_token");
      if (!token) {
        setLoading(false);
        setUserData({
          username: user.username,
          xp: 0,
          gems: 100,
          loginStreak: 1,
        });
        return;
      }

      try {
        const response = await fetch("http://localhost:5001/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        setUserData({
          username: user.username,
          xp: 0,
          gems: 100,
          loginStreak: 1,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.username]);

  const XpIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  );

  const StreakIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );

  const PlayIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Could not load user data.</p>
      </div>
    );
  }

  return (
    <>
      <Header username={userData.username} handleLogout={handleLogout} />
      <main className="p-4 space-y-6 pb-24">
        {/* <section className="flex gap-4">
          <StatCard
            label="Total XP"
            value={userData.xp.toLocaleString()}
            subValue={`💎 ${userData.gems.toLocaleString()}`}
            icon={<XpIcon />}
            gradient="linear-gradient(135deg, rgba(34,197,94,0.35), rgba(16,185,129,0.25), rgba(28, 27, 28, 0.18))"
          />
          <StatCard
            label="Login Streak"
            value={`${userData.loginStreak} Days`}
            icon={<StreakIcon />}
            gradient="linear-gradient(135deg, rgba(240,112,7,0.35), rgba(246,222,40,0.25), rgba(19, 19, 19, 0.18))"
          />
        </section> */}
        <section className="flex gap-4">
          <StatCard
            label="Total XP"
            value={userData.xp.toLocaleString()}
            subValue={`💎 ${userData.gems.toLocaleString()}`}
            icon={<XpIcon />}
            gradient="radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0.05) 100%)"
            borderColor="rgba(34,197,94,0.5)" // Neon green
          />
          <StatCard
            label="Login Streak"
            value={`${userData.loginStreak} Days`}
            icon={<StreakIcon />}
            gradient="radial-gradient(circle, rgba(240,112,7,0.15) 0%, rgba(0,0,0,0.05) 100%)"
            borderColor="rgba(240,112,7,0.5)" // Neon orange
          />
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="flex justify-around">
            {/* <QuickActionButton
             label="Play Now"
             icon={<PlayIcon />}
             color="bg-gradient-to-br from-pink-500 via-red-600 to-black"
           />
           <QuickActionButton
             label="Quiz"
             icon="❓"
             color="bg-gradient-to-br from-yellow-400 via-orange-500 to-black"
           />
           <QuickActionButton
             label="Rewards"
             icon="🏆"
             color="bg-gradient-to-br from-purple-500 via-fuchsia-600 to-black"
           /> */}
            <QuickActionButton
              label="Play Now"
              icon={<PlayIcon />}
              gradient="radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(0,0,0,0.12) 100%)"
              borderColor="rgba(236,72,153,1)" // Neon pink
            />
            <QuickActionButton
              label="Quiz"
              icon="❓"
              gradient="radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(0,0,0,0.12) 100%)"
              borderColor="rgba(168,85,247,1)" // Neon purple
            />
            <QuickActionButton
              label="Rewards"
              icon="🏆"
              gradient="radial-gradient(circle, rgba(251,191,36,0.18) 0%, rgba(0,0,0,0.12) 100%)"
              borderColor="rgba(251,191,36,1)" // Neon yellow
            />
          </div>
        </section>

        <GlassCard
          gradient="radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(30,58,138,0.12) 100%)"
          borderColor="rgba(6,182,212,1)"
        >
          <p className="text-white/80">Featured Games will go here!</p>
        </GlassCard>

        <GlassCard
          gradient="radial-gradient(circle, rgba(236,72,153,0.18) 0%, rgba(30,27,28,0.12) 100%)"
          borderColor="rgba(236,72,153,1)"
          height="12rem"
        >
          <p className="text-white/80">Weekly Leaderboard will go here!</p>
        </GlassCard>

        <GlassCard
          gradient="radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(30,27,28,0.12) 100%)"
          borderColor="rgba(20,184,166,1)"
          height="12rem"
        >
          <p className="text-white/80">Daily Challenges will go here!</p>
        </GlassCard>
      </main>
    </>
  );
}
