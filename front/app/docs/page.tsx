'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Book, 
  Code, 
  ExternalLink, 
  Copy,
  Shield,
  Key,
  Users,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function DocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const authorizationUrl = `https://reauth.com/authorize?
  client_id=YOUR_CLIENT_ID&
  redirect_uri=https://yourapp.com/auth/callback&
  scope=openid%20profile%20email&
  response_type=code&
  state=random_state_string`;

  const tokenExchange = `POST /token HTTP/1.1
Host: reauth.com
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=YOUR_AUTHORIZATION_CODE
&client_id=YOUR_CLIENT_ID
&client_secret=YOUR_CLIENT_SECRET
&redirect_uri=https://yourapp.com/auth/callback`;

  const userInfoRequest = `GET /userinfo HTTP/1.1
Host: reauth.com
Authorization: Bearer YOUR_ACCESS_TOKEN`;

  const jsExample = `// Initialize ReAuth
const reauth = new ReAuth({
  clientId: 'YOUR_CLIENT_ID',
  redirectUri: 'https://yourapp.com/auth/callback',
  scope: 'openid profile email'
});

// Start authorization flow
reauth.authorize();

// Handle callback
reauth.handleCallback().then(token => {
  console.log('Access token:', token);
});`;

  const nodeExample = `const express = require('express');
const axios = require('axios');

app.get('/auth/callback', async (req, res) => {
  const { code } = req.query;
  
  try {
    const response = await axios.post('https://reauth.com/token', {
      grant_type: 'authorization_code',
      code,
      client_id: process.env.REAUTH_CLIENT_ID,
      client_secret: process.env.REAUTH_CLIENT_SECRET,
      redirect_uri: process.env.REAUTH_REDIRECT_URI
    });
    
    const { access_token } = response.data;
    // Store token and redirect user
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).json({ error: 'Authorization failed' });
  }
});`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold">ReAuth</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="secondary">Documentation</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/developer">
                <Button variant="outline">
                  Developer Console
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button>
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Book className="h-5 w-5" />
                  <span>Documentation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <a href="#getting-started" className="block py-2 px-3 rounded hover:bg-gray-100 font-medium">
                    Getting Started
                  </a>
                  <a href="#oauth-flow" className="block py-2 px-3 rounded hover:bg-gray-100">
                    OAuth 2.0 Flow
                  </a>
                  <a href="#api-reference" className="block py-2 px-3 rounded hover:bg-gray-100">
                    API Reference
                  </a>
                  <a href="#examples" className="block py-2 px-3 rounded hover:bg-gray-100">
                    Code Examples
                  </a>
                  <a href="#scopes" className="block py-2 px-3 rounded hover:bg-gray-100">
                    Scopes
                  </a>
                  <a href="#testing" className="block py-2 px-3 rounded hover:bg-gray-100">
                    Testing
                  </a>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Getting Started</span>
                  </CardTitle>
                  <CardDescription>
                    Quick start guide to integrate ReAuth into your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex justify-center mb-2">
                        <Users className="h-8 w-8 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">1. Create Account</h3>
                      <p className="text-sm text-gray-600">Sign up for a ReAuth developer account</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex justify-center mb-2">
                        <Code className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold">2. Create App</h3>
                      <p className="text-sm text-gray-600">Register your application in the developer console</p>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="flex justify-center mb-2">
                        <Key className="h-8 w-8 text-purple-600" />
                      </div>
                      <h3 className="font-semibold">3. Integrate</h3>
                      <p className="text-sm text-gray-600">Add OAuth flow to your application</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Quick Integration</h4>
                    <p className="text-sm text-blue-800">
                      Add the "Sign in with ReAuth" button to your application in minutes. 
                      Our OAuth 2.0 implementation handles all the security complexities for you.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* OAuth Flow */}
            <section id="oauth-flow">
              <Card>
                <CardHeader>
                  <CardTitle>OAuth 2.0 Authorization Flow</CardTitle>
                  <CardDescription>
                    Understanding the authorization code flow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600 font-semibold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Authorization Request</h4>
                        <p className="text-sm text-gray-600">
                          Redirect user to ReAuth authorization server
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full text-green-600 font-semibold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">User Authorization</h4>
                        <p className="text-sm text-gray-600">
                          User signs in and grants permission to your app
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full text-purple-600 font-semibold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Authorization Code</h4>
                        <p className="text-sm text-gray-600">
                          ReAuth redirects back with authorization code
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full text-orange-600 font-semibold">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Token Exchange</h4>
                        <p className="text-sm text-gray-600">
                          Exchange authorization code for access token
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* API Reference */}
            <section id="api-reference">
              <Card>
                <CardHeader>
                  <CardTitle>API Reference</CardTitle>
                  <CardDescription>
                    Complete API documentation for ReAuth endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="authorize" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="authorize">Authorization</TabsTrigger>
                      <TabsTrigger value="token">Token</TabsTrigger>
                      <TabsTrigger value="userinfo">User Info</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="authorize" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Authorization Endpoint</h4>
                        <Badge variant="secondary">GET</Badge>
                        <code className="ml-2 text-sm">https://reauth.com/authorize</code>
                      </div>
                      
                      <div>
                        <h5 className="font-medium mb-2">Parameters</h5>
                        <div className="space-y-2 text-sm">
                          <div><code className="bg-gray-100 px-2 py-1 rounded">client_id</code> - Your application's client ID</div>
                          <div><code className="bg-gray-100 px-2 py-1 rounded">redirect_uri</code> - Callback URL</div>
                          <div><code className="bg-gray-100 px-2 py-1 rounded">scope</code> - Requested permissions</div>
                          <div><code className="bg-gray-100 px-2 py-1 rounded">response_type</code> - Must be "code"</div>
                          <div><code className="bg-gray-100 px-2 py-1 rounded">state</code> - Random string for security</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Example Request</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(authorizationUrl, 'auth-url')}
                          >
                            <Copy className="h-4 w-4" />
                            {copiedCode === 'auth-url' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{authorizationUrl}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="token" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Token Endpoint</h4>
                        <Badge variant="secondary">POST</Badge>
                        <code className="ml-2 text-sm">https://reauth.com/token</code>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Example Request</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(tokenExchange, 'token-exchange')}
                          >
                            <Copy className="h-4 w-4" />
                            {copiedCode === 'token-exchange' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{tokenExchange}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="userinfo" className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">User Info Endpoint</h4>
                        <Badge variant="secondary">GET</Badge>
                        <code className="ml-2 text-sm">https://reauth.com/userinfo</code>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Example Request</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(userInfoRequest, 'userinfo-request')}
                          >
                            <Copy className="h-4 w-4" />
                            {copiedCode === 'userinfo-request' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{userInfoRequest}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Code Examples */}
            <section id="examples">
              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                  <CardDescription>
                    Implementation examples for popular frameworks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="javascript" className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Frontend Integration</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(jsExample, 'js-example')}
                          >
                            <Copy className="h-4 w-4" />
                            {copiedCode === 'js-example' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{jsExample}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="nodejs" className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">Express.js Backend</h5>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCode(nodeExample, 'node-example')}
                          >
                            <Copy className="h-4 w-4" />
                            {copiedCode === 'node-example' ? 'Copied!' : 'Copy'}
                          </Button>
                        </div>
                        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                          <code>{nodeExample}</code>
                        </pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="python" className="space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <p className="text-gray-600">Python example coming soon...</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Scopes */}
            <section id="scopes">
              <Card>
                <CardHeader>
                  <CardTitle>Available Scopes</CardTitle>
                  <CardDescription>
                    Permissions you can request from users
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Badge>openid</Badge>
                        <p className="text-sm text-gray-600">Basic identification</p>
                      </div>
                      <div className="space-y-2">
                        <Badge>profile</Badge>
                        <p className="text-sm text-gray-600">User profile information</p>
                      </div>
                      <div className="space-y-2">
                        <Badge>email</Badge>
                        <p className="text-sm text-gray-600">Email address</p>
                      </div>
                      <div className="space-y-2">
                        <Badge>phone</Badge>
                        <p className="text-sm text-gray-600">Phone number</p>
                      </div>
                      <div className="space-y-2">
                        <Badge>address</Badge>
                        <p className="text-sm text-gray-600">Postal address</p>
                      </div>
                      <div className="space-y-2">
                        <Badge>location</Badge>
                        <p className="text-sm text-gray-600">Geographic location</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Testing */}
            <section id="testing">
              <Card>
                <CardHeader>
                  <CardTitle>Testing Your Integration</CardTitle>
                  <CardDescription>
                    Tools and tips for testing your OAuth implementation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-900 mb-2">Development Environment</h4>
                    <p className="text-sm text-yellow-800">
                      Use localhost URLs during development. ReAuth supports localhost redirect URIs 
                      for testing purposes.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold">Testing Checklist</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Test authorization flow with different scopes</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Verify token exchange works correctly</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Test user info endpoint response</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span>Handle error scenarios (denied access, invalid codes)</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}