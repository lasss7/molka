import React from 'react';

interface SuccessViewProps {
  onShowGallery: () => void;
}

export const SuccessView: React.FC<SuccessViewProps> = ({ onShowGallery }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-100 p-4 text-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:scale-105 border-4 border-pink-200">
        <h1 className="text-4xl md:text-5xl font-handwriting text-red-500 mb-6 animate-pulse">
          YAAAY! I knew it! 💖
        </h1>
        
        <div className="mb-8 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <img 
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
            alt="Bear Kiss" 
            className="relative w-full rounded-lg shadow-md" 
          />
        </div>

        <p className="text-xl text-gray-700 mb-8 font-medium">
          See you on Valentine's Day! <br/>
          <span className="text-sm text-pink-400">(I promise to buy snacks)</span>
        </p>

        <button
          onClick={onShowGallery}
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-all duration-200 hover:shadow-xl hover:-translate-y-1 focus:outline-none ring-4 ring-pink-200"
        >
          Click Here 📸
        </button>
      </div>
    </div>
  );
};