'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, Check, X, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/hooks/useAuthStore';

const SCOPE_DESCRIPTIONS = {
  'openid': 'Basic identification',
  'profile': 'Access to your profile information',
  'email': 'Access to your email address',
  'phone': 'Access to your phone number',
  'address': 'Access to your address',
  'financial:read': 'Read access to financial data',
  'documents:write': 'Write access to documents',
  'location': 'Access to your location',
};

export default function AuthorizePage() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const clientId = searchParams.get('client_id');
  const redirectUri = searchParams.get('redirect_uri');
  const scope = searchParams.get('scope');
  const state = searchParams.get('state');

  // Mock application data - in real app, this would be fetched from API
  const appData = {
    name: 'TaskFlow App',
    description: 'A modern task management application',
    icon: '/api/placeholder/64/64',
    website: 'https://taskflow.example.com',
    lastAccess: '2024-01-15',
  };

  const requestedScopes = scope ? scope.split(' ') : [];

  const handleApprove = async () => {
    setIsLoading(true);
    
    // Mock API call to approve authorization
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate authorization code and redirect
    const authCode = 'auth_code_' + Math.random().toString(36).substr(2, 9);
    const redirectUrl = `${redirectUri}?code=${authCode}${state ? `&state=${state}` : ''}`;
    
    window.location.href = redirectUrl;
  };

  const handleDeny = () => {
    const redirectUrl = `${redirectUri}?error=access_denied${state ? `&state=${state}` : ''}`;
    window.location.href = redirectUrl;
  };

  if (!clientId || !redirectUri) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <CardTitle className="text-red-600">Invalid Request</CardTitle>
            <CardDescription>
              Required parameters are missing from the authorization request.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-xl font-bold">Authorize Application</CardTitle>
          <CardDescription>
            {appData.name} is requesting access to your ReAuth account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={appData.icon} alt={appData.name} />
              <AvatarFallback>{appData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900">{appData.name}</h3>
              <p className="text-sm text-gray-600 truncate">{appData.description}</p>
              <p className="text-xs text-gray-500">Last access: {appData.lastAccess}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">Requested Permissions</h4>
            <div className="space-y-2">
              {requestedScopes.map((scopeItem) => (
                <div key={scopeItem} className="flex items-center space-x-3">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">{scopeItem}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {SCOPE_DESCRIPTIONS[scopeItem] || 'Custom permission'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Your data is protected</h4>
                <p className="text-sm text-blue-700 mt-1">
                  You can revoke access at any time from your account settings.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={handleDeny}
              variant="outline"
              className="flex-1"
              disabled={isLoading}
            >
              <X className="h-4 w-4 mr-2" />
              Deny
            </Button>
            <Button
              onClick={handleApprove}
              className="flex-1"
              disabled={isLoading}
            >
              <Check className="h-4 w-4 mr-2" />
              {isLoading ? 'Processing...' : 'Allow'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}