import React, { useState, useRef } from 'react';
import { Position } from '../types';

interface ProposalViewProps {
  onAccept: () => void;
}

const PHRASES = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
];

export const ProposalView: React.FC<ProposalViewProps> = ({ onAccept }) => {
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState<Position | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getNoButtonText = () => {
    return PHRASES[Math.min(noCount, PHRASES.length - 1)];
  };

  const handleNoInteraction = () => {
    setNoCount((prev) => prev + 1);
    
    if (containerRef.current) {
      const maxWidth = window.innerWidth - 150;
      const maxHeight = window.innerHeight - 60;
      
      const randomX = Math.max(20, Math.random() * maxWidth);
      const randomY = Math.max(20, Math.random() * maxHeight);

      setNoButtonPosition({
        top: `${randomY}px`,
        left: `${randomX}px`,
      });
    }
  };

  const yesScale = 1 + noCount * 0.3;
  const yesFontSize = Math.min(1.5 + noCount * 0.1, 5);
  
  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen w-full p-4 overflow-hidden bg-gradient-to-br from-pink-100 to-red-50"
    >
      <div className="z-10 text-center space-y-8 animate-float">
        <img 
          src="https://media.tenor.com/cWrVaANWYxEAAAAj/peach-goma-peach-and-goma.gif" 
          alt="Peach Goma Blush GIF" 
          className="w-48 h-48 mx-auto object-contain drop-shadow-xl rounded-2xl"
        />
        <h1 className="text-4xl md:text-6xl font-handwriting text-pink-600 drop-shadow-sm px-4">
          Will you be my valentine shawty? 🌹
        </h1>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-8 mt-12 w-full max-w-2xl relative z-20">
        <button
          onClick={onAccept}
          style={{ 
            transform: `scale(${yesScale})`,
            fontSize: `${yesFontSize}rem`,
            transition: 'transform 0.2s ease-in-out' 
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:shadow-xl focus:outline-none ring-4 ring-green-200"
        >
          Yes 💖
        </button>

        <button
          onMouseEnter={handleNoInteraction}
          onClick={handleNoInteraction}
          style={
            noButtonPosition
              ? { position: 'fixed', top: noButtonPosition.top, left: noButtonPosition.left }
              : {}
          }
          className={`
            bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg 
            transition-all duration-100 ease-out focus:outline-none ring-4 ring-red-200
            ${noButtonPosition ? 'z-50' : ''}
          `}
        >
          {getNoButtonText()}
        </button>
      </div>
      
      <div className="absolute bottom-8 text-pink-500 text-xl md:text-2xl font-bold tracking-wide animate-pulse drop-shadow-md">
        Made with love ❤️
      </div>
    </div>
  );
};




