// File: frontend/src/pages/ProfilePage.jsx

import React, { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { useUser } from "../context/UserContext";
import { getBorderStyle } from "../utils/borderStyles";

export default function ProfilePage() {
  const { userData, inventory, refetchUserData, loading } = useUser();
  const [storeItems, setStoreItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        setLoadingItems(true);
        const response = await fetch("http://localhost:5001/api/store/items");
        const data = await response.json();
        setStoreItems(data);
      } catch (error) {
        console.error("Failed to fetch store items:", error);
      } finally {
        setLoadingItems(false);
      }
    };
    fetchStoreItems();
  }, []);

  const handleEquipItem = async (itemId, itemType) => {
    if (userData.equippedBorder === itemId) return;
    const token = localStorage.getItem("id_token");
    try {
      await fetch("http://localhost:5001/api/users/me/equip-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId, itemType }),
      });
      await refetchUserData();
    } catch (error) {
      console.error("Error equipping item:", error);
      alert("Failed to equip item.");
    }
  };

  if (loading || loadingItems || !userData) {
    return <p className="text-center p-8 text-white">Loading Profile...</p>;
  }

  const ownedBorders = inventory
    .map((inv) =>
      storeItems.find(
        (item) => item.itemId === inv.itemId && item.type === "border"
      )
    )
    .filter(Boolean);

  const equippedBorderStyle = getBorderStyle(userData.equippedBorder);

  return (
    <div className="p-4 pb-24">
      <PageHeader title={userData.username} subtitle="Your Player Profile" />

      {/* Avatar */}
      <div className="flex justify-center mb-8">
        <div
          className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${equippedBorderStyle}`}
        >
          <div className="w-full h-full rounded-full bg-brand-primary flex items-center justify-center text-white text-5xl font-bold">
            {userData.username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-center mb-8">
        <div>
          <p className="text-2xl font-bold text-white">
            {userData.xp.toLocaleString()}
          </p>
          <p className="text-sm text-brand-subtext">Total XP</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">
            {userData.gems.toLocaleString()}
          </p>
          <p className="text-sm text-brand-subtext">Gems</p>
        </div>
      </div>

      {/* Borders Section */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Your Avatar Borders
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Default Border */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center bg-brand-dark p-1">
              <img
                src="https://placehold.co/128x128/4B5563/FFFFFF?text=Default"
                alt="Default Border"
                className="rounded-full"
              />
            </div>
            <button
              onClick={() => handleEquipItem("border_default", "border")}
              disabled={userData.equippedBorder === "border_default"}
              className="text-xs bg-brand-card px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {userData.equippedBorder === "border_default"
                ? "Equipped"
                : "Equip"}
            </button>
          </div>

          {/* Owned Borders */}
          {ownedBorders.map((item) => (
            <div key={item.itemId} className="text-center">
              <div
                className={`w-20 h-20 rounded-full mx-auto mb-2 flex items-center justify-center ${getBorderStyle(
                  item.itemId
                )}`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="rounded-full"
                />
              </div>
              <button
                onClick={() => handleEquipItem(item.itemId, item.type)}
                disabled={userData.equippedBorder === item.itemId}
                className="text-xs bg-brand-card px-3 py-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {userData.equippedBorder === item.itemId ? "Equipped" : "Equip"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
