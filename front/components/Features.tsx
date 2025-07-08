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
    title: 'Корпоративная безопасность',
    description: 'Банковский уровень безопасности, соответствие OAuth 2.0, JWT-токены и полный аудит.',
  },
  {
    icon: Code,
    title: 'Удобно для разработчиков',
    description: 'Чистые API, подробная документация и SDK для популярных языков программирования.',
  },
  {
    icon: Users,
    title: 'Управление пользователями',
    description: 'Полный жизненный цикл пользователя с управлением профилем и настройками прав.',
  },
  {
    icon: BarChart3,
    title: 'Аналитика и отчёты',
    description: 'Детальная аналитика по пользователям, приложениям и безопасности.',
  },
  {
    icon: Lock,
    title: 'Пользовательские права',
    description: 'Определяйте собственные права доступа для гибкого управления ресурсами.',
  },
  {
    icon: Zap,
    title: 'Быстрая интеграция',
    description: 'Начните работу за считанные минуты с нашими гайдами и примерами.',
  },
  {
    icon: Globe,
    title: 'Глобальный CDN',
    description: 'Быстрый и надёжный сервис по всему миру с SLA 99.9% и edge-локациями.',
  },
  {
    icon: Smartphone,
    title: 'Готово для мобильных',
    description: 'Поддержка мобильных приложений с PKCE для безопасной аутентификации.',
  },
  {
    icon: Settings,
    title: 'Гибкая настройка',
    description: 'White-label, кастомизация бренда и гибкая конфигурация под ваши задачи.',
  },
];

export function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Всё для безопасной аутентификации
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ReAuth предоставляет все инструменты и возможности для внедрения безопасной и масштабируемой аутентификации в ваши приложения.
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