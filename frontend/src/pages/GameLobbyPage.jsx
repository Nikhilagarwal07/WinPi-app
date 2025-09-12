// File: frontend/src/pages/GameLobbyPage.jsx

import React from "react";
import GameCard from "../components/GameCard";
import PageHeader from "../components/PageHeader";
import quizImage from "../assets/quiz.png";
import clickimage from "../assets/fallback-game-image.jpg";

// Enhanced placeholder data for our games
const games = [
  {
    id: "clicker",
    title: "Pi Clicker",
    path: "/game/clicker",
    // A working 16:9 image URL
    imageUrl: clickimage,
    icon: "👆",
    tags: ["Speed", "Reflex"],
    reward: "Up to 300 XP",
  },
  {
    id: "quiz",
    title: "Pi Quiz",
    path: "/game/quiz",
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
