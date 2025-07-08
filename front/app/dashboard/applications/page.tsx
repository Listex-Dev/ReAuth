'use client';

import { useEffect, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ExternalLink,
  Settings,
  Trash2,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuthStore } from '@/hooks/useAuthStore';
import { getApps } from '@/lib/api';

export default function ApplicationsPage() {
  const { token, user } = useAuthStore();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApps = async () => {
      if (!token || !user) return;
      const res = await getApps(token, user.id);
      if (Array.isArray(res)) {
        setApplications(res);
      } else {
        setApplications([]);
      }
      setLoading(false);
    };
    fetchApps();
  }, [token, user]);

  const handleRevokeAccess = (clientId: string) => {
    setApplications(prev => prev.filter(app => app.client_id !== clientId));
    toast.success('Доступ к приложению успешно отозван');
    // Здесь можно вызвать API для отзыва доступа
  };

  const handleManageScopes = (clientId: string) => {
    toast.info('Управление разрешениями будет доступно скоро');
  };

  const getTrustBadge = (trustLevel: string) => {
    switch (trustLevel) {
      case 'high':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Доверенное</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Проверено</Badge>;
      case 'low':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Не проверено</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'limited':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'inactive':
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Авторизованные приложения</h1>
          <p className="text-gray-600 dark:text-gray-300">Управляйте приложениями, которые имеют доступ к вашему аккаунту ReAuth</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold">{applications.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Всего приложений</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-2xl font-bold">{applications.filter(app => app.status === 'active').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Активные</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <div>
                  <p className="text-2xl font-bold">{applications.filter(app => app.status === 'limited').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Ограниченные</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-2xl font-bold">{applications.filter(app => app.status === 'inactive').length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Неактивные</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Загрузка...</p>
          ) : applications.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Нет авторизованных приложений</p>
          ) : applications.map((app) => (
            <Card key={app.client_id || app.id} className="transition-all hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16 border">
                    <AvatarImage src={app.icon || '/api/placeholder/48/48'} alt={app.name} />
                    <AvatarFallback className="text-lg">
                      {app.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{app.name}</h3>
                      {getStatusIcon(app.status)}
                      {getTrustBadge(app.trustLevel || 'medium')}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">{app.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                          <a href={app.website || '#'} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                            {app.website || '—'}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4" />
                          <span>Последний доступ: {app.lastAccess || '—'}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">Авторизовано: {app.authorizedAt || '—'}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {app.scopes?.map((scope: string) => (
                            <Badge key={scope} className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{scope}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => handleManageScopes(app.client_id || app.id)}>
                        <Settings className="h-4 w-4 mr-1" /> Разрешения
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleRevokeAccess(app.client_id || app.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Отозвать доступ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}