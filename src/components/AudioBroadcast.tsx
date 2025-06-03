
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Participant {
  id: string;
  name: string;
  isActive: boolean;
  isMuted: boolean;
  joinedAt: Date;
}

interface AudioBroadcastProps {
  isAdmin?: boolean;
  onAdminClick?: () => void;
}

const AudioBroadcast: React.FC<AudioBroadcastProps> = ({ isAdmin = false, onAdminClick }) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [userStream, setUserStream] = useState<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const maxParticipants = 5;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setUserStream(stream);
      setIsRecording(true);
      
      // Create audio context for processing
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      toast({
        title: "تم بدء البث الصوتي",
        description: "أصبحت متصلاً بالبث الصوتي المشترك",
      });
    } catch (error) {
      toast({
        title: "خطأ في الوصول للميكروفون",
        description: "تأكد من السماح بالوصول للميكروفون",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (userStream) {
      userStream.getTracks().forEach(track => track.stop());
      setUserStream(null);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
    
    toast({
      title: "تم إيقاف البث الصوتي",
      description: "تم قطع الاتصال من البث الصوتي",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">البث الصوتي المشترك</h1>
            <p className="text-gray-600">غرفة صوتية لـ {maxParticipants} أشخاص</p>
          </div>
          {isAdmin && (
            <Button 
              onClick={onAdminClick} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              لوحة التحكم
            </Button>
          )}
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: maxParticipants }, (_, index) => {
            const participant = participants[index];
            return (
              <Card key={index} className="text-center p-4 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-0">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    participant?.isActive 
                      ? 'bg-green-500 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {participant?.isMuted ? (
                      <MicOff className="w-8 h-8" />
                    ) : (
                      <Mic className="w-8 h-8" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {participant?.name || `مشارك ${index + 1}`}
                  </p>
                  {participant?.isActive && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      متصل
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Control Panel */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-right">
              <Users className="w-5 h-5" />
              التحكم في البث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                variant={isRecording ? "destructive" : "default"}
                size="lg"
                className="flex items-center gap-2 px-8"
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-5 h-5" />
                    إيقاف البث
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    بدء البث
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>عدد المشاركين النشطين: {participants.filter(p => p.isActive).length} / {maxParticipants}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AudioBroadcast;
