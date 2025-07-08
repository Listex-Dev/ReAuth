'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const codeExamples = {
  html: `<!-- Add the ReAuth button to your HTML -->
<a href="https://reauth.com/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_CALLBACK&scope=openid%20profile%20email&response_type=code" 
   class="reauth-button">
  <img src="https://reauth.com/button.png" alt="Sign in with ReAuth" />
</a>`,
  
  javascript: `// Initialize ReAuth SDK
const reauth = new ReAuth({
  clientId: 'your_client_id',
  redirectUri: 'https://yourapp.com/callback'
});

// Handle sign in
document.getElementById('signin-btn').addEventListener('click', () => {
  reauth.authorize({
    scope: 'openid profile email'
  });
});`,
  
  react: `import { useReAuth } from '@reauth/react';

function SignInButton() {
  const { authorize } = useReAuth({
    clientId: 'your_client_id',
    redirectUri: 'https://yourapp.com/callback'
  });

  return (
    <button onClick={() => authorize({ scope: 'openid profile email' })}>
      Sign in with ReAuth
    </button>
  );
}`,
  
  nodejs: `const express = require('express');
const { ReAuth } = require('@reauth/node');

const reauth = new ReAuth({
  clientId: process.env.REAUTH_CLIENT_ID,
  clientSecret: process.env.REAUTH_CLIENT_SECRET,
  redirectUri: process.env.REAUTH_REDIRECT_URI
});

app.get('/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const tokens = await reauth.exchangeCode(code);
    const user = await reauth.getUser(tokens.access_token);
    
    // Store user session
    req.session.user = user;
    res.redirect('/dashboard');
  } catch (error) {
    res.redirect('/login?error=auth_failed');
  }
});`
};

export function IntegrationExample() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string, lang: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(lang);
    toast.success('Код скопирован в буфер обмена');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Интеграция — это просто
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Начните работу с ReAuth за считанные минуты с помощью SDK и примеров для популярных фреймворков.
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Примеры кода</span>
              <Badge variant="secondary">Готово к использованию</Badge>
            </CardTitle>
            <CardDescription>
              Выберите язык или фреймворк для старта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="html" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="html">HTML</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="react">React</TabsTrigger>
                <TabsTrigger value="nodejs">Node.js</TabsTrigger>
              </TabsList>
              
              {Object.entries(codeExamples).map(([lang, code]) => (
                <TabsContent key={lang} value={lang} className="mt-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyCode(code, lang)}
                    >
                      {copiedCode === lang ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}