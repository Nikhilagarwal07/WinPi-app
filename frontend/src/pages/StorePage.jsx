import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useUser } from "../context/UserContext";
import { useModal } from "../context/ModalContext";
import { getFrameImage } from "../utils/borderStyles";

const RewardCard = ({ item }) => {
  const { userData, inventory, refetchUserData } = useUser();
  const { showModal, hideModal } = useModal();
  const [isBuying, setIsBuying] = useState(false);
  // State to handle equipping feedback
  const [isEquipping, setIsEquipping] = useState(false);

  const alreadyOwned = inventory.some((inv) => inv.itemId === item.itemId);
  const isEquipped = userData.equippedBorder === item.itemId;

  const handlePurchase = () => {
    if (alreadyOwned || isBuying) return;
    showModal(
      <div className="text-center">
        <h3 className="text-lg font-bold text-white">Confirm Purchase</h3>
        <p className="text-brand-subtext my-4">
          Buy "{item.name}" for 💎 {item.cost} Gems?
        </p>
        <div className="flex space-x-4">
          <button
            onClick={hideModal}
            className="flex-1 bg-brand-card text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={confirmPurchase}
            className="flex-1 bg-brand-primary text-white px-4 py-2 rounded-lg"
          >
            Confirm
          </button>
        </div>
      </div>
    );
  };

  const confirmPurchase = async () => {
    setIsBuying(true);
    const token = localStorage.getItem("id_token");
    try {
      const response = await fetch(
        "http://localhost:5001/api/store/purchase-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ itemId: item.itemId }),
        }
      );
      const data = await response.json();
      if (data.success) {
        await refetchUserData();
        showModal(
          <div className="text-center">
            <h3 className="text-lg font-bold text-green-400">Success!</h3>
            <p className="text-brand-subtext my-4">
              You purchased "{item.name}"!
            </p>
            <Link
              to="/profile"
              onClick={hideModal}
              className="block bg-brand-primary text-white px-4 py-2 rounded-lg"
            >
              Go to Profile
            </Link>
          </div>
        );
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      showModal(
        <div className="text-center">
          <h3 className="text-lg font-bold text-red-500">Purchase Failed</h3>
          <p className="text-brand-subtext my-4">{err.message}</p>
          <button
            onClick={hideModal}
            className="bg-brand-card text-white px-4 py-2 rounded-lg"
          >
            Close
          </button>
        </div>
      );
    } finally {
      setIsBuying(false);
    }
  };

  // New function to handle equipping an item directly from the store
  const handleEquipItem = async () => {
    if (isEquipped || isEquipping) return;
    setIsEquipping(true);
    const token = localStorage.getItem("id_token");
    try {
      await fetch("http://localhost:5001/api/users/me/equip-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ itemId: item.itemId, itemType: item.type }),
      });
      await refetchUserData(); // This updates the UI to show "Equipped"
    } catch (error) {
      console.error("Error equipping item:", error);
    } finally {
      setIsEquipping(false);
    }
  };

  return (
    <div className="bg-brand-card border border-white/10 rounded-lg p-4 flex flex-col items-center text-center transition-all">
      <div className="w-24 h-24 rounded-full flex items-center justify-center bg-brand-dark mb-4">
        <img
          src={getFrameImage(item.itemId)}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="font-bold text-white flex-grow">{item.name}</h3>
      <p className="text-sm text-brand-subtext h-10 mb-2">{item.description}</p>

      {alreadyOwned ? (
        <button
          onClick={handleEquipItem}
          disabled={isEquipped || isEquipping}
          className={`mt-4 w-full text-white font-semibold py-2 rounded-lg transition-all ${
            isEquipped
              ? "bg-gray-600 cursor-default"
              : "bg-green-600 hover:bg-green-700"
          } ${isEquipping ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isEquipping ? "Equipping..." : isEquipped ? "Equipped" : "Equip"}
        </button>
      ) : (
        <button
          onClick={handlePurchase}
          disabled={isBuying}
          className="mt-4 w-full bg-brand-primary text-white font-semibold py-2 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed transition-opacity"
        >
          {isBuying ? "Processing..." : `💎 ${item.cost}`}
        </button>
      )}
    </div>
  );
};

export default function StorePage() {
  const [activeTab, setActiveTab] = useState("spend");
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

  return (
    <div className="p-4 pb-24">
      <PageHeader title="Store" subtitle="Spend your Gems or get more!" />

      <div className="flex justify-center mb-6 bg-brand-card/50 p-1 rounded-lg max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab("spend")}
          className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors ${
            activeTab === "spend"
              ? "bg-brand-primary text-white"
              : "text-brand-subtext"
          }`}
        >
          Spend Gems
        </button>
        <button
          onClick={() => setActiveTab("buy")}
          className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors ${
            activeTab === "buy"
              ? "bg-brand-primary text-white"
              : "text-brand-subtext"
          }`}
        >
          Buy Gems
        </button>
      </div>

      {activeTab === "spend" &&
        (loadingItems ? (
          <p className="text-center text-brand-subtext">Loading items...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {storeItems.map((item) => (
              <RewardCard key={item.itemId} item={item} />
            ))}
          </div>
        ))}

      {activeTab === "buy" && (
        <div className="text-center text-brand-subtext p-8">
          <p>Buying Gems with Pi will be available soon!</p>
          <p className="text-sm">
            This feature will use the Pi SDK to allow secure in-app purchases.
          </p>
        </div>
      )}
    </div>
  );
}
