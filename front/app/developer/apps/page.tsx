'use client';

import { useEffect, useState } from 'react';
import { DeveloperLayout } from '@/components/DeveloperLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Plus,
  Search,
  Code,
  Copy,
  Eye,
  EyeOff,
  Settings,
  Trash2,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuthStore } from '@/hooks/useAuthStore';
import { getApps } from '@/lib/api';

export default function ApplicationsPage() {
  const { token, user } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleSecrets, setVisibleSecrets] = useState<Set<string>>(new Set());
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

  const filteredApps = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (app.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSecretVisibility = (clientId: string) => {
    setVisibleSecrets(prev => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} скопирован`);
  };

  const deleteApplication = (clientId: string) => {
    setApplications(prev => prev.filter(app => app.client_id !== clientId));
    toast.success('Приложение удалено');
    // Здесь можно вызвать API для удаления приложения
  };

  return (
    <DeveloperLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Ваши приложения</h1>
            <p className="text-gray-600 dark:text-gray-300">Управляйте своими OAuth-приложениями и их ключами</p>
          </div>
          <Link href="/developer/apps/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Создать приложение
            </Button>
          </Link>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Поиск приложений..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Applications List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Загрузка...</p>
          ) : filteredApps.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Нет приложений</p>
          ) : filteredApps.map((app) => (
            <Card key={app.client_id || app.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <CardTitle className="text-xl">{app.name}</CardTitle>
                      <Badge variant={app.status === 'active' ? 'default' : 'secondary'}>
                        {app.status === 'active' ? 'Активно' : app.status === 'development' ? 'В разработке' : app.status}
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">{app.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link href={`/developer/apps/${app.client_id || app.id}`}>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4 mr-2" />
                        Настройки
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteApplication(app.client_id || app.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Application Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Client ID</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                          {app.client_id}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(app.client_id, 'Client ID')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Client Secret</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                          {visibleSecrets.has(app.client_id) ? app.client_secret : '••••••••••••••••'}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleSecretVisibility(app.client_id)}
                        >
                          {visibleSecrets.has(app.client_id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(app.client_secret, 'Client Secret')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Redirect URI</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <code className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded text-sm font-mono">
                          {app.redirect_uri}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(app.redirect_uri, 'Redirect URI')}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <a href={app.website || '#'} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Scopes</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {app.scopes?.map((scope: string) => (
                          <Badge key={scope} className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">{scope}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Пользователей</label>
                      <div className="mt-1 text-gray-900 dark:text-gray-100 font-semibold">{app.users || 0}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Запросов</label>
                      <div className="mt-1 text-gray-900 dark:text-gray-100 font-semibold">{app.requests || 0}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Создано</label>
                      <div className="mt-1 text-gray-900 dark:text-gray-100 font-semibold">{app.created_at || app.createdAt || '—'}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Последняя активность</label>
                      <div className="mt-1 text-gray-900 dark:text-gray-100 font-semibold">{app.last_activity || app.lastActivity || '—'}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DeveloperLayout>
  );
}