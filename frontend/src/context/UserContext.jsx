// // File: frontend/src/context/UserContext.jsx

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ user, children }) => {
  const [userData, setUserData] = useState(null);
  const [userGameData, setUserGameData] = useState({});
  const [inventory, setInventory] = useState([]); // New state for inventory
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    const token = localStorage.getItem("id_token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const [userRes, gameDataRes, inventoryRes] = await Promise.all([
        fetch("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5001/api/users/me/game-data", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("http://localhost:5001/api/users/me/inventory", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (!userRes.ok || !gameDataRes.ok || !inventoryRes.ok) {
        throw new Error("Failed to fetch user data");
      }

      const profileData = await userRes.json();
      const highScoresData = await gameDataRes.json();
      const inventoryData = await inventoryRes.json();

      setUserData(profileData);
      setUserGameData(highScoresData);
      setInventory(inventoryData);
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

  const value = {
    userData,
    setUserData,
    userGameData,
    setUserGameData,
    inventory,
    setInventory,
    loading,
    refetchUserData: fetchUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
