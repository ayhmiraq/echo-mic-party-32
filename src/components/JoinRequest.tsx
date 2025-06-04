
import React, { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

interface JoinRequestProps {
  onRequestSent: (name: string) => void;
  isEmbedded?: boolean;
}

const JoinRequest: React.FC<JoinRequestProps> = ({ onRequestSent, isEmbedded = false }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast({
        title: "الاسم مطلوب",
        description: "يرجى إدخال اسمك للانضمام للبث الصوتي",
        variant: "destructive",
      });
      return;
    }

    if (name.length < 2) {
      toast({
        title: "اسم قصير جداً",
        description: "يجب أن يكون الاسم على الأقل حرفين",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setRequestSent(true);
    onRequestSent(name);
    
    toast({
      title: "تم إرسال الطلب",
      description: "تم إرسال طلب الانضمام للبث الصوتي",
    });
  };

  if (requestSent) {
    return (
      <div className="w-full p-6 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <Mic className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">تم إرسال الطلب</h3>
        <p className="text-gray-600">
          مرحباً {name}، يرجى انتظار الموافقة
        </p>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="اكتب اسمك..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 text-right text-base rounded-full px-6 py-3 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 shadow-sm"
            maxLength={50}
            disabled={isLoading}
          />
          
          <Button 
            type="submit" 
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "انضم"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JoinRequest;
