// File: frontend/src/pages/QuizGame/QuizPage.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import GlassCard from '../../components/GlassCard';
import GameResults from '../../components/GameResults';
import { useUser } from '../../context/UserContext';

const QUESTION_TIME_LIMIT = 10;
const HINT_COST = 10;

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintedAnswerText, setHintedAnswerText] = useState(null);

  // ✅ Applying your fix: A separate state to lock in the high score result.
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  
  const { userData, setUserData, userGameData, setUserGameData, loading: userLoading, refetchUserData } = useUser();
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuestions();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (gameStatus === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameStatus, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft <= 0 && gameStatus === 'playing') {
      handleAnswerOptionClick({ isCorrect: false });
    }
  }, [timeLeft, gameStatus]);

  const fetchQuestions = async () => {
    setLoadingQuestions(true);
    try {
      const response = await fetch('http://localhost:5001/api/games/quiz/questions');
      const data = await response.json();
      setQuestions(data);
      setGameStatus('ready');
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoadingQuestions(false);
    }
  };
  
  const startGame = () => {
    setCurrentQuestionIndex(0);
    setXpEarned(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setHintUsed(false);
    setHintedAnswerText(null);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGameStatus('playing');
    setIsNewHighScore(false); // ✅ Reset the flag when a new game starts
  };

  const handleUseHint = async () => {
    if (hintUsed || !userData || userData.gems < HINT_COST) return;

    const token = localStorage.getItem('id_token');
    try {
      const response = await fetch('http://localhost:5001/api/games/quiz/use-hint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`},
        body: JSON.stringify({ currentAnswers: questions[currentQuestionIndex].answers }),
      });
      const data = await response.json();
      if (data.success) {
        setUserData(prev => ({ ...prev, gems: data.newGemBalance }));
        setHintedAnswerText(data.hint);
        setHintUsed(true);
      }
    } catch (error) {
      console.error("Error using hint:", error);
    }
  };

  const submitScore = async ({ gameScore, xpEarned }) => {
    const token = localStorage.getItem('id_token');
    try {
      await fetch('http://localhost:5001/api/games/quiz/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ gameScore, xpEarned }),
      });

        await refetchUserData();

    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleAnswerOptionClick = (answer) => {
    if (selectedAnswer !== null) return;

    clearInterval(timerRef.current);
    setSelectedAnswer(answer);

    let finalXp = xpEarned;
    let finalCorrectAnswers = correctAnswers;

    if (answer.isCorrect) {
      const baseReward = questions[currentQuestionIndex].reward;
      const timeBonus = Math.max(0, timeLeft);
      finalXp += baseReward + timeBonus;
      finalCorrectAnswers += 1;
    }
    
    setXpEarned(finalXp);
    setCorrectAnswers(finalCorrectAnswers);

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
        setHintUsed(false);
        setHintedAnswerText(null);
        setTimeLeft(QUESTION_TIME_LIMIT);
      } else {
        setGameStatus('finished');
        submitScore({ 
          gameScore: finalCorrectAnswers, 
          xpEarned: finalXp 
        });
        
        // ✅ Applying your brilliant logic to the Quiz Game
        const oldHighScore = userGameData['pi-quiz'] || 0;
        if (finalCorrectAnswers > oldHighScore) {
          setUserGameData(prev => ({...prev, 'pi-quiz': finalCorrectAnswers}));
          setIsNewHighScore(true); // Lock in the result
        } else {
          setIsNewHighScore(false);
        }
      }
    }, 1500);
  };
  
  const getButtonClass = (answer) => {
    if (hintedAnswerText === answer.answerText) {
      return 'bg-brand-dark opacity-50 cursor-not-allowed';
    }
    if (selectedAnswer === null) return 'bg-brand-card/80 hover:bg-brand-primary/50';
    if (answer.isCorrect) return 'bg-green-600 animate-pulse';
    if (selectedAnswer === answer && !answer.isCorrect) return 'bg-red-600';
    return 'bg-brand-card/80 opacity-60';
  };

  if (loadingQuestions || userLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <p className="text-center p-8 text-white">Loading Quiz...</p>
      </div>
    );
  }

  if (gameStatus === 'finished') {
    const oldHighScore = userGameData['pi-quiz'] || 0;
    
    return (
      <GameResults 
        gameScore={correctAnswers}
        xpEarned={xpEarned}
        oldHighScore={oldHighScore}
        isNewHighScore={isNewHighScore} // ✅ Pass the reliable flag
        onPlayAgain={startGame} 
      />
    );
  }
  
  const renderContent = () => {
    switch (gameStatus) {
      case 'ready':
        return (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <PageHeader title="Pi Quiz" subtitle="Think Fast, Win Big!" />
            <GlassCard
              gradient="radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(0,0,0,0.12) 100%)"
              borderColor="rgba(168,85,247,1)"
            >
              <div className="p-4 text-white space-y-4">
                <div className="text-5xl">🧠</div>
                <h3 className="font-bold text-lg">Your Mission</h3>
                <div className="text-brand-subtext text-sm text-left space-y-2">
                    <p>• Answer <strong>{questions.length > 0 ? questions.length : 'several'} questions</strong> about the Pi ecosystem.</p>
                    <p>• Answer faster to earn bonus XP!</p>
                    <p>• Stuck? Use a <strong>Hint for 💎10 Gems</strong> to remove one wrong answer.</p>
                </div>
              </div>
            </GlassCard>
            <button
              onClick={startGame}
              className="mt-8 bg-brand-primary text-white font-bold py-3 px-10 rounded-lg text-lg hover:opacity-90 transition-opacity"
            >
              Start Quiz
            </button>
          </div>
        );

      case 'playing':
        const timerPercentage = (timeLeft / QUESTION_TIME_LIMIT) * 100;
        return (
          <div className="p-4 w-full max-w-md">
            {questions.length > 0 && (
              <GlassCard
                gradient="radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(30,58,138,0.12) 100%)"
                borderColor="rgba(6,182,212,1)"
              >
                <div className="p-2 sm:p-4">
                  <div className="h-2 w-full bg-brand-dark rounded-full mb-4">
                    <div
                      className="h-full bg-brand-secondary rounded-full transition-all duration-1000 linear"
                      style={{ width: `${timerPercentage}%` }}
                    ></div>
                  </div>
                  <div className="mb-6 text-center">
                    <p className="text-brand-subtext text-sm">
                      Question {currentQuestionIndex + 1}/{questions.length}
                    </p>
                    <h2 className="text-xl font-semibold mt-1">
                      {questions[currentQuestionIndex].questionText}
                    </h2>
                  </div>
                  <div className="space-y-3">
                    {questions[currentQuestionIndex].answers.map(
                      (answer, index) => (
                        <button
                          key={`${currentQuestionIndex}-${index}`}
                          onClick={() => handleAnswerOptionClick(answer)}
                          disabled={selectedAnswer !== null || hintedAnswerText === answer.answerText}
                          className={`w-full p-4 rounded-lg text-left transition-colors duration-300 ${getButtonClass(answer)}`}
                        >
                          {answer.answerText}
                        </button>
                      )
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={handleUseHint}
                      disabled={hintUsed || !userData || userData.gems < HINT_COST}
                      className="px-4 py-2 text-sm bg-yellow-500/20 text-yellow-300 rounded-lg border border-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Use Hint (💎 {HINT_COST})
                    </button>
                    <p className="text-xs text-brand-subtext mt-1">Your Gems: {userData ? userData.gems : 0}</p>
                  </div>
                </div>
              </GlassCard>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center">
      {renderContent()}
    </div>
  );
}