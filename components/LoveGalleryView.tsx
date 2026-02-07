import React, { useState } from 'react';

import image1 from '../images/image1.jpeg';
import image2 from '../images/image2.jpeg';
import image3 from '../images/image.png';
import roses from '../images/roses.png';

// Import videos - Ensure these files exist in your images folder!
import video1 from '../images/video1.mp4';
import video2 from '../images/video2.mp4';

interface LoveGalleryViewProps {
  onBack: () => void;
}

export const LoveGalleryView: React.FC<LoveGalleryViewProps> = ({ onBack }) => {
  // Track currently selected gift for the modal overlay
  const [selectedGiftIndex, setSelectedGiftIndex] = useState<number | null>(null);
  // Track which gifts have been opened to show a visual indicator
  const [openedIndices, setOpenedIndices] = useState<number[]>([]);

  // Updated data structure to support multiple photos per gift
  const gifts = [
    {
      id: 1,
      content: [
        { 
          src: image1, 
          caption: "XOXO <3333" 
        },
        { 
          src: image2, // Using image2 as the extra photo
          caption: "I liked the movie BTW 🥰" 
        }
      ]
    },
    {
      id: 2,
      // Special type for the bouquet view
      type: 'bouquet',
      content: [] 
    },
    {
      id: 4,
      type: 'video',
      content: [
        { src: video1, caption: "" },
        { src: video2, caption: "" }
      ]
    },
    {
      id: 3,
      content: [
        { 
          src: image3, 
          caption: "🎧 Scan on Spotify 🎧" 
        }
      ]
    }
  ];

  const handleOpenGift = (index: number) => {
    setSelectedGiftIndex(index);
    if (!openedIndices.includes(index)) {
      setOpenedIndices([...openedIndices, index]);
    }
  };

  const handleCloseModal = () => {
    setSelectedGiftIndex(null);
  };

  const affirmations = [
    "You are the highlight of the year",
    "You'll always own a place in my heart",
    "Missing you comes in waves,but tonight I'm drowning",
    "Pookie wookie "
  ];

  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4 relative">
      {/* Background decorations for extra romance */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-30">❤️</div>
        <div className="absolute top-40 right-20 text-5xl animate-float opacity-20" style={{animationDelay: '1s'}}>🌹</div>
        <div className="absolute bottom-20 left-1/4 text-3xl animate-float opacity-30" style={{animationDelay: '2s'}}>💖</div>
      </div>

      <div className={`max-w-6xl mx-auto transition-all duration-500 ${selectedGiftIndex !== null ? 'blur-sm scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        <div className="text-center space-y-4 mb-12 relative z-10">
          <h1 className="text-5xl font-handwriting text-pink-600 drop-shadow-sm">
            Your Gifts 🎁
          </h1>
          <p className="text-xl text-gray-600 font-medium">
            Tap a box to unwrap a surprise!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 justify-items-center relative z-10">
          {gifts.map((_, index) => (
            <div 
              key={index}
              className="relative w-full max-w-sm aspect-[3/4] group perspective"
            >
              <div 
                className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={() => handleOpenGift(index)}
              >
                {/* GIFT BOX */}
                <div className={`absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 rounded-2xl shadow-2xl flex flex-col items-center justify-center overflow-hidden border-4 border-pink-100/50 ${!openedIndices.includes(index) ? 'animate-wiggle' : ''}`}>
                  {/* Pattern */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
                  
                  {/* Ribbons */}
                  <div className="absolute w-10 h-full bg-white/90 left-1/2 -translate-x-1/2 shadow-sm backdrop-blur-sm border-l border-r border-white"></div>
                  <div className="absolute h-10 w-full bg-white/90 top-1/2 -translate-y-1/2 shadow-sm backdrop-blur-sm border-t border-b border-white"></div>
                  
                  {/* Bow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-8 z-10 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300 drop-shadow-xl">
                      <span className="text-8xl filter drop-shadow-md">💝</span>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-10 w-full text-center z-20">
                       <span className={`px-6 py-2 rounded-full font-bold text-lg shadow-lg border-2 border-pink-100 transition-colors ${openedIndices.includes(index) ? 'bg-pink-100 text-pink-400' : 'bg-white/90 text-pink-500 animate-pulse'}`}>
                          {openedIndices.includes(index) ? 'Opened ✨' : 'Open Me! 💌'}
                       </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pb-8 relative z-10">
          <button
            onClick={onBack}
            className="text-pink-500 font-bold hover:text-pink-700 hover:underline transition-colors text-lg"
          >
            ← Back to the celebration
          </button>
        </div>
      </div>

      {/* UNWRAPPED MODAL OVERLAY */}
      {selectedGiftIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500"
            onClick={handleCloseModal}
          ></div>
          
          <div className="relative w-full max-w-7xl z-50 flex flex-col items-center max-h-screen overflow-y-auto no-scrollbar py-8">
             
             {/* CONDITIONAL CONTENT RENDERING */}
             {selectedGiftIndex === 1 ? (
               /* BOUQUET VIEW (GIFT 2) */
               <div className="w-full max-w-4xl bg-pink-50/90 rounded-[3rem] p-8 md:p-12 border-8 border-pink-200 relative shadow-2xl animate-pop-in flex flex-col items-center">
                 {/* Wavy border decoration imitation */}
                 <div className="absolute inset-0 rounded-[2.5rem] border-4 border-dashed border-pink-300 pointer-events-none m-2 opacity-50"></div>

                 <h2 className="text-4xl md:text-5xl font-handwriting text-pink-600 mb-8 drop-shadow-sm text-center animate-bounce-soft">
                   A Bouquet For You 🌹
                 </h2>

                 <div className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center">
                    
                    {/* Center Bouquet Image */}
                    <div className="absolute inset-0 z-10 p-12 flex items-center justify-center animate-float">
                        <img 
                          src={roses} 
                          alt="Bouquet of Roses" 
                          className="w-full h-full object-contain drop-shadow-2xl"
                        />
                    </div>

                    {/* Affirmation 1 - Left Top */}
                    <div className="absolute top-0 left-0 md:left-10 md:top-10 max-w-[200px] z-20 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                       <div className="bg-white px-4 py-3 rounded-2xl shadow-lg border-2 border-pink-100 text-center transform -rotate-6 hover:scale-110 transition-transform">
                          <p className="font-handwriting text-pink-500 text-lg md:text-xl leading-tight">
                            {affirmations[0]}
                          </p>
                       </div>
                       {/* Hanging hearts */}
                       <div className="flex justify-center space-x-2 mt-[-5px]">
                          <div className="w-0.5 h-8 bg-pink-200 relative">
                             <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-red-500 text-xl animate-swing origin-top">❤️</span>
                          </div>
                          <div className="w-0.5 h-12 bg-pink-200 relative">
                             <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-pink-400 text-xl animate-swing origin-top" style={{animationDelay: '0.5s'}}>💖</span>
                          </div>
                          <div className="w-0.5 h-6 bg-pink-200 relative">
                             <span className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-red-400 text-xl animate-swing origin-top" style={{animationDelay: '1s'}}>❤️</span>
                          </div>
                       </div>
                    </div>

                    {/* Affirmation 2 - Bottom Left */}
                    <div className="absolute bottom-10 left-0 md:left-20 max-w-[220px] z-20 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                       <div className="bg-white px-5 py-4 rounded-full shadow-lg border-2 border-pink-100 text-center transform rotate-3 hover:scale-110 transition-transform">
                          <p className="font-handwriting text-red-500 text-xl leading-tight">
                            {affirmations[1]}
                          </p>
                       </div>
                    </div>

                    {/* Affirmation 3 - Right Top */}
                    <div className="absolute top-10 right-0 md:right-10 max-w-[200px] z-20 animate-fade-in-up" style={{animationDelay: '0.9s'}}>
                       <div className="bg-white px-4 py-3 rounded-xl shadow-lg border-2 border-pink-100 text-center transform rotate-6 hover:scale-110 transition-transform">
                          <p className="font-handwriting text-pink-600 text-lg leading-tight">
                            {affirmations[2]}
                          </p>
                       </div>
                    </div>

                    {/* Affirmation 4 - Right Bottom */}
                    <div className="absolute bottom-20 right-0 md:right-20 max-w-[180px] z-20 animate-fade-in-up" style={{animationDelay: '1.2s'}}>
                       <div className="bg-white px-4 py-3 rounded-lg shadow-lg border-2 border-pink-100 text-center transform -rotate-3 hover:scale-110 transition-transform">
                          <p className="font-handwriting text-red-400 text-lg leading-tight">
                            {affirmations[3]}
                          </p>
                       </div>
                       {/* Floating heart decoration */}
                       <div className="absolute -top-6 -right-4 text-3xl animate-bounce">💌</div>
                    </div>

                 </div>
               </div>

             ) : selectedGiftIndex === 2 ? (
               /* VIDEO GRID (GIFT 4) */
               <>
                 <h2 className="text-4xl md:text-5xl font-handwriting text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] animate-pop-in text-center">
                   🎥
                 </h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full px-4 max-w-5xl">
                    {gifts[selectedGiftIndex].content.map((video, idx) => (
                      <div 
                        key={idx} 
                        className="relative bg-pink-100 rounded-[2rem] overflow-hidden shadow-[0_0_25px_rgba(236,72,153,0.6)] aspect-video group transform hover:scale-[1.02] transition-all duration-300 animate-fade-in-up border-[6px] border-pink-300"
                        style={{ animationDelay: `${idx * 0.2}s` }}
                      >
                        {/* Decorative Corner Hearts */}
                        <div className="absolute top-2 left-2 text-2xl z-20 animate-pulse">💖</div>
                        <div className="absolute top-2 right-2 text-2xl z-20 animate-pulse" style={{ animationDelay: '0.5s' }}>💖</div>
                        <div className="absolute bottom-2 left-2 text-2xl z-20 animate-pulse" style={{ animationDelay: '1s' }}>💖</div>
                        <div className="absolute bottom-2 right-2 text-2xl z-20 animate-pulse" style={{ animationDelay: '1.5s' }}>💖</div>

                        {/* Video Element */}
                        <div className="w-full h-full relative z-10 bg-black">
                           <video 
                             src={video.src}
                             className="w-full h-full object-cover"
                             controls
                             loop
                             muted={false}
                             playsInline
                           />
                        </div>
                        
                        {/* Overlay with Caption */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-900/80 to-transparent p-6 z-20 pointer-events-none">
                            <h3 className="font-handwriting text-white text-3xl text-center drop-shadow-md">
                                {video.caption}
                            </h3>
                        </div>
                      </div>
                    ))}
                 </div>
               </>
             ) : selectedGiftIndex === 3 ? (
               /* SPOTIFY / QR CODE VIEW */
               <div className="flex flex-col items-center animate-pop-in w-full max-w-md">
                 <h2 className="text-4xl md:text-5xl font-handwriting text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] text-center">
                    🎵
                 </h2>
                 <div className="relative bg-pink-50 rounded-[2rem] overflow-hidden shadow-[0_0_25px_rgba(236,72,153,0.6)] w-full group transform hover:scale-[1.02] transition-all duration-300 border-[6px] border-pink-300 p-2">
                    {/* Decorative Corner Hearts */}
                    <div className="absolute top-3 left-3 text-2xl z-20 animate-pulse">💖</div>
                    <div className="absolute top-3 right-3 text-2xl z-20 animate-pulse" style={{ animationDelay: '0.5s' }}>💖</div>
                    <div className="absolute bottom-3 left-3 text-2xl z-20 animate-pulse" style={{ animationDelay: '1s' }}>💖</div>
                    <div className="absolute bottom-3 right-3 text-2xl z-20 animate-pulse" style={{ animationDelay: '1.5s' }}>💖</div>

                    {/* Image Container - Square Aspect Ratio for QR/Album Art */}
                    <div className="w-full aspect-square bg-white rounded-[1.5rem] overflow-hidden flex items-center justify-center relative z-10 shadow-inner">
                        <img 
                            src={gifts[selectedGiftIndex].content[0].src} 
                            alt="Spotify Code"
                            className="w-full h-full object-contain p-2"
                        />
                    </div>
                    
                    {/* Caption area */}
                    <div className="py-6 text-center z-10 relative px-4 bg-white/50 mt-2 rounded-xl">
                        <p className="font-handwriting text-2xl md:text-3xl text-pink-600 drop-shadow-sm">
                            {gifts[selectedGiftIndex].content[0].caption}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                           
                        </p>
                    </div>
                 </div>
               </div>
             ) : (
               /* DEFAULT PHOTO VIEW (GIFTS 1 & 3) */
               <>
                <h2 className="text-4xl md:text-5xl font-handwriting text-white mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] animate-pop-in text-center">
                  Surprise! ❤️
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-8 w-full px-4">
                    {gifts[selectedGiftIndex].content.map((item, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-4 pb-8 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.3)] transform transition-all duration-500 animate-deal-card max-w-sm w-full"
                        style={{ 
                          animationDelay: `${idx * 200}ms`,
                          transform: `rotate(${idx % 2 === 0 ? '-3deg' : '3deg'})`
                        }}
                      >
                        <div className="aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4 border border-gray-100 shadow-inner">
                            <img 
                              src={item.src} 
                              alt="Memory" 
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = `https://placehold.co/600x800/pink/white?text=Memory+${selectedGiftIndex+1}-${idx+1}`;
                              }}
                            />
                        </div>
                        <p className="font-handwriting text-2xl text-center text-gray-700 leading-tight">
                            {item.caption}
                        </p>
                        <div className="absolute -top-3 -right-3 text-4xl animate-bounce" style={{animationDelay: `${1 + idx}s`}}>
                          📌
                        </div>
                      </div>
                    ))}
                </div>
               </>
             )}

             <button
               onClick={handleCloseModal}
               className="mt-12 bg-white text-pink-600 font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-110 hover:shadow-xl focus:outline-none ring-4 ring-pink-300 animate-bounce-soft flex items-center gap-2"
             >
               <span>✨</span> {selectedGiftIndex === gifts.length - 1 ? "Finish Unwrapping" : "Unwrap more gifts?"}
             </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(-1deg); }
          50% { transform: rotate(1deg); }
        }
        .animate-wiggle {
          animation: wiggle 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pop-in {
            0% { transform: scale(0.5); opacity: 0; }
            70% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
            animation: pop-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes deal-card {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            100% { opacity: 1; } 
            /* Final state is handled by the inline style rotate */
        }
        .animate-deal-card {
            animation: deal-card 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) backwards;
        }
        @keyframes bounce-soft {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
        }
        .animate-bounce-soft {
            animation: bounce-soft 2s infinite ease-in-out;
        }
        @keyframes swing {
            0% { transform: rotate(10deg); }
            100% { transform: rotate(-10deg); }
        }
        .animate-swing {
            animation: swing 2s ease-in-out infinite alternate;
        }
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};


