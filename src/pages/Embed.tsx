
import React from 'react';
import JoinRequest from '@/components/JoinRequest';

const Embed: React.FC = () => {
  const handleJoinRequest = (name: string) => {
    // This would typically send the request to the main application
    console.log('Join request from embedded page:', name);
    
    // In a real app, this would communicate with the parent window or send to API
    if (window.parent !== window) {
      window.parent.postMessage({
        type: 'JOIN_REQUEST',
        data: { name, timestamp: new Date() }
      }, '*');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <JoinRequest onRequestSent={handleJoinRequest} isEmbedded={true} />
    </div>
  );
};

export default Embed;
