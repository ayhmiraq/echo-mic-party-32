
import React, { useState } from 'react';
import { Mic, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
      description: "تم إرسال طلب الانضمام للبث الصوتي، يرجى انتظار موافقة المدير",
    });
  };

  if (requestSent) {
    return (
      <div className="w-full p-4 sm:p-6 text-center bg-white rounded-lg">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
          <Loader2 className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600 animate-spin" />
        </div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">تم إرسال الطلب</h3>
        <p className="text-gray-600 text-sm">
          مرحباً {name}، تم إرسال طلبك للانضمام للبث الصوتي.
          يرجى انتظار موافقة المدير.
        </p>
        <div className="mt-3 sm:mt-4 text-xs text-gray-500">
          سيتم إشعارك عند الموافقة على طلبك
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-4 sm:p-6 bg-white rounded-lg">
      <div className="text-center mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-blue-100 flex items-center justify-center">
          <Mic className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
        </div>
        <h3 className="text-base sm:text-xl font-semibold text-gray-800 mb-2">
          انضم للبث الصوتي
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">
          اكتب اسمك للطلب الانضمام للبث الصوتي المشترك
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <div>
          <Input
            type="text"
            placeholder="اكتب اسمك هنا..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full text-right text-sm sm:text-base"
            maxLength={50}
            disabled={isLoading}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {name.length}/50 حرف
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full flex items-center justify-center gap-2 text-sm sm:text-base py-2 sm:py-3"
          disabled={isLoading || !name.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              إرسال طلب الانضمام
            </>
          )}
        </Button>
      </form>
      
      <div className="mt-3 sm:mt-4 text-xs text-gray-500 text-center">
        سيتم عرض طلبك على المدير للموافقة عليه
      </div>
    </div>
  );
};

export default JoinRequest;
