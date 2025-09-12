// File: frontend/src/components/GameCard.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import fallbackImage from '../assets/fallback-game-image.jpg'; // 1. Import your local fallback image

const GameCard = ({ game }) => {
  const [imageUrl, setImageUrl] = useState(game.imageUrl);

  // This function will be called if the primary image fails to load
  const handleImageError = () => {
    setImageUrl(fallbackImage);
  };

  const cardContent = (
    // We use a div with a background image for better control
    <div
      className="relative w-full aspect-video bg-cover bg-center rounded-2xl overflow-hidden shadow-lg border-2 border-white/10"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* This invisible img tag is only here to detect loading errors */}
      <img
        src={imageUrl}
        alt=""
        className="hidden"
        onError={handleImageError}
      />
      
      {/* Overlay gradient ensures text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

      {/* Content Container */}
      <div className="absolute inset-0 p-4 flex flex-col justify-between">
        {/* Top section for reward and disabled badge */}
        <div className="flex justify-end items-start">
          <span className="text-sm text-brand-secondary font-bold bg-black/30 px-3 py-1 rounded-full">
            {game.reward}
          </span>
          {game.disabled && (
            <span className="ml-2 bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-md">
              SOON
            </span>
          )}
        </div>

        {/* Bottom section for title and tags */}
        <div className="flex items-center space-x-4">
          {/* <div className="flex-shrink-0 w-16 h-16 bg-black/40 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/10">
            <span className="text-4xl">{game.icon}</span>
          </div> */}
          <div>
            <h3 className="font-bold text-white text-2xl">{game.title}</h3>
            <div className="flex items-center flex-wrap gap-2 mt-1">
              {game.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (game.disabled) {
    return <div className="opacity-60 cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <Link to={game.path} className="block transform transition-transform hover:scale-105 duration-300">
      {cardContent}
    </Link>
  );
};

export default GameCard;