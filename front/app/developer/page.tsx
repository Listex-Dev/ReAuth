'use client';

import { useState } from 'react';
import { DeveloperLayout } from '@/components/DeveloperLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Code, 
  Users, 
  Activity, 
  TrendingUp,
  BarChart3,
  Globe,
  Shield
} from 'lucide-react';
import Link from 'next/link';

export default function DeveloperDashboard() {
  const [apps] = useState([
    {
      id: 1,
      name: 'TaskFlow App',
      clientId: 'task_flow_abc123',
      status: 'active',
      users: 1250,
      requests: 45600,
      lastActivity: '2 hours ago',
    },
    {
      id: 2,
      name: 'Document Manager',
      clientId: 'doc_manager_xyz789',
      status: 'active',
      users: 890,
      requests: 23400,
      lastActivity: '1 day ago',
    },
    {
      id: 3,
      name: 'Financial Dashboard',
      clientId: 'finance_dash_def456',
      status: 'development',
      users: 45,
      requests: 1200,
      lastActivity: '3 days ago',
    },
  ]);

  const stats = {
    totalApps: apps.length,
    totalUsers: apps.reduce((sum, app) => sum + app.users, 0),
    totalRequests: apps.reduce((sum, app) => sum + app.requests, 0),
    activeApps: apps.filter(app => app.status === 'active').length,
  };

  return (
    <DeveloperLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Developer Dashboard</h1>
            <p className="text-gray-600">Manage your OAuth applications and view analytics</p>
          </div>
          <Link href="/developer/apps/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create App
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApps}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeApps} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">API Requests</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalRequests.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.2%</div>
              <p className="text-xs text-green-600">
                +0.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Your most recently updated OAuth applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apps.slice(0, 3).map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                        <Code className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-sm text-gray-600">{app.clientId}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={app.status === 'active' ? 'default' : 'secondary'}>
                        {app.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{app.lastActivity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/developer/apps">
                  <Button variant="outline" className="w-full">
                    View All Applications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common developer tasks and resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Link href="/developer/apps/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Application
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="outline" className="w-full justify-start">
                    <Globe className="h-4 w-4 mr-2" />
                    View Documentation
                  </Button>
                </Link>
                <Link href="/developer/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/developer/security">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Applications Overview</CardTitle>
            <CardDescription>Performance summary of your OAuth applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apps.map((app) => (
                <div key={app.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 border rounded-lg">
                  <div className="md:col-span-2">
                    <h3 className="font-semibold">{app.name}</h3>
                    <p className="text-sm text-gray-600">{app.clientId}</p>
                  </div>
                  <div className="flex items-center">
                    <Badge variant={app.status === 'active' ? 'default' : 'secondary'}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{app.users.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Users</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold">{app.requests.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Requests</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">{app.lastActivity}</p>
                    <p className="text-sm text-gray-500">Last activity</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DeveloperLayout>
  );
}