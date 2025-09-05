// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Confetti from "react-confetti";
// import PageHeader from "./PageHeader";
// import GlassCard from "./GlassCard";

// const REDIRECT_DELAY = 15;

// const AnimatedCounter = ({ endValue }) => {
//   const [count, setCount] = useState(0);
//   const duration = 1500;

//   useEffect(() => {
//     let start = 0;
//     const end = parseInt(endValue, 10) || 0;
//     if (start === end) return;

//     const totalFrames = duration / (1000 / 60);
//     const increment = end / totalFrames;
//     let current = 0;

//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= end) {
//         setCount(end);
//         clearInterval(timer);
//       } else {
//         setCount(Math.ceil(current));
//       }
//     }, 16);

//     return () => clearInterval(timer);
//   }, [endValue]);

//   return (
//     <span className="text-4xl font-bold text-brand-secondary">
//       +{count.toLocaleString()} XP
//     </span>
//   );
// };

// export default function GameResults({
//   gameScore,
//   xpEarned,
//   oldHighScore,
//   isNewHighScore,
//   onPlayAgain,
// }) {
//   const [redirectCountdown, setRedirectCountdown] = useState(REDIRECT_DELAY);
//   const [showConfetti, setShowConfetti] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
//     const countdownInterval = setInterval(
//       () => setRedirectCountdown((prev) => prev - 1),
//       1000
//     );
//     const redirectTimeout = setTimeout(
//       () => navigate("/games"),
//       REDIRECT_DELAY * 1000
//     );

//     return () => {
//       clearTimeout(confettiTimer);
//       clearInterval(countdownInterval);
//       clearTimeout(redirectTimeout);
//     };
//   }, [navigate]);

//   // --- TIERED CONFETTI CONFIGURATION ---
//   // A standard burst for a normal win, and a bigger one for a new high score.
//   const confettiConfig = {
//     recycle: false,
//     gravity: 0.15,
//     numberOfPieces: isNewHighScore ? 500 : 200, // More pieces for a high score!
//   };

//   return (
//     <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-50">
//       {/* Confetti now runs every time, using the dynamic config */}
//       {showConfetti && (
//         <Confetti
//           {...confettiConfig}
//           onConfettiComplete={(confetti) => confetti.reset()}
//         />
//       )}
//       <div className="animate-pop-in z-10 w-full max-w-md">
//         <PageHeader title="Results!" />
//         <GlassCard
//           gradient="radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0.05) 100%)"
//           borderColor="rgba(34,197,94,0.5)"
//         >
//           <div className="p-4">
//             {isNewHighScore && (
//               // --- ENHANCED HIGH SCORE TEXT ---
//               // This now has a glowing text-shadow effect.
//               <p className="text-2xl font-bold text-yellow-300 animate-pulse mb-4 [text-shadow:0_0_15px_rgba(252,211,77,0.8)]">
//                 🎉 New High Score! 🎉
//               </p>
//             )}

//             <div className="flex justify-around items-center mb-6">
//               <div>
//                 <p className="text-brand-subtext text-sm mb-1">Your Score</p>
//                 <p className="text-5xl font-bold text-white">
//                   {gameScore.toLocaleString()}
//                 </p>
//               </div>
//               <div className="h-16 w-px bg-white/20"></div>
//               <div>
//                 <p className="text-brand-subtext text-sm mb-1">Best Score</p>
//                 <p className="text-3xl font-bold text-white/70">
//                   {oldHighScore.toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             <div className="border-t border-white/10 my-4"></div>

//             <p className="text-brand-subtext mb-2">XP Earned</p>
//             <div className="mb-6">
//               <AnimatedCounter endValue={xpEarned} />
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 onClick={onPlayAgain}
//                 className="flex-1 bg-brand-secondary/80 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Play Again
//               </button>
//               <Link
//                 to="/games"
//                 className="flex-1 bg-brand-card px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
//               >
//                 Back to Lobby
//               </Link>
//             </div>
//           </div>
//         </GlassCard>
//         <p className="text-xs text-brand-subtext mt-4">
//           Returning to lobby in {redirectCountdown > 0 ? redirectCountdown : 0}
//           s...
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import PageHeader from "./PageHeader";
import GlassCard from "./GlassCard";

const REDIRECT_DELAY = 15;

const AnimatedCounter = ({ endValue }) => {
  const [count, setCount] = useState(0);
  const duration = 1500;

  useEffect(() => {
    let start = 0;
    const end = parseInt(endValue, 10) || 0;
    if (start === end) return;

    const totalFrames = duration / (1000 / 60);
    const increment = end / totalFrames;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [endValue]);

  return (
    <span className="text-4xl font-bold text-brand-secondary">
      +{count.toLocaleString()} XP
    </span>
  );
};

export default function GameResults({
  gameScore,
  xpEarned,
  oldHighScore,
  isNewHighScore,
  onPlayAgain,
}) {
  const [redirectCountdown, setRedirectCountdown] = useState(REDIRECT_DELAY);
  const navigate = useNavigate();

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setRedirectCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      navigate("/games");
    }, REDIRECT_DELAY * 1000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 bg-brand-dark/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 z-50">
      <Confetti
        recycle={false}
        numberOfPieces={isNewHighScore ? 500 : 200}
        gravity={0.1}
      />
      <div className="animate-pop-in z-10 w-full max-w-md">
        <PageHeader title="Results!" />
        <GlassCard
          gradient="radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(0,0,0,0.05) 100%)"
          borderColor="rgba(34,197,94,0.5)"
        >
          <div className="p-4">
            {isNewHighScore && (
              <div className="mb-4 animate-pop-in-delayed">
                <p className="text-2xl font-bold text-yellow-300 [text-shadow:0_0_15px_rgba(252,211,77,0.8)]">
                  🎉 New High Score! 🎉
                </p>
              </div>
            )}

            <div className="flex justify-around items-center mb-6">
              <div>
                <p className="text-brand-subtext text-sm mb-1">Your Score</p>
                <p className="text-5xl font-bold text-white">
                  {gameScore.toLocaleString()}
                </p>
              </div>
              <div className="h-16 w-px bg-white/20"></div>
              <div>
                <p className="text-brand-subtext text-sm mb-1">Best Score</p>
                <p className="text-3xl font-bold text-white/70">
                  {oldHighScore.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            <p className="text-brand-subtext mb-2">XP Earned</p>
            <div className="mb-6">
              <AnimatedCounter endValue={xpEarned} />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={onPlayAgain}
                className="flex-1 bg-brand-secondary/80 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Play Again
              </button>
              <Link
                to="/games"
                className="flex-1 bg-brand-card px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Back to Lobby
              </Link>
            </div>
          </div>
        </GlassCard>
        <p className="text-xs text-brand-subtext mt-4">
          Returning to lobby in {redirectCountdown > 0 ? redirectCountdown : 0}
          s...
        </p>
      </div>
    </div>
  );
}
