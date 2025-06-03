
import React, { useState } from 'react';
import { Mic, ExternalLink, Copy, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import JoinRequest from './JoinRequest';

const EmbeddableWidget: React.FC = () => {
  const [showEmbed, setShowEmbed] = useState(false);
  
  const embedCode = `<iframe 
  src="${window.location.origin}/embed" 
  width="400" 
  height="500" 
  frameborder="0"
  title="البث الصوتي المشترك">
</iframe>`;

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(embedCode);
    toast({
      title: "تم النسخ",
      description: "تم نسخ كود التضمين إلى الحافظة",
    });
  };

  const handleJoinRequest = (name: string) => {
    console.log('Join request from embedded widget:', name);
  };

  return (
    <div className="space-y-6">
      {/* Embeddable Button */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
            <Mic className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold mb-2">انضم للبث الصوتي</h2>
          <p className="text-blue-100 mb-6">
            شارك في المحادثة الصوتية مع الآخرين
          </p>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 px-8"
              >
                <Mic className="w-5 h-5 mr-2" />
                طلب الانضمام
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-right">طلب الانضمام للبث</DialogTitle>
              </DialogHeader>
              <JoinRequest onRequestSent={handleJoinRequest} isEmbedded={true} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Embed Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            كود التضمين
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            يمكنك تضمين زر البث الصوتي في موقعك الإلكتروني باستخدام الكود التالي:
          </p>
          
          <div className="space-y-4">
            <Textarea
              value={embedCode}
              readOnly
              className="font-mono text-sm"
              rows={6}
            />
            
            <div className="flex gap-2">
              <Button onClick={copyEmbedCode} variant="outline" className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                نسخ الكود
              </Button>
              
              <Button 
                onClick={() => window.open('/embed', '_blank')} 
                variant="outline"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                معاينة
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">إرشادات التضمين:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• يمكن تخصيص العرض والارتفاع حسب احتياجاتك</li>
              <li>• سيظهر زر طلب الانضمام للزوار</li>
              <li>• الطلبات ستظهر في لوحة التحكم للموافقة عليها</li>
              <li>• يعمل الزر على جميع المواقع الإلكترونية</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddableWidget;
