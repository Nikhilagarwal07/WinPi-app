// File: frontend/src/pages/ClickerGamePage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GAME_DURATION = 15; // Game duration in seconds

export default function ClickerGamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStatus, setGameStatus] = useState('ready'); // 'ready', 'playing', 'finished'

  // Effect to handle the game timer
  useEffect(() => {
    if (gameStatus !== 'playing') {
      return;
    }

    if (timeLeft <= 0) {
      setGameStatus('finished');
      submitScore();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, gameStatus]);


  const startGame = () => {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameStatus('playing');
  };

  const handleGameClick = () => {
    if (gameStatus === 'playing') {
      setScore(score + 1);
    }
  };
  
  const submitScore = async () => {
    const token = localStorage.getItem('id_token');
    
    try {
      const response = await fetch('http://localhost:5001/api/games/clicker/submit-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ score }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score');
      }
      
      const result = await response.json();
      console.log(result.message);

    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };
  
  const renderGameContent = () => {
    switch(gameStatus) {
      case 'finished':
        return (
          <>
            <p className="text-xl text-brand-subtext mb-4">Game Over!</p>
            <p className="text-6xl font-bold text-white mb-6">{score}</p>
            <p className="text-green-400 animate-pulse">Score submitted! You earned {score} XP.</p>
          </>
        );
      case 'playing':
        return (
          <>
            <p className="text-xl text-brand-subtext mb-4">Time Left: <span className="text-white font-bold">{timeLeft}s</span></p>
            <p className="text-6xl font-bold text-white mb-6">{score}</p>
            <button 
              onClick={handleGameClick}
              className="bg-brand-secondary text-brand-dark font-bold py-4 px-8 rounded-lg text-xl mb-4 active:scale-95 transition-transform"
            >
              Click Me!
            </button>
          </>
        );
      case 'ready':
      default:
        return (
           <>
            <p className="text-xl text-brand-subtext mb-4">Click the button for {GAME_DURATION} seconds!</p>
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
  }

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold text-brand-primary mb-4">Pi Clicker</h1>
      
      <div className="bg-brand-card p-8 rounded-lg min-h-[320px] flex flex-col justify-center items-center">
        {renderGameContent()}
      </div>
      
      <Link to="/games" className="inline-block mt-8 text-brand-primary hover:underline">
        &larr; Back to Game Lobby
      </Link>
    </div>
  );
}