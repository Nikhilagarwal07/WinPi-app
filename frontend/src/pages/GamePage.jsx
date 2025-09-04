// File: frontend/src/pages/GamePage.jsx

import React from "react";
import GameCard from "../components/GameCard";
import PageHeader from "../components/PageHeader";
import quizImage from "../assets/quiz.png";

// Enhanced placeholder data for our games
const games = [
  {
    id: "clicker",
    title: "Pi Clicker",
    path: "/game/clicker",
    // A working 16:9 image URL
    imageUrl:
      "https://images.unsplash.com/photo-1554235286-d5c4f6b47c87?q=80&w=1280&h=720&auto=format&fit=crop",
    icon: "👆",
    tags: ["Speed", "Reflex"],
    reward: "Up to 300 XP",
  },
  {
    id: "quiz",
    title: "Pi Quiz",
    path: "#",
    // Your new requested image URL
    imageUrl: quizImage,
    icon: "❓",
    tags: ["Trivia", "Knowledge"],
    reward: "Up to 500 XP",
  },
];

export default function GamePage() {
  return (
    <div className="p-4 pb-24">
      <PageHeader
        title="Game Lobby"
        subtitle="Choose your challenge and earn rewards!"
      />

      <main className="space-y-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </main>
    </div>
  );
}
