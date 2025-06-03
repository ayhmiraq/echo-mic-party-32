
import React, { useState } from 'react';
import { Mic, ExternalLink, Copy, Code, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JoinRequest from './JoinRequest';

const EmbeddableWidget: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState('medium');
  
  const embedSizes = {
    small: { width: '300', height: '180', label: 'صغير - للشريط الجانبي' },
    medium: { width: '400', height: '240', label: 'متوسط - للمحتوى الأساسي' },
    large: { width: '600', height: '300', label: 'كبير - للصفحة الرئيسية' },
    responsive: { width: '100%', height: '240', label: 'متجاوب - يتكيف مع الشاشة' }
  };

  const generateEmbedCode = (size: string) => {
    const { width, height } = embedSizes[size as keyof typeof embedSizes];
    const widthValue = width === '100%' ? '"100%"' : width;
    
    return `<iframe 
  src="${window.location.origin}/embed" 
  width="${widthValue}" 
  height="${height}" 
  frameborder="0"
  style="border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 100%;"
  title="البث الصوتي المشترك">
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
      {/* Embeddable Button Preview */}
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
            اختر الحجم المناسب لموقعك ثم انسخ الكود واستخدمه في أي مكان تريده
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
                    className="font-mono text-sm min-h-[120px] bg-gray-50"
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
                <li>• الكود محسن للعمل على جميع الأجهزة والمتصفحات</li>
                <li>• يتضمن تصميماً أنيقاً مع زوايا مدورة وظلال</li>
                <li>• الحجم المتجاوب يتكيف تلقائياً مع عرض الحاوي</li>
                <li>• جميع الطلبات ستظهر في لوحة التحكم للموافقة عليها</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmbeddableWidget;
