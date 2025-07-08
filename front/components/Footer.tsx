'use client';

import Link from 'next/link';
import { Shield, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white dark:bg-gray-900 dark:text-white bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-blue-400" />
              <span className="text-xl font-bold">ReAuth</span>
            </div>
            <p className="text-gray-400">
              Безопасный OAuth 2.0 провайдер аутентификации для современных приложений.
            </p>
            <div className="flex space-x-4">
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Github className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
              <Mail className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Продукт</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/docs" className="hover:text-white">Документация</Link></li>
              <li><Link href="/developer" className="hover:text-white">Консоль разработчика</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Тарифы</Link></li>
              <li><Link href="/status" className="hover:text-white">Статус</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white">О нас</Link></li>
              <li><Link href="/blog" className="hover:text-white">Блог</Link></li>
              <li><Link href="/careers" className="hover:text-white">Вакансии</Link></li>
              <li><Link href="/contact" className="hover:text-white">Контакты</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/privacy" className="hover:text-white">Политика конфиденциальности</Link></li>
              <li><Link href="/terms" className="hover:text-white">Пользовательское соглашение</Link></li>
              <li><Link href="/security" className="hover:text-white">Безопасность</Link></li>
              <li><Link href="/compliance" className="hover:text-white">Соответствие</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 dark:text-gray-400 text-gray-600">
          <p>&copy; 2024 ReAuth. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}