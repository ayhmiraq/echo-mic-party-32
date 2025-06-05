import React, { useState } from 'react';
import { Mic, ExternalLink, Copy, Code, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JoinRequest from './JoinRequest';

const EmbeddableWidget: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('medium');
  
  const embedSizes = {
    small: { width: '300', height: '120', label: 'صغير - للشريط الجانبي' },
    medium: { width: '450', height: '140', label: 'متوسط - للمحتوى الأساسي' },
    large: { width: '600', height: '160', label: 'كبير - للصفحة الرئيسية' },
    responsive: { width: '100%', height: '140', label: 'متجاوب - يتكيف مع الشاشة' }
  };

  const generateEmbedCode = (size: string) => {
    const { width, height } = embedSizes[size as keyof typeof embedSizes];
    const widgetUrl = `${window.location.origin}/embed`;
    
    return `<iframe 
  src="${widgetUrl}" 
  width="${width}" 
  height="${height}" 
  frameborder="0"
  style="border: none; overflow: hidden; background: transparent;"
  title="البث الصوتي المشترك"
  allow="microphone"
  scrolling="no">
</iframe>`;
  };

  const copyEmbedCode = (size: string) => {
    const code = generateEmbedCode(size);
    navigator.clipboard.writeText(code);
    toast({
      title: "تم النسخ",
      description: `تم نسخ كود التضمين ${embedSizes[size as keyof typeof embedSizes].label}`,
    });
  };

  const handleJoinRequest = (name: string) => {
    console.log('Join request from embedded widget:', name);
  };

  return (
    <div className="space-y-6">
      {/* Microphones Preview Widget */}
      <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 text-center">البث الصوتي المشترك</h2>
          
          {/* Microphones Grid */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {Array.from({ length: 5 }, (_, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <button className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 flex items-center justify-center group">
                    <Mic className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <JoinRequest onRequestSent={handleJoinRequest} isEmbedded={true} />
                </DialogContent>
              </Dialog>
            ))}
          </div>
          
          <p className="text-blue-100 text-center text-sm">
            انقر على أي مايكروفون للانضمام للبث الصوتي
          </p>
        </CardContent>
      </Card>

      {/* Enhanced Embed Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="w-5 h-5" />
            كود التضمين المتقدم
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            اختر الحجم المناسب لموقعك ثم انسخ الكود واستخدمه في أي مكان تريده - الكود يندمج تلقائياً مع تصميم موقعك
          </p>
          
          <Tabs value={selectedSize} onValueChange={setSelectedSize} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="small" className="flex items-center gap-1">
                <Smartphone className="w-4 h-4" />
                صغير
              </TabsTrigger>
              <TabsTrigger value="medium" className="flex items-center gap-1">
                <Tablet className="w-4 h-4" />
                متوسط
              </TabsTrigger>
              <TabsTrigger value="large" className="flex items-center gap-1">
                <Monitor className="w-4 h-4" />
                كبير
              </TabsTrigger>
              <TabsTrigger value="responsive" className="flex items-center gap-1">
                <Monitor className="w-4 h-4" />
                متجاوب
              </TabsTrigger>
            </TabsList>

            {Object.entries(embedSizes).map(([size, config]) => (
              <TabsContent key={size} value={size}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium text-blue-800">{config.label}</span>
                    <span className="text-sm text-blue-600">
                      {config.width} × {config.height}
                    </span>
                  </div>
                  
                  <Textarea
                    value={generateEmbedCode(size)}
                    readOnly
                    className="font-mono text-sm min-h-[140px] bg-gray-50"
                  />
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => copyEmbedCode(size)} 
                      className="flex items-center gap-2"
                    >
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
              </TabsContent>
            ))}
          </Tabs>

          {/* Usage Instructions */}
          <div className="mt-8 space-y-4">
            <h4 className="font-semibold text-lg">طريقة الاستخدام:</h4>
            
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 bg-green-50 border-green-200">
                <h5 className="font-medium text-green-800 mb-2">للمواقع العادية (HTML)</h5>
                <p className="text-sm text-green-700">
                  انسخ الكود والصقه مباشرة في أي مكان في صفحة HTML
                </p>
              </Card>
              
              <Card className="p-4 bg-blue-50 border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">لمنصات إدارة المحتوى</h5>
                <p className="text-sm text-blue-700">
                  استخدم قسم "HTML مخصص" أو "كود مضمن" في المنصة
                </p>
              </Card>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h5 className="font-semibold text-amber-800 mb-2">ملاحظات مهمة:</h5>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• الكود يندمج تلقائياً مع تصميم موقعك دون إطارات</li>
                <li>• يعمل على جميع الأجهزة والمتصفحات بسلاسة</li>
                <li>• الحجم المتجاوب يتكيف تلقائياً مع عرض الحاوي</li>
                <li>• يدعم صلاحية الوصول للمايكروفون</li>
                <li>• جميع الطلبات ستظهر في لوحة التحكم للموافقة عليها</li>
                <li>• خلفية شفافة تتناسب مع أي قالب خارجي</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddableWidget;
