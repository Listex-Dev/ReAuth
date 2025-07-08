'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  Code, 
  Users, 
  BarChart3, 
  Lock, 
  Zap,
  Globe,
  Smartphone,
  Settings
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-grade security with OAuth 2.0 compliance, JWT tokens, and comprehensive audit logs.',
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean APIs, comprehensive documentation, and SDKs for popular programming languages.',
  },
  {
    icon: Users,
    title: 'User Management',
    description: 'Complete user lifecycle management with profile controls and permission settings.',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Detailed analytics on user behavior, application usage, and security metrics.',
  },
  {
    icon: Lock,
    title: 'Custom Scopes',
    description: 'Define custom permission scopes for granular access control to your resources.',
  },
  {
    icon: Zap,
    title: 'Fast Integration',
    description: 'Get up and running in minutes with our quick start guides and examples.',
  },
  {
    icon: Globe,
    title: 'Global CDN',
    description: 'Fast, reliable service worldwide with 99.9% uptime SLA and global edge locations.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Native mobile app support with PKCE for secure authentication on mobile devices.',
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'White-label options, custom branding, and flexible configuration for your needs.',
  },
];

export function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need for secure authentication
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ReAuth provides all the tools and features you need to implement secure, 
            scalable authentication for your applications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}