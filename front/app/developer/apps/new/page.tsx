'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeveloperLayout } from '@/components/DeveloperLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Code,
  Globe,
  Shield,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  DollarSign,
  Navigation
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { useAuthStore } from '@/hooks/useAuthStore';
import { createApp } from '@/lib/api';

const AVAILABLE_SCOPES = [
  {
    id: 'openid',
    name: 'OpenID',
    description: 'Базовая идентификация и аутентификация',
    icon: Shield,
    category: 'core',
    required: true,
  },
  {
    id: 'profile',
    name: 'Профиль',
    description: 'Доступ к информации профиля пользователя (имя, аватар)',
    icon: User,
    category: 'core',
    required: false,
  },
  {
    id: 'email',
    name: 'Почта',
    description: 'Доступ к email пользователя',
    icon: Mail,
    category: 'core',
    required: false,
  },
  {
    id: 'phone',
    name: 'Телефон',
    description: 'Доступ к номеру телефона пользователя',
    icon: Phone,
    category: 'personal',
    required: false,
  },
  {
    id: 'address',
    name: 'Адрес',
    description: 'Доступ к почтовому адресу пользователя',
    icon: MapPin,
    category: 'personal',
    required: false,
  },
  {
    id: 'documents:read',
    name: 'Чтение документов',
    description: 'Чтение пользовательских документов',
    icon: FileText,
    category: 'custom',
    required: false,
  },
  {
    id: 'documents:write',
    name: 'Запись документов',
    description: 'Управление пользовательскими документами',
    icon: FileText,
    category: 'custom',
    required: false,
  },
  {
    id: 'financial:read',
    name: 'Финансы (чтение)',
    description: 'Доступ к финансовой информации',
    icon: DollarSign,
    category: 'custom',
    required: false,
  },
  {
    id: 'location',
    name: 'Геолокация',
    description: 'Доступ к данным о местоположении',
    icon: Navigation,
    category: 'custom',
    required: false,
  },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const { token, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website: '',
    redirectUri: '',
    scopes: ['openid'],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!formData.name || !formData.redirectUri) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      setIsSubmitting(false);
      return;
    }
    try {
      if (!token || !user) throw new Error('Нет авторизации');
      console.log('submit', token, user, formData);
      const res = await createApp(token, {
        name: formData.name,
        description: formData.description,
        website: formData.website,
        redirect_uri: formData.redirectUri,
        owner_id: user.id,
        scopes: formData.scopes,
      });
      if (res.client_id) {
        toast.success('Приложение успешно создано!');
        router.push('/developer/apps');
      } else {
        toast.error(res.error || 'Ошибка создания приложения');
      }
    } catch (error) {
      toast.error('Ошибка создания приложения');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScopeChange = (scopeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      scopes: checked
        ? [...prev.scopes, scopeId]
        : prev.scopes.filter(s => s !== scopeId)
    }));
  };

  const getScopesByCategory = (category: string) => {
    return AVAILABLE_SCOPES.filter(scope => scope.category === category);
  };

  return (
    <DeveloperLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/developer/apps">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к приложениям
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Создать новое приложение</h1>
            <p className="text-gray-600 dark:text-gray-300">Настройте новое OAuth-приложение для вашего проекта</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Основная информация</span>
              </CardTitle>
              <CardDescription>
                Основные сведения о вашем приложении
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Название приложения <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Моё крутое приложение"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Сайт приложения</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="website"
                      value={formData.website}
                      onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="description">Описание</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Кратко опишите назначение приложения"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="redirectUri">
                    Redirect URI <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="redirectUri"
                    value={formData.redirectUri}
                    onChange={(e) => setFormData(prev => ({ ...prev, redirectUri: e.target.value }))}
                    placeholder="https://example.com/auth/callback"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scopes */}
          <Card>
            <CardHeader>
              <CardTitle>Разрешения (scopes)</CardTitle>
              <CardDescription>
                Выберите, к каким данным пользователя ваше приложение будет запрашивать доступ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['core', 'personal', 'custom'].map(category => (
                  <div key={category} className="space-y-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                      {category === 'core' && 'Основные'}
                      {category === 'personal' && 'Личные'}
                      {category === 'custom' && 'Кастомные'}
                    </h3>
                    {getScopesByCategory(category).map(scope => (
                      <label key={scope.id} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.scopes.includes(scope.id)}
                          onCheckedChange={checked => handleScopeChange(scope.id, !!checked)}
                          disabled={scope.required}
                        />
                        <span className="flex items-center gap-1">
                          <scope.icon className="h-4 w-4 text-gray-400" />
                          <span>{scope.name}</span>
                        </span>
                        <span className="text-xs text-gray-500">{scope.description}</span>
                        {scope.required && <Badge className="ml-2">Обязательный</Badge>}
                      </label>
                    ))}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Создание...' : 'Создать приложение'}
          </Button>
        </form>
      </div>
    </DeveloperLayout>
  );
}