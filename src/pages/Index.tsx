
import React, { useState } from 'react';
import AudioBroadcast from '@/components/AudioBroadcast';
import AdminPanel from '@/components/AdminPanel';
import EmbeddableWidget from '@/components/EmbeddableWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  if (showAdminPanel) {
    return <AdminPanel onBack={() => setShowAdminPanel(false)} />;
  }

  return (
    <div className="min-h-screen">
      <Tabs defaultValue="broadcast" className="w-full">
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="broadcast">البث الصوتي</TabsTrigger>
              <TabsTrigger value="embed">كود التضمين</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="broadcast" className="mt-0">
          <AudioBroadcast 
            isAdmin={true} 
            onAdminClick={() => setShowAdminPanel(true)} 
          />
        </TabsContent>

        <TabsContent value="embed" className="mt-0">
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">تضمين البث الصوتي</h1>
                <p className="text-gray-600">ضع زر البث الصوتي في موقعك الإلكتروني</p>
              </div>
              <EmbeddableWidget />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
