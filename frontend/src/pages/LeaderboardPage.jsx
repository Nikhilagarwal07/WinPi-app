// File: frontend/src/pages/LeaderboardPage.jsx

import React, { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filter, setFilter] = useState('all-time'); // 'all-time' or 'weekly'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:5001/api/leaderboard/${filter}`);
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard data.');
        }
        const data = await response.json();
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [filter]); // Re-fetch when the filter changes

  const getMedal = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return rank + 1;
  };

  return (
    <div className="p-4 pb-24">
      <PageHeader title="Leaderboard" subtitle={`Top players of the ${filter === 'weekly' ? 'week' : 'all time'}`} />

      <div className="flex justify-center mb-6 bg-brand-card/50 p-1 rounded-lg">
        <button
          onClick={() => setFilter('all-time')}
          className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors ${filter === 'all-time' ? 'bg-brand-primary text-white' : 'text-brand-subtext'}`}
        >
          All-Time
        </button>
        <button
          onClick={() => setFilter('weekly')}
          className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors ${filter === 'weekly' ? 'bg-brand-primary text-white' : 'text-brand-subtext'}`}
        >
          Weekly
        </button>
      </div>

      <main className="space-y-3">
        {loading && <p className="text-center text-brand-subtext">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {!loading && leaderboard.map((player, index) => (
          <div key={player.username} className="flex items-center bg-brand-card p-3 rounded-lg border border-white/10">
            <div className="w-10 text-center text-lg font-bold text-white">{getMedal(index)}</div>
            <div className="flex-1 ml-4">
              <p className="font-semibold text-white">{player.username}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-brand-secondary">{player.xp.toLocaleString()} XP</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}