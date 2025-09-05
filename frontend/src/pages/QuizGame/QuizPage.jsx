// File: frontend/src/pages/QuizGame/QuizPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader';
import GlassCard from '../../components/GlassCard';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [gameStatus, setGameStatus] = useState('ready'); // 'ready', 'playing', 'finished'

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/games/quiz/questions');
      const data = await response.json();
      setQuestions(data);
      setGameStatus('ready');
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const startGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setGameStatus('playing');
  };

  const submitScore = async (finalScore) => {
    const token = localStorage.getItem('id_token');
    try {
      await fetch('http://localhost:5001/api/games/quiz/submit-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ score: finalScore }),
      });
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  const handleAnswerOptionClick = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    const isCorrect = answer.isCorrect;
    const currentReward = questions[currentQuestionIndex].reward;
    const newScore = isCorrect ? score + currentReward : score;

    if (isCorrect) {
      setScore(newScore);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestionIndex + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestionIndex(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setGameStatus('finished');
        submitScore(newScore);
      }
    }, 1200);
  };
  
  const getButtonClass = (answer) => {
    if (selectedAnswer === null) {
      return 'bg-brand-card/80 hover:bg-brand-primary/50';
    }
    if (answer.isCorrect) {
      return 'bg-green-600 animate-pulse';
    }
    if (selectedAnswer === answer && !answer.isCorrect) {
      return 'bg-red-600';
    }
    return 'bg-brand-card/80 opacity-60';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-screen">
        <p className="text-center p-8 text-white">Loading Quiz...</p>
      </div>
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
                <h3 className="font-bold text-lg">Quiz Rules</h3>
                <p className="text-brand-subtext text-sm">
                  Answer <strong>{questions.length > 0 ? questions.length : 'several'} questions</strong> about the Pi ecosystem. Each correct answer earns you <strong>20 XP</strong> to dominate the leaderboards!
                </p>
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
      
      case 'finished':
        return (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <PageHeader title="Quiz Finished!" subtitle={`You earned a total of ${score} XP.`} />
            <GlassCard
              gradient="radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0.05) 100%)"
              borderColor="rgba(34,197,94,0.5)"
            >
              <div className="p-4">
                <p className="text-brand-subtext mb-4">You answered {score / 20} out of {questions.length} questions correctly.</p>
                <div className="flex space-x-4">
                  <button onClick={fetchQuestions} className="flex-1 bg-brand-secondary/80 text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                    Play Again
                  </button>
                  <Link to="/games" className="flex-1 bg-brand-card px-6 py-2 rounded-lg font-semibold hover:opacity-90">
                    Back to Lobby
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        );

      case 'playing':
        return (
          <div className="p-4 w-full max-w-md">
            {questions.length > 0 && (
              <GlassCard
                gradient="radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(30,58,138,0.12) 100%)"
                borderColor="rgba(6,182,212,1)"
              >
                <div className="p-2 sm:p-4">
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
                          disabled={selectedAnswer !== null}
                          className={`w-full p-4 rounded-lg text-left transition-colors duration-300 ${getButtonClass(
                            answer
                          )}`}
                        >
                          {answer.answerText}
                        </button>
                      )
                    )}
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

