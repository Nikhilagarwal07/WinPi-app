// File: frontend/src/pages/ClickerGame/ClickerGamePage.jsx

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import GameResults from "../../components/GameResults";
import { useUser } from "../../context/UserContext"; // 1. Import useUser

const GAME_DURATION = 5;

export default function ClickerGamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStatus, setGameStatus] = useState("ready");

  // ✅ Track if this game produced a new high score
  const [isNewHighScore, setIsNewHighScore] = useState(false);

  // 2. Get high score data from the context
  const { userGameData, setUserGameData, refetchUserData } = useUser();
  const scoreRef = useRef(score);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  useEffect(() => {
    if (gameStatus !== "playing") return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameStatus]);

  useEffect(() => {
    if (timeLeft <= 0 && gameStatus === "playing") {
      const finalScore = scoreRef.current;
      setGameStatus("finished");
      submitScore(finalScore);

      const oldHighScore = userGameData["pi-clicker"] || 0;

      if (finalScore > oldHighScore) {
        // ✅ Update context
        setUserGameData((prev) => ({ ...prev, "pi-clicker": finalScore }));
        // ✅ Lock in new high score flag
        setIsNewHighScore(true);
      } else {
        setIsNewHighScore(false);
      }
    }
  }, [timeLeft, gameStatus, userGameData, setUserGameData]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStatus("playing");
    setIsNewHighScore(false); // reset
  };

  const handleGameClick = () => {
    if (gameStatus === "playing") {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const submitScore = async (finalScore) => {
    const token = localStorage.getItem("id_token");
    try {
      await fetch("http://localhost:5001/api/games/clicker/submit-score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gameScore: finalScore, xpEarned: finalScore }),
      });
      
      await refetchUserData();

    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  if (gameStatus === "finished") {
    const oldHighScore = userGameData["pi-clicker"] || 0;

    return (
      <GameResults
        gameScore={score}
        xpEarned={score} // In this game, score and XP are the same
        oldHighScore={oldHighScore}
        isNewHighScore={isNewHighScore} // ✅ reliable flag
        onPlayAgain={startGame}
      />
    );
  }

  const renderGameContent = () => {
    switch (gameStatus) {
      case "playing":
        return (
          <>
            <p className="text-xl text-brand-subtext mb-4">
              Time Left:{" "}
              <span className="text-white font-bold">{timeLeft}s</span>
            </p>
            <p className="text-6xl font-bold text-white mb-6">{score}</p>
            <button
              onClick={handleGameClick}
              className="bg-brand-secondary text-brand-dark font-bold py-4 px-8 rounded-lg text-xl mb-4 active:scale-95 transition-transform"
            >
              Click Me!
            </button>
          </>
        );
      case "ready":
      default:
        return (
          <>
            <p className="text-xl text-brand-subtext mb-4">
              Click the button for {GAME_DURATION} seconds!
            </p>
            <p className="text-6xl font-bold text-white mb-6">-</p>
            <button
              onClick={startGame}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-xl mb-4 transition-colors"
            >
              Start Game
            </button>
          </>
        );
    }
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-brand-primary mb-4">Pi Clicker</h1>
      <div className="bg-brand-card p-8 rounded-lg min-h-[320px] flex flex-col justify-center items-center">
        {renderGameContent()}
      </div>
      <Link
        to="/games"
        className="inline-block mt-8 text-brand-primary hover:underline"
      >
        &larr; Back to Game Lobby
      </Link>
    </div>
  );
}
