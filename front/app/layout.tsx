import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ReAuth - OAuth 2.0 Provider',
  description: 'Secure OAuth 2.0 authentication provider for modern applications',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className="dark">
      <body className={inter.className + ' dark bg-background text-foreground'}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}