// File: frontend/src/pages/Home.jsx

import React, { useState, useEffect } from "react";

const Header = ({ username }) => (
  <header className="p-4 flex items-center justify-between">
    <div>
      <h1 className="text-xl font-bold text-white">Welcome Back,</h1>
      <p className="text-lg text-brand-primary font-semibold -mt-1">{username}!</p>
    </div>
    <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center font-bold text-white text-lg shadow-md">
      {username.charAt(0).toUpperCase()}
    </div>
  </header>
);

const StatCard = ({ label, value, subValue, icon }) => (
  <div className="bg-brand-card p-4 rounded-xl flex-1 shadow-lg">
    <div className="flex items-center justify-between text-brand-subtext text-sm">
      <span>{label}</span>
      {icon}
    </div>
    <p className="text-2xl font-bold text-white mt-2">{value}</p>
    {subValue && <p className="text-xs text-green-400 font-semibold">{subValue}</p>}
  </div>
);

const QuickActionButton = ({ label, icon, color }) => (
  <div className="flex flex-col items-center space-y-2">
    <button className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg hover:opacity-90 transition-opacity`}>
      {icon}
    </button>
    <span className="text-xs text-brand-subtext font-medium pt-1">{label}</span>
  </div>
);


export default function Home({ user }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('id_token');
      if (!token) {
        setLoading(false);
        // If there's no token, we can use the initial user prop as a fallback
        setUserData({ username: user.username, xp: 0, gems: 100, loginStreak: 1 });
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/users/me', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error(err);
        // If fetch fails, use fallback
        setUserData({ username: user.username, xp: 0, gems: 100, loginStreak: 1 });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.username]);

  const XpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
  const StreakIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>;
  const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>;

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p>Loading Dashboard...</p></div>;
  }

  if (!userData) {
    return <div className="flex justify-center items-center h-screen"><p>Could not load user data.</p></div>;
  }

  return (
    <>
      <Header username={userData.username} />
      
      <main className="p-4 space-y-6 pb-24">
        <section className="flex gap-4">
          <StatCard label="Total XP" value={userData.xp.toLocaleString()} subValue={`💎 ${userData.gems.toLocaleString()}`} icon={<XpIcon />} />
          <StatCard label="Login Streak" value={`${userData.loginStreak} Days`} icon={<StreakIcon />} />
        </section>

        <section>
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="flex justify-around">
                <QuickActionButton label="Play Now" icon={<PlayIcon />} color="bg-brand-primary" />
                <QuickActionButton label="Quiz" icon="❓" color="bg-brand-secondary" />
                <QuickActionButton label="Rewards" icon="🏆" color="bg-brand-accent" />
            </div>
        </section>

        <div className="bg-brand-card p-4 rounded-xl text-center">
            <p className="text-brand-subtext">Featured Games will go here!</p>
        </div>
        <div className="bg-brand-card p-4 rounded-xl text-center h-48">
            <p className="text-brand-subtext">Weekly Leaderboard will go here!</p>
        </div>
        <div className="bg-brand-card p-4 rounded-xl text-center h-48">
            <p className="text-brand-subtext">Daily Challenges will go here!</p>
        </div>
      </main>
    </>
  );
}