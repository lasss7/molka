import React, { useState } from 'react';
import { ProposalView } from './components/ProposalView';
import { SuccessView } from './components/SuccessView';
import { LoveGalleryView } from './components/LoveGalleryView';

const App: React.FC = () => {
  const [accepted, setAccepted] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  return (
    <main className="w-full min-h-screen">
      {showGallery ? (
        <LoveGalleryView onBack={() => setShowGallery(false)} />
      ) : accepted ? (
        <SuccessView onShowGallery={() => setShowGallery(true)} />
      ) : (
        <ProposalView onAccept={() => setAccepted(true)} />
      )}
    </main>
  );
};

export default App;
