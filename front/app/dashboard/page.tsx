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
      timestamp: '2 hours ago',
      status: 'success',
      scopes: ['openid', 'profile', 'email'],
    },
    {
      id: 2,
      appName: 'Document Manager',
      appIcon: '/api/placeholder/32/32',
      timestamp: '1 day ago',
      status: 'success',
      scopes: ['openid', 'documents:write'],
    },
    {
      id: 3,
      appName: 'Financial Dashboard',
      appIcon: '/api/placeholder/32/32',
      timestamp: '3 days ago',
      status: 'denied',
      scopes: ['openid', 'financial:read'],
    },
  ]);

  const [authorizedApps] = useState([
    {
      id: 1,
      name: 'TaskFlow App',
      icon: '/api/placeholder/48/48',
      description: 'Task management application',
      lastAccess: '2 hours ago',
      scopes: ['openid', 'profile', 'email'],
      website: 'https://taskflow.example.com',
    },
    {
      id: 2,
      name: 'Document Manager',
      icon: '/api/placeholder/48/48',
      description: 'Document storage and management',
      lastAccess: '1 day ago',
      scopes: ['openid', 'documents:write'],
      website: 'https://docs.example.com',
    },
  ]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Overview of your ReAuth account activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Authorizations</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Apps</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">2 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h</div>
              <p className="text-xs text-muted-foreground">TaskFlow App</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Score</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">95%</div>
              <p className="text-xs text-green-600">Excellent</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Authorization Activity</CardTitle>
            <CardDescription>
              Latest authentication attempts and authorizations
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
                      <Badge variant={auth.status === 'success' ? 'default' : 'destructive'}>
                        {auth.status}
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
                  {auth.status === 'denied' && (
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
            <CardTitle>Authorized Applications</CardTitle>
            <CardDescription>
              Applications that have access to your ReAuth account
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
                    <p className="text-xs text-gray-500 mt-1">Last access: {app.lastAccess}</p>
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
                      Manage
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