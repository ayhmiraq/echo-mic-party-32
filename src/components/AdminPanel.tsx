
import React, { useState, useEffect } from 'react';
import { Check, X, Ban, Users, Eye, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface JoinRequest {
  id: string;
  name: string;
  requestedAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'banned';
}

interface AdminPanelProps {
  onBack: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onBack }) => {
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      requestedAt: new Date(),
      status: 'pending'
    },
    {
      id: '2',
      name: 'فاطمة علي',
      requestedAt: new Date(Date.now() - 300000),
      status: 'pending'
    },
    {
      id: '3',
      name: 'محمد حسن',
      requestedAt: new Date(Date.now() - 600000),
      status: 'approved'
    }
  ]);

  const [bannedUsers, setBannedUsers] = useState<string[]>([]);
  const [approvedUsers, setApprovedUsers] = useState<string[]>(['3']);

  const handleApprove = (requestId: string) => {
    setJoinRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'approved' as const }
          : req
      )
    );
    
    setApprovedUsers(prev => [...prev, requestId]);
    
    const request = joinRequests.find(req => req.id === requestId);
    toast({
      title: "تمت الموافقة",
      description: `تم قبول ${request?.name} في البث الصوتي`,
    });
  };

  const handleReject = (requestId: string) => {
    setJoinRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
    
    const request = joinRequests.find(req => req.id === requestId);
    toast({
      title: "تم الرفض",
      description: `تم رفض طلب ${request?.name}`,
      variant: "destructive",
    });
  };

  const handleBan = (requestId: string) => {
    setJoinRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'banned' as const }
          : req
      )
    );
    
    setBannedUsers(prev => [...prev, requestId]);
    setApprovedUsers(prev => prev.filter(id => id !== requestId));
    
    const request = joinRequests.find(req => req.id === requestId);
    toast({
      title: "تم الحظر",
      description: `تم حظر ${request?.name} من إرسال طلبات البث`,
      variant: "destructive",
    });
  };

  const handleRemoveFromBroadcast = (requestId: string) => {
    setApprovedUsers(prev => prev.filter(id => id !== requestId));
    setJoinRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, status: 'rejected' as const }
          : req
      )
    );
    
    const request = joinRequests.find(req => req.id === requestId);
    toast({
      title: "تم الفصل",
      description: `تم فصل ${request?.name} من البث الصوتي`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'banned': return 'bg-red-200 text-red-900';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'approved': return 'موافق عليه';
      case 'rejected': return 'مرفوض';
      case 'banned': return 'محظور';
      default: return 'غير معروف';
    }
  };

  const pendingRequests = joinRequests.filter(req => req.status === 'pending');
  const approvedRequests = joinRequests.filter(req => req.status === 'approved');
  const bannedRequests = joinRequests.filter(req => req.status === 'banned');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة للبث
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
            <p className="text-gray-600">إدارة طلبات الانضمام للبث الصوتي</p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingRequests.length}</div>
              <div className="text-sm text-gray-600">طلبات في الانتظار</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{approvedRequests.length}</div>
              <div className="text-sm text-gray-600">مشاركين مقبولين</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{bannedRequests.length}</div>
              <div className="text-sm text-gray-600">مستخدمين محظورين</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-gray-600">الحد الأقصى</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pending Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                طلبات الانضمام الجديدة
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا توجد طلبات جديدة</p>
              ) : (
                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{request.name}</h3>
                        <p className="text-sm text-gray-500">
                          طلب الانضمام منذ {Math.floor((Date.now() - request.requestedAt.getTime()) / 60000)} دقائق
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(request.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleReject(request.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleBan(request.id)}
                          size="sm"
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Approved Users */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                المشاركين المقبولين
              </CardTitle>
            </CardHeader>
            <CardContent>
              {approvedRequests.length === 0 ? (
                <p className="text-gray-500 text-center py-8">لا يوجد مشاركين مقبولين</p>
              ) : (
                <div className="space-y-4">
                  {approvedRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{request.name}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleRemoveFromBroadcast(request.id)}
                          size="sm"
                          variant="outline"
                        >
                          فصل من البث
                        </Button>
                        <Button
                          onClick={() => handleBan(request.id)}
                          size="sm"
                          variant="destructive"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Banned Users */}
        {bannedRequests.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Ban className="w-5 h-5" />
                المستخدمين المحظورين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bannedRequests.map((request) => (
                  <div key={request.id} className="p-4 bg-red-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{request.name}</h3>
                    <Badge className={getStatusColor(request.status)}>
                      {getStatusText(request.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
