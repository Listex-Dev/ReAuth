'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Activity, 
  Shield, 
  Clock, 
  Users, 
  Settings, 
  ExternalLink,
  MoreHorizontal,
  AlertCircle
} from 'lucide-react';

export default function DashboardPage() {
  const [recentAuthorizations] = useState([
    {
      id: 1,
      appName: 'TaskFlow App',
      appIcon: '/api/placeholder/32/32',
      timestamp: '2 часа назад',
      status: 'успех',
      scopes: ['openid', 'profile', 'email'],
    },
    {
      id: 2,
      appName: 'Document Manager',
      appIcon: '/api/placeholder/32/32',
      timestamp: '1 день назад',
      status: 'успех',
      scopes: ['openid', 'documents:write'],
    },
    {
      id: 3,
      appName: 'Financial Dashboard',
      appIcon: '/api/placeholder/32/32',
      timestamp: '3 дня назад',
      status: 'отказ',
      scopes: ['openid', 'financial:read'],
    },
  ]);

  const [authorizedApps] = useState([
    {
      id: 1,
      name: 'TaskFlow App',
      icon: '/api/placeholder/48/48',
      description: 'Приложение для управления задачами',
      lastAccess: '2 часа назад',
      scopes: ['openid', 'profile', 'email'],
      website: 'https://taskflow.example.com',
    },
    {
      id: 2,
      name: 'Document Manager',
      icon: '/api/placeholder/48/48',
      description: 'Хранение и управление документами',
      lastAccess: '1 день назад',
      scopes: ['openid', 'documents:write'],
      website: 'https://docs.example.com',
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-600">Обзор активности вашего аккаунта ReAuth</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего авторизаций</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+12% по сравнению с прошлым месяцем</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Активных приложений</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 новых за месяц</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Последняя активность</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">TaskFlow App</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Оценка безопасности</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-green-600">Отлично</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Последние авторизации</CardTitle>
            <CardDescription>
              Последние попытки входа и авторизации
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAuthorizations.map((auth) => (
                <div key={auth.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={auth.appIcon} alt={auth.appName} />
                    <AvatarFallback>{auth.appName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-900">{auth.appName}</p>
                      <Badge variant={auth.status === 'успех' ? 'default' : 'destructive'}>
                        {auth.status === 'успех' ? 'Успех' : 'Отказ'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{auth.timestamp}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {auth.scopes.map((scope) => (
                        <Badge key={scope} variant="secondary" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {auth.status === 'отказ' && (
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Authorized Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Авторизованные приложения</CardTitle>
            <CardDescription>
              Приложения, имеющие доступ к вашему аккаунту ReAuth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {authorizedApps.map((app) => (
                <div key={app.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={app.icon} alt={app.name} />
                    <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-gray-900">{app.name}</h3>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600">{app.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Последний доступ: {app.lastAccess}</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {app.scopes.map((scope) => (
                        <Badge key={scope} variant="outline" className="text-xs">
                          {scope}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Управлять
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}