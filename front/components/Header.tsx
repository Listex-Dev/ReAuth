'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">ReAuth</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/docs" className="text-gray-700 hover:text-blue-600 font-medium">
              Документация
            </Link>
            <Link href="/developer" className="text-gray-700 hover:text-blue-600 font-medium">
              Для разработчиков
            </Link>
            <Link href="/pricing" className="text-gray-700 hover:text-blue-600 font-medium">
              Тарифы
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              О проекте
            </Link>
          </nav>
          
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="outline">Войти</Button>
            </Link>
            <Link href="/auth/register">
              <Button>Регистрация</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/docs" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Документация
            </Link>
            <Link href="/developer" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Для разработчиков
            </Link>
            <Link href="/pricing" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              Тарифы
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
              О проекте
            </Link>
          </div>
          <div className="px-2 pb-3 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-2">
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">Войти</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="w-full">Регистрация</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}