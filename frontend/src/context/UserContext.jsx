// File: frontend/src/context/UserContext.jsx

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ user, children }) => {
  const [userData, setUserData] = useState(null);
  const [userGameData, setUserGameData] = useState({});
  const [loading, setLoading] = useState(true);

  // We wrap this in useCallback to prevent it from being re-created unnecessarily
  const fetchUserData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('id_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const [userRes, gameDataRes] = await Promise.all([
        fetch('http://localhost:5001/api/users/me', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('http://localhost:5001/api/users/me/game-data', { headers: { Authorization: `Bearer ${token}` } }),
      ]);

      if (!userRes.ok || !gameDataRes.ok) {
        throw new Error('Failed to fetch user data');
      }

      const profileData = await userRes.json();
      const highScoresData = await gameDataRes.json();

      setUserData(profileData);
      setUserGameData(highScoresData);

    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetchUserData();
  }, [fetchUserData]);

  // We now provide the fetchUserData function so other components can call it to refetch.
  const value = { userData, setUserData, userGameData, setUserGameData, loading, refetchUserData: fetchUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};