
import React from 'react';
import { Mic } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import JoinRequest from '@/components/JoinRequest';

const Embed: React.FC = () => {
  const handleJoinRequest = (name: string) => {
    // Get user's IP and location info
    const getUserInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        return {
          ip: data.ip,
          country: data.country_name,
          countryCode: data.country_code,
          city: data.city
        };
      } catch (error) {
        console.error('Error getting user info:', error);
        return {
          ip: 'Unknown',
          country: 'Unknown',
          countryCode: 'XX',
          city: 'Unknown'
        };
      }
    };

    getUserInfo().then(userInfo => {
      console.log('Join request from embedded page:', {
        name,
        timestamp: new Date(),
        ...userInfo
      });
      
      // In a real app, this would communicate with the parent window or send to API
      if (window.parent !== window) {
        window.parent.postMessage({
          type: 'JOIN_REQUEST',
          data: { name, timestamp: new Date(), ...userInfo }
        }, '*');
      }
    });
  };

  return (
    <div className="p-2">
      <div className="text-center mb-3">
        <h2 className="text-lg font-bold text-gray-800 mb-1">البث الصوتي المشترك</h2>
        <p className="text-gray-600 text-xs">انقر على أي مايكروفون للانضمام للبث</p>
      </div>
      
      {/* Microphones Grid */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {Array.from({ length: 5 }, (_, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <button className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center group shadow-sm">
                <Mic className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-right">طلب الانضمام للبث</DialogTitle>
              </DialogHeader>
              <JoinRequest onRequestSent={handleJoinRequest} isEmbedded={true} />
            </DialogContent>
          </Dialog>
        ))}
      </div>
      
      <div className="text-center text-xs text-gray-500">
        متاح 5 مقاعد للبث الصوتي
      </div>
    </div>
  );
};

export default Embed;
